import { queryDeviceList } from '../services/api';
import {getUserToken } from '../utils/authority';
import {message} from 'antd';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
export default {
  namespace: 'devicelist',
  state: {
    appInfo: {},
    username: getUserToken('username'),
    deviceList:[],
  },
          /*appId: GpBmw73RIV7pTQK8FG4rbWcX4YEa
            pageno: 0
            pagesize: 10
            version: v1
            version_new: v1.1.0
            */
  effects:{
    *fetch({ payload,cb }, { call, put }){
      const response = yield call(queryDeviceList,payload);
      yield put({
        type:'appDeviceList',
        payload:response,
      });
      if(cb)cb();
    },
    *selectCurrentApp({payload},{put}){
      //console.log('selectCurrentApp',payload)
      yield put({
        type:'setCurrentApp',
        payload:payload,
      });
         yield put(
           routerRedux.push({
          pathname: '/device/devicelist',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    }
  },
  reducer:{
    appDeviceList(state,action){
      return {
        ...state,
        deviceList:action.payload,

      };
    },
    setCurrentApp(state,action){
      return {
        ...state,
        appInfo:action.payload,
      }
    }
  }
}
