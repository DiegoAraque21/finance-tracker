import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [ispending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      if (!isCancelled) {
        //update states
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { logout, ispending, error };
};
