import firebase from 'firebase/app';

export interface IFirebaseError {
  code: string;
  message: string;
  type: string;
  email?: string;
  credential?: AuthCredential;
}

export type UserFirebase = firebase.User;
export type UserCredential = firebase.auth.UserCredential;
export type AuthCredential = firebase.auth.AuthCredential;
export type AuthProvider = firebase.auth.AuthProvider;
