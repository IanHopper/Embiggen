import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({ displayModal, modal, modalNew, todo: initialTodo }) => {
  // Initialize state for todo
  const [todo, setTodo] = useState();

  // Update state value to reflect current todo selection
  useEffect(() => {
    setTodo(initialTodo);
  }, [initialTodo]);

  // Change value for todo aspects
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTodo({ ...todo, [id]: value });
  };

  // Do not render modal if the App state is false
  if (!modal) {
    return null;
  }

  // Submit task form
  const submit = () => {
    if (modalNew) {
      createTodo();
      console.log('Modal True');
    } else {
      updateTodo();
      console.log('Modal False');
    }
    displayModal(null);
  };

  // Create new task
  const createTodo = async () => {
    const headers = {
      username: todo.username,
      task_name: todo.task_name,
      description: todo.description,
      due_date: todo.due_date,
      priority: todo.priority,
      cost: todo.cost,
      duration: todo.duration,
    };
    await axios.post('http://127.0.0.1:8000/api/', headers);
  };

  // Update todo
  const updateTodo = async () => {
    const headers = {
      username: todo.username,
      task_name: todo.task_name,
      description: todo.description,
      due_date: todo.due_date === '' ? null : todo.due_date,
      priority: todo.priority,
      cost: (todo.cost === '') | (parseInt(todo.cost) === 0) ? null : todo.cost,
      duration:
        (todo.duration === '') | (todo.duration === '0') ? null : todo.duration,
    };
    await axios.put(`http://127.0.0.1:8000/api/${todo.id}/`, headers);
  };

  return (
    <div>
      <div className='modal-container' id='modal-container'>
        <div className='modal-contents'>
          <button
            className='button close-btn'
            id='close'
            onClick={() => displayModal(null)}
          >
            <i className='fa fa-times'></i>
          </button>
          <div className='modal-header'>
            <h3>Task</h3>
          </div>
          <div className='modal-content'>
            <p>Enter the information for your Todo and hit save.</p>
            <form action='' className='modal-form'>
              <div>
                <label htmlFor='taskname'>Task Name</label>
                <input
                  type='text'
                  id='task_name'
                  placeholder='Enter task name'
                  className='form-input'
                  value={todo.task_name ? todo.task_name : ''}
                  onChange={handleInputChange}
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
              {/* type="button" prevents warning, but takes away submit on enter */}
              <button
                type='button'
                className='button btn-save'
                onClick={() => submit()}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
