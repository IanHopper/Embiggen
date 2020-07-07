import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TodoContext from '../../context/todos/todoContext';

const UserModal = () => {
  const todoContext = useContext(TodoContext);
  const { userModal, displayUserModal, auth, logout } = todoContext;

  // Do not render user modal if state is false
  if (!userModal) {
    return null;
  }

  const authLinks = (user) => (
    <div>
      <p className='nav-link' onClick={()=> {
        displayUserModal()
        logout()}}>
        Logout
      </p>
    </div>
  );

  const guestLinks = (
    <div>
      <Link
        to='/register'
        className='nav-link'
        onClick={() => displayUserModal()}
      >
        Register
      </Link>

      <Link to='/login' className='nav-link' onClick={() => displayUserModal()}>
        Login
      </Link>
    </div>
  );

  return (
    <div>
      <div className='modal-container' id='modal-container'>
        <div className='modal-contents'>
          <div className='modal-header'>
            <h5>
              {auth.user ? auth.user.username : 'Welcome'}
            </h5>
            <button
              className='button btn-close-modal'
              id='close'
              onClick={() => displayUserModal()}
            >
              <i className='fa fa-times'></i>
            </button>
          </div>
          <form action='' className='modal-form'>
            <div>
              {auth.isAuthenticated
                ? authLinks(auth.user.username)
                : guestLinks}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
