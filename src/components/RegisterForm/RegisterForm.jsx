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

  return (
    <>
      <RegisterTitle>register</RegisterTitle>

      <RegisterForm onSubmit={handleFormSubmit} autoComplete="off">
        <RegisterList>
          {REGISTER_FORM_CONFIG.map(field => (
            <RegisterItem key={field.name}>
              <RegisterLabel>
                {field.name}
                <RegisterInput
                  type={field.type}
                  name={field.name}
                  title={field.title}
                  value={userContent[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
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
