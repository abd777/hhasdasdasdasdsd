// This is `@plugins/fireauth.js`

import {
  auth,
  StoreDB
} from '@/services/firebase.js'
export default context => {
  const {
    store
  } = context
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        let userData = null
        //loading user's data from firestore
        const ref = StoreDB.collection('users').doc(user.uid).get().then(res => {
          //got the data here 
          userData = res.data()
          if (userData === null || userData.role != 'user') {
            // signout if user have no data in the DB
            store.dispatch('signout')
            resolve()
          } else {
            // set the user obj otherwise
            store.commit('setUser', userData)
            resolve()
          }
        })
      } else {
        // empty the user object
        store.commit('setUser', null)
        resolve()
        // just go to the main page from wherever the signput triggered
      }
    })
  })
}
