import {
   LOGIN_ERROR,
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_ERROR,
   REGISTER_REQUEST,
   REGISTER_SUCCESS,
} from './types/auth'
import { AuthData } from '../../pages/Login/Login'
import AuthService from '../../services/auth.service'
import { TokenService } from '../../services/token.service'
import { Dispatch } from 'redux'
import {setNotification} from "./notification";

export const loginRequest = () => {
   return {
      type: LOGIN_REQUEST,
   }
}

export const logout = () => {
   TokenService.delete()
   return {
      type: LOGOUT,
   }
}

export const loginSuccess = (token: string) => {
   TokenService.set(token)
   return {
      type: LOGIN_SUCCESS,
      payload: token,
   }
}

export const loginError = (error: Error) => {
   return {
      type: LOGIN_ERROR,
      payload: error,
   }
}

export const logoutUser = () => {
   return (dispatch: Dispatch) => {
      dispatch(logout())
   }
}


export const loginAdmin = (data: AuthData) => {
   return async (dispatch: Dispatch) => {
      dispatch(loginRequest())
      try {
         const res = await AuthService.login(data)
         if (res == undefined) {
            dispatch(setNotification('Incorrect data'))
         }
         if (res.error) {
            console.log(res.error)
            dispatch(logout())
            dispatch(setNotification(res.error))
            throw new Error(res.error)
         } else if (res.token !== undefined) {
            dispatch(loginSuccess(res.token))
         }
      } catch (e) {
         dispatch(loginError(e))
      }
   }
}