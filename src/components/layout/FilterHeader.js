import React, { useContext, Fragment } from 'react';
import Search from './Search';
import TodoContext from '../../context/todos/todoContext';

const FilterHeader = () => {
  const todoContext = useContext(TodoContext);
  const { handleSort, handleFilter, projects } = todoContext;

  // Eliminates blank projects from project list
  let realProjects = projects.filter((project) => project !== '')

  // Return projects header for filter
  const projectHeader = () => {
    if (realProjects.length > 0) {
      return <optgroup label='Projects'>{projectList()}</optgroup>;
    }
  };

  // Return projects for filter
  const projectList = () => {
    if (realProjects.length > 0) {
      return realProjects.map((project) => (
        <option key={project} value={project}>
          {project}
        </option>
      ));
    }
  };

  // Return list of filter options
  const filterList = () => {
    return (
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
        {projectHeader()}
      </Fragment>
    );
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
