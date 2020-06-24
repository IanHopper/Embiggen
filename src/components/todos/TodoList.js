import React, { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoContext from '../../context/todos/todoContext';

const TodoList = () => {
  const todoContext = useContext(TodoContext);
  const { todos, sortSelection, filterSelection, fetchTodos } = todoContext;

  useEffect(() => {
    fetchTodos();
  },[]);

  const mapTodos = () => {
    // This changes the state directly which I think is incorrect
    if (sortSelection === 'priority') {
      todos.sort((a, b) => a.priority - b.priority);
    } else if (sortSelection === 'date-ascending') {
      todos.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    } else if (sortSelection === 'date-descending') {
      todos.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    } else if (sortSelection === 'cost') {
      todos.sort((a, b) => b.cost - a.cost);
    } else if (sortSelection === 'duration-ascending') {
      todos.sort((a, b) => b.duration - a.duration);
    } else if (sortSelection === 'duration-descending') {
      todos.sort((a, b) => a.duration - b.duration);
    }
    let displayList = [];
    if (filterSelection === 'active') {
      displayList = todos.filter((todo) => todo.completed !== true);
    } else if (filterSelection === 'all') {
      displayList = todos;
    } else if (filterSelection === 'today') {
      displayList = todos.filter(
        (todo) => todo.due_date === new Date().toISOString().slice(0, 10)
      );
    } else if ('1234'.includes(filterSelection)) {
      displayList = todos.filter(
        (todo) => todo.priority === parseInt(filterSelection)
      );
    } else if (filterSelection === '$') {
      displayList = todos.filter((todo) => parseInt(todo.cost) > 0);
    } else if (filterSelection === 'short') {
      displayList = todos.filter((todo) => parseInt(todo.duration) <= 15);
    } else if (filterSelection === 'long') {
      displayList = todos.filter((todo) => parseInt(todo.duration) >= 60);
    }

    return displayList.map((todo) => <TodoItem key={todo.id} todo={todo} />);
  };

  return (
    <div className='todo-list'>
      <div>{todos ? mapTodos() : null}</div>
    </div>
  );
};

export default TodoList;
