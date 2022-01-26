import { useState, useEffect } from 'react';
import { useAddUserMutation } from 'redux/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addUser, { isSuccess }] = useAddUserMutation();
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
    <form onSubmit={handleFormSubmit} action="" autoComplete="off">
      <ul>
        {REGISTER_FORM_CONFIG.map(field => (
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

export default Register;
