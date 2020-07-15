import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const FailedLoginModal = () => {
  const todoContext = useContext(TodoContext);
  const { failedLoginModal, displayFailedLoginModal} = todoContext;

  // Do not render modal if state is empty
  if (failedLoginModal === '') {
    return null;
  }

  return (
    <div>
      <div className='modal-container' id='modal-container'>
        <div className='modal-contents'>
          <button
            className='button btn-close-modal'
            id='close'
            onClick={() => displayFailedLoginModal('')}
          >
            <i className='fa fa-times'></i>
          </button>
          <div className='modal-header'>
            <h5>{failedLoginModal}</h5>
          </div>

          <form className='modal-form'>
            <button
              className='button btn-delete'
              onClick={() => displayFailedLoginModal('')}
            >
              Try Again!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FailedLoginModal;
