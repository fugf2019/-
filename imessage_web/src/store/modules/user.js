import {login, getUserInfo, logout} from '@/api/auth/login'
import {getToken, removeToken, setToken} from '@/utils/auth'

const state = {
  token: getToken(),
  username: null,
  user_id: null,
  role: null,
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLE: (state, roles) => {
    state.role = roles
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },
};

const actions = {
  // user login
  login({commit}, userInfo) {
    const username = userInfo.username.trim();
    const password = userInfo.password.trim();

    return new Promise((resolve, reject) => {
      login(username, password).then(response => {
        setToken(response.token);
        commit('SET_TOKEN', response.token);

        resolve()
      }).catch(error => {
        console.log('r', error);
        removeToken();
        reject('用户名或者密码不正确')
      })
    })
  },

  getUserInfo({commit, state}) {
    return new Promise(async (resolve, reject) => {
      if (!state.token) return;
      const response = await getUserInfo(state.token);
      commit('SET_USERNAME', response.username);
      commit('SET_USER_ID', response.id);
      commit('SET_ROLE', response.role ? response.role.name : null);


      resolve(response)
    })
  },

  logout({commit, state}) {
    return new Promise(resolve => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_USERNAME', '');
        commit('SET_USER_ID', '');
        commit('SET_ROLE', null);
        removeToken();
        resolve()
      })
    })
  },

  // get user info fail then logout
  fedLogOut({commit}) {
    commit('SET_TOKEN', '');
    commit('SET_USERNAME', '');
    commit('SET_USER_ID', '');
    commit('SET_ROLE', null);
    removeToken();
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
