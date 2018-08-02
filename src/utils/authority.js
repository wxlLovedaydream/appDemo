// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('authority', authority);
}
export function getUserToken(){
  //console.log(localStorage.getItem('username'))
  return localStorage.getItem('username');
};
export function setUserToken(username){
  console.log('setUserToken',username);
  return localStorage.setItem('username', username);
}
export function getToken(){
  return localStorage.getItem('token');
}
export function setToken(token){
  return localStorage.setItem('token',token);
}
export function getRefreshToken(){
  return localStorage.getItem('refreshToken');
}
export function setRefreshToken(refreshToken){
  return localStorage.setItem('refreshToken',refreshToken);
}
export function getAppKeyAndSecret(){
  return localStorage.getItem('AppKeyAndSecret');
}
export function setAppKeyAndSecret(app){
  return localStorage.setItem('AppKeyAndSecret',app);
}

