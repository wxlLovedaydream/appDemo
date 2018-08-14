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
      // console.log('GetAppinfos',payload);
        yield put({
        type: 'appList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *add({payload},{call,put}){
      const response = yield call(addApp, payload);
      const {res,appKey,appSecret}= response;
      const appinfo= [{...response},];
      //console.log('appinfo',appinfo);
      if(res=='0'){
        message.success('添加成功');
      }else{
        message.error('添加失败');
      }
      yield put({
        type: 'append',
        payload: res=='0'?appinfo:null,
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
  },
};
