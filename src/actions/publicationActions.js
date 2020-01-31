import axios from "axios";
import {
  LOADING_PUBLICATIONS,
  ERROR_TO_GET_ALL_PUBLICATION,
  GET_PUBLICATION_BY_USER
} from "../types/publicationTypes";


export const getUserById = (key) => async (dispatch, getState) => {
  try {
    const { users } = getState().userReducer;
    const userId = users[key].id

    const { publications } = getState().publicationReducer;
    const found = publications.filter(pub => pub.userId === userId)

      if ( ! found.length  ) {  
      dispatch({
        type: LOADING_PUBLICATIONS,
        payload: true
      });
      const response = await axios({
        method: "get",
        url: `http://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        headers: {},
        data: {}
      }); 

      const publicationsCurrent = [
      ...publications,
      ...response.data
      ];

      dispatch({
        type: GET_PUBLICATION_BY_USER,
        payload: publicationsCurrent,
      });
    }
  } catch (error) {
    console.error("Error: {}", error.message, error);

    dispatch({
      type: ERROR_TO_GET_ALL_PUBLICATION,
      payload: error.message
    });
  }
};
