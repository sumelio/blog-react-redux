import axios from "axios";
import {
  GET_ALL_TASKS,
  LOADING,
  ERROR_TO_GET_ALL_TASKS,
  CHANGE_USER_ID,
  CHANGE_TITLE,
  ADD_TASK_SUCCESS,
  RESET_SAVE
} from "../types/taskTypes";

export const getAll = () => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true
    });
    const response = await axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos",
      headers: {},
      data: {}
    }); 

    const tasks = {};

    response.data.map( taskData => (
        tasks[taskData.userId] = {
          ...tasks[taskData.userId],
          [taskData.id]: {
             ...taskData
          }
        }
      ))

    console.log('tasks == ',tasks)

    dispatch({
      type: GET_ALL_TASKS,
      payload: tasks
    });
  } catch (error) {
    console.error("Error: {}", error.message, error);

    dispatch({
      type: ERROR_TO_GET_ALL_TASKS,
      payload: error.message
    });
  }
};


export const changeUserId = (userId) => (dispatch) => {
  dispatch({
    type: CHANGE_USER_ID,
    payload: userId
  })
}

export const changeTitle = (title) => (dispatch) => {
  dispatch({
    type: CHANGE_TITLE,
    payload: title
  })
}

export const resetSave = () => (dispatch) => {
  dispatch({
    type: RESET_SAVE
  })
}

export const addTask = (task) => async (dispatch) => {
  console.log('post ....', task);
  dispatch({
    type: LOADING
  });

  try{
 
   const response = await axios({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/todos",
      headers: {},
      data: task
    }); 
   console.log('response ....', response);

  dispatch({
    type: ADD_TASK_SUCCESS,
    payload: task
  });

 } catch (error) {
    console.error("Error: {}", error.message, error);

    dispatch({
      type: ERROR_TO_GET_ALL_TASKS,
      payload: error.message
    });
  }
}