import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => {
    return (
      <div className={userStyle}>
        {props.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    );

}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default TodoList;
