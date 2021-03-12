import axios from 'axios';
import authHeader from './auth-header';
import {localIp} from '../config/host.config'

const API_URL = localIp + '/api/test/';
const API_ticket= localIp + '/api/ticket/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getTicket(login) {
    return axios.get(API_ticket, { headers: authHeader(login) });
  }
  getUser() {
    return axios.get(API_ticket, { headers: authHeader() });
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getManagerBoard() {
    return axios.get(API_URL + 'manage', { headers: authHeader() });
  }

  getAdminBoard(login) {
    return axios.get(API_URL + 'admin', { headers: authHeader(login) });
  }
}

export default new UserService();
