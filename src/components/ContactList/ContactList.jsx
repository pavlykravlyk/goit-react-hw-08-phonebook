import { useSelector } from 'react-redux';
import { useGetAllContactsQuery, getFilteredContacts } from 'redux/contacts';
import ContactListItem from './ContactListItem';
import { ThreeDots } from 'react-loader-spinner';
import styles from './ContactsList.module.css';

export default function ContactList() {
  const filteredContacts = useSelector(getFilteredContacts);

  const { isLoading, isSuccess, isError } = useGetAllContactsQuery();

  return (
    <>
      {isLoading && <ThreeDots color="gray" height={80} width={80} />}

      {isSuccess && (
        <ul className={styles.List}>
          {filteredContacts.map(contact => (
            <ContactListItem key={contact.id} {...contact} />
          ))}
        </ul>
      )}

      {isError && console.log('ERROR')}
    </>
  );
}
