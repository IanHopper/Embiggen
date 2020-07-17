import React, { useContext, Fragment} from 'react';
import Search from './Search';
import TodoContext from '../../context/todos/todoContext';

const FilterHeader = () => {
  const todoContext = useContext(TodoContext);
  const { handleSort, handleFilter, projects } = todoContext;

  const projectList = () => {
    if (projects.length > 0){
        return projects.map((project)=> <option value={project}>{project}</option>)
    }
  }

  const filterList = () => {
    return(
      <Fragment>
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
        {projectList()}
      </Fragment>)
  };

  return (
    <div className='task-list-header'>
      <Search />
      <div className='task-filter'>
        <i className='fas fa-sort-down'></i>
        <select
          className='select-menu'
          onChange={handleFilter}
          id='filter-select'
        >
          {filterList()}
        </select>
      </div>
      <div className='task-filter'>
        <i className='fas fa-sort-down'></i>
        <select
          className='select-menu'
          onChange={handleSort}
          id='sort-select'
          placeholder='sort'
        >
          <option value='date-ascending'>Date &#8595;</option>
          <option value='date-descending'>Date &#8593;</option>
          <option value='priority'>Priority &#8595;</option>
          <option value='duration-ascending'>Time &#8595;</option>
          <option value='duration-descending'>Time &#8593;</option>
          <option value='cost'>Cost &#8595;</option>
        </select>
      </div>
    </div>
  );
};

export default FilterHeader;
