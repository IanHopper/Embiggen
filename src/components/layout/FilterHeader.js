import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const FilterHeader = ({ title, icon }) => {
  const todoContext = useContext(TodoContext);
  const { handleSort, handleFilter } = todoContext;

  return (
    <div className='task-list-header'>
      <div className="task-filter">
        <label htmlFor='sort-select'>Sort</label>
        <select className='select-menu' onChange={handleSort} id='sort-select'>
          <option value='date-ascending'>Date &#8595;</option>
          <option value='date-descending'>Date &#8593;</option>
          <option value='priority'>Priority &#8595;</option>
          <option value='duration-ascending'>Time &#8595;</option>
          <option value='duration-descending'>Time &#8593;</option>
          <option value='cost'>Cost &#8595;</option>
        </select>
      </div>
      <div className="task-filter">
        <label htmlFor='filter-select'>Filter</label>
        <select
          className='select-menu'
          onChange={handleFilter}
          id='filter-select'
        >
          <option value='active'>Active Tasks</option>
          <option value='all'>All Tasks</option>
          <option value='today'>Due Today</option>
          <option value='1'>Vital</option>
          <option value='2'>Important</option>
          <option value='3'>Urgent</option>
          <option value='4'>Trivial</option>
          <option value='$'>Purchase</option>
          <option value='short'>(&lt; 15 mins)</option>
          <option value='long'>(&gt; 60 mins)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterHeader;