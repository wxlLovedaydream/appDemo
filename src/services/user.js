import request from '../utils/request';
import { stringify } from 'qs';
import {getUserToken} from '../utils/authority.js';
export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request(`/PlatformAPP/currentUser?username=${getUserToken('username')}&timestamp=${Date.parse(new Date())}`);
}
