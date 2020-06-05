import React from 'react';
import axios from 'axios';

const AddTodo = (props) => {
  const addTodo = async (e) => {
    e.preventDefault();
    let task_name = document.getElementById('add-task-task_name')
    let description = document.getElementById('add-task-description')
    const headers = {
    username: 1,
    task_name: task_name.value,
    description: description.value,
    purchase: false
  };
  await axios.post('http://127.0.0.1:8000/api/', headers);
  task_name.value = ''
  description.value = ''

  }
  
  return (
    <form onSubmit={addTodo} action=''>
      <h1>Add Todo</h1>
      <input className="input" type="text" placeholder="Task Name" id="add-task-task_name"></input>
      <input className="input" type="text" placeholder="Description" id="add-task-description"></input>
      <button className="button" >Add Task</button>
    </form>
  );
};

export default AddTodo;
