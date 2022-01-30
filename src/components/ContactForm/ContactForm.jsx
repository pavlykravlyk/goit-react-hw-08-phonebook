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
  const initialState = { name: '', number: '' };
  const [contact, setContact] = useState(initialState);
  const { data: allContacts } = useGetAllContactsQuery();
  const [addContact, { isError, isLoading: isAdding, isSuccess: isAdded }] =
    useAddContactMutation();

  const handleInputChange = ({ target: { name, value } }) =>
    setContact(state => ({ ...state, [name]: value }));

  const handleFormSubmit = event => {
    event.preventDefault();

    allContacts.some(({ name }) => name === contact.name)
      ? toast.error(`${contact.name} is already in contacts`)
      : addContact(contact);
  };

  useEffect(() => {
    isAdded && toast.success(`${contact.name} has successfully added`);
    setContact(initialState);
  }, [isAdded]);

  useEffect(() => {
    isError && toast.error(`${contact.name} can't be added`);
  }, [isError]);

  return (
    <>
      <ContactFormTitle>create</ContactFormTitle>

      <ContactForm onSubmit={handleFormSubmit}>
        <ContactFormList>
          {FORM_CONFIG.map(
            ({ type, name, placeholder, pattern, title, required }) => (
              <ContactFormItem key={name}>
                <ContactFormLabel>
                  {name}
                  <ContactFormInput
                    type={type}
                    title={title}
                    name={name}
                    placeholder={placeholder}
                    pattern={pattern}
                    required={required}
                    value={contact[name]}
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
