import firebase from 'firebase';
import { ReactNode } from 'react';

export interface FirebaseContextValue {
  currentUser: firebase.User | null | undefined;
  loading: boolean;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
}

export interface FirebaseAuthProviderProps {
  children: ReactNode;
}
