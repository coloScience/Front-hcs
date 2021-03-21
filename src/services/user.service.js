import axios from 'axios';
import authHeader from './auth-header';
import {localIp} from '../config/host.config'

const API_URL = localIp + '/api/test/';
const API_ticket = localIp + '/api/ticket/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getTicket(link, props, data) {
    return axios.post(link, { headers: authHeader(props), data});
  }
  getStatus(link, props, data) {
    return axios.post(link, { headers: authHeader(props), data});
  }
  getUser() {
    return axios.get(API_ticket, { headers: authHeader() });
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getManagerBoard() {
    return axios.get(API_URL + 'manager', { headers: authHeader() });
  }

  getAdminBoard(login) {
    return axios.get(API_URL + 'admin', { headers: authHeader(login) });
  }
}

export default new UserService();
