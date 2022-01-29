import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  useAddContactMutation,
  useGetAllContactsQuery,
} from 'redux/contacts/contact-api';
import FORM_CONFIG from './contactFormConfig';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import {
  ContactFormTitle,
  ContactForm,
  ContactFormList,
  ContactFormItem,
  ContactFormLabel,
  ContactFormInput,
  AddContactButton,
} from './ContactForm.styled';

const Phonebook = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data: allContacts } = useGetAllContactsQuery();
  const [addContact, { isError, isLoading: isAdding, isSuccess: isAdded }] =
    useAddContactMutation();

  const contactContent = { name, number };

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
      <ContactFormTitle>create</ContactFormTitle>

      <ContactForm onSubmit={handleFormSubmit}>
        <ContactFormList>
          {FORM_CONFIG.map(
            ({
              type,
              name: fieldName,
              placeholder,
              pattern,
              title,
              required,
            }) => (
              <ContactFormItem key={fieldName}>
                <ContactFormLabel>
                  {fieldName}
                  <ContactFormInput
                    type={type}
                    title={title}
                    name={fieldName}
                    placeholder={placeholder}
                    pattern={pattern}
                    required={required}
                    value={contactContent[fieldName]}
                    onChange={handleInputChange}
                  />
                </ContactFormLabel>
              </ContactFormItem>
            ),
          )}
        </ContactFormList>

        <AddContactButton disabled={isAdding}>add contact</AddContactButton>
      </ContactForm>

      {isAdded && <Navigate to="/contacts" />}
    </>
  );
};

FORM_CONFIG.PropTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default Phonebook;
