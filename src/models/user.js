import { query as queryUsers, queryCurrent } from '../services/user';
import { getUserToken } from '../utils/authority';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    username: getUserToken('username'),
  },

  effects: {
    *fetch(_, { call, put }) {
     const response = yield call(queryUsers);
      yield put({
        type: 'save'
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
     // let username = getUserToken('username')
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        username:getUserToken('username'),
        currentUser: action.payload || {},


      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
