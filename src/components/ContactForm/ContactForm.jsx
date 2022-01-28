import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  useAddContactMutation,
  useGetAllContactsQuery,
} from 'redux/contacts/contact-api';
import FORM_CONFIG from './contactFormConfig';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import styles from './ContactForm.module.css';
import ButtonWithLoader from 'components/ButtonWithLoader';

export default function Phonebook() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contactContent = { name, number };
  const { data: allContacts } = useGetAllContactsQuery();
  const [addContact, { isError, isLoading: isAdding, isSuccess: isAdded }] =
    useAddContactMutation();

  const handleInputChange = ({ target: { name, value } }) => {
    name === 'name' && setName(value);
    name === 'number' && setNumber(value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    allContacts.some(contact => contact.name === name)
      ? toast.error(`${name} is already in contacts`)
      : addContact(contactContent);
  };

  useEffect(() => {
    isAdded && toast.success(`${name} has successfully added`);
    setName('');
    setNumber('');
  }, [isAdded]);

  useEffect(() => {
    isError && toast.error(`${name} can't be added`);
  }, [isError]);

  return (
    <>
      <h1 className={styles.Title}>create</h1>

      <form onSubmit={handleFormSubmit} className={styles.Form}>
        <ul className={styles.List}>
          {FORM_CONFIG.map(
            ({ name: fieldName, type, pattern, title, required }) => (
              <li key={fieldName} className={styles.Item}>
                <label className={styles.Label}>
                  {fieldName}
                  <input
                    className={styles.Input}
                    type={type}
                    name={fieldName}
                    pattern={pattern}
                    title={title}
                    value={contactContent[fieldName]}
                    onChange={handleInputChange}
                    required={required}
                  />
                </label>
              </li>
            ),
          )}
        </ul>

        <ButtonWithLoader
          text="add contact"
          loader={isAdding}
          disabled={isAdding}
        ></ButtonWithLoader>
      </form>

      {isAdded && <Navigate to="/contacts" />}
    </>
  );
}

FORM_CONFIG.PropTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};
