import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const UserModal = () => {
  const todoContext = useContext(TodoContext);
  const { userModal, displayUserModal, auth, logout } = todoContext;

  // Do not render user modal if state is false
  if (!userModal) {
    return null;
  }

  // Close close user modal by clicking outside of modal
  const closeUserModal = (e) => {
    if (e.target.className === 'modal-container') {
      console.log('modal-container');
      displayUserModal();
    }
  };

  return (
    <div>
      <div
        className='modal-container'
        id='modal-container'
        onClick={(e) => closeUserModal(e)}
      >
        <div className='user-modal-container'>
          <div className='user-modal-contents'>
            <div className='modal-header'>
              <h5>{auth.user ? auth.user.username : null}</h5>
              <button
                className='button btn-close-modal'
                id='close'
                onClick={() => displayUserModal()}
              >
                <i className='fa fa-times'></i>
              </button>
            </div>
            <form action='' className='modal-form'>
              <button
                className='button btn-logout'
                onClick={() => {
                  displayUserModal();
                  logout();
                }}
                autoFocus
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
