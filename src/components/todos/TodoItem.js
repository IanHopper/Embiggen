import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TodoContext from '../../context/todos/todoContext';

const TodoItem = ({ todo }) => {
  const todoContext = useContext(TodoContext);
  const { displayModal, updateTodoCompleted } = todoContext;

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
      return 'grid-item item-date today';
    } else if (new Date(due_date) < new Date() && due_date) {
      return 'grid-item item-date overdue';
    } else {
      return 'grid-item item-date';
    }
  };

  // Change date to better human readable format
  const dateTranslate = () => {
    // Return today if task is due today
    if (!due_date) {
      return 'No Date';
    } else if (due_date === new Date().toISOString().slice(0, 10)) {
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

  const due_date_function = () => {
    return (
      <div className={dateClass()}>
        <p>
          <i
            className='fa fa-calendar-alt'
            onClick={() => console.log(due_date, new Date().toISOString().slice(0, 10))}
          ></i>
          &nbsp; {dateTranslate()}
        </p>
      </div>
    );
  };

  // Task card layout
  return (
    <div className='grid-card' >
      {/* Click on task name to open update modal */}
      <div className='item-completed'>
        <input
          type='checkbox'
          className='checkbox'
          id={id}
          onChange={(e) => updateTodoCompleted(e, todo)}
          checked={completed}
        />
        <label className={priorityList[priority]} htmlFor={id}></label>
      </div>
      <div className='grid-item item-header'>
        <p className={priorityList[priority]}>{task_name}</p>
      </div>
      {due_date_function()}
      <div className='grid-item item-main'>
        <p>{description}</p>
      </div>
      <div className='grid-item item-multi' onClick={(e) => displayModal(e, todo)}>
        <i className='far fa-list-alt'></i>
      </div>
      <div className='grid-item item-duration'>
        {duration > 0 ? (
          <p>
            <i className='far fa-clock'></i> {duration} minutes
          </p>
        ) : null}
      </div>
      <div className='grid-item item-cost'>
        {cost > 0 ? <span>$ {cost.slice(0, -3)}</span> : null}
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
