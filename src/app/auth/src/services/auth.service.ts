import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable, zip, of, from } from 'rxjs';
import { take, switchMap, map } from 'rxjs/operators';
import { Credentials, IUser, User } from '../models';
import { AuthActions } from '../state';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthService {
  constructor(private authFirebase: AngularFireAuth) {}

  facebookLogin(): Observable<UserCredential> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return from(this.authFirebase.signInWithPopup(provider));
  }

  googleLogin(): Observable<UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    return from(this.authFirebase.signInWithPopup(provider));
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
      map((authData) => {
        if (authData) {
          const user = new User(
            authData.uid,
            authData.displayName,
            authData.email,
            authData.phoneNumber
          );
          return user;
        }
        return null;
      })
    );
  }
}
