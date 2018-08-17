import { Register } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';
import {message} from 'antd';
export default {
  namespace: 'register',
  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(Register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      //注册成功
     console.log('response',response);
      if(response.status==='OK'){
        reloadAuthorized();
        message.success('注册成功，请登录！',1);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        let url = `${urlParams.origin}/#/user/login`;
       window.location.href = url;
      /*  if (redirect) {
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
        }*/
       // yield put(routerRedux.replace(redirect || '/'));
      }else if(response.status==='1'){
        //注册失败
        message.error('注册失败',1);
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
