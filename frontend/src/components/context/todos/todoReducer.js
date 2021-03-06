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
  MULTI_SELECT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload,
        projects: Array.from(
          new Set(
            action.payload
              .filter((todo) => todo.project !== null)
              .map((todo) => todo.project)
          )
        ),
      };
    case HANDLE_FILTER:
      return {
        ...state,
        filterSelection: action.payload,
      };
    case HANDLE_SORT:
      return {
        ...state,
        sortSelection: action.payload,
      };
    case DISPLAY_MODAL:
      return {
        ...state,
        modal: action.payload.modal,
        modalNew: action.payload.modalNew,
        todo: action.payload.todo,
      };
    case DISPLAY_USER_MODAL:
      return {
        ...state,
        userModal: action.payload.userModal,
      };
    case HANDLE_INPUT_CHANGE:
      return {
        ...state,
        todo: {
          ...state.todo,
          [action.payload.id]: action.payload.value,
        },
      };
    case DISPLAY_DELETE_MODAL:
      return {
        ...state,
        deleteModal: action.payload.deleteModal,
        todo: action.payload.todo,
      };
    case DISPLAY_FAILED_LOGIN_MODAL:
      return {
        ...state,
        failedLoginModal: action.payload.message,
      };
    case HANDLE_UNDO:
      if (!state.history.length) return state;
      return {
        ...state,
        history: action.payload.newHistory,
      };
    case DELETE_TODO:
      return {
        ...state,
        history: state.history.concat([action.payload.deletedTask]),
      };
    case HANDLE_LOGIN_CHANGE:
      return {
        ...state,
        loginCredentials: {
          ...state.loginCredentials,
          [action.payload.id]: action.payload.value,
        },
      };
    case HANDLE_REGISTER_CHANGE:
      return {
        ...state,
        registration: {
          ...state.registration,
          [action.payload.id]: action.payload.value,
        },
      };
    case HANDLE_REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload.user,
        },
        registration: {
          username: null,
          email: null,
          password: null,
          password2: null,
        },
      };
    case USER_LOADING:
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: true,
        },
      };
    case USER_LOADED:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload,
        },
      };
    case AUTH_ERROR:
    case LOGOUT_USER:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        auth: {
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        },
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload.user,
        },
        loginCredentials: {
          username: null,
          password: null,
        },
      };
    case HANDLE_SEARCH_INPUT:
      return {
        ...state,
        search: action.payload.value,
      };
    default:
      return state;
    case UPDATE_TASK_DATA:
      return {
        ...state,
        taskData: action.payload.taskData,
      };
    case MULTI_SELECT:
      return {
        ...state,
        multiSelection: action.payload.newSelectionArray
      };
  }
};
