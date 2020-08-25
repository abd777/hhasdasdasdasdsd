/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import firebase from 'firebase'
const actions = {

  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth({
    commit
  }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },
  //for setting the user
  setUser({
    commit
  }, payload) {
    commit("setUser", payload);
  },
  // VxAutoSuggest
  updateStarredPage({
    commit
  }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited({
    commit
  }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({
    commit
  }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({
    commit
  }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme({
    commit
  }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo({
    commit
  }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },

  // /////////////////////////////////////////////
  // Functionality
  // /////////////////////////////////////////////
  loadCategories({
    commit
  }, p) {
    firebase.firestore().collection('categories').get().then((snap) => {
      var arr = []
      snap.forEach((cat) => {
        arr.push(cat.data())
      })
      commit('setCategories', arr)
    })
  }
}

export default actions
