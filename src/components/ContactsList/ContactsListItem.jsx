import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useDeleteContactMutation,
  useEditContactMutation,
} from 'redux/contacts/contact-api';
// import { Navigate, NavLink } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import {
  ContactItem,
  ContactWrapper,
  ContactName,
  ContactNumber,
  DeleteContactButton,
  EditContactButton,
  ///////////////////
  EditContactForm,
  EditContactFormList,
  EditContactFormItem,
  // EditContactFormLabel,
  EditContactFormInput,
  UpdateContactButton,
} from './ContactList.styled';
import FORM_CONFIG from '../ContactForm/contactFormConfig';

const ContactListItem = ({ id, name, number }) => {
  // const [isHovering, setIsHovering] = useState(false);
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
    console.log(contact);
    setIsUpdating(false);
  };

  useEffect(() => {
    isDeleted && toast.warn(` ${name} is deleted`);
    isDeleteError && toast.error(` ${name} can't be deleted`);
  }, [isDeleted, isDeleteError, name]);

  // const handleMouseHover = () => setIsHovering(state => !state);

  return (
    <ContactItem>
      {!isUpdating && (
        <>
          <ContactWrapper>
            <ContactName>{name}:</ContactName>
            <ContactNumber>{number}</ContactNumber>
          </ContactWrapper>
          <ContactWrapper>
            <DeleteContactButton onClick={() => deleteContact(id)}>
              delete
            </DeleteContactButton>
            <EditContactButton onClick={() => setIsUpdating(true)}>
              edit
            </EditContactButton>
          </ContactWrapper>
        </>
      )}

      {isUpdating && (
        <ContactWrapper>
          <EditContactForm onSubmit={handleFormSubmit}>
            <EditContactFormList>
              {FORM_CONFIG.map(field => (
                <EditContactFormItem key={field.name}>
                  {/* <EditContactFormLabel> */}
                  {/* {name} */}
                  <EditContactFormInput
                    // type={field.type}
                    // title={field.title}
                    name={field.name}
                    // placeholder={field.placeholder}
                    // pattern={field.pattern}
                    required={field.required}
                    value={contact[field.name]}
                    onChange={handleInputChange}
                  />
                  {/* </EditContactFormLabel> */}
                </EditContactFormItem>
              ))}
            </EditContactFormList>
            <UpdateContactButton onClick={() => setIsUpdating(false)}>
              cancel
            </UpdateContactButton>
            <UpdateContactButton>save</UpdateContactButton>
          </EditContactForm>
        </ContactWrapper>
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
