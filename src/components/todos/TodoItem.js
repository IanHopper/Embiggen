import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  todo: { id, task_name, description, priority, due_date, duration, cost },
}) => {
  const priorityList = {
    1: 'vital',
    2: 'important',
    3: 'urgent',
    4: 'trivial',
  };
  return (
    <div className='card'>
      <div className='item-header'>
        <h4 className={priorityList[priority]}>{task_name}</h4>
      </div>
      <div className='item-date'>
        <p>{due_date}</p>
      </div>
      <div className='item-main'>
        <h6>{description}</h6>
      </div>
      <div className='item-duration'>
        {duration > 0 ? (
          <p>
            <i class='far fa-clock'></i> {duration} minutes
          </p>
        ) : null}
      </div>
      <div className='item-cost'>
        {cost > 0 ? (
          <p>
            <i class='fas fa-dollar-sign'></i> {cost}
          </p>
        ) : null}
      </div>
      <div className='item-edit'>
        <i class='fas fa-edit'></i>
      </div>
      <div className='item-delete'>
        <i class='fas fa-trash-alt'></i>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
