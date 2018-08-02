import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { AccountLogin } from '../services/api';
import { setAuthority,setUserToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    username:undefined
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
     console.log('AccountLogin',response);
      let res ={...response} ;
      if(response.statuscode=='0'){
        //成功
        res.currentAuthor='user';
        res.type= 'account';
        res.username =payload.username;
      }else{
        res.currentAuthor='guest';
        res.type= 'account';
      }
      console.log('AccountLogin',res);
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
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
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
      setUserToken('');
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
     // console.log("changeLoginStatus",payload);
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
