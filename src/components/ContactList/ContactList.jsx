import { useGetAllContactsQuery, getFilteredContacts } from 'redux/contacts';
import ContactListItem from './ContactListItem';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { List, Item } from './ContactList.styled';

export default function ContactList() {
  const filteredContacts = useSelector(getFilteredContacts);
  const { isLoading, isSuccess } = useGetAllContactsQuery();

  return (
    <>
      {isLoading && <ThreeDots color="gray" height={80} width={80} />}

      {isSuccess && (
        <List>
          {filteredContacts.map(contact => (
            <ContactListItem key={contact.id} {...contact} />
          ))}
        </List>
      )}
    </>
  );
}
