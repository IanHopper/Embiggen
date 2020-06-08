import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => {
  return (
    <div className='todo-list'>
    <div>
      
    </div>
      <div>
        {props.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={props.deleteTodo} openModal={props.openModal} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
