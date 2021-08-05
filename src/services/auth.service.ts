import axios from 'axios'
import { AuthData } from '../pages/Login/Login'

class AuthService {
   private static apiUrl = 'http://localhost:5000/auth'

   public static login(data: AuthData) {
      return axios
         .post(`${this.apiUrl}/admin-login`, data, {})
         .then((res) => {
            const token: string = res.data.token
            localStorage.setItem('token', token)
            this.setToken(token)
            return res.data
         })
         .catch((err) => {})
   }

   public static setToken(token: string) {
      axios.defaults.headers.common['token'] = token
   }
}

export default AuthService
