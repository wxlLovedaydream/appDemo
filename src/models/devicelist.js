import { queryDeviceList,queryDeviceDetail ,queryDeviceCommand,queryDeviceCapabilities,
  sendCommands,queryDeviceHistoryData} from '../services/api';
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
    deviceDetail:{},
    deviceCMD:{},
    serviceCapabilities:{},
    deviceCMDResponse:{},
    deviceHistoryData:{},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDeviceList, payload);
      // console.log('GetAppinfos',payload);
      if(response.error_code==''){

      }
      yield put({
        type: 'appDeviceList',
        payload:response,
      });
    },
    *selectCurrentApp({payload},{call,put}){
      console.log('selectCurrentApp',payload);
      yield put({
        type: 'setCurrentApp',
        payload: payload,
      });
      yield put(
        routerRedux.push({
          pathname: '/',
        })
      );
    },
    *queryDeviceDetail({payload},{call,put}){
      const response = yield call(queryDeviceDetail,payload);
     // console.log('queryDeviceDetail response',response);
      yield put({
        type: 'setDeviceDetail',
        payload: response,
      });
    },
    *queryDeviceCMD({payload},{call,put}){
      const response = yield call(queryDeviceCommand,payload);
      yield put({
        type:'setDeviceCMD',
        payload:response,
      })
    },
    *queryDeviceCapabilities({payload},{call,put}){
      const response = yield call(queryDeviceCapabilities,payload);
      yield put({
        type:'setDeviceCapabilities',
        payload:response,
      });
    },
    *sendDeviceCMD({payload},{call,put}){
      const response = yield call(sendCommands,payload);
      yield put({
        type:'setDeviceCMDResponse',
        payload:response,
      });
    },
    *fetchDeviceHistoryData({payload},{call,put}){
      const response = yield call(queryDeviceHistoryData,payload);
      yield put({
        type:'setDeviceHistoryData',
        payload:response,
      });
    },
  },

  reducers: {
    appDeviceList(state, action) {
      //console.log('appDeviceList',action);
      return {
        ...state,
        deviceList: action.payload,
      };
    },
    setCurrentApp(state, action) {
      console.log('setCurrentApp action.payload',action);
      return {
        ...state,
        appInfo:action.payload,
      };
    },
    setDeviceDetail(state, action){
      return {
        ...state,
        deviceDetail:action.payload,
      }
    },
    setDeviceCMD(state,action){
      return{
        ...state,
        deviceCMD:action.payload,
      }
    },
    setDeviceCapabilities(state,action){
      return{
        ...state,
        serviceCapabilities:action.payload,
      }
    },
    setDeviceCMDResponse(state,action){
      return{
        ...state,
        deviceCMDResponse:action.payload,
      }
    },
    setDeviceHistoryData(state,action){
      return{
        ...state,
        deviceHistoryData:action.payload,
      }
    }

  },
};
