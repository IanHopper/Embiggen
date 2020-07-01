import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const DeleteModal = () => {
  const todoContext = useContext(TodoContext);
  const { deleteTodo, deleteModal, displayDeleteModal, todo } = todoContext;

  // Do not render modal if state is empty
  if (deleteModal === '') {
    return null;
  }

  return (
    <div>
      <div className='modal-container' id='modal-container'>
        <div className='modal-contents'>
          <button
            className='button close-btn'
            id='close'
            onClick={() => displayDeleteModal(todo)}
          >
            <i className='fa fa-times'></i>
          </button>
          <div className='modal-header delete'>
            <p>{todo.task_name}</p>
          </div>

          <form action='' className='modal-form'>
            <button
              className='button btn-delete'
              onClick={(e) => deleteTodo(e, deleteModal)}
            >
              Delete Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
