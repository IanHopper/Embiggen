import React, { useContext } from 'react';
import DatePicker from 'react-date-picker';
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
    handleDateChange,
  } = todoContext;

 
  // Opens task modal by pressing ';' key
  const keyModalOpen = (e) => {
    let modalOpen = modal;
    if (e.keyCode === 186 && !modalOpen) { 
      displayModal(null)
    }
  };
  window.addEventListener('keyup', keyModalOpen);

  // Closes modal by pressing 'esc' key
  const closeModal = (e) => {
    let modalOpen = modal;
    if(e.keyCode === 27 && modalOpen) {
      displayModal(null);
    }
  }
  window.addEventListener('keyup', closeModal);

  // Do not render modal if state is false
  if (!modal) {
    return null;
  }

  // This is a hack; add a day to get around timezone problems.
  const dateConverter = () => {
    const rawdate = new Date(todo.due_date);
    const date = new Date(rawdate.setDate(rawdate.getDate() + 1));
    return date;
  };

  // Changes color of priority text based on selection
  const priorityColor = () => {
    let priorityClass;
    const priorityValue = todo.priority.toString();
    if (priorityValue === '1') {
      priorityClass = 'vital';
    } else if (priorityValue === '2') {
      priorityClass = 'important';
    } else if (priorityValue === '3') {
      priorityClass = 'urgent';
    } else {
      priorityClass = 'trivial';
    }
    return `${priorityClass} form-input`;
  };

  // Close modal by clicking outside modal
  const closeTaskModal = (e) => {
    if (e.target.className === 'modal-container') {
      displayModal(e, null);
    }
  };

  // Add alert if save button hit and there is no task name
  const validateTaskName = () => {
    document.getElementById('task-name-form-warning').style.display =
      'inline-block';
  };

  return (
    <div>
      <div
        className='modal-container'
        id='modal-container'
        onClick={(e) => {
          closeTaskModal(e);
        }}
      >
        <div className='modal-contents' id='task-modal'>
          <button
            className='button btn-close-modal'
            id='close'
            onClick={(e) => displayModal(e, null)}
          >
            <i className='fa fa-times'></i>
          </button>
          <div className='modal-header'>
            <h5>{todo.task_name === '' ? 'New Task' : todo.task_name}</h5>
            <span className='trash-icon'>
              {' '}
              &nbsp;
              {todo.id ? (
                <i
                  className='fas fa-trash-alt'
                  id='deleteTask'
                  onClick={() => displayDeleteModal('solo')}
                ></i>
              ) : null}
            </span>
          </div>
          <form
            action=''
            className='modal-form'
            onSubmit={(e) => handleSubmit(e)}
            noValidate
          >
            <div className='modal-row'>
              <div>
                <label htmlFor='taskname'>
                  Task Name{' '}
                  <span className='form-warning' id='task-name-form-warning'>
                    {' '}
                    &nbsp; Required Field
                  </span>
                </label>
                <input
                  type='text'
                  id='task_name'
                  // placeholder='Enter task name'
                  className='form-input'
                  value={todo.task_name ? todo.task_name : ''}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor='project'>Project Name</label>
                <input
                  type='text'
                  id='project'
                  // placeholder='Enter project name'
                  className='form-input'
                  value={todo.project ? todo.project : ''}
                  onChange={handleInputChange}
                />
              </div>
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

            <div className='modal-row'>
              <div>
                <label htmlFor='due_date'>Due Date</label> <br></br>
                <DatePicker
                  value={todo.due_date ? dateConverter() : ''}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <label htmlFor='priority'>Priority</label>
                <select
                  className={priorityColor()}
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
            </div>
            <div className='modal-row'>
              <div>
                <label htmlFor='cost'>Cost</label>
                <input
                  type='number'
                  id='cost'
                  placeholder='Cost in $'
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
                  placeholder='Duration in minutes'
                  className='form-input'
                  value={todo.duration ? todo.duration : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              className='button btn-save'
              onClick={() => validateTaskName()}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
