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
    deviceList:{},
  },
          /*appId: GpBmw73RIV7pTQK8FG4rbWcX4YEa
            pageno: 0
            pagesize: 10
            version: v1
            version_new: v1.1.0
            */
  effects:{
    *fetch({ payload}, { call, put }){
     // console.log('appInfo',this.state.appInfo);
      const response = yield call(queryDeviceList,payload);
      yield put({
        type:'appDeviceList',
        payload:response,
      });
    //  if(cb)cb();
    },
    *selectCurrentApp({payload},{call,put}){
      console.log('selectCurrentApp',payload)
      yield put({
        type:'setCurrentApp',
        payload:payload,
      });
/*         yield put(
           routerRedux.push({
            pathname: '/device/devicelist',
        })
      );*/
    }
  },
  reducer:{
    appDeviceList(state, action) {
      console.log('appList',action.payload);
      return {
        ...state,
        deviceList: action.payload,
      };
    },
/*    appDeviceList(state, action){
      return {
        ...state,
        deviceList:action.payload,
      };
    },*/
    setCurrentApp(state, action) {
      console.log('setCurrentApp',action.payload);
      return {
        ...state,
        appInfo:action.payload,
      };
    },
 /*   setCurrentApp(state,action){
      console.log('setCurrentApp',action.payload);
      return {
        ...state,
        appInfo:action.payload,
      }
    },*/
  }
}
