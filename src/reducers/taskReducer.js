import {
  GET_ALL_TASKS,
  LOADING,
  ERROR_TO_GET_ALL_TASKS,
  CHANGE_USER_ID,
  CHANGE_TITLE,
  ADD_TASK_SUCCESS,
  RESET_SAVE
} from "../types/taskTypes";

const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: null,
  userId: null,
  title: null,
  goBack: false
};

export default (state = INITIAL_STATE, action) => {
   
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ERROR_TO_GET_ALL_TASKS:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ERROR_TO_GET_ALL_TASKS:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
      case CHANGE_USER_ID:
      return {
        ...state,
        userId: action.payload,
        goBack: false
      };  
      case CHANGE_TITLE:
      return {
        ...state,
        title: action.payload,
        goBack: false
      };  

      case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
           [action.payload.userId]: { 
            ...state.tasks[action.payload.userId],
            [1000]: { ...action.payload } 
           }
      },
        loading: false,
        goBack: true,
        userId: null,
        title: null,
      };  

      case RESET_SAVE:
      return {
        ...state,
        loading: false,
        goBack: false,
        userId: null,
        title: null,
      };  
      
      default: return state;
  }
};


