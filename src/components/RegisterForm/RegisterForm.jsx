import { useState, useEffect } from 'react';
import { useAddUserMutation } from 'redux/auth';
import styles from '../ContactForm/ContactForm.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addUser, { isSuccess, isLoading }] = useAddUserMutation();
  const userContent = { name, email, password };

  const handleInputChange = ({ target: { name, value } }) => {
    name === 'name' && setName(value);
    name === 'email' && setEmail(value);
    name === 'password' && setPassword(value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    addUser(userContent);
  };

  useEffect(() => {
    if (isSuccess) {
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [isSuccess]);

  const REGISTER_FORM_CONFIG = [
    {
      type: 'text',
      name: 'name',
      title: 'NAME',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      title: 'EMAIL',
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      title: 'PASSWORD',
      required: true,
    },
  ];

  return (
    <>
      <h1 className={styles.Title}>register</h1>

      <form
        onSubmit={handleFormSubmit}
        className={styles.Form}
        action=""
        autoComplete="off"
      >
        <ul className={styles.List}>
          {REGISTER_FORM_CONFIG.map(field => (
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

        <button type="submit" className={styles.Btn} disabled={isLoading}>
          register
        </button>
      </form>
    </>
  );
};

export default Register;
