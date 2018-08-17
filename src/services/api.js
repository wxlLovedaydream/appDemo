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
  return request(`/PlatformAPP/UserLogin?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}

export async function Register(params) {
  return request(`/PlatformAPP/UserRegister?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}
export async function queryAppinfos(params){
  return request(`/PlatformAPP/GetAppinfos?username=${getUserToken('username')}&timestamp=${Date.parse(new Date())}`);
}
export async function addApp(params){
  return request(`/PlatformAPP/AddAppinfo?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}

export async function queryAppDetail(params){
  return request(`/PlatformAPP/getAppDetail?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}
export async function queryDeviceList(params){
  return request(`/PlatformAPP/QueryDeviceList?${stringify(params)}&timestamp=${Date.parse(new Date())}`);
}
export async function queryDeviceDetail(params){
  return request(`/PlatformAPP/QueryDeviceDetail?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function queryDeviceCommand(params){
  return request(`/PlatformAPP/QueryDeviceCommand?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function queryDeviceCapabilities(params){
  return request(`/PlatformAPP/QueryDeviceCapabilities?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function sendCommands(params){
  return request(`/PlatformAPP/SendCommands?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function queryDeviceHistoryData(params){
  return request(`/PlatformAPP/QueryDeviceHistoryData?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function subscribeInterface(params){
  return request(`/PlatformAPP/SubscribeInterface?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function getSubscribeUrl(params){
  return request(`/PlatformAPP/GetSubscribeInterface?timestamp=${Date.parse(new Date())}&${stringify(params)}`)
}
export async function deleteSubscribe(params){
  return request(`/PlatformAPP/DeleteSubscribe?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function deleteBatchSubscribe(params){
  return request(`/PlatformAPP/DeleteSubscribe?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}
export async function queryDeviceDataChanged(params){
  return request(`/PlatformAPP/QueryDeviceDataChanged?${stringify(params)}&timestamp=${Date.parse(new Date())}`)
}





