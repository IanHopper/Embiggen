import {
  FETCH_TODOS,
  DISPLAY_MODAL,
  HANDLE_SORT,
  HANDLE_FILTER,
  HANDLE_INPUT_CHANGE,
  DISPLAY_DELETE_MODAL
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload
      }
    case HANDLE_FILTER:
      return {
        ...state,
        filterSelection: action.payload
      }
    case HANDLE_SORT:
      return {
        ...state,
        sortSelection: action.payload
      }
    case DISPLAY_MODAL:
      return {
        ...state,
        modal: action.payload.modal,
        modalNew: action.payload.modalNew,
        todo: action.payload.todo
      }
    case HANDLE_INPUT_CHANGE:
      return {
        ...state,
        todo: {
          ...state.todo,
          [action.payload.id]: action.payload.value
        }
      }
    case DISPLAY_DELETE_MODAL:
      return {
        ...state,
        deleteModal: action.payload.deleteModal,
        todo: action.payload.todo
      }
    default:
      return state;
  }
};
