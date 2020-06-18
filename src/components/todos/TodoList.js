import React, { useState, useEffect, useLayoutEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ deleteTodo, displayModal, todos }) => {
  const [button, setButton] = useState({ button: 'date-ascending' });
  const [todoList, setTodos] = useState(todos);

  useEffect(() => {
    if (button.button === 'priority') {
      todos.sort((a, b) => a.priority - b.priority);
    } else if (button.button === 'date-ascending') {
      todos.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    } else if (button.button === 'date-descending') {
      todos.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    }
    setTodos(todos)
  }, [todos]);

  const handleSelect = (e) => {
    const { value } = e.target;
    setButton({ button: value });
  };

  return (
    <div className='todo-list'>
      <div className='todo-sorting'>
        <div>
          <input
            type='radio'
            id='date-ascending'
            name='sort'
            value='date-ascending'
            checked={button.button === 'date-ascending'}
            onChange={handleSelect}
          />
          <label htmlFor='date-ascending'>Date (ascending) </label>
        </div>
        <div>
          <input
            type='radio'
            id='date-descending'
            name='sort'
            value='date-descending'
            checked={button.button === 'date-descending'}
            onChange={handleSelect}
          />
          <label htmlFor='date-descending'>Date (descending) </label>
        </div>
        <div>
          <input
            type='radio'
            id='priority'
            name='sort'
            value='priority'
            checked={button.button === 'priority'}
            onChange={handleSelect}
          />
          <label htmlFor='priority'>Priority </label>
        </div>
      </div>
      <div>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            displayModal={displayModal}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
