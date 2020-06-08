import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  
  todo: { id, task_name, description, priority, due_date, duration, cost }, deleteTodo, openModal
}) => {
  const priorityList = {
    1: 'vital',
    2: 'important',
    3: 'urgent',
    4: 'trivial',
  };
  return (
    <div className='card'>
      <div className='item-header' onClick={(e) => openModal(id, task_name, description, priority, due_date, duration, cost, e )}>
        <p className={priorityList[priority]}>{task_name}</p>
      </div>
      <div className='item-date'>
        <p>{due_date}</p>
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
        <i className='fas fa-trash-alt' onClick={(e) => deleteTodo(id, e)} ></i>
      </div>
   
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
