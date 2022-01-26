import { useState, useEffect } from 'react';
import { useLogInMutation } from 'redux/auth';
import LOGIN_FORM_CONFIG from '.';

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
    <form onSubmit={handleFormSubmit} action="" autoComplete="off">
      <ul>
        {LOGIN_FORM_CONFIG.map(field => (
          <li key={field.name}>
            <label>
              {field.name}
              <input
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

      <button type="submit">submit</button>
    </form>
  );
};

export default Login;
