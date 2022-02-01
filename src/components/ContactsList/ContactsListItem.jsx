import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useDeleteContactMutation,
  useEditContactMutation,
} from 'redux/contacts/contact-api';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import {
  ContactItem,
  ContactWrapper,
  ContactName,
  ContactNumber,
  DeleteContactButton,
  EditContactButton,
  EditContactForm,
  EditContactFormList,
  EditContactFormItem,
  EditContactFormInput,
  UpdateContactButton,
} from './ContactList.styled';
import FORM_CONFIG from '../ContactForm/contactFormConfig';

const ContactListItem = ({ id, name, number }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [contact, setContact] = useState({ id, name, number });

  const [
    deleteContact,
    { isError: isDeleteError, isLoading: isDeleting, isSuccess: isDeleted },
  ] = useDeleteContactMutation();

  const [
    editContact,
    { isError: isEditError, isLoading: isEditing, isSuccess: isEdited },
  ] = useEditContactMutation();

  const handleInputChange = ({ target: { name, value } }) => {
    setContact(state => ({
      ...state,
      [name]: value,
    }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    editContact(contact);
    setIsUpdating(false);
  };

  useEffect(() => {
    isDeleted && toast.warn(` ${name} is deleted`);
    isDeleteError && toast.error(` ${name} can't be deleted`);
    isEdited && toast.success(` ${name} was successfully updated`);
    isEditError && toast.error(` ${name} can't be edited`);
  }, [name, isDeleted, isDeleteError, isEdited, isEditError]);

  return (
    <ContactItem>
      {isUpdating ? (
        <EditContactForm onSubmit={handleFormSubmit}>
          <EditContactFormList>
            {FORM_CONFIG.map(field => (
              <EditContactFormItem key={field.name}>
                <EditContactFormInput
                  type={field.type}
                  title={field.title}
                  name={field.name}
                  placeholder={field.placeholder}
                  pattern={field.pattern}
                  required={field.required}
                  value={contact[field.name]}
                  onChange={handleInputChange}
                />
              </EditContactFormItem>
            ))}
          </EditContactFormList>
          <ContactWrapper>
            <UpdateContactButton
              type="button"
              disabled={isEditing}
              onClick={() => setIsUpdating(false)}
            >
              cancel
            </UpdateContactButton>
            <UpdateContactButton disabled={isEditing}>save</UpdateContactButton>
          </ContactWrapper>
        </EditContactForm>
      ) : (
        <>
          <ContactWrapper>
            <ContactName>{name}</ContactName>
            <ContactNumber>{number}</ContactNumber>
          </ContactWrapper>
          <ContactWrapper>
            <EditContactButton
              type="button"
              disabled={isDeleting}
              onClick={() => setIsUpdating(true)}
            >
              edit
            </EditContactButton>
            <DeleteContactButton
              disabled={isDeleting}
              onClick={() => deleteContact(id)}
            >
              {isDeleting ? (
                <ThreeDots
                  ariaLabel="three-dots-loading"
                  height={20}
                  width={70}
                  color="gray"
                />
              ) : (
                'delete'
              )}
            </DeleteContactButton>
          </ContactWrapper>
        </>
      )}
    </ContactItem>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
