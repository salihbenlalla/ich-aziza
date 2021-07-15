import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { userActionTypes } from '../actionTypes';
import {
  SetUserAction,
  SetErrorAction,
  SignUpData,
  SignInData,
  AuthAction,
  SetLoadingAction,
  SetNeedVerification,
} from '../../types/reduxTypes/authTypes';
import { RootState } from '../reducers';
import { auth } from '../../firebase/firebaseConfig';

const setCurrentUser = (user: firebase.User | null): SetUserAction => {
  return {
    type: userActionTypes.USER_SETUSER,
    payload: user,
  };
};

const setError = (errMsg: string): SetErrorAction => {
  return {
    type: userActionTypes.USER_SET_ERROR,
    payload: errMsg,
  };
};

const setLoading = (loading: boolean): SetLoadingAction => {
  return {
    type: userActionTypes.USER_SET_LOADING,
    payload: loading,
  };
};

const setNeedVerification = (
  needVerification: boolean
): SetNeedVerification => {
  return {
    type: userActionTypes.USER_NEED_VERIFICATION,
    payload: needVerification,
  };
};

const signUp = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      if (res.user) {
        console.log(res.user);
        dispatch(setCurrentUser(res.user));
      }
    } catch (error) {
      onError();
      console.log(error);
      dispatch(setError(error.message));
    }
  };
};

const logOut = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await auth.signOut();
      dispatch(setCurrentUser(null));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    }
  };
};

const signIn = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await auth.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      if (res.user) {
        console.log(res.user);
        dispatch(setCurrentUser(res.user));
      }
    } catch (error) {
      onError();
      console.log(error);
      dispatch(setError(error.message));
    }
  };
};

export {
  setCurrentUser,
  setError,
  setLoading,
  setNeedVerification,
  signUp,
  signIn,
  logOut,
};
