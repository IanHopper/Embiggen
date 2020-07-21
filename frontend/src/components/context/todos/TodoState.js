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
  HANDLE_LOGIN_CHANGE,
  HANDLE_REGISTER_CHANGE,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
  HANDLE_REGISTER_SUCCESS,
  HANDLE_SEARCH_INPUT,
  DISPLAY_USER_MODAL,
  UPDATE_TASK_DATA,
  DISPLAY_FAILED_LOGIN_MODAL,
} from '../types';

// Variable to control which server to use
const DEBUG = false;
let appUrl;

if (!DEBUG) {
  appUrl = 'https://embiggen.herokuapp.com';
} else {
  appUrl = 'http://localhost:8000';
}

const TodoState = (props) => {
  const initialState = {
    // authentication credentials
    auth: {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      isLoading: false,
      user: null,
    },
    // credentials to submit to API for login
    loginCredentials: {
      username: null,
      password: null,
    },
    // data to submit to API for registration
    registration: {
      username: null,
      email: null,
      password: null,
      password2: null,
    },
    taskData: {}, // object with total quantity, duration, and cost of displayed tasks
    todos: [], // todo array from API
    todo: {}, // selected todo
    projects: [], // array derived from projects in objects in todos
    history: [], // deleted todos that can be recreated
    search: '', // search input
    modal: false, // task create and update modal control
    modalNew: true, // boolean for create or update task modal
    deleteModal: '', // value of todo to be deleted
    failedLoginModal: '',
    userModal: false, // boolean to display logout modal
    sortSelection: 'date-ascending',
    filterSelection: 'active',
    // default todo values for creating a new task
    defaultTodo: {
      username: null,
      task_name: '',
      description: '',
      due_date: null,
      priority: 4,
      project: '',
      cost: null,
      duration: null,
    },
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  // Add task
  const createTodo = async (optionalTodo) => {
    // Check if there is a task name
    if (!state.todo.task_name && state.modal) {
      return null;
    }
    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    let data;
    if (optionalTodo) {
      data = optionalTodo;
    } else {
      data = {
        username: state.auth.user.id,
        task_name: state.todo.task_name,
        description: state.todo.description,
        due_date: state.todo.due_date,
        project: state.todo.project,
        priority: state.todo.priority,
        cost: state.todo.cost,
        duration: state.todo.duration,
      };
    }
    await axios.post(`${appUrl}/api/`, data, config);
    fetchTodos();
  };

  // Get tasks
  const fetchTodos = async () => {
    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.get(`${appUrl}/api/`, config);

    dispatch({
      type: FETCH_TODOS,
      payload: res.data,
    });
  };

  // Update Task
  const updateTodo = async () => {
    // Check if there is a task name
    if (!state.todo.task_name && state.modal) {
      return null;
    }
    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      username: state.todo.username,
      task_name: state.todo.task_name,
      description: state.todo.description,
      due_date: state.todo.due_date === '' ? null : state.todo.due_date,
      project: state.todo.project,
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
    await axios.put(`${appUrl}/api/${state.todo.id}/`, data, config);
    fetchTodos();
  };

  // Update todo when box checked/unchecked
  const updateTodoCompleted = async (e, todo) => {
    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      username: state.auth.user.id,
      task_name: todo.task_name,
      completed: e.target.checked === true,
    };
    await axios.put(`${appUrl}/api/${todo.id}/`, data, config);
    fetchTodos();
  };

  // Delete task
  const deleteTodo = async (e, todo) => {
    e.preventDefault();
    displayDeleteModal(todo.id);
    displayModal(e, todo);
    // Assign variable to task for deletion
    const deletedTask = todo;
    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    await axios.delete(`${appUrl}/api/${todo.id}`, config);
    // dispatch deleted task to get added to history array in state
    dispatch({
      type: DELETE_TODO,
      payload: { deletedTask },
    });
    fetchTodos();
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
      todo = currentTodo;
    }

    dispatch({
      type: DISPLAY_DELETE_MODAL,
      payload: { deleteModal, todo },
    });
  };

  // Display delete modal
  const displayFailedLoginModal = (message) => {
    dispatch({
      type: DISPLAY_FAILED_LOGIN_MODAL,
      payload: { message },
    });
  };

  // Display create/update modal
  const displayModal = (e, currentTodo) => {
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
  // Display create/update modal
  const displayUserModal = () => {
    // Open and close the task modal; modalType update for create or update

    let userModal;

    if (!state.userModal) {
      userModal = true;
    } else {
      userModal = false;
    }
    dispatch({
      type: DISPLAY_USER_MODAL,
      payload: { userModal },
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

  // Handle date change
  const handleDateChange = (e) => {
    const id = 'due_date';
    let value = e ? e.toLocaleString('sv-SE').slice(0, 10) : null;

    console.log(value);
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

  // Submit task create or update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.modalNew) {
      createTodo();
    } else {
      updateTodo();
    }
    if (state.todo.task_name) {
      displayModal(e, null);
    }
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
    fetchTodos();
  };

  // Handle change in login form
  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    dispatch({
      type: HANDLE_LOGIN_CHANGE,
      payload: { id, value },
    });
  };

  // Handle change in register form
  const handleRegisterChange = (e) => {
    const { id, value } = e.target;
    dispatch({
      type: HANDLE_REGISTER_CHANGE,
      payload: { id, value },
    });
  };

  // Check token and load user
  const loadUser = async () => {
    // User loading
    dispatch({ type: USER_LOADING });
    // Get token from state
    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';

    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
      await axios
        .get(`${appUrl}/api/auth/user`, config)
        .then((res) => {
          dispatch({
            type: USER_LOADED,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err.response.data, err.response.status);
          dispatch({
            type: AUTH_ERROR,
          });
        });
    }
  };

  // Validate email
  const validateEmail = (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Login user
  const login = async (e, username, password) => {
    e.preventDefault();
    if (!username | !password) {
      return null;
    } else if ((username.length < 6) | (password.length < 6)) {
      return null;
    }
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Login credentials
    const body = JSON.stringify({ username, password });
    try {
      const res = await axios.post(`${appUrl}/api/auth/login`, body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response.data, err.response.status);
      let message = 'Invalid username or password';
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: DISPLAY_FAILED_LOGIN_MODAL,
        payload: { message },
      });
    }
  };

  // Login user
  const register = async (e) => {
    const { username, email, password, password2 } = state.registration;
    e.preventDefault();
    // Check that all fields have entries
    if (!username | !email | !password | !password2) {
      return null;
    } 
    // Verify validity of field entries
    else if ((username.length < 6) | (password.length < 6) | !validateEmail(email) | password !== password2) {
      return null;
    }
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Login credentials
    const body = JSON.stringify({ username, email, password });
    try {
      const res = await axios.post(`${appUrl}/api/auth/register`, body, config);
      dispatch({
        type: HANDLE_REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = 'Username already in use';
      console.log(err.response.data, err.response.status);
      dispatch({
        type: DISPLAY_FAILED_LOGIN_MODAL,
        payload: { message },
      });
    }
  };

  // Logout
  const logout = async () => {
    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    try {
      await axios.post(`${appUrl}/api/auth/logout`, null, config);
      dispatch({
        type: LOGOUT_USER,
      });
    } catch (err) {
      console.log(err.response.data, err.response.status);
    }
  };

  // Handle search input
  const handleSearchInput = (e) => {
    const { value } = e.target;
    dispatch({
      type: HANDLE_SEARCH_INPUT,
      payload: { value },
    });
  };

  // Total Task information
  const addTaskData = (number, duration, cost) => {
    const taskData = { number, duration, cost };
    dispatch({
      type: UPDATE_TASK_DATA,
      payload: { taskData },
    });
  };

  return (
    <TodoContext.Provider
      value={{
        auth: state.auth,
        user: state.user,
        todos: state.todos,
        todo: state.todo,
        search: state.search,
        modal: state.modal,
        modalNew: state.modalNew,
        sortSelection: state.sortSelection,
        filterSelection: state.filterSelection,
        deleteModal: state.deleteModal,
        userModal: state.userModal,
        history: state.history,
        loginCredentials: state.loginCredentials,
        registration: state.registration,
        taskData: state.taskData,
        failedLoginModal: state.failedLoginModal,
        projects: state.projects,
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
        updateTodoCompleted,
        loadUser,
        handleLoginChange,
        handleRegisterChange,
        login,
        logout,
        register,
        handleSearchInput,
        displayUserModal,
        addTaskData,
        handleDateChange,
        displayFailedLoginModal,
        validateEmail,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
