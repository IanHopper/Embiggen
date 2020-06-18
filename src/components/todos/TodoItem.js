import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  todo, deleteTodo, displayModal
}) => {
  const {
    id, task_name, description, priority, due_date, duration, cost } = todo
 
  // Names for priority numbers used to add classe for color coding
  const priorityList = {
    1: 'vital',
    2: 'important',
    3: 'urgent',
    4: 'trivial',
  };

  // Task card layout
  return (
    <div className='card'>
      {/* Click on task name to open update modal */}
      <div className='item-header' onClick={()=> displayModal(todo)}>
        <p className={priorityList[priority]}>{task_name} {id}</p>
      </div>
      <div className='item-date'>
        <p>{due_date} &nbsp;<i className="fa fa-calendar-alt"></i></p>
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
            <i className='fas fa-dollar-sign'></i> {cost}
          </p>
        ) : null}
      </div>
      <div className='item-delete'>
      {/* Click delete icon to delete task */}
        <i className='fas fa-trash-alt' onClick={() => deleteTodo(id)}></i>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
