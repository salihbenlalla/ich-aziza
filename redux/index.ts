export { store } from './store';
export {
    setCurrentUser,
    setError,
    setLoading,
    signUp,
    signIn,
    logOut,
    setNeedVerification,
} from './authSlice';
export {
    selectCurrentUser,
    selectLoading,
    selectNeedVerification,
    selectError,
} from './authSlice';

export { setAddPost } from './eventsSlice';
export { selectAddPostEvent } from './eventsSlice';
