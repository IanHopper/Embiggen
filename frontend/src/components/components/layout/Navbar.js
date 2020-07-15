import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TodoContext from '../../context/todos/todoContext';

const Navbar = ({ title, icon }) => {
  const todoContext = useContext(TodoContext);
  const {
    displayModal,
    handleUndo,
    loadUser,
    auth,
    history,
    displayUserModal,
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
      <i
        className='fas fa-user'
        id='user-icon'
        onClick={() => displayUserModal()}
      ></i>
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
        {auth.isAuthenticated ? authLinks(auth.user.username) : null}
      </div>
    </nav>
  );
};

export default Navbar;
