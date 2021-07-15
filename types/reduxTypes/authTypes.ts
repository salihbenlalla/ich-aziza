import firebase from 'firebase';
import { userActionTypes } from '../../redux/actionTypes';

export interface AuthState {
  user: firebase.User | null;
  loading: boolean;
  error: string;
  needVerification: boolean;
  sendPasswordResetEmailSuccess: string;
}

//data
export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Actions
export interface SetUserAction {
  type: userActionTypes.USER_SETUSER;
  payload: firebase.User | null;
}

export interface SetErrorAction {
  type: userActionTypes.USER_SET_ERROR;
  payload: string;
}

export interface SetLoadingAction {
  type: userActionTypes.USER_SET_LOADING;
  payload: boolean;
}

export interface SetNeedVerification {
  type: userActionTypes.USER_NEED_VERIFICATION;
  payload: boolean;
}

export type AuthAction =
  | SetUserAction
  | SetErrorAction
  | SetLoadingAction
  | SetNeedVerification;
