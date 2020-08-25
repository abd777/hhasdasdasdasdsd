import firebase from "firebase";
export default {
  actions: {
    subscribeToServices(s, p) {
      firebase.firestore().collection('services').where('created_by', '==', firebase.auth().currentUser.uid).onSnapshot(snap => {
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

        p.created_at = new firebase.firestore.Timestamp.fromDate(new Date())
        p.created_by = firebase.auth().currentUser.uid
        p.id = id
        p.image = p.image || ''
        p.orders = 0
        p.category_ref = firebase.firestore().collection('categories').doc(p.category_ref)
        firebase.firestore().collection('services').doc(id).set(p).then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    editService(s, p) {
      return new Promise((resolve, reject) => {
        console.log(p)
        p.updated_at = new firebase.firestore.Timestamp.fromDate(new Date())
        p.category_ref = firebase.firestore().collection('categories').doc(p.category_ref.id)

        firebase.firestore().collection('services').doc(p.id).update(
          p
        ).then(() => {
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
}
