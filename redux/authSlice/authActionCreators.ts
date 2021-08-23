import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { authActionTypes } from './authActionTypes';
import {
    SetUserAction,
    SetErrorAction,
    SignUpData,
    SignInData,
    AuthAction,
    SetLoadingAction,
    SetNeedVerification,
} from './authTypes';
import { RootState } from '../combineReducers';
import { auth, db } from '../../firebase/firebaseConfig';

//functions to handle cookies:

function setCookie(name: string, value: string, days: number) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
function getCookie(name: string) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name: string) {
    document.cookie =
        name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//the end of functions handling cookies

const setCurrentUser = (user: firebase.User | null): SetUserAction => {
    return {
        type: authActionTypes.USER_SETUSER,
        payload: user,
    };
};

const setError = (errMsg: string): SetErrorAction => {
    return {
        type: authActionTypes.USER_SET_ERROR,
        payload: errMsg,
    };
};

const setLoading = (loading: boolean): SetLoadingAction => {
    return {
        type: authActionTypes.USER_SET_LOADING,
        payload: loading,
    };
};

const setNeedVerification = (
    needVerification: boolean
): SetNeedVerification => {
    return {
        type: authActionTypes.USER_NEED_VERIFICATION,
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
                try {
                    await auth.currentUser?.updateProfile({
                        displayName: `${data.first_name} ${data.last_name}`,
                    });

                    await db.collection('users').doc(res.user.uid).set({
                        first_name: data.first_name,
                        last_name: data.last_name,
                    });
                    const idToken = await res.user.getIdToken();
                    setCookie('firebaseToken', idToken, 2);
                    dispatch(setCurrentUser(res.user));
                } catch (error) {
                    onError();
                    console.log(error);
                    dispatch(setError(error.message));
                }
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
            eraseCookie('firebaseToken');
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
                const idToken = await res.user.getIdToken();
                setCookie('firebaseToken', idToken, 2);
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
