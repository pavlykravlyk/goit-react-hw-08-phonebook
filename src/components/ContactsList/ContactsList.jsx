import { useGetAllContactsQuery, getFilteredContacts } from 'redux/contacts';
import ContactListItem from './ContactsListItem';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { ContactList, ContactMessage } from './ContactList.styled';
import { NavLink } from 'react-router-dom';

const ContactsList = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const { data: allContacts, isLoading, isSuccess } = useGetAllContactsQuery();

  return (
    <>
      {isLoading && <ThreeDots color="gray" height={80} width={80} />}

      {isSuccess && allContacts.length > 0 ? (
        <ContactList>
          {filteredContacts.map(contact => (
            <ContactListItem key={contact.id} {...contact} />
          ))}
        </ContactList>
      ) : (
        <>
          <ContactMessage>You haven't any contacts.</ContactMessage>
          <NavLink to="/create">add contact</NavLink>
        </>
      )}
    </>
  );
};

export default ContactsList;
