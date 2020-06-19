import React, { useState, useEffect, useLayoutEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ deleteTodo, displayModal, todos}) => {
  const [button, setButton] = useState('date-ascending');
  const [todoList, setTodoList] = useState();

  useEffect(() => {
    setTodoList(todos)
  }, [todos]);

  const handleSelect = (e) => {
    const { value } = e.target;
    setButton(value);
  };

  const mapTodos = () => {
    // This changes the state directly which I think is incorrect
    if (button === 'priority') {
      todoList.sort((a, b) => a.priority - b.priority);
    } else if (button === 'date-ascending') {
      todoList.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    } else if (button === 'date-descending') {
      todoList.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    }
    return (
      todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          displayModal={displayModal}
        />
      ))
    )
  }

  return (
    <div className='todo-list'>
      <div className='todo-sorting'>
        <div>
          <input
            type='radio'
            id='date-ascending'
            name='sort'
            value='date-ascending'
            checked={button === 'date-ascending'}
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
            checked={button === 'date-descending'}
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
            checked={button === 'priority'}
            onChange={handleSelect}
          />
          <label htmlFor='priority'>Priority </label>
        </div>
      </div>
      <div>
        {todoList ? mapTodos(): null}
      </div>
    </div>
  );
};

export default TodoList;
