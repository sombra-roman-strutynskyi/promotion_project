import firebase from 'firebase/app';

export interface IFirebaseError {
  code: string;
  message: string;
  type: string;
}

export type UserFirebase = firebase.User;
export type UserCredential = firebase.auth.UserCredential;
