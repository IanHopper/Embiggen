import React, { useState, useEffect, useLayoutEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ deleteTodo, displayModal, todos }) => {
  const [sortSelection, setSort] = useState('date-ascending');
  const [filterSelection, setFilter] = useState('all');
  const [todoList, setTodoList] = useState();

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const handleSort = (e) => {
    const { value } = e.target;
    setSort(value);
  };

  const handleFilter = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const mapTodos = () => {
    // This changes the state directly which I think is incorrect
    if (sortSelection === 'priority') {
      todoList.sort((a, b) => a.priority - b.priority);
    } else if (sortSelection === 'date-ascending') {
      todoList.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    } else if (sortSelection === 'date-descending') {
      todoList.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    }
    let displayList = []
    if (filterSelection === 'all') {
      displayList = todoList
    } else if (filterSelection === 'today') {
      displayList = todoList.filter(todo => todo.due_date === new Date().toISOString().slice(0,10))
    } else if (("1234").includes(filterSelection)){
      displayList = todoList.filter(todo => todo.priority === parseInt(filterSelection))
    } else if (filterSelection === '$') {
      displayList = todoList.filter(todo => parseInt(todo.cost) > 0)
    } else if (filterSelection === 'short'){
      displayList = todoList.filter(todo => parseInt(todo.duration) <= 15)
    } else if (filterSelection === 'long'){
      displayList = todoList.filter(todo => parseInt(todo.duration) >= 60)
    }
    return displayList.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        deleteTodo={deleteTodo}
        displayModal={displayModal}
      />
    ));
  };

  return (
    <div className='todo-list'>
      <div className='todo-sorting'>
      <h4>Sort & Filter</h4>
        <select className='select-menu' onChange={handleSort}>
          <option value='date-ascending'>Date Ascending</option>
          <option value='date-descending'>Date Descending</option>
          <option value='priority'>Priority</option>
        </select>
        <select className='select-menu' onChange={handleFilter} name="" id="">
          <option value="all">All Tasks</option>
          <option value="today">Due Today</option>
          <option value="1">Vital</option>
          <option value="2">Important</option>
          <option value="3">Urgent</option>
          <option value="4">Trivial</option>
          <option value="$">Purchase</option>
          <option value="short">Quick (&lt; 15 mins)</option>
          <option value="long">Long (&gt; 60 mins)</option>
        </select>
      </div>
      <div>{todoList ? mapTodos() : null}</div>
    </div>
  );
};

export default TodoList;
