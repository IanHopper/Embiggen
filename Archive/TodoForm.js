import React from 'react';
import axios from 'axios';

const TodoForm = (props) => {
  const addTodo = async (e) => {
    e.preventDefault();
    console.log(props)
    let taskName = document.getElementById('add-task-taskName');
    let description = document.getElementById('add-task-description');
    let dueDate = document.getElementById('add-task-duedate');
    let priority = document.getElementById('add-task-priority');
    // let tags = document.getElementById('add-task-tags');
    let cost = document.getElementById('add-task-priority');
    let purchase = document.getElementById('add-task-priority');
    let duration = document.getElementById('add-task-priority');
    
    const headers = {
      username: 1,
      task_name: taskName.value,
      description: description.value,
      // due_date: dueDate.value,
      // priority: priority.value,
      // tags: tags.value,
      // cost: cost.value,
      purchase: false,
      // duation: duration.value
    };
    await axios.post('http://127.0.0.1:8000/api/', headers);
    taskName.value = '';
    description.value = '';
    priority.value = '';
  };

  return (
    <form onSubmit={addTodo} className='add-task-form' action=''>
      <input
        className='input'
        type='text'
        placeholder='Task Name'
        id='add-task-taskName'
      ></input>
      <input
        className='input'
        type='text'
        placeholder='Description'
        id='add-task-description'
      ></input>
      <input className='input' type='date' id='add-task-duedate'></input>
      <select className='input' name='priority' id='add-task-priority'>
        <option value='1'>Vital</option>
        <option value='2'>Important</option>
        <option value='3'>Urgent</option>
        <option value='4'>Trivial</option>
      </select>
      <input
        className='input'
        type='number'
        id='add-task-cost'
        placeholder='$0.00'
      />
      <div id='add-task-purchase-div'>
        <label htmlFor='add-task-purchase'>Purchase</label>
        <input className='input' type='checkbox' id='add-task-purchase'></input>
      </div>

      <input
        className='input'
        type='number'
        id='add-task-duration'
        placeholder='Duration in minutes'
      />
      {/* 
      <button className='button btn-save' onClick={saveTodo}>
        Save Task
      </button> */}
      <button className='button btn-cancel' onClick={props.closeModal}>
        Cancel
      </button>
      <button className='button'>Add Task</button>
    </form>
  );
};

export default TodoForm;
