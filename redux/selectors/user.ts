import { RootState } from '../reducers';

export const selectCurrentUser = (state: RootState) => {
  return state.auth?.user;
};

export const selectLoading = (state: RootState) => {
  return state.auth?.loading;
};

export const selectNeedVerification = (state: RootState) => {
  return state.auth?.needVerification;
};

export const selectError = (state: RootState) => {
  return state.auth?.error;
};
