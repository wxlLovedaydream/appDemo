import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { AccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
     // console.log(response);
      let res ={...response} ;
      if(response.statuscode=='0'){
        //成功
        res.currentAuthor='user';
        res.type= 'account';
      }else{
        res.currentAuthor='guest';
        res.type= 'account';
      }
      //console.log(res);
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
          //console.log('redirect',redirect);
          const redirectUrlParams = new URL(redirect);
          //console.log('redirectUrlParams',redirectUrlParams);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
           // console.log(redirect);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
           // window.location.href = urlParams.origin;
          } else {
            window.location.href = redirect;
            return;
          }
        }
        console.log(redirect);
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
      console.log("setAuthority",payload);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
