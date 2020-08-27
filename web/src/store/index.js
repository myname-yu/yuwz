import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
  // Vuex 中的 mutation 非常类似于事件：每个 mutation 
  // 都有一个字符串的 事件类型(type) 和 一个 回调函数(handler) 。
  // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
  getters: {

  },
  mutations: {
  },
  //   Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
  actions: {
  },
  modules: {
  }
})
// state，驱动应用的数据源；
// view，以声明方式将 state 映射到视图；
// actions，响应在 view 上的用户输入导致的状态变化。
// export default new Vuex.Store({
 //*********// !this.$store.state.isLogin
//   state: {
//       isLogin: Boolean(sessionStorage.getItem('islogin')) || false,
//       userId: sessionStorage.getItem('userId') || 0,
//       username: sessionStorage.getItem('username') || '',
//   },
//   getters: {

//   },
 //*********// this.$store.commit("isLogin", res.data.results);
//   mutations: {
//       isLogin(state, payload) {
//           state.isLogin = true;
//           state.userId = payload.id;
//           state.username = payload.username;
//       },

//   },
 //*********//this.$store.dispatch("isLogin_action");
//   actions: {
//       isLogin_action(context) {
//           sessionStorage.removeItem('islogin');
//           // context.commit('isLogin');
//       }
//   },
//   modules: {}
// })