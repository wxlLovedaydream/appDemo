// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return sessionStorage.getItem('authority') || 'guest';
}

export function setAuthority(authority) {
  //console.log(localStorage.getItem('username'));
  return sessionStorage.setItem('authority', authority);
}
export function getUserToken(){
  console.log('getUserToken',sessionStorage.getItem('username'));
  return sessionStorage.getItem('username');
};
export function setUserToken(username){
  console.log('setUserToken',username);
  return sessionStorage.setItem('username', username);
}
export function removeUserToken(){
  //console.log('setUserToken',username);
  return sessionStorage.removeItem('username');
}

/*export function getUserToken(){
  //console.log(localStorage.getItem('username'))
  return localStorage.getItem('username');
};
export function setUserToken(username){
  console.log('setUserToken',username);
  return localStorage.setItem('username', username);
}*/

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

