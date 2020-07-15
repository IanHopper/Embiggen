import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const Search = () => {
  const todoContext = useContext(TodoContext);
  const { search, handleSearchInput } = todoContext;

  return (
    <div className='task-filter' id="search-bar">
    <i className='fas fa-search'></i>
      <form id='search-filter'>
        <input
          className='form-control'
          type='search'
          id='search-input'
          name='search-input'
          value={search ? search : ''}
          onChange={handleSearchInput}
        />
      </form>
    </div>
  );
};

export default Search;
