import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useDeleteContactMutation,
  // useEditContactMutation,
} from 'redux/contacts/contact-api';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import {
  Item,
  Name,
  Number,
  DeleteContactButton,
  // EditContactButton,
} from './ContactList.styled';

const ContactListItem = ({ id, name, number }) => {
  const [isHovering, setIsHovering] = useState(false);

  const [
    deleteContact,
    { isError: isDeleteError, isLoading: isDeleting, isSuccess: isDeleted },
  ] = useDeleteContactMutation();

  // const [
  //   editContact,
  //   { isError: isEditError, isLoading: isEditing, isSuccess: isEdited },
  // ] = useEditContactMutation();

  useEffect(() => {
    isDeleted && toast.warn(` ${name} is deleted`);
    isDeleteError && toast.error(` ${name} can't be deleted`);
  }, [isDeleted, isDeleteError]);

  const handleMouseHover = () => setIsHovering(state => !state);

  return (
    <Item onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
      <Name>{name}:</Name>
      <Number>{number}</Number>

      {isHovering && (
        <>
          <DeleteContactButton onClick={() => deleteContact(id)}>
            {isDeleting ? (
              <ThreeDots color="gray" height={20} width={70} />
            ) : (
              'delete'
            )}
          </DeleteContactButton>

          {/* <EditContactButton onClick={() => editContact(id)}>
            {isEditing ? (
              <ThreeDots color="gray" height={20} width={70} />
            ) : (
              'edit'
            )}
          </EditContactButton> */}
        </>
      )}
    </Item>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
