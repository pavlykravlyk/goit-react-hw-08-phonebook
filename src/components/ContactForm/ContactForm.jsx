import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  useAddContactMutation,
  useGetAllContactsQuery,
} from 'redux/contacts/contactApi';
import FORM_CONFIG from 'formConfig';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import styles from './ContactForm.module.css';

export default function Phonebook() {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleInputChange = ({ target: { name, value } }) => {
    name === 'name' && setNewName(value);
    name === 'number' && setNewNumber(value);
    name === 'email' && setNewEmail(value);
  };

  const { data: allContacts } = useGetAllContactsQuery();
  const [addContact, { isError, isLoading: isAdding, isSuccess: isAdded }] =
    useAddContactMutation();

  const contactContent = {
    name: newName,
    number: newNumber,
    email: newEmail,
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    allContacts.some(({ name }) => name === newName)
      ? toast.error(`${newName} is already in contacts`)
      : addContact(contactContent);
  };

  useEffect(() => {
    isAdded && toast.success(`${newName} has successfully added`);
    setNewName('');
    setNewNumber('');
    setNewEmail('');
  }, [isAdded]);

  useEffect(() => {
    isError && toast.error(`${newName} can't be added`);
  }, [isError]);

  return (
    <form onSubmit={handleFormSubmit} className={styles.Form}>
      <ul className={styles.List}>
        {FORM_CONFIG.map(({ name, type, pattern, title, required }) => (
          <li key={name} className={styles.Item}>
            <label className={styles.Label}>
              {name}
              <input
                className={styles.Input}
                type={type}
                name={name}
                pattern={pattern}
                title={title}
                value={contactContent[name]}
                onChange={handleInputChange}
                required={required}
              />
            </label>
          </li>
        ))}
      </ul>

      <button type="submit" className={styles.Btn} disabled={isAdding}>
        {isAdding ? (
          <ThreeDots color="gray" height={20} width={90} />
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
