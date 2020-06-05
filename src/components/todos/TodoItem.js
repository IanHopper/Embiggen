import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo: { id, task_name, description } }) => {
  return (
    <div className='card text-center'>
      <h1>
        {task_name} <span className='todo-id'>{id}</span>
      </h1>
      <h4>{description}</h4>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
