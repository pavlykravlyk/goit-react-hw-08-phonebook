import { useState, useEffect } from 'react';
import { useAddUserMutation } from 'redux/auth';
import REGISTER_FORM_CONFIG from './registerFormConfig.json';
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
  const initialState = { name: '', email: '', password: '' };
  const [user, setUser] = useState(initialState);
  const [addUser, { isSuccess, isLoading }] = useAddUserMutation();

  const handleInputChange = ({ target: { name, value } }) =>
    setUser(state => ({ ...state, [name]: value }));

  const handleFormSubmit = event => {
    event.preventDefault();
    addUser(user);
  };

  useEffect(() => {
    isSuccess && setUser(initialState);
  }, [isSuccess]);

  return (
    <>
      <RegisterTitle>register</RegisterTitle>

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

        <RegisterButton type="submit" disabled={isLoading}>
          register
        </RegisterButton>
      </RegisterForm>
    </>
  );
};

export default Register;
