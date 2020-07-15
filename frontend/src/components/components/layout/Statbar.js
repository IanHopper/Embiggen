import React, { useContext } from 'react';
import TodoContext from '../../context/todos/todoContext';

const Statbar = ({ title, icon }) => {
  const todoContext = useContext(TodoContext);
  const {
    taskData,
    auth
  } = todoContext;

  const {cost, duration, number } = taskData

  // Redirect to main if user is already logged in
  if(!auth.isAuthenticated){
    return null
  } 

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
