import { useGetAllContactsQuery, getFilteredContacts } from 'redux/contacts';
import ContactListItem from './ContactListItem';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { List, Message } from './ContactList.styled';
import { NavLink } from 'react-router-dom';

export default function ContactList() {
  const filteredContacts = useSelector(getFilteredContacts);
  const { data: allContacts, isLoading, isSuccess } = useGetAllContactsQuery();

  return (
    <>
      {isLoading && <ThreeDots color="gray" height={80} width={80} />}

      {isSuccess && allContacts.length > 0 ? (
        <List>
          {filteredContacts.map(contact => (
            <ContactListItem key={contact.id} {...contact} />
          ))}
        </List>
      ) : (
        <>
          <Message>You haven't any contacts.</Message>
          <NavLink to="/create">add contact</NavLink>
        </>
      )}
    </>
  );
}
