import cookie from 'react-cookies';

import { apiUrl } from '../config.json';
import http from './httpService';

const apiEndPoint = `${apiUrl}/user/login`;

const getJwt = () => {
  return cookie.load('x-auth-token') ? cookie.load('x-auth-token') : null;
};

http.setJwt(getJwt());

const setCookie = (headers) => {
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
  cookie.save('x-auth-token', headers['x-auth-token'], { expires });
};

const Login = async (email, password) => {
  const { headers } = await http.post(apiEndPoint, { email, password });
  setCookie(headers);
};

const Logout = () => {
  cookie.remove('x-auth-token');
};

export default { Login, Logout, getJwt };
