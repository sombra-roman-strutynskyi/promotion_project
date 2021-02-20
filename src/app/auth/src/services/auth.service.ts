import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import {
  pick,
  omit,
  UserCredential,
  UserFirebase,
  AuthCredential,
  isNullOrUndefined,
  AuthProvider,
} from '@shared';
import firebase from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import { take, map, mergeMap, exhaustMap } from 'rxjs/operators';
import { DialogPasswordConformationComponent } from '../components/dialog-password-conformation/dialog-password-conformation.component';
import {
  ICredentials,
  IUser,
  IRegisterUser,
  User,
  ProviderType,
  IProviders,
} from '../models';

@Injectable()
export class AuthService {
  constructor(
    private authFirebase: AngularFireAuth,
    private dbFirebase: AngularFireDatabase,
    private dialog: MatDialog
  ) {}

  facebookLogin(): Observable<UserCredential> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return from(this.authFirebase.signInWithPopup(provider)).pipe(
      map((userCredential: UserCredential) => {
        const { user, additionalUserInfo } = userCredential;
        if (user) {
          console.log(additionalUserInfo);

          const { isNewUser, profile } = additionalUserInfo;
          if (isNewUser) {
            this.dbFirebase.object(`users/${user.uid}`).set({
              firstName: profile['first_name'],
              lastName: profile['last_name'],
              email: profile['email'],
            });
          }
        }
        return userCredential;
      })
    );
  }

  googleLogin(): Observable<UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    return from(this.authFirebase.signInWithPopup(provider)).pipe(
      map((userCredential: UserCredential) => {
        console.log(userCredential);
        const { user, additionalUserInfo } = userCredential;

        if (user) {
          console.log(additionalUserInfo);
          const { isNewUser, profile } = additionalUserInfo;
          if (isNewUser) {
            this.dbFirebase.object(`users/${user.uid}`).set({
              firstName: profile['given_name'],
              lastName: profile['family_name'],
              email: profile['email'],
            });
          }
        }
        return userCredential;
      })
    );
  }

  loginWithCredentials(credentials: ICredentials): Observable<UserCredential> {
    return from(
      this.authFirebase
        .setPersistence(
          credentials.remember
            ? firebase.auth.Auth.Persistence.LOCAL
            : firebase.auth.Auth.Persistence.SESSION
        )
        .then(() =>
          this.authFirebase.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        )
    );
  }

  logout(): Observable<void> {
    return from(this.authFirebase.signOut());
  }

  getCurrentUser(): Observable<{
    currentUser: IUser;
    providers: IProviders;
  } | null> {
    return this.authFirebase.authState.pipe(
      take(1),
      mergeMap((userFirebase: UserFirebase) => {
        if (userFirebase) {
          return this.dbFirebase
            .object(`users/${userFirebase.uid}`)
            .valueChanges()
            .pipe(
              take(1),
              map((user: IUser) => ({
                currentUser: new User({
                  ...pick(
                    userFirebase,
                    'uid',
                    'firstName',
                    'lastName',
                    'email',
                    'photoURL'
                  ),
                  ...user,
                }),
                providers: userFirebase?.providerData.reduce(
                  (providers, { providerId }) => {
                    const name = providerId.split('.')[0];
                    providers[name] = true;
                    return providers;
                  },
                  {}
                ),
              }))
            );
        }
        return of(null);
      })
    );
  }

  register(registerUser: IRegisterUser): Observable<UserCredential> {
    return from(
      this.authFirebase
        .createUserWithEmailAndPassword(
          registerUser.email,
          registerUser.password
        )
        .then((userCredential: UserCredential) => {
          const { user } = userCredential;
          if (user) {
            user.sendEmailVerification();
            this.dbFirebase
              .object(`users/${user.uid}`)
              .set(omit(registerUser, 'password'));
          }
          return userCredential;
        })
    );
  }

  passwordForgotten(email: string): Observable<void> {
    return from(
      this.authFirebase.sendPasswordResetEmail(email, {
        url: 'http://localhost:4200/auth',
      })
    );
  }

  resetPassword(
    actionCode: string,
    password: string,
    email: string
  ): Observable<UserCredential> {
    return from(
      this.authFirebase.confirmPasswordReset(actionCode, password)
    ).pipe(
      exhaustMap(() =>
        this.loginWithCredentials({ email, password, remember: false })
      )
    );
  }

  verifyPasswordResetCode(actionCode: string): Observable<string> {
    // return EMAIL
    return from(this.authFirebase.verifyPasswordResetCode(actionCode));
  }

  verifyEmailAddress(actionCode: string): void {
    this.authFirebase.applyActionCode(actionCode);
  }

  mergeAccounts(
    email: string,
    credential: AuthCredential
  ): Observable<UserCredential> {
    return from(this.authFirebase.fetchSignInMethodsForEmail(email)).pipe(
      mergeMap((providers: ProviderType[]) => {
        const firstProvider = providers[0];
        if (firstProvider === 'password') {
          return this.getPasswordFromDialog(email).pipe(
            take(1),
            mergeMap((password) =>
              from(
                this.loginWithCredentials({ email, password, remember: false })
              ).pipe(
                mergeMap((userCredential) => {
                  return from(
                    userCredential.user.linkWithCredential(credential)
                  );
                })
              )
            )
          );
        }
        const provider = this.getProviderForProviderId(firstProvider);
        if (isNullOrUndefined(provider)) {
          return of(null);
        }
        return from(this.authFirebase.signInWithPopup(provider)).pipe(
          mergeMap((resultCredentials) =>
            from(resultCredentials.user.linkWithCredential(credential))
          )
        );
      })
    );
  }

  private getProviderForProviderId(providerType: ProviderType): AuthProvider {
    switch (providerType) {
      case 'google.com':
        return new firebase.auth.GoogleAuthProvider();
      case 'facebook.com':
        return new firebase.auth.FacebookAuthProvider();
      default:
        return null;
    }
  }

  private getPasswordFromDialog(email): Observable<string> {
    const dialogRef = this.dialog.open(DialogPasswordConformationComponent, {
      minWidth: '300px',
      maxWidth: '350px',
      width: 'auto',
      disableClose: true,
      data: {
        email,
        password: '',
      },
    });

    return dialogRef.afterClosed();
  }
}
