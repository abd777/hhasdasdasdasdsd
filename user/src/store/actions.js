import firebase from 'firebase'

/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

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

  subToOrders(s, p) {
    firebase.firestore().collection('orders').where('user_id', '==', firebase.auth().currentUser.uid).onSnapshot((snap) => {
      var arr = []
      snap.forEach((cat) => {
        arr.push(cat.data())
      })
      p(arr)
    })
  },
  changeStatus(s, p) {
    return new Promise((resolve, reject) => {
      var db = firebase.firestore()
      const newRating = p.item.rating ? (p.item.rating + p.rating) / 2 : p.rating;
      db.collection('orders').doc(p.item.id).update({
        status: 'completed',
        rating: newRating
      }).then((snap) => {
        resolve()
      }).catch(err => {
        reject()
      })
    })
  }
}

export default actions
