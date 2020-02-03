import axios from "axios";
import {
  LOADING_PUBLICATIONS,
  ERROR_TO_GET_ALL_PUBLICATION,
  UPDATED_USER_PUB
} from "../types/publicationTypes";
import * as userType from '../types/userTypes';

const { GET_ALL_USERS : GET_ALL_USERS_LIST } =  userType;

export const getUserById = (key) => async (dispatch, getState) => {
  try {
    const { users } = getState().userReducer;
    const userId = users[key].id

    const { publications } = getState().publicationReducer;
     

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

      const customDataPublication = response.data.map( (publication) => ({
         ...publication,
         comments: [],
         opened: false
      }));

      const publicationsCurrent = [
      ...publications, 
         customDataPublication
      ];

      dispatch({
        type: UPDATED_USER_PUB, payload: publicationsCurrent
      });

      const publicationKey = publicationsCurrent.length;
      const userUpdated = [...users];
      userUpdated[key] = { ...userUpdated[key], publicationKey }

      dispatch({
        type: GET_ALL_USERS_LIST, payload: userUpdated
      });


    
  } catch (error) {
    console.error("Error: {}", error.message, error);

    dispatch({
      type: ERROR_TO_GET_ALL_PUBLICATION,
      payload: 'Publicaciones no disponibles'
    });
  }
};


export const openClose = (publicationKey, key) => (dispatch, getState) => {
  const { publications } = getState().publicationReducer;
  debugger;
  const selected = publications[publicationKey - 1][key];

  const updated = {
    ...selected,
    opened: !selected.opened
  };

  const publicationUpdated = [...publications];

  
  publicationUpdated[publicationKey] = [
   ...publications[publicationKey - 1]
  ]

   publicationUpdated[publicationKey -1 ][key] = updated;

         dispatch({
        type: UPDATED_USER_PUB, payload: publicationUpdated
      });

}

export const getComments = (publicationKey, key) => async (dispatch, getState) => {
    const { publications } = getState().publicationReducer;
  debugger;
  const selected = publications[publicationKey - 1][key];

  const answer = 
  await axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${selected.id}`);

  const updated = {
    ...selected,
    comments: answer.data
  };


  const publicationUpdated = [...publications];

  
  publicationUpdated[publicationKey] = [
   ...publications[publicationKey - 1]
  ]

   publicationUpdated[publicationKey -1 ][key] = updated;

  dispatch({
        type: UPDATED_USER_PUB, payload: publicationUpdated
  });

}