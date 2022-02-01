import { useState, useEffect } from 'react';
import { useAddUserMutation } from 'redux/auth';
import REGISTER_FORM_CONFIG from './registerFormConfig.json';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import {
  RegisterTitle,
  RegisterForm,
  RegisterList,
  RegisterItem,
  RegisterLabel,
  RegisterInput,
  RegisterButton,
} from './RegisterForm.styled';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [addUser, { isLoading, isSuccess, isError }] = useAddUserMutation();

  const handleInputChange = ({ target: { name, value } }) =>
    setUser(state => ({ ...state, [name]: value }));

  const handleFormSubmit = event => {
    event.preventDefault();
    addUser(user);
  };

  useEffect(() => {
    isSuccess && setUser({ name: '', email: '', password: '' });
    isError &&
      toast.error(
        'Sorry you must enter a valid name, email and password to sign up',
      );
  }, [isError, isSuccess]);

  return (
    <>
      <RegisterTitle>sign up</RegisterTitle>

      <RegisterForm onSubmit={handleFormSubmit} autoComplete="off">
        <RegisterList>
          {REGISTER_FORM_CONFIG.map(({ name, type, title, required }) => (
            <RegisterItem key={name}>
              <RegisterLabel>
                {name}
                <RegisterInput
                  type={type}
                  name={name}
                  title={title}
                  value={user[name]}
                  onChange={handleInputChange}
                  required={required}
                  autoComplete="false"
                />
              </RegisterLabel>
            </RegisterItem>
          ))}
        </RegisterList>

        <RegisterButton disabled={isLoading}>
          {isLoading ? (
            <ThreeDots
              ariaLabel="three-dots-loading"
              height={18}
              color="gray"
            />
          ) : (
            'sign up'
          )}
        </RegisterButton>
      </RegisterForm>
    </>
  );
};

export default Register;
