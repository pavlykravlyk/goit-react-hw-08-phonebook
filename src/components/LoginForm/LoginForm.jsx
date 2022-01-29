import { useState, useEffect } from 'react';
import { useLogInMutation } from 'redux/auth';
import LOGIN_FORM_CONFIG from './LoginFormConfig.json';
import {
  Title,
  Form,
  List,
  Item,
  Label,
  Input,
  LoginButton,
} from './LoginForm.styled';

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
      <Title>login</Title>

      <Form onSubmit={handleFormSubmit} autoComplete="off">
        <List>
          {LOGIN_FORM_CONFIG.map(field => (
            <Item key={field.name}>
              <Label>
                {field.name}
                <Input
                  type={field.type}
                  name={field.name}
                  title={field.title}
                  value={userContent[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                  autoComplete="false"
                />
              </Label>
            </Item>
          ))}
        </List>

        <LoginButton type="submit">login</LoginButton>
      </Form>
    </>
  );
};

export default Login;
