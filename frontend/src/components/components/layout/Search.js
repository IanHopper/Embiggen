import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const Search = () => {
  const todoContext = useContext(TodoContext);
  const { search, handleSearchInput } = todoContext;

  return (
    <div>
      <form className="task-filter">
        <div>
          <input className="form-control" type='search' id='search-input' name='search-input' value={search ? search : ''} onChange={handleSearchInput} placeholder="Search tasks"/>
        </div>
      </form>
    </div>
  );
};

export default Search;
