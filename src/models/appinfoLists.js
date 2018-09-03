import { queryAppinfos,addApp,deleteAppInfo } from '../services/api';
import {getUserToken } from '../utils/authority';
import { routerRedux } from 'dva/router';
import {message} from 'antd';
export default {
  namespace: 'appinfoLists',
  state: {
    list: [],
    username:getUserToken('username'),
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAppinfos, payload);
       console.log('GetAppinfos',response);
        yield put({
        type: 'appList',
        payload:response.length>0 ? response : [],
      });
    },
    *add({payload},{call,put}){
      const param ={...payload,username:getUserToken('username')} ;
      console.log('add app',param);
      const response = yield call(addApp, param);
      const {res,appKey,appSecret,error_code}= response;
      const appinfo= [{...response},];
      //console.log('appinfo',appinfo);
      if(res=='0'){
        message.success('添加成功',1);
      }else{
        let err =' 添加失败';
        if(error_code=='100208'){
          err +=`: 应用ID或秘钥不正确！`;
        }
        if(res=='2'){
          err +=`: 应用已存在！`;
        }
        message.error(err,1);
      }
      yield put({
        type: 'append',
        payload: res=='0'?appinfo:null,
      });
    },
    *delete({payload},{call,put}){
      const response = yield call(deleteAppInfo, payload);
      if(response=='0'){
        message.success("应用删除成功",1);
      }else{
        message.error('应用删除失败',1);
      }
      yield put(routerRedux.push({pathname:'/'}));
    },
    *loginoutReset({},{call,put}){

      yield put({
        type:'resetAll',
      });
    },
  /*  *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },*/
  },

  reducers: {
    appList(state, action) {
      //console.log('appList',action.payload);
      return {
        ...state,
        list: action.payload,
        username:getUserToken('username'),
      };
    },
    append(state, action) {
     // console.log('action.payload',action);
      return {
        ...state,
        list: action.payload?state.list.concat(action.payload):state.list,
        username:getUserToken('username'),
      };
    },
    dropAppInfo(state, action){
      return {
        ...state,
        deleteApp:action.deleteApp
      };
    },
    resetAll(state, action){
      return {
        ...state,
        list: [],
        username:getUserToken('username'),
      };
    }
  },
};
