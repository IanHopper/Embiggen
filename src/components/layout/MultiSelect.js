import React, { useContext } from 'react';
import Select from 'react-select';
import TodoContext from '../../context/todos/todoContext';

const taskOptions = [
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'today', label: 'Due Today' },
  { value: 'overdue', label: 'Overdue' },
  { value: '1', label: 'Vital' },
  { value: '2', label: 'Important' },
  { value: '3', label: 'Urgent' },
  { value: '4', label: 'Trivial' },
  { value: '$', label: 'Purchase Of Columbia' },
  { value: 'short', label: '< 15 mins' },
  { value: 'long', label: '> 60 mins' },
];

const MultiSelect = () => {
  const todoContext = useContext(TodoContext);
  const {
    handleSort,
    handleFilter,
    displayModal,
    handleUndo,
    loadUser,
    logout,
    auth,
  } = todoContext;
  return (
    <Select
      isMulti
      name='colors'
      options={taskOptions}
      // onChange={handleFilter}
      // id='filter'
      onChange={(e)=>console.log(e)}
      // className="basic-multi-select"
      // classNamePrefix="select"
    />
  );
};

export default MultiSelect;
