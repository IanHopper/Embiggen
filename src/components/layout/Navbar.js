import React, { useContext, useEffect, Fragment } from 'react';
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
    fetchTodos,
    multiSelection,
    displayDeleteModal
  } = todoContext;

  // Load the current user
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return task and user logout icon
  const authLinks = () => (
    <div className='navbar-icons'>
      {history.length > 0 ? (
        <i className='fas fa-undo toolti' id='undo' onClick={() => handleUndo()}>
          <span className="tooltiptext">Undo Delete</span>
        </i>
      ) : null}
      {multiSelection.length > 0 ? (
        <Fragment>
          <i className='fas fa-trash-alt toolti' id='multi-delete' onClick={(e) => displayDeleteModal('multi')}><span className="tooltiptext">Delete Selected</span></i>
          
          <span
            id='multi-delete-number'
            
          >
            {multiSelection.length}{' '}
          </span>
        </Fragment>
      ) : null}
      <i
        className='fas fa-plus-circle add-task toolti'
        id='add-task'
        onClick={(e) => displayModal(e, null)}
      ><span className="tooltiptext">Add Task ( ; )</span></i>
      <i
        className='fas fa-user toolti'
        id='user-icon'
        onClick={() => displayUserModal()}
      ><span className="tooltiptext">Logout</span></i>
    </div>
  );

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div>
          <i className='fas fa-tree' onClick={() => fetchTodos()} id='brand'>
            <span>&nbsp;Embiggen</span>
          </i>
        </div>
        {/* Load add task and logout icons if user is logged in*/}
        {auth.isAuthenticated ? authLinks(auth.user.username) : null}
      </div>
    </nav>
  );
};

export default Navbar;
