import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth';
import UserMenu from 'components/UserMenu';
import { Header, MainNav, List, Item, Link } from './Navigation.styled';

const Navigation = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <Header>
      <MainNav>
        <List>
          <Item>
            <Link to="/">home</Link>
          </Item>
          {isLoggedIn && (
            <>
              <Item>
                <Link to="/contacts">contacts</Link>
              </Item>
              <Item>
                <Link to="/create">create</Link>
              </Item>
            </>
          )}
        </List>
      </MainNav>

      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <List>
          <Item>
            <Link to="/register">register</Link>
          </Item>
          <Item>
            <Link to="/login">login</Link>
          </Item>
        </List>
      )}
    </Header>
  );
};

export default Navigation;
