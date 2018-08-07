import { stringify } from 'qs';
import request from '../utils/request';
import {getUserToken} from '../utils/authority.js';
export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}
export async function queryNotices() {
  return request('/api/notices');
}

/*export async function Register(params) {
  return request('/UserRegister', {
    method: 'POST',
    body: params,
  });
}*/
export async function AccountLogin(params) {
  return request(`/UserLogin?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}

export async function Register(params) {
  return request(`/UserRegister?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}
export async function queryAppinfos(params){
  return request(`/GetAppinfos?username=${getUserToken('username')}&timestamp=${Date.parse(new Date())}`);
}
export async function addApp(params){
  return request(`/AddAppinfo?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}

export async function queryAppDetail(params){
  return request(`/getAppDetail?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}
export async function queryDeviceList(params){
  return request(`/QueryDeviceList?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}
export async function queryDeviceDetail(params){
  return request(`/QueryDeviceDetail?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function queryDeviceCommand(params){
  return request(`/QueryDeviceCommand?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function queryDeviceCapabilities(params){
  return request(`/QueryDeviceCapabilities?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function sendCommands(params){
  return request(`/SendCommands?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function queryDeviceHistoryData(params){
  return request(`/QueryDeviceHistoryData?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function subscribeInterface(params){
  return request(`/SubscribeInterface?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function getSubscribeInterface(params){
  return request(`/GetSubscribeInterface?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}




