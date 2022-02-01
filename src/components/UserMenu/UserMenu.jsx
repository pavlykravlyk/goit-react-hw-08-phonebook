import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLogOutMutation, getUserName } from 'redux/auth';
import { UserName, LogOutButton } from './UserMenu.styled';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const UserMenu = () => {
  const userName = useSelector(getUserName);
  const [logOut, { isLoading, isSuccess, isError, error }] =
    useLogOutMutation();

  useEffect(() => {
    isError && toast.error(error);
    isSuccess && toast.success('you have been successfully logged out');
  }, [error, isError, isSuccess]);

  return (
    <>
      <UserName>{userName}</UserName>
      <LogOutButton disabled={isLoading} onClick={() => logOut()}>
        {isLoading ? (
          <ThreeDots ariaLabel="three-dots-loading" height={18} color="gray" />
        ) : (
          'logout'
        )}
      </LogOutButton>
    </>
  );
};

export default UserMenu;
