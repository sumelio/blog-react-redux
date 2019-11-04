import {
  GET_ALL_USERS,
  LOADING,
  ERROR_TO_GET_ALL_USERS
} from "../types/userTypes";

const INITIAL_STATE = {
  users: [],
  loading: false,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  debugger;
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ERROR_TO_GET_ALL_USERS:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      default: return state;
  }
};
