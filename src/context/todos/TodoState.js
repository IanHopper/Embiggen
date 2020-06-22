import React, { useReducer } from 'react';
import axios from 'axios';
import TodoContext from './todoContext';
import TodoReducer from './todoReducer';
import {
  FETCH_TODOS,
  DETETE_TODO,
  UPDATE_TODO,
  CREATE_TODO,
  UPDATE_TODO_COMPLETED,
  DISPLAY_MODAL,
  HANDLE_SORT,
  HANDLE_FILTER,
  MAP_TODOS,
  SUBMIT_MODAL,
  HANDLE_INPUT_CHANGE,
  SET_DATE_CLASS,
  FORMAT_DATE,
  SORT_SELECTION,
  FILTER_SELECTION,
} from '../types';

const TodoState = (props) => {
  const initialState = {
    todos: [],
    todo: {},
    modal: false,
    modalNew: true,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  // Add task

  // Get tasks
  const fetchTodos = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/');

    dispatch({
      type: FETCH_TODOS,
      payload: res.data,
    });
  };

  // Update Task

  // Delete task

  // Display create/update modal

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        todo: state.todo,
        modal: state.modal,
        modalnew: state.modalNew,
        fetchTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
