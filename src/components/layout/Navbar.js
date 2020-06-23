import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TodoContext from '../../context/todos/todoContext';

const Navbar = ({ title, icon }) => {
  const todoContext = useContext(TodoContext);
  const { handleSort, handleFilter, displayModal, handleUndo } = todoContext;

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <i className={icon} onClick={() => todoContext.fetchTodos()} id='brand'>
          <span>&nbsp;{title}</span>
        </i>
        <select className='select-menu' onChange={handleSort}>
          <option value='date-ascending'>Date Ascending</option>
          <option value='date-descending'>Date Descending</option>
          <option value='priority'>Priority</option>
        </select>
        <select className='select-menu' onChange={handleFilter}>
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
        <div className='navbar-buttons'>
          <i className='fas fa-undo' id='undo' onClick={()=> handleUndo()}></i>
          <i
            className='fas fa-plus-circle fa-3x add-task'
            id='add-task'
            onClick={() => displayModal(null)}
          ></i>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Embiggen',
  icon: 'fas fa-tree',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
export default Navbar;
