import axios from "axios";
import {TokenService} from "./token.service";


class TodoServices{
    private static apiUrl = 'http://localhost:5000/todo'

    static getTodosById(userId: number) {
        return axios
            .get(`${this.apiUrl}/user?id=${userId}`, )
            .then((res) => {
                return res.data
            })
            .catch((err) => {})
    }

    static DeleteUserTodo(id: number) {
        return axios
            .delete(`${this.apiUrl}/${id}`, {
                headers: {
                    token: TokenService.get(),
                },
            })
            .then((res) => {
                return res.data
            })
            .catch((err) => {})
    }
}

export default TodoServices