import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TodoContext from '../../context/todos/todoContext';

const Navbar = ({ title, icon }) => {
  const todoContext = useContext(TodoContext);
  const {
    displayModal,
    handleUndo,
    loadUser,
    logout,
    auth,
    history,
  } = todoContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authLinks = (user) => (
    <div>
      {history.length > 0 ? (
        <i className='fas fa-undo' id='undo' onClick={() => handleUndo()}></i>
      ) : null}

      <i
        className='fas fa-plus-circle add-task'
        id='add-task'
        onClick={(e) => displayModal(e, null)}
      ></i>
      <p className='nav-link' onClick={logout}>
        {user}
      </p>
    </div>
  );

  const guestLinks = (
    <div>
      <Link to='/register' className='nav-link'>
        Register
      </Link>

      <Link to='/login' className='nav-link'>
        Login
      </Link>
    </div>
  );

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div>
          <Link to='/'>
            <i
              className='fas fa-tree'
              onClick={() => todoContext.fetchTodos()}
              id='brand'
            >
              <span>&nbsp;Embiggen</span>
            </i>
          </Link>
        </div>
        <div>
          {auth.isAuthenticated ? authLinks(auth.user.username) : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
