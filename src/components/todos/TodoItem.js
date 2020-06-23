import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TodoContext from '../../context/todos/todoContext';

const TodoItem = ({todo}) => {
  const todoContext = useContext(TodoContext);
  const { displayModal, deleteTodo, displayDeleteModal } = todoContext;

  const {
    id,
    task_name,
    description,
    priority,
    due_date,
    duration,
    cost,
    completed,
  } = todo;

  // Update todo
  const updateTodoCompleted = async (e) => {
    console.log(e.target.checked === true);
    const headers = {
      username: 1,
      task_name: task_name,
      completed: e.target.checked === true,
    };
    await axios.put(`http://127.0.0.1:8000/api/${id}/`, headers);
  };

  // Names for priority numbers used to add classe for color coding
  const priorityList = {
    1: 'vital',
    2: 'important',
    3: 'urgent',
    4: 'trivial',
  };

  // Add classes for styling overdue tasks and tasks for today
  const dateClass = () => {
    if (due_date === new Date().toISOString().slice(0, 10)) {
      return 'item-date today';
    } else if (new Date(due_date) < new Date() && due_date) {
      return 'item-date overdue';
    } else {
      return 'item-date';
    }
  };

  // Change date to better human readable format
  const dateTranslate = (e) => {
    // Return today if task is due today
    if (due_date === new Date().toISOString().slice(0, 10)) {
      return 'Today';
    } else if (new Date(due_date) < new Date()) {
      return 'Overdue';
    }
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthNumber = parseInt(due_date.slice(5, 7));
    const year = due_date.slice(0, 4);
    const day = parseInt(due_date.slice(-2));

    return `${months[monthNumber - 1]} ${day}, ${year}`;
  };

  // Task card layout
  return (
    <div className='card'>
      {/* Click on task name to open update modal */}
      <div className='item-completed'>
        <input
          type='checkbox'
          className='checkbox'
          id={id}
          onChange={updateTodoCompleted}
          checked={completed}
        />
        <label className={priorityList[priority]} htmlFor={id}></label>
      </div>
      <div className='item-header' onClick={() => displayModal(todo)}>
        <p className={priorityList[priority]}>{task_name}</p>
      </div>
      <div className={dateClass()}>
        <p>
          {due_date ? dateTranslate() : null} &nbsp;
          {due_date ? <i className='fa fa-calendar-alt'></i> : null}
        </p>
      </div>
      <div className='item-main'>
        <p>{description}</p>
      </div>
      <div className='item-duration'>
        {duration > 0 ? (
          <p>
            <i className='far fa-clock'></i> {duration} minutes
          </p>
        ) : null}
      </div>
      <div className='item-cost'>
        {cost > 0 ? (
          <p>
            <i className='fas fa-dollar-sign'></i> {cost.slice(0, -3)}
          </p>
        ) : null}
      </div>
      <div className='item-delete'>
        {/* Click delete icon to delete task */}
        {/* <i className='fas fa-trash-alt' onClick={() => deleteTodo(id)}></i> */}
        <i className='fas fa-trash-alt' onClick={() => displayDeleteModal(todo)}></i>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
