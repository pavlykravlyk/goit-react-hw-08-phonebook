import { useState, useEffect } from 'react';
import { useLogInMutation } from 'redux/auth';
import LOGIN_FORM_CONFIG from './LoginFormConfig.json';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
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
  const [user, setUser] = useState({ email: '', password: '' });
  const [logIn, { isLoading, isSuccess, isError }] = useLogInMutation();

  const handleInputChange = ({ target: { name, value } }) =>
    setUser(state => ({ ...state, [name]: value }));

  const handleFormSubmit = event => {
    event.preventDefault();
    logIn(user);
  };

  useEffect(() => {
    isSuccess && setUser({ email: '', password: '' });
    isError &&
      toast.error('Your login attempt was not successful. Please try again');
  }, [isError, isSuccess]);

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

        <LoginButton disabled={isLoading}>
          {isLoading ? (
            <ThreeDots
              ariaLabel="three-dots-loading"
              height={18}
              color="gray"
            />
          ) : (
            'login'
          )}
        </LoginButton>
      </LoginForm>
    </>
  );
};

export default Login;
