import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const TodoItem = ({ todo }) => {
  const todoContext = useContext(TodoContext);
  const { displayModal, updateTodoCompleted, handleMultiSelect, multiSelection } = todoContext;

  const {
    id,
    task_name,
    description,
    priority,
    due_date,
    duration,
    cost,
    completed,
    project
  } = todo;

  // Names for priority numbers used to add classe for color coding
  const priorityList = {
    1: 'vital',
    2: 'important',
    3: 'urgent',
    4: 'trivial',
  };

  // Formatting to deal with timezone issues
  const rawdate = new Date(todo.due_date)
  const date = new Date(rawdate.setDate(rawdate.getDate() + 1))
  const today = new Date().toLocaleString("sv-SE").slice(0,10)

  // Add classes for styling overdue tasks and tasks for today
  const dateClass = () => {
    if (due_date === today) {
      return 'grid-item item-date today';
    } else if (!due_date) {
      return 'grid-item item-date';
    } else if (date < new Date()) {
      return 'grid-item item-date overdue';
    } else {
      return 'grid-item item-date';
    }
  };

  // Change date to better human readable format
  const dateTranslate = () => {
    if (!due_date) {
      return 'No Date';
    } else if (due_date === today) {
      return 'Today';
    } else if (date < new Date()) {
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
          ></i>
          &nbsp; {dateTranslate()}
        </p>
      </div>
    );
  };

  const selectionClass = () => {
    if(multiSelection.includes(id)){
      return 'grid-card selected'
    } else {
      return 'grid-card'
    }
  }

  // Task card layout
  return (
    <div className={selectionClass()} id={id} onClick={(e)=>handleMultiSelect(e,todo.id)}>
      {/* Click on task name to open update modal */}
      <div className='item-completed'>
        <input
          type='checkbox'
          className='checkbox no-select'
          id={`checkbox ${id}`}
          onChange={(e) => updateTodoCompleted(e, todo)}
          checked={completed}
        />
        <label className={`${priorityList[priority]} no-select`} htmlFor={`checkbox ${id}`}></label>
      </div>
      <div className='grid-item item-header'>
        <p className={todo.completed? `${priorityList[priority]} strikethrough`: priorityList[priority]}>{task_name} &nbsp;<span className="task-project">{project}</span></p>
      </div>
      {due_date_function()}
      <div className='grid-item item-main'>
        <p>{description}</p>
      </div>
      <div className='grid-item item-edit' >
        <i className='far fa-edit no-select' onClick={(e) => displayModal(e, todo)}></i>
      </div>
      <div className='grid-item item-duration'>
        {duration > 0 ? (
          <p>
            <i className='far fa-clock'></i> {duration} minutes
          </p>
        ) : null}
      </div>
      <div className='grid-item item-cost'>
        {cost > 0 ? <span>${cost.slice(0, -3)}</span> : null}
      </div>
    </div>
  );
};

export default TodoItem;
