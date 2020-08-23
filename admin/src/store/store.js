/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

import auth from "./auth/auth";
import categories from "./categories/index";
import users from "./users/index";
import services from "./services/index";
export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    'auth': auth,
    categories,
    users,
    services
  },
  strict: process.env.NODE_ENV !== 'production'
})
