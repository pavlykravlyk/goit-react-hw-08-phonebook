import { useGetAllContactsQuery, getFilteredContacts } from 'redux/contacts';
import ContactListItem from './ContactListItem';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter, getFilterValue } from 'redux/contacts';
import styles from './ContactsList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  const filteredContacts = useSelector(getFilteredContacts);
  const { isLoading, isSuccess, isError } = useGetAllContactsQuery();

  return (
    <>
      {isLoading && <ThreeDots color="gray" height={80} width={80} />}

      {isSuccess && (
        <>
          <label className={styles.Label} htmlFor="">
            Find contacts by name
            <input
              className={styles.Input}
              type="text"
              value={filterValue}
              onChange={({ target: { value } }) =>
                dispatch(changeFilter(value))
              }
            />
          </label>
          <ul className={styles.List}>
            {filteredContacts.map(contact => (
              <ContactListItem key={contact.id} {...contact} />
            ))}
          </ul>
        </>
      )}

      {isError && console.log('ERROR')}
    </>
  );
}
