import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const DeleteModal = () => {
  const todoContext = useContext(TodoContext);
  const { deleteTodo, deleteModal, displayDeleteModal, todo, multiSelection, deleteTodos } = todoContext;

  // Do not render modal if state is empty
  if (deleteModal === '') {
    return null;
  }

  // Close delete modal by clicking outside modal
  const closeDeleteModal = (e) => {
    if(e.target.className === 'modal-container'){
      displayDeleteModal('')
    }
  }

  return (
    <div>
      <div className='modal-container' id='modal-container' onClick={(e)=>{closeDeleteModal(e)}}>
        <div className='modal-contents'>
          <button
            className='button btn-close-modal'
            id='close'
            onClick={() => displayDeleteModal('')}
          >
            <i className='fa fa-times'></i>
          </button>
          <div className='modal-header'>
            <h5>{deleteModal === 'solo' ? todo.task_name : (`Delete ${multiSelection.length} todos`)}</h5>
          </div>

          <form action='' className='modal-form'>
            <button
              className='button btn-delete'
              onClick={deleteModal === 'solo' ? (e) => deleteTodo(e, todo.id): (e)=> deleteTodos(e)}
              autoFocus
            >
              {deleteModal === 'solo' ? 'Delete Task': 'Permanently Delete Tasks'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
