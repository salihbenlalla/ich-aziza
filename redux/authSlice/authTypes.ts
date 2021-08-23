import firebase from 'firebase';
import { authActionTypes } from './authActionTypes';

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
    first_name: string;
    last_name: string;
}

export interface SignInData {
    email: string;
    password: string;
}

// Actions
export interface SetUserAction {
    type: authActionTypes.USER_SETUSER;
    payload: firebase.User | null;
}

export interface SetErrorAction {
    type: authActionTypes.USER_SET_ERROR;
    payload: string;
}

export interface SetLoadingAction {
    type: authActionTypes.USER_SET_LOADING;
    payload: boolean;
}

export interface SetNeedVerification {
    type: authActionTypes.USER_NEED_VERIFICATION;
    payload: boolean;
}

export type AuthAction =
    | SetUserAction
    | SetErrorAction
    | SetLoadingAction
    | SetNeedVerification;
