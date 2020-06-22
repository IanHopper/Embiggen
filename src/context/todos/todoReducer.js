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

export default (state, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload
      }
    default:
      return state;
  }
};
