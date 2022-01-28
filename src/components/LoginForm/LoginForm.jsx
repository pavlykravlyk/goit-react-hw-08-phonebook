import { useState, useEffect } from 'react';
import { useLogInMutation } from 'redux/auth';
import LOGIN_FORM_CONFIG from './LoginFormConfig.json';
import styles from '../ContactForm/ContactForm.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [logIn, { isSuccess }] = useLogInMutation();
  const userContent = { email, password };

  const handleInputChange = ({ target: { name, value } }) => {
    name === 'email' && setEmail(value);
    name === 'password' && setPassword(value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    logIn(userContent);
  };

  useEffect(() => {
    if (isSuccess) {
      setEmail('');
      setPassword('');
    }
  }, [isSuccess]);

  return (
    <>
      <h1 className={styles.Title}>login</h1>

      <form
        onSubmit={handleFormSubmit}
        className={styles.Form}
        action=""
        autoComplete="off"
      >
        <ul className={styles.List}>
          {LOGIN_FORM_CONFIG.map(field => (
            <li key={field.name} className={styles.Item}>
              <label className={styles.Label}>
                {field.name}
                <input
                  className={styles.Input}
                  type={field.type}
                  name={field.name}
                  title={field.title}
                  value={userContent[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                  autoComplete="false"
                />
              </label>
            </li>
          ))}
        </ul>

        <button type="submit" className={styles.Btn}>
          login
        </button>
      </form>
    </>
  );
};

export default Login;
