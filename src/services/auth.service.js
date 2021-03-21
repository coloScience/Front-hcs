import axios from 'axios';
import {localIp} from '../config/host.config'

const API_URL = localIp + '/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      firstName: user.firstName,
      secondName: user.secondName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      brithDay: user.brithDay,
      street: user.street,
      house: user.house,
      flat: user.flat,
      username: user.username,
      password: user.password,
      repeatPassword: user.repeatPassword
    });
  }
}

export default new AuthService();
