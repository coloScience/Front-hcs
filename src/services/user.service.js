import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const API_ticket= 'http://localhost:8080/api/ticket/get';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getTicket(login) {
    return axios.get(API_ticket, { headers: authHeader(login) });
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader(login) });
  }
}

export default new UserService();
