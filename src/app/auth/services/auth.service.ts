import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@env';
import {
  UserCredential,
  UserFirebase,
  AuthCredential,
  AuthProvider,
} from '@shared';
import firebase from 'firebase/app';
import { omit, pick } from 'lodash';
import { Observable, of, from } from 'rxjs';
import { take, map, mergeMap, exhaustMap } from 'rxjs/operators';
import { DialogPasswordConformationComponent } from '../components/dialog-password-conformation/dialog-password-conformation.component';
import { IDialogPasswordConformationData } from '../models';
import {
  ICredentials,
  IUser,
  IRegisterUser,
  User,
  ProviderType,
  IProviders,
  Providers,
} from '../models';

@Injectable()
export class AuthService {
  constructor(
    private authFirebase: AngularFireAuth,
    private dbFirebase: AngularFireDatabase,
    private dialog: MatDialog
  ) {}

  public facebookLogin(): Observable<UserCredential> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return from(this.authFirebase.signInWithPopup(provider)).pipe(
      map((userCredential: UserCredential) => {
        const { user, additionalUserInfo } = userCredential;
        if (user) {
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

  public googleLogin(): Observable<UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    return from(this.authFirebase.signInWithPopup(provider)).pipe(
      map((userCredential: UserCredential) => {
        const { user, additionalUserInfo } = userCredential;
        if (user) {
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

  public loginWithCredentials(
    credentials: ICredentials
  ): Observable<UserCredential> {
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

  public logout(): Observable<void> {
    return from(this.authFirebase.signOut());
  }

  public getCurrentUser(): Observable<{
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
                  ...pick(userFirebase, ['uid', 'email', 'photoURL']),
                  ...user,
                }),
                providers: (userFirebase?.providerData ?? []).reduce(
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

  public register(registerUser: IRegisterUser): Observable<UserCredential> {
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
              .set(omit(registerUser, ['password']));
          }
          return userCredential;
        })
    );
  }

  public passwordForgotten(email: string): Observable<void> {
    return from(
      this.authFirebase.sendPasswordResetEmail(email, {
        url: `${environment.url}auth`,
      })
    );
  }

  public resetPassword(
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

  public verifyPasswordResetCode(actionCode: string): Observable<string> {
    // return EMAIL
    return from(this.authFirebase.verifyPasswordResetCode(actionCode));
  }

  public verifyEmailAddress(actionCode: string): void {
    this.authFirebase.applyActionCode(actionCode);
  }

  public mergeAccounts(
    email: string,
    credential: AuthCredential
  ): Observable<UserCredential | null> {
    return from(this.authFirebase.fetchSignInMethodsForEmail(email)).pipe(
      mergeMap((providerTypes: ProviderType[]) => {
        const providerType = providerTypes[0];
        if (providerType === Providers.PASSWORD) {
          return this.getPasswordFromDialog(email).pipe(
            take(1),
            mergeMap((password) =>
              from(
                this.loginWithCredentials({
                  email,
                  password,
                  remember: false,
                })
              )
            )
          );
        }
        const provider = this.getProviderForProviderId(providerType);
        return provider
          ? from(this.authFirebase.signInWithPopup(provider))
          : of(provider);
      }),
      mergeMap((userCredential: UserCredential) => {
        if (userCredential) {
          return userCredential.user.linkWithCredential(credential);
        }
        return of(userCredential);
      })
    );
  }

  private getProviderForProviderId(
    providerType: ProviderType
  ): AuthProvider | null {
    switch (providerType) {
      case Providers.GOOGLE:
        return new firebase.auth.GoogleAuthProvider();
      case Providers.FACEBOOK:
        return new firebase.auth.FacebookAuthProvider();
      default:
        return null;
    }
  }

  private getPasswordFromDialog(email): Observable<string> {
    const data: IDialogPasswordConformationData = {
      email,
      password: '',
    };
    const dialogRef = this.dialog.open(DialogPasswordConformationComponent, {
      minWidth: '300px',
      maxWidth: '350px',
      width: 'auto',
      disableClose: true,
      data,
    });

    return dialogRef.afterClosed();
  }
}
