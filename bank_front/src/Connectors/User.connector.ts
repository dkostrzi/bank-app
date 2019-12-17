import axios from 'axios';
import { API_URL } from "../utils/api";

export default class UserConnector {
    public static updateUser(data: any, token: string) {
        return axios.put(`${API_URL}/user`, data, {headers: { Authorization: `JWT ${token}`,}})
    }
}