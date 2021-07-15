import { auth } from './firebaseConfig';

import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCurrentUser,
  setLoading,
  setNeedVerification,
  selectLoading,
  selectCurrentUser,
} from '../redux';

interface IProps {
  children: ReactNode;
}

const FirebaseAuthProvider = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setLoading(true));
        dispatch(setCurrentUser(user));
        if (!user.emailVerified) {
          dispatch(setNeedVerification(true));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, currentUser]);

  if (loading) return <h1>Loading .... </h1>;

  return <>{children}</>;
};

export default FirebaseAuthProvider;
