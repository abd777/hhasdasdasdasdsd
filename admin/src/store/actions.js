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
  //  ////////////////////////////////////////////
  // Functionality Related
  // ///////////////////////////////////////////

  subToOrders(s, p) {
    firebase.firestore().collection('orders').onSnapshot((snap) => {
      var arr = []
      snap.forEach((cat) => {
        arr.push(cat.data())
      })
      p(arr)
    })
  },
  subscribeToServices(s, p) {
    firebase.firestore().collection('services').onSnapshot(snap => {
      var arr = []
      snap.forEach(s => {
        arr.push(s.data())
      })
      p(arr)
    })
  },
  addService(s, p) {
    return new Promise((resolve, reject) => {
      var ref = firebase.firestore().collection('services').doc()
      var id = ref.id
      firebase.firestore().collection('services').doc(id).set({
        title: p.title,
        created_at: new firebase.firestore.Timestamp.fromDate(new Date()),
        created_by: firebase.auth().currentUser.uid,
        description: p.description,
        id: id,
        orders: 0,
        total_vendors: 0,
        category_ref: firebase.firestore().collection('categories').doc(p.category_id),
      }).then(() => {
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },
  editService(s, p) {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('services').doc(p.id).update({
        title: p.title,
        updated_at: new firebase.firestore.Timestamp.fromDate(new Date()),
        description: p.description,
        id: p.id,
        category_ref: firebase.firestore().collection('categories').doc(p.category_id),
      }).then(() => {
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deleteService(s, p) {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('services').doc(p.id).delete().then(() => {
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  }

}

export default actions
