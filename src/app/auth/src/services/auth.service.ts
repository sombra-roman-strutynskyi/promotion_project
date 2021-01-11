import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { pick, omit } from '@shared';
import firebase from 'firebase/app';
import { Observable, zip, of, from } from 'rxjs';
import { take, switchMap, map, mergeMap } from 'rxjs/operators';
import { Credentials, IUser, RegisterUser, User } from '../models';
import { AuthActions } from '../state';
import UserCredential = firebase.auth.UserCredential;
import UserFireBase = firebase.User;

@Injectable()
export class AuthService {
  private user: UserFireBase;

  constructor(
    private authFirebase: AngularFireAuth,
    private dbFirebase: AngularFireDatabase
  ) {
    this.userObservable().subscribe((user) => (this.user = user));
  }

  private userObservable(): Observable<UserFireBase> {
    return this.authFirebase.user.pipe(
      take(1),
      map((user) => user)
    );
  }

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
    return this.authFirebase.authState.pipe(
      take(1),
      mergeMap((userFireBase: UserFireBase) => {
        if (userFireBase) {
          return this.dbFirebase
            .object(`users/${userFireBase.uid}`)
            .valueChanges()
            .pipe(
              take(1),
              map(
                (user: IUser) =>
                  new User({
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
                  })
              )
            );
        }
        return of(null);
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
          }
          return userCredential;
        })
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    const credentials = firebase.auth.EmailAuthProvider.credential(
      this.user.email,
      oldPassword
    );
    return from(
      this.user.reauthenticateWithCredential(credentials).then(async () => {
        await this.user.updatePassword(newPassword);
        return;
      })
    );
  }

  passwordForgotten(email: string, redirectUrl: string): Observable<void> {
    return from(
      this.authFirebase.sendPasswordResetEmail(email, { url: redirectUrl })
    );
  }
}
