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
} from './types/user'
import { IUser } from '../reducers/user'
import UserService from '../../services/user.service'
import { Dispatch } from 'redux'
import {UserData} from "../../pages/Index/Index";

export const getUserRequest = (user: IUser) => {
   return {
      type: GET_USER_REQUEST,
      payload: user,
   }
}

export const getUserSuccess = () => {
   return {
      type: GET_USER_SUCCESS,
   }
}

export const userError = (error: Error) => {
   return {
      type: GET_USER_ERROR,
      payload: error,
   }
}

export const clearUser = () => {
   return {
      type: CLEAR_USER,
   }
}

export const getAllUsersRequest = (users: IUser[], prevStateUsers: IUser[]) => {
   // prevStateUsers.concat(users)
   return {
      type: GET_ALL_USERS_REQUEST,
      payload: users,
   }
}

export const getAllUsersSuccess = () => {
   return {
      type: GET_ALL_USERS_SUCCESS,
   }
}

export const getRegisteredUser = () => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await UserService.getUser()
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(getUserRequest(res.data))
         dispatch(getUserSuccess())
      } catch (e) {
         dispatch(userError(e))
      }
   }
}

export const fetchingUsers = () => {
   return{
      type: IS_FETCHING_USERS
   }
}

export const fetchingSuccessUsers = () => {
   return{
      type: SUCCESS_FETCHED_USERS
   }
}

export const getAllUsers = (take: number, skip: number, users: IUser[]) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await UserService.getAllUsers(take, skip)
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(getAllUsersRequest(res, users))
         dispatch(getAllUsersSuccess())
      } catch (e) {
         dispatch(userError(e))
      }
   }
}

export const updateUserRequest = (user: UserData, users: IUser[], index: number) => {
   users[index].name = user.name
   users[index].surname = user.surname
      return{
         type: UPDATE_USER_REQUEST,
         payload: users
      }
}

export const updateUserSuccess = () => {
   return{
      type: UPDATE_USER_SUCCESS
   }
}

export const updateUser = (user: UserData, id: number, users: IUser[], index: number) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await UserService.upDateUserData(id, user)
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(updateUserRequest(user, users, index))
         dispatch(updateUserSuccess())
         dispatch(getAllUsersSuccess())

      } catch (e) {
         dispatch(userError(e))
      }
   }
}

export const setUserRequest = (user: IUser) => {
   return{
      type:GET_USER_BY_ID,
      payload: user
   }
}
export const setUserSuccess = () => {
   return{
      type:SUCCESS_USER_BY_ID,
   }
}



export const getUserById = (id: number) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await UserService.getUserById(id)
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(setUserRequest(res.data))
         dispatch(setUserSuccess())

      } catch (e) {
      }
   }
}

export const deleteUserRequest = (users: IUser[], index: number) => {
   users.splice(index, 1)
   return{
      type: DELETE_USER_REQUEST,
      payload: users
   }
}
export const deleteUserSuccess = () => {
   return{
      type: DELETE_USER_SUCCESS,
   }
}

export const deleteUser = (id: number, users: IUser[], index: number) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await UserService.deleteUserAndTodos(id)
         console.log(res)
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(deleteUserRequest(users, index))
         dispatch(deleteUserSuccess())

      } catch (e) {
      }
   }
}

export const blockUserRequest = (users: IUser[], index: number) => {
   users[index].isBlocked = true
   return{
      type:UPDATE_USER_REQUEST,
      payload: users
   }
}

export const blockUserSuccess = () => {
   return{
      type:UPDATE_USER_SUCCESS,
   }
}

export const blockUser = (id: number, users: IUser[], index: number) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await UserService.blockUser(id)
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(blockUserRequest(users, index))
         dispatch(blockUserSuccess())

      } catch (e) {
      }
   }
}

export const unblockUserRequest = (users: IUser[], index: number) => {
   users[index].isBlocked = false

   return{
      type:UPDATE_USER_REQUEST,
      payload: users
   }
}

export const unblockUserSuccess = () => {
   return{
      type:UPDATE_USER_SUCCESS,
   }
}

export const unblockUser = (id: number, users: IUser[], index: number) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await UserService.unblockUser(id)
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(unblockUserRequest(users, index))
         dispatch(unblockUserSuccess())

      } catch (e) {
      }
   }
}

export const blockUserDetail = (user: IUser) => {
   user.isBlocked = true
   return{
      type: BLOCK_USER_SUCCESS,
      payload: user
   }
}

export const unblockUserDetail = (user: IUser) => {
   user.isBlocked = false
   return{
      type: UNBLOCK_USER_SUCCESS,
      payload: user
   }
}










