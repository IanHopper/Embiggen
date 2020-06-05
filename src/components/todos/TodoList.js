import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => {
    return (
      <div className="todo-list">
        <h1>Task List</h1>
        {props.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    );

}

export default TodoList;
