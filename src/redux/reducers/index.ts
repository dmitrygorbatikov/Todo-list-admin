import { combineReducers } from 'redux'
import authReducer from './auth'
import notificationReducer from "./notification";
import userReducer from "./user";
import todosReducer from "./todos";

const rootReducer = combineReducers({
   auth: authReducer,
   note: notificationReducer,
   user: userReducer,
   todo: todosReducer
})

export default rootReducer
