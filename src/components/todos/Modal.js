import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const Modal = () => {
  const todoContext = useContext(TodoContext);
  const {
    displayModal,
    modal,
    todo,
    handleInputChange,
    handleSubmit,
    displayDeleteModal,
  } = todoContext;

  // Do not render modal if state is false
  if (!modal) {
    return null;
  }

  return (
    <div>
      <div className='modal-container' id='modal-container'>
        <div className='modal-contents'>
          <button
            className='button close-btn'
            id='close'
            onClick={(e) => displayModal(e, null)}
          >
            <i className='fa fa-times'></i>
          </button>
          <div className='modal-header'>
            <h5>
              {todo.task_name === '' ? 'New Task' : todo.task_name}
              
            </h5>
            <span className='trash-icon'>
                {' '}
                &nbsp;
                {todo.id ? (
                  <i
                    className='fas fa-trash-alt'
                    id='deleteTask'
                    onClick={() => displayDeleteModal(todo)}
                  ></i>
                ) : null}
              </span>
          </div>
          <form
            action=''
            className='modal-form'
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label htmlFor='taskname'>Task Name</label>
              <input
                type='text'
                id='task_name'
                placeholder='Enter task name'
                className='form-input'
                value={todo.task_name ? todo.task_name : ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='description'>Description</label>
              <textarea
                id='description'
                placeholder='Enter description'
                className='form-input'
                value={todo.description ? todo.description : ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='due_date'>Due Date</label>
              <input
                type='date'
                id='due_date'
                className='form-input'
                value={todo.due_date ? todo.due_date : ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='priority'>Priority</label>
              <select
                className='form-input'
                id='priority'
                value={todo.priority}
                onChange={handleInputChange}
              >
                <option value='1'>Vital</option>
                <option value='2'>Important</option>
                <option value='3'>Urgent</option>
                <option value='4'>Trivial</option>
              </select>
            </div>
            <div>
              <label htmlFor='cost'>Cost</label>
              <input
                type='number'
                id='cost'
                placeholder='Enter $ if this task is a purchase...'
                className='form-input'
                value={todo.cost ? todo.cost : ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='username'>Duration</label>
              <input
                type='number'
                id='duration'
                placeholder='Enter duration in minutes'
                className='form-input'
                step='5'
                value={todo.duration ? todo.duration : ''}
                onChange={handleInputChange}
              />
            </div>
            <button
              className='button btn-save'>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
