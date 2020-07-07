import React, { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoContext from '../../context/todos/todoContext';
import FilterHeader from '../layout/FilterHeader';

const TodoList = () => {
  const todoContext = useContext(TodoContext);
  const {
    todos,
    sortSelection,
    filterSelection,
    fetchTodos,
    search,
  } = todoContext;

  let token = localStorage.getItem('token');

  // Fetches todos when list mounts
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter then sort the todos
  const mapTodos = () => {
    let displayList = [];

    // Filter todos
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
    // Sort after filtering
    if (sortSelection === 'priority') {
      displayList.sort((a, b) => a.priority - b.priority);
      displayList.sort((a, b) => {
        if (a.priority === b.priority) {
          return a.id - b.id;
        } else {
          return null
        }
      });
    } else if (sortSelection === 'date-ascending') {
      displayList.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      displayList.sort((a, b) => {
        if (new Date(a.due_date).toISOString().slice(0, 10) === new Date(b.due_date).toISOString().slice(0, 10)) {
          return a.id - b.id;
        } else {
          return null
        }
      });
    } else if (sortSelection === 'date-descending') {
      displayList.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
      displayList.sort((a, b) => {
        if (new Date(a.due_date).toISOString().slice(0, 10) === new Date(b.due_date).toISOString().slice(0, 10)) {
          return a.id - b.id;
        } else {
          return null
        }
      });
    } else if (sortSelection === 'cost') {
      displayList.sort((a, b) => b.cost - a.cost);
      displayList.sort((a, b) => {
        if (b.cost === a.cost) {
          return a.id - b.id;
        } else {
          return null
        }
      });
    } else if (sortSelection === 'duration-ascending') {
      displayList.sort((a, b) => b.duration - a.duration);
      displayList.sort((a, b) => {
        if (b.duration === a.duration) {
          return a.id - b.id;
        } else {
          return null
        }
      });
    } else if (sortSelection === 'duration-descending') {
      displayList.sort((a, b) => a.duration - b.duration);
      displayList.sort((a, b) => {
        if (a.duration === b.duration) {
          return a.id - b.id;
        } else {
          return null
        }
      });
    }


    // Search filter
    if (search) {
      displayList = displayList.filter((todo) =>
        todo.task_name.toUpperCase().includes(search.toUpperCase())
      );
    }
    // Map the filtered and sorted todo array
    return displayList.map((todo) => <TodoItem key={todo.id} todo={todo} />);
  };

  return (
    <div className='todo-container'>
      <FilterHeader />
      <div className='task-list'>{todos ? mapTodos() : null}</div>
    </div>
  );
};

export default TodoList;
