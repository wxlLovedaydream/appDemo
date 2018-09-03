import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { AccountLogin } from '../services/api';
import { setAuthority,setUserToken,removeUserToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';
import {message} from 'antd';
export default {
  namespace: 'login',

  state: {
    status: undefined,
    username:undefined
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
    // console.log('AccountLogin',response);
      let res ={...response};
      if(response.statuscode=='0'){
        //成功
        res.currentAuthor=response.authorityid=='1'?'user':'admin';
        res.type= 'account';
        res.username =payload.username;
      }else{
        if(response.statuscode=='1'){
          message.error("用户名或密码错误",1);
        }else if(response.statuscode=='2'){
          message.error("用户不存在",1);
        }

        res.currentAuthor='guest';
        res.type= 'account';
      }
     // console.log('AccountLogin',res);
      yield put({
        type: 'changeLoginStatus',
        payload: res,
      });
      // Login successfully
      //console.log("Login successfully");
      if (response.status == 'OK') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        //console.log('redirect',redirect);
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
           // console.log('redirectUrlParams.origin',redirectUrlParams);
           // console.log('urlParams',urlParams);
            redirect = redirect.substr(urlParams.origin.length);
           /* if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }*/
            //console.log('redirect',redirect.indexOf('#'));
            if (redirect.indexOf('#')!=-1) {
              redirect = redirect.substr(redirect.indexOf('#'));
             // console.log('redirect',redirect.indexOf('/#'));
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
       // console.log('url',url)
       // console.log('redirect',redirect);
        yield put(
          routerRedux.push({
            pathname: '/',
          })
        );
       // yield put(routerRedux.replace('/'));
      //  yield put(routerRedux.replace( redirect || '/'));
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      removeUserToken();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
     console.log("changeLoginStatus",payload);
      setAuthority(payload.currentAuthor);
      setUserToken(payload.username);
      //console.log("setAuthority",payload);
      return {
        ...state,
        status: payload.status,
        username:payload.username,
        type: payload.type,
      };
    },
  },
};
