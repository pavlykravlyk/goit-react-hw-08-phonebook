import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contacts/contactApi';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import styles from './ContactsList.module.css';

const ContactListItem = ({ id, name, number, email }) => {
  const [
    deleteContact,
    { isError, isLoading: isDeleting, isSuccess: isDeleted },
  ] = useDeleteContactMutation();

  useEffect(() => {
    isDeleted && toast.warn(` ${name} is deleted`);
    isError && toast.error(` ${name} can't be deleted`);
  }, [isDeleted, isError]);

  return (
    <li className={styles.Item}>
      <p className={styles.Name}>{name}:</p>
      <p className={styles.Number}>{number}</p>
      <p className={styles.Number}>{email}</p>

      <button className={styles.Btn} onClick={() => deleteContact(id)}>
        {isDeleting ? (
          <ThreeDots color="gray" height={20} width={70} />
        ) : (
          'Delete'
        )}
      </button>
    </li>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
