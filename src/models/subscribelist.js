import {subscribeInterface ,getSubscribeUrl,deleteSubscribe,queryDeviceDataChanged} from '../services/api';
import {message} from 'antd';
import { getUserToken } from '../utils/authority';
export default {
  namespace: 'subscribelist',

  state: {
    subscribeResponse:{},
    subscribeUrl:{},
    deviceDataChanged:[],
  },

  effects: {
    *fetchSubscribeNotifyType({ payload }, { call, put }){
      const response = yield call(getSubscribeUrl, payload);
      console.log('getSubscribeInterface',payload);
     // message.info(response.statusDes,2000);
      yield put({
        type: 'setSubscribeUrl',
        payload: response,
      });
    },
    *deleteSubscribeUrl({ payload }, { call, put }){
      const response = yield call(deleteSubscribe, payload);
      console.log('deleteSubscribe',payload);
      if(response.status=='204'){
        let res = '删除成功';
        message.success(res,2);
      }else {
        message.info(response.status,2);
      }

    },
    *sendSubscribeNotifyType({ payload }, { call, put }) {
      const response = yield call(subscribeInterface, payload);
      console.log('sendSubscribeNotifyType',payload);
     message.info(response.statusDes,2);
      yield put({
        type: 'setSubscribeNotifyType',
        payload: response,
      });
    },
    *fetchDeviceDataChanged({ payload }, { call, put }){
      const response = yield call(queryDeviceDataChanged, payload);
      yield put({
        type: 'setDeviceDataChanged',
        payload: response,
      });
    },
    *loginoutReset({},{call,put}){
      yield put({
        type:'resetAll',
      });
    },
  },

  reducers: {
    setSubscribeUrl(state, action){
      return {
        ...state,
        subscribeUrl:action.payload,
      };
    },
    setSubscribeNotifyType(state, action) {
      //console.log('appList',action.payload);
      return {
        ...state,
        subscribeResponse:action.payload,
      };
    },
    setDeviceDataChanged(state, action){
      return {
        ...state,
        deviceDataChanged:action.payload,
      };
    },
    resetAll(state, action){
      return {
        ...state,
        subscribeResponse:{},
        subscribeUrl:{},
        deviceDataChanged:[],
      };
    }

  },
};
