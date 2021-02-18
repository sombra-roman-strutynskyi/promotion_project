import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { pick, omit, UserCredential, UserFirebase } from '@shared';
import firebase from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import { take, map, mergeMap, exhaustMap } from 'rxjs/operators';
import {
  ICredentials,
  IUser,
  IRegisterUser,
  User,
  ProviderType,
} from '../models';

@Injectable()
export class AuthService {
  constructor(
    private authFirebase: AngularFireAuth,
    private dbFirebase: AngularFireDatabase
  ) {}

  facebookLogin(): Observable<UserCredential> {
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

  googleLogin(): Observable<UserCredential> {
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
    providerType: ProviderType;
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
                providerType: userFirebase?.providerData[0]?.providerId,
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

  verifyEmailAddress(actionCode: string) {
    this.authFirebase.applyActionCode(actionCode);
  }
}
