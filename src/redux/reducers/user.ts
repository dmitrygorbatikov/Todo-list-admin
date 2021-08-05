import { AnyAction } from 'redux'
import {
   BLOCK_USER_SUCCESS,
   CLEAR_USER, DELETE_USER_REQUEST, DELETE_USER_SUCCESS,
   GET_ALL_USERS_REQUEST,
   GET_ALL_USERS_SUCCESS,
   GET_USER_BY_ID,
   GET_USER_ERROR,
   GET_USER_REQUEST,
   GET_USER_SUCCESS,
   IS_FETCHING_USERS,
   SUCCESS_FETCHED_USERS,
   SUCCESS_USER_BY_ID, UNBLOCK_USER_SUCCESS,
   UPDATE_USER_REQUEST,
   UPDATE_USER_SUCCESS,
} from '../actions/types/user'

export interface IUser {
   id: number
   name: string
   surname: string
   email: string
   registerDate: string
   role: string
   isBlocked: boolean
}

interface UserState {
   user: IUser | null
   error?: Error
   isLoading: boolean
   users: IUser[]
   isFetching: boolean
}

const initState: UserState = {
   isLoading: false,
   user: null,
   users: [],
   isFetching: false,
}

function userReducer(state = initState, action: AnyAction): UserState {
   switch (action.type) {
      case GET_USER_SUCCESS:
         return {
            ...state,
            isLoading: false,
         }
      case GET_USER_REQUEST:
         return {
            ...state,
            user: action.payload,
            isLoading: true,
         }
      case GET_USER_ERROR:
         return {
            ...state,
            error: action.payload,
            isLoading: false,
         }
      case CLEAR_USER:
         return {
            ...state,
            isLoading: false,
            user: null,
         }
      case GET_ALL_USERS_REQUEST:
         return {
            ...state,
            isLoading: true,
            users: action.payload,
         }
      case GET_ALL_USERS_SUCCESS:
         return {
            ...state,
            isLoading: false,
         }
      case IS_FETCHING_USERS:
         return {
            ...state,
            isFetching: true,
         }
      case SUCCESS_FETCHED_USERS:
         return {
            ...state,
            isFetching: false,
         }
      case UPDATE_USER_REQUEST:
         return {
            ...state,
            isLoading: true,
            users: action.payload
         }
      case UPDATE_USER_SUCCESS:
         return {
            ...state,
            isLoading: false,
         }
      case GET_USER_BY_ID:
         return {
            ...state,
            isLoading: true,
            user: action.payload
         }
      case SUCCESS_USER_BY_ID:
         return {
            ...state,
            isLoading: false,
         }
      case DELETE_USER_REQUEST:
         return {
            ...state,
            isLoading: true,
            users: action.payload
         }
      case DELETE_USER_SUCCESS:
         return {
            ...state,
            isLoading: false,
         }
      case BLOCK_USER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            user: action.payload
         }
      case UNBLOCK_USER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            user: action.payload
         }
      default:
         return state
   }
}
export default userReducer
