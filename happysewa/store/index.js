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
        console.log(res)
        StoreDB.collection('users').doc(res.user.uid).set({
          email: p.email,
          role: 'user',
          uid: res.user.uid
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
  },
  getServices(s, p) {
    return new Promise((resolve, reject) => {
      StoreDB.collection('services').get().then(snap => {
        var arr = []
        snap.forEach(s => {
          arr.push(s.data())
        })
        console.log(arr)
        resolve(arr)
      })

    })
  },
}
