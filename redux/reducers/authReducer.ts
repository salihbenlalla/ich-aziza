import { AuthState, AuthAction } from '../../types/reduxTypes/authTypes';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: '',
  needVerification: false,
  sendPasswordResetEmailSuccess: '',
};

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case 'user/setUser':
      return {
        ...state,
        user: action.payload,
      };
    case 'user/setError':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
