import React, { useReducer } from 'react';
import axios from 'axios';
import TodoContext from './todoContext';
import TodoReducer from './todoReducer';
import {
  FETCH_TODOS,
  DISPLAY_MODAL,
  HANDLE_SORT,
  HANDLE_FILTER,
  HANDLE_INPUT_CHANGE,
  DISPLAY_DELETE_MODAL,
  HANDLE_UNDO,
  DELETE_TODO,
} from '../types';

const TodoState = (props) => {
  const initialState = {
    todos: [],
    todo: {},
    history: [],
    modal: false,
    modalNew: true,
    deleteModal: '',
    sortSelection: 'date-ascending',
    filterSelection: 'active',
    defaultTodo: {
      username: 1,
      task_name: '',
      description: '',
      due_date: null,
      priority: 4,
      cost: null,
      duration: null,
    },
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  // Add task
  const createTodo = async (optionalTodo) => {
    let headers;
    if (optionalTodo) {
      headers = optionalTodo;
    } else {
      headers = {
        username: 1,
        task_name: state.todo.task_name,
        description: state.todo.description,
        due_date: state.todo.due_date,
        priority: state.todo.priority,
        cost: state.todo.cost,
        duration: state.todo.duration,
      };
    }
    await axios.post('http://127.0.0.1:8000/api/', headers);
  };

  // Get tasks
  const fetchTodos = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/');

    dispatch({
      type: FETCH_TODOS,
      payload: res.data,
    });
  };

  // Update Task
  const updateTodo = async () => {
    const headers = {
      username: state.todo.username,
      task_name: state.todo.task_name,
      description: state.todo.description,
      due_date: state.todo.due_date === '' ? null : state.todo.due_date,
      priority: state.todo.priority,
      cost:
        (state.todo.cost === '') | (parseInt(state.todo.cost) === 0)
          ? null
          : state.todo.cost,
      duration:
        (state.todo.duration === '') | (state.todo.duration === '0')
          ? null
          : state.todo.duration,
    };
    await axios.put(`http://127.0.0.1:8000/api/${state.todo.id}/`, headers);
  };

  // Delete task
  const deleteTodo = async (e, todo) => {
    e.preventDefault();
    // Assign variable to task for deletion
    const deletedTask = todo;
    await axios.delete(`http://127.0.0.1:8000/api/${todo.id}`);
    displayDeleteModal(todo.id);
    // dispatch deleted task to get added to history array in state
    dispatch({
      type: DELETE_TODO,
      payload: { deletedTask },
    });
  };

  // Display delete modal
  const displayDeleteModal = (currentTodo) => {
    let deleteModal;
    let todo;
    if (state.deleteModal === '') {
      deleteModal = currentTodo;
      todo = currentTodo;
    } else {
      deleteModal = '';
      todo = state.defaultTodo;
    }
    dispatch({
      type: DISPLAY_DELETE_MODAL,
      payload: { deleteModal, todo },
    });
  };

  // Display create/update modal
  const displayModal = (currentTodo) => {
    // Open and close the task modal; modalType update for create or update
    let todo;
    let modal;
    let modalNew;
    if (!state.modal) {
      todo = state.defaultTodo;
      modal = true;
      modalNew = true;
      if (currentTodo) {
        todo = currentTodo;
        modalNew = false;
      }
    } else {
      modal = false;
      todo = state.defaultTodo;
      modalNew = true;
    }
    dispatch({
      type: DISPLAY_MODAL,
      payload: { modal, modalNew, todo },
    });
  };

  // Update based on sort change
  const handleSort = (e) => {
    const { value } = e.target;
    dispatch({
      type: HANDLE_SORT,
      payload: value,
    });
  };

  // Handle change in form input
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch({
      type: HANDLE_INPUT_CHANGE,
      payload: { id, value },
    });
  };

  // Update based on filter change
  const handleFilter = (e) => {
    const { value } = e.target;
    dispatch({
      type: HANDLE_FILTER,
      payload: value,
    });
  };

  // Submit modal
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.modalNew) {
      createTodo();
    } else {
      updateTodo();
    }
    displayModal(null);
  };

  // Undo last task deletion
  const handleUndo = () => {
    // Create new task from last task in history array
    if (state.history.length > 0) {
      const deletedTodo = state.history[state.history.length - 1];
      createTodo(deletedTodo);
    }
    // Remove last task in history from array
    const newHistory = state.history.slice(0, -1);
    dispatch({
      type: HANDLE_UNDO,
      payload: { newHistory },
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        todo: state.todo,
        modal: state.modal,
        modalNew: state.modalNew,
        sortSelection: state.sortSelection,
        filterSelection: state.filterSelection,
        deleteModal: state.deleteModal,
        history: state.history,
        fetchTodos,
        handleSort,
        handleFilter,
        deleteTodo,
        displayModal,
        handleInputChange,
        createTodo,
        updateTodo,
        handleSubmit,
        displayDeleteModal,
        handleUndo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
