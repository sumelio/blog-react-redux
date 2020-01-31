import { GET_ALL_PUBLICATION,  ERROR_TO_GET_ALL_PUBLICATION, GET_PUBLICATION_BY_USER, LOADING_PUBLICATIONS } from "../types/publicationTypes";

const INITIAL_STATE = {
  publications: [],
  loading: false,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  debugger;
  switch (action.type) {
    case GET_ALL_PUBLICATION:
      return {
        ...state,
        publications: action.payload,
        loading: false,
        error: null
      };
      case GET_PUBLICATION_BY_USER:
        return {
          ...state,
          publications: action.payload,
          loading: false,
          error: null
        };
      case LOADING_PUBLICATIONS:
        return {
          ...state,
          loading: action.payload,
          error: null
        };
      case ERROR_TO_GET_ALL_PUBLICATION:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default: return state;
  }
};
