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
    errorToken:'1',
  },
/*errorToken:0 不超时*/
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDeviceList, payload);
      // console.log('GetAppinfos',payload);
      if(payload.appKey&&response.resultcode=='1010005'){
        message.info('Token 超时！',1);
        yield put({
          type:'setErrorToken',
          payload:response.resultcode,
        });
        yield put(
          routerRedux.replace({
            pathname: '/'
          })
        )
        return ;
      }else{
        yield put({
          type:'setErrorToken',
          payload:'0',
        });
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
        payload: payload.appKey?payload:[],
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
    *loginoutReset({},{call,put}){

      yield put({
        type:'resetAll',
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
    setErrorToken(state, action) {
      //console.log('appDeviceList',action);
      return {
        ...state,
        errorToken: action.payload,
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
    },
    resetAll(state,action){

      return{
        ...state,
        appInfo: {},
        username: getUserToken('username'),
        deviceList:{},
        deviceDetail:{},
        deviceCMD:{},
        serviceCapabilities:{},
        deviceCMDResponse:{},
        deviceHistoryData:{},
        errorToken:'1',
      }
    }

  },
};
