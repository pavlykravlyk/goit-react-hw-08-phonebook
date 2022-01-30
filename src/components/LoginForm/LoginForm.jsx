import { useState, useEffect } from 'react';
import { useLogInMutation } from 'redux/auth';
import LOGIN_FORM_CONFIG from './LoginFormConfig.json';
import {
  LoginFormTitle,
  LoginForm,
  LoginFormList,
  LoginFormItem,
  LoginFormLabel,
  LoginFormInput,
  LoginButton,
} from './LoginForm.styled';

const Login = () => {
  const initialState = { email: '', password: '' };
  const [user, setUser] = useState(initialState);
  const [logIn, { isSuccess }] = useLogInMutation();

  const handleInputChange = ({ target: { name, value } }) =>
    setUser(state => ({ ...state, [name]: value }));

  const handleFormSubmit = event => {
    event.preventDefault();
    logIn(user);
  };

  useEffect(() => {
    isSuccess && setUser(initialState);
  }, [isSuccess]);

  return (
    <>
      <LoginFormTitle>login</LoginFormTitle>

      <LoginForm onSubmit={handleFormSubmit} autoComplete="off">
        <LoginFormList>
          {LOGIN_FORM_CONFIG.map(({ name, type, title, required }) => (
            <LoginFormItem key={name}>
              <LoginFormLabel>
                {name}
                <LoginFormInput
                  type={type}
                  name={name}
                  title={title}
                  value={user[name]}
                  onChange={handleInputChange}
                  required={required}
                  autoComplete="false"
                />
              </LoginFormLabel>
            </LoginFormItem>
          ))}
        </LoginFormList>

        <LoginButton type="submit">login</LoginButton>
      </LoginForm>
    </>
  );
};

export default Login;
