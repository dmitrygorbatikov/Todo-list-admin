import axios from 'axios'
import { TokenService } from './token.service'
import {UserData} from "../pages/Index/Index";

class UserService {
   private static apiUrl = 'http://localhost:5000/user'

    public static getUser() {
        return axios
            .get(this.apiUrl, {
                headers: {
                    token: TokenService.get(),
                },
            })
            .then((res) => {
                return res.data
            })
            .catch((err) => {})
    }

    public static getAllUsers(take: number, skip: number) {
        return axios
            .get(`${this.apiUrl}/get-all?take=${take}&skip=${skip}`, {
                headers: {
                    token: TokenService.get(),
                },
            })
            .then((res) => {
                return res.data
            })
            .catch((err) => {})
    }

    public static upDateUserData(id: number, data: UserData){
        return axios
            .put(`${this.apiUrl}/${id}`, data)
            .then((res) => {
                return res.data
            })
            .catch((err) => {
            })
    }

    public static getUserById(id:number){
        return axios
            .get(`${this.apiUrl}/${id}`)
            .then((res) => {
                return res.data
            })
            .catch((err) => {
            })
    }

    public static deleteUserAndTodos(id: number){
        return axios
            .delete(`${this.apiUrl}?id=${id}`)
            .then((res) => {
                return res.data
            })
            .catch((err) => {
            })
    }

    public static blockUser(id: number){
        return axios
            .put(`${this.apiUrl}/block/${id}`)
            .then((res) => {
                return res.data
            })
            .catch((err) => {
            })
    }

    public static unblockUser(id: number){
        return axios
            .put(`${this.apiUrl}/unblock/${id}`)
            .then((res) => {
                return res.data
            })
            .catch((err) => {
            })
    }



}

export default UserService
