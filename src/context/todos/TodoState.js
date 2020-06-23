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
  DISPLAY_DELETE_MODAL
} from '../types';

const TodoState = (props) => {
  const initialState = {
    todos: [],
    todo: {},
    modal: false,
    modalNew: true,
    deleteModal: 0,
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
   // Create new task
   const createTodo = async () => {
    const headers = {
      username: 1,
      task_name: state.todo.task_name,
      description: state.todo.description,
      due_date: state.todo.due_date,
      priority: state.todo.priority,
      cost: state.todo.cost,
      duration: state.todo.duration,
    };
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
      cost: (state.todo.cost === '') | (parseInt(state.todo.cost) === 0) ? null : state.todo.cost,
      duration:
        (state.todo.duration === '') | (state.todo.duration === '0') ? null : state.todo.duration,
    };
    await axios.put(`http://127.0.0.1:8000/api/${state.todo.id}/`, headers);
  };

  // Delete task
  const deleteTodo = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/${id}`);
    displayDeleteModal(id);
  };

  // Display delete modal
  const displayDeleteModal = (currentTodo) => {
    let deleteModal;
    let todo;
    if(state.deleteModal === 0) {
      deleteModal = currentTodo.id
      todo = currentTodo
    } else {
      deleteModal = 0
      todo = state.defaultTodo
    }
    dispatch({
      type: DISPLAY_DELETE_MODAL,
      payload: {deleteModal, todo}
    })
  }

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
  const handleSubmit = () => {
    if (state.modalNew) {
      createTodo();}
      else {
        updateTodo();
      }
    displayModal(null);
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
        fetchTodos,
        handleSort,
        handleFilter,
        deleteTodo,
        displayModal,
        handleInputChange,
        createTodo,
        updateTodo,
        handleSubmit,
        displayDeleteModal
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
