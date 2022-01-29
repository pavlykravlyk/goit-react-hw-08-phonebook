import { useSelector } from 'react-redux';
import { useLogOutMutation, getUserName } from 'redux/auth';
import { UserName, LogOutButton } from './UserMenu.styled';

const UserMenu = () => {
  const userName = useSelector(getUserName);
  const [logOut] = useLogOutMutation();

  return (
    <>
      <UserName>{userName}</UserName>
      <LogOutButton type="button" onClick={() => logOut()}>
        logout
      </LogOutButton>
    </>
  );
};

export default UserMenu;
