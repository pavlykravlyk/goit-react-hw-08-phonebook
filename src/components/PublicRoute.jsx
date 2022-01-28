import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth';

const PublicRoute = ({ children, restricted = false }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return isLoggedIn && restricted ? <Navigate to="/" /> : children;
};

export default PublicRoute;
