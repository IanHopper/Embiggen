import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => {
  return (
    <div className='todo-list'>
      <div>
        {props.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={props.deleteTodo} displayModal={props.displayModal}/>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
