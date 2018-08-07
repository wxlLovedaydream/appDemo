import {subscribeInterface } from '../services/api';
import {getUserToken } from '../utils/authority';
import {message} from 'antd';
export default {
  namespace: 'subscribelist',

  state: {
    subscribeResponse:{},
  },

  effects: {
    *sendSubscribeNotifyType({ payload }, { call, put }) {
      const response = yield call(subscribeInterface, payload);
      console.log('sendSubscribeNotifyType',payload);
     message.info(response.statusDes,2000);
      yield put({
        type: 'setSubscribeNotifyType',
        payload: response,
      });
    },
  },

  reducers: {
    setSubscribeNotifyType(state, action) {
      //console.log('appList',action.payload);
      return {
        ...state,
        subscribeResponse:action.payload,
      };
    },

  },
};
