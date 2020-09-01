import {
  auth,
  StoreDB,
  fb
} from '../services/firebase'
import {
  getField,
  updateField
} from 'vuex-map-fields'
export const state = () => ({
  user: null,
  loginModal: false
})
export const mutations = {
  setUser(s, p) {
    s.user = p
  },
  updateField
}
export const getters = {
  getUser(s) {
    return s.user
  },
  getField
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
  placeOrder(s, p) {
    console.log(p.user)
    return new Promise((resolve, reject) => {
      var o = {
        service_ref: StoreDB.collection('services').doc(p.item.id),
        service_name: p.item.name,
        selectedTime: p.selectedTime,
        placed_at: fb.firestore.Timestamp.fromDate(new Date()),
        placed_by: StoreDB.collection('users').doc(p.user.uid),
        user_id: p.user.uid,
        user_name: p.user.fullName || 'A User',
        vendor_ref: StoreDB.collection('users').doc(p.item.created_by),
        vendor_id: p.item.created_by,
        status: 'pending'
      }
      var dRef = StoreDB.collection('orders').doc()
      o['id'] = dRef.id
      dRef.set(o).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}
