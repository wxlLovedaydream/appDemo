import { queryDeviceList,queryDeviceDetail ,queryDeviceCommand,queryDeviceCapabilities,
  sendCommands,queryDeviceHistoryData,registerDevice,modifyDeviceInfo} from '../services/api';
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
    *registerDevice({payload},{call,put}){
     const {appInfo,device} = payload;
      console.log('registerDevice',payload);

      const response = yield call(registerDevice,{...appInfo,verifyCode:device.verifyCode});
      if(response.status=='400'){
        message.error('设备验证码已存在或者该设备已注册');
      }else  if(response.deviceId){
        // console.log('response',response);
        // yield call(modifyDeviceInfo,{appKey:appInfo.appKey,accessToken:appInfo.accessToken,deviceId:'b0bca13f-8a97-4ac7-9c60-23bb2999646b',...device});

        yield call(modifyDeviceInfo,{appKey:appInfo.appKey,accessToken:appInfo.accessToken,deviceId:response.deviceId,...device});
     /*   routerRedux.push({
          pathname: '/device/devicelist',
        })*/
        message.success('设备注册成功！',1);
        yield put(
          routerRedux.push({
            pathname: '/device/devicelist',
          })
        );
      }else{
        message.error('注册失败');
      }


 /*     yield put({
        type:'setDeviceHistoryData',
        payload:response,
      });*/
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
