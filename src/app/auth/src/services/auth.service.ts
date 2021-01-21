import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { pick, omit } from '@shared';
import firebase from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import { take, map, mergeMap, switchMap } from 'rxjs/operators';
import { ICredentials, IUser, IRegisterUser, User, IUpdateUser} from '../models';
import { AuthFacade } from './auth.facade';
import UserCredential = firebase.auth.UserCredential;
import UserFirebase = firebase.User;

@Injectable()
export class AuthService {
  private userFirebase: UserFirebase;
  private user$ = this.authFacade.currentUser$;
  constructor(
    private authFirebase: AngularFireAuth,
    private dbFirebase: AngularFireDatabase,
    private authFacade: AuthFacade,
    private storageFirebase: AngularFireStorage
  ) {
    this.userObservable().subscribe(
      (userFirebase) => (this.userFirebase = userFirebase)
    );
  }

  private userObservable(): Observable<UserFirebase> {
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

  getCurrentUser(): Observable<IUser | null> {
    return this.authFirebase.authState.pipe(
      take(1),
      mergeMap((userFireBase: UserFirebase) => {
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
      this.userFirebase.email,
      oldPassword
    );
    return from(
      this.userFirebase
        .reauthenticateWithCredential(credentials)
        .then(async () => {
          await this.userFirebase.updatePassword(newPassword);
          return;
        })
    );
  }

  passwordForgotten(email: string, redirectUrl: string): Observable<void> {
    return from(
      this.authFirebase.sendPasswordResetEmail(email, { url: redirectUrl })
    );
  }

  updateUser(user: IUpdateUser): Observable<IUser> {
    return this.user$.pipe(
      take(1),
      map((currentUser) => {
        const updateUser = new User({ ...currentUser, ...user });
        this.dbFirebase
          .object(`users/${currentUser.uid}`)
          .update(omit(updateUser, 'uid'));
        return updateUser;
      })
    );
  }

  uploadUserAvatar(file: File): Observable<IUser> {
    return this.user$.pipe(
      take(1),
      mergeMap((currentUser) => {
        const filePath = `userImages/${currentUser.uid}`;
        return this.getUrlToFileFromStorage$(
          this.storageFirebase.upload(filePath, file),
          filePath
        ).pipe(
          map((photoURL) => {
            const updateUser = new User({
              ...currentUser,
              photoURL: photoURL || '',
            });
            this.dbFirebase
              .object(`users/${currentUser.uid}`)
              .update(omit(updateUser, 'uid'));
            return updateUser;
          })
        );
      })
    );
  }

  private getUrlToFileFromStorage$(
    uploadTask: AngularFireUploadTask,
    path: string
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap(() => this.storageFirebase.ref(path).getDownloadURL())
    );
  }
}
