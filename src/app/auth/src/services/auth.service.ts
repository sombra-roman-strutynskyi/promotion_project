import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { pick, omit } from '@shared';
import firebase from 'firebase/app';
import { Observable, zip, of, from } from 'rxjs';
import { take, switchMap, map } from 'rxjs/operators';
import { Credentials, IUser, RegisterUser, User } from '../models';
import { AuthActions } from '../state';
import UserCredential = firebase.auth.UserCredential;
import UserFireBase = firebase.User;

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

  loginWithCredentials(credentials: Credentials): Observable<UserCredential> {
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

  getCurrentUser(): Observable<IUser | null> {
    return from(this.authFirebase.currentUser).pipe(
      take(1),
      map((userFireBase: UserFireBase) => {
        if (userFireBase) {
          this.dbFirebase
            .object(`users/${userFireBase.uid}`)
            .valueChanges()
            .pipe(take(1))
            .subscribe((user: IUser) => {
              const currentUser = new User({
                ...pick(
                  userFireBase,
                  'uid',
                  'displayNam',
                  'firstNam',
                  'lastNam',
                  'email',
                  'photoURL'
                ),
                ...user,
              });
              return currentUser;
            });
        }
        return null;
      })
    );
  }

  register(registerUser: RegisterUser): Observable<UserCredential> {
    return from(
      this.authFirebase
        .createUserWithEmailAndPassword(
          registerUser.email,
          registerUser.password
        )
        .then((userCredential: UserCredential) => {
          const { user } = userCredential;
          if (user) {
            this.dbFirebase
              .object(`users/${user.uid}`)
              .set(omit(registerUser, 'password'));

            user.updateProfile({
              displayName: `${registerUser.firstName} ${registerUser.lastName}`,
            });
          }
          return userCredential;
        })
    );
  }
}
