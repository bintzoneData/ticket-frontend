import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useAuthState = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [chekingStatus, setChekingStatus] = useState(true);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setChekingStatus(false);
  }, [user]);
  return { loggedIn, chekingStatus };
};
