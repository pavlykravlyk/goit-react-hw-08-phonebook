import { useSelector, useDispatch } from 'react-redux';
import { changeFilter, getFilterValue } from 'redux/contacts';
import styles from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  return (
    <label className={styles.Label} htmlFor="">
      Find contacts by name
      <input
        className={styles.Input}
        type="text"
        value={filterValue}
        onChange={({ target: { value } }) => dispatch(changeFilter(value))}
      />
    </label>
  );
};

export default Filter;
