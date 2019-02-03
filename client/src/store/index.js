import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import errorLog from './modules/errorLog'
//import permission from './modules/permission'
import state from './state'
import * as mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    errorLog,
  },
  getters,
  state,
  mutations
})

export default store
