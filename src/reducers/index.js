import { combineReducers } from 'redux';
import userReducer from './userReducer'
import publicationReducer from './publicationReducer'
import taskReducer from './taskReducer'

export default combineReducers({
    userReducer,
    publicationReducer,
    taskReducer
})