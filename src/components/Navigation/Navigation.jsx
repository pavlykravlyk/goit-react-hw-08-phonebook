import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogOutMutation, getIsLoggedIn, getUserName } from 'redux/auth';
import styles from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userName = useSelector(getUserName);
  const [logOut] = useLogOutMutation();

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink to="/" className={styles.NavLink}>
              home
            </NavLink>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/contacts" className={styles.NavLink}>
                  contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/create" className={styles.NavLink}>
                  create
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      {isLoggedIn ? (
        <>
          <p>Welcome: {userName}</p>
          <button type="button" onClick={() => logOut()}>
            logout
          </button>
        </>
      ) : (
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink to="/register" className={styles.NavLink}>
              register
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.NavLink}>
              login
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navigation;
