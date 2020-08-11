import {
  auth,
  StoreDB
} from '../services/firebase'
export const state = () => ({
  user: null
})
export const mutations = {
  setUser(s, p) {
    s.user = p
  }
}
export const getters = {
  getUser(s) {
    return s.user
  }
}
export const actions = {
  signout(s, p) {
    auth.signOut()
  },
  signup(s, p) {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(p.email, p.password).then(res => {
        StoreDB.collection('users').doc(res.uid).set({
          email: p.email,
          role: 'user'
        }).then(res => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }).catch((err) => {
      reject(err)
    })
  },
  login(s, p) {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(p.email, p.password).then(res => {
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
