import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon, toggleTodoForm }) => {
  return (
    <nav className='navbar'>
      <i className={icon}><span>&nbsp;{title}</span></i>
      <i className='fas fa-plus-circle' id="add-task" onClick={toggleTodoForm}> <span>&nbsp;Add Task</span></i>
      
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
