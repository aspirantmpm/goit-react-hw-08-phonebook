import { Find, FindInput, Label } from './GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from '../redux/selectors';
import { setFilter } from '../redux/filterSlice';

export const ContactFind = () => {
  const dispatch = useDispatch();

  const onFilter = useSelector(getFilter);

  const onChange = e => {
    dispatch(setFilter(e.currentTarget.value));
  };
  return (
    <Find>
      <Label htmlFor="filter">Find contacts by name</Label>
      <div>
        <FindInput
          type="text"
          name="filter"
          value={onFilter}
          onChange={onChange}
        />
      </div>
    </Find>
  );
};
