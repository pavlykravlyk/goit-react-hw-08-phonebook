import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  useAddContactMutation,
  useGetAllContactsQuery,
} from 'redux/contacts/slice';
import FORM_CONFIG from 'formConfig';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import styles from './ContactForm.module.css';

export default function Phonebook() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = ({ target: { name, value } }) => {
    name === 'name' && setName(value);
    name === 'number' && setNumber(value);
  };

  const { data } = useGetAllContactsQuery();
  const [addContact, { isError, isLoading: isAdding, isSuccess: isAdded }] =
    useAddContactMutation();

  const handleFormSubmit = event => {
    event.preventDefault();

    if (data.some(contact => contact.name === name)) {
      toast.error(`${name} is already in contacts`);
    } else {
      addContact({ name, number });
      toast.success(`${name} has successfully added`);
    }

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.Form}>
      <ul className={styles.List}>
        {FORM_CONFIG.map(field => (
          <li key={field.name} className={styles.Item}>
            <label className={styles.Label}>
              {field.name}
              <input
                className={styles.Input}
                type={field.type}
                name={field.name}
                pattern={field.pattern}
                title={field.title}
                value={{ name, number }[field.name]}
                onChange={handleInputChange}
                required={field.required}
              />
            </label>
          </li>
        ))}
      </ul>

      <button type="submit" className={styles.Btn}>
        {isAdding ? (
          <ThreeDots color="white" height={20} width={90} />
        ) : (
          'add contact'
        )}
      </button>
    </form>
  );
}

FORM_CONFIG.PropTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
