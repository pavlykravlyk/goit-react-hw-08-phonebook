import { useSelector, useDispatch } from 'react-redux';
import { changeFilter, getFilterValue } from 'redux/contacts';
import { useGetAllContactsQuery } from 'redux/contacts';
import { Label, Input } from './Filter.styled';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  const { data: allContacts, isSuccess } = useGetAllContactsQuery();

  return (
    isSuccess &&
    allContacts.length > 0 && (
      <Label htmlFor="">
        <Input
          placeholder="find contacts"
          type="text"
          value={filterValue}
          onChange={({ target: { value } }) => dispatch(changeFilter(value))}
        />
      </Label>
    )
  );
};

export default Filter;
