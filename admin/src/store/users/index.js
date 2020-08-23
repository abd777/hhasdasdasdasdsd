import firebase from "firebase";
export default {
  actions: {
    subscribeToUsers(s, p) {
      firebase.firestore().collection('users').where('role', '==', 'user').onSnapshot(snap => {
        var arr = []
        snap.forEach(s => {
          arr.push(s.data())
        })
        p(arr)
      })
    },
    subscribeToVendors(s, p) {
      firebase.firestore().collection('users').where('role', '==', 'vendor').onSnapshot(snap => {
        var arr = []
        snap.forEach(s => {
          arr.push(s.data())
        })
        p(arr)
      })
    },
    blockUser(s, p) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection('users').doc(p.uid).update({
          status: p.status == 'blocked' ? 'active' : 'blocked'
        }).then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
