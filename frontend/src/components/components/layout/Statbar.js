import React, { useContext, useEffect } from 'react';
import TodoContext from '../../context/todos/todoContext';

const Statbar = ({ title, icon }) => {
  const todoContext = useContext(TodoContext);
  const {
    taskData
  } = todoContext;

  const {cost, duration, number } = taskData

  return (
    <nav className='statbar'>
      <div className='statbar-container'>
        <div>Total Tasks: {number}</div>
        <div><i className='far fa-clock'></i> &nbsp; {duration} minutes</div>
        <div>${cost}</div>
      </div>
    </nav>
  );
};

export default Statbar;
