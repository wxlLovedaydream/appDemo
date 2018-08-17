import { queryAppinfos,addApp } from '../services/api';
import {getUserToken } from '../utils/authority';
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
      const response = yield call(addApp, payload);
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
        message.error(err,1);
      }
      yield put({
        type: 'append',
        payload: res=='0'?appinfo:null,
      });
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
    resetAll(state, action){
      return {
        ...state,
        list: [],
        username:getUserToken('username'),
      };
    }
  },
};
