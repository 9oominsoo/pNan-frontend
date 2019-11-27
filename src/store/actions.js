// src/vuex/actions.js
import { ACCESSTOKEN, IS_AUTH } from './mutation_types';
import axios from 'axios';

const setIsAuth = ({ commit }, data) => {
  commit(IS_AUTH, data);
};
const setAccessToken = ({ commit }, data) => {
  commit(ACCESSTOKEN, data);
};
const processResponse = (store, loginResponse) => {
  if (loginResponse.data.token) {
    setIsAuth(store, true);
    setAccessToken(store, loginResponse.data.token);
  } else {
    setIsAuth(store, false);
    setAccessToken(store, '');
  }
};

export default {
  async login (store, { uid, password }) {
    const loginResponse = await axios.post('/api/v1/auth/login', { id: uid, pw: password });
    processResponse(store, loginResponse);
  },
  logout (store) {
    setIsAuth(store, false);
    setAccessToken(store, '');
    window.localStorage.removeItem('pnan');
    window.localStorage.clear();
  }
};
