import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthFacade, IUser, User } from '@auth';
import { omit, getUrlToFileFromFirebaseStorage$, UserFirebase } from '@shared';
import firebase from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { IUpdateProfile } from '../models';

@Injectable()
export class ProfileDbService {
  private userFirebase: UserFirebase;
  private user$ = this.authFacade.currentUser$;
  constructor(
    private authFacade: AuthFacade,
    private dbFirebase: AngularFireDatabase,
    private storageFirebase: AngularFireStorage,
    private authFirebase: AngularFireAuth
  ) {
    this.authFirebase.user
      .pipe(take(1))
      .subscribe((userFirebase) => (this.userFirebase = userFirebase));
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

  updateProfile(profile: IUpdateProfile): Observable<void> {
    return this.user$.pipe(
      take(1),
      mergeMap((currentUser: IUser) => {
        const updateUser = new User({ ...currentUser, ...profile });
        return this.getPhotoUrl(updateUser).pipe(
          mergeMap((photoURL: string) => {
            return from(
              this.dbFirebase
                .object(`users/${updateUser.uid}`)
                .update(omit({ ...updateUser, photoURL }, 'uid', 'photo'))
            );
          })
        );
      })
    );
  }

  private uploadProfilePicture(id: string, file: File): Observable<string> {
    const filePath = `articlesImage/${id}`;
    return getUrlToFileFromFirebaseStorage$(
      this.storageFirebase.upload(filePath, file),
      filePath,
      this.storageFirebase
    ).pipe(take(1));
  }

  private getPhotoUrl(user: IUser): Observable<string> {
    return user.photo
      ? this.uploadProfilePicture(user.uid, user.photo[0])
      : of(user?.photoURL || '');
  }
}
