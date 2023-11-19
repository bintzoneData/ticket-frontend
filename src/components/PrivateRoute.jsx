import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../assets/LoginSpinner';
import { useAuthState } from '../hooks/useAuthState';
const PrivateRoute = () => {
  const { loggedIn, chekingStatus } = useAuthState();
  if (chekingStatus) {
    return <></>;
  }
  return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};
export default PrivateRoute;
