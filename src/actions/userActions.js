import axios from "axios";
import {
  GET_ALL_USERS,
  LOADING,
  ERROR_TO_GET_ALL_USERS
} from "../types/userTypes";

export const getAll = () => async dispatch => {
  debugger;
  try {
    dispatch({
      type: LOADING,
      payload: true
    });
    const response = await axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users",
      headers: {},
      data: {}
    }); 

    dispatch({
      type: GET_ALL_USERS,
      payload: response.data
    });
  } catch (error) {
    console.error("Error: {}", error.message, error);

    dispatch({
      type: ERROR_TO_GET_ALL_USERS,
      payload: error.message
    });
  }
};
