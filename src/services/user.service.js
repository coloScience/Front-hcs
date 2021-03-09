import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://10.1.0.180:8080/api/test/';
const API_ticked= 'http://10.1.0.180:8080/api/ticked/get';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getTicked() {
    return axios.get(API_ticked, { headers: authHeader() });
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
