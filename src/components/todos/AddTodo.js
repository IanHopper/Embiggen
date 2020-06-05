import React from 'react';
import axios from 'axios';

const AddTodo = (props) => {
  const addTodo = async (e) => {
    e.preventDefault();
    let task_name = document.getElementById('add-task-task_name')
    let description = document.getElementById('add-task-description')
    let priority = document.getElementById('add-task-priority')
    const headers = {
    username: 1,
    task_name: task_name.value,
    description: description.value,
    purchase: false,
    priority: priority.value
  };
  await axios.post('http://127.0.0.1:8000/api/', headers);
  task_name.value = ''
  description.value = ''
  priority.value = ''

  }
  
  return (
    <form onSubmit={addTodo} className="task-form" action=''>
      <h1>Add Todo</h1>
      <input className="input" type="text" placeholder="Task Name" id="add-task-task_name"></input>
      <input className="input" type="text" placeholder="Description" id="add-task-description"></input>
      <select name="priority" id="add-task-priority">
        <option value="1">Vital</option>
        <option value="2">Important</option>
        <option value="3">Urgent</option>
        <option value="4" selected="selected">Trivial</option>
      </select>
      <button className="button" >Add Task</button>
    </form>
  );
};

export default AddTodo;
