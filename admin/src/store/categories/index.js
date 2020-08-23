import firebase from "firebase";
export default {
  actions: {
    subscribeToCategories(s, p) {
      firebase.firestore().collection('categories').onSnapshot(snap => {
        var arr = []
        snap.forEach(s => {
          arr.push(s.data())
        })
        p(arr)
      })
    },
    addCategories(s, p) {
      return new Promise((resolve, reject) => {
        var ref = firebase.firestore().collection('categories').doc()
        var id = ref.id
        firebase.firestore().collection('categories').doc(id).set({
          icon: p.icon,
          title: p.title,
          created_at: new firebase.firestore.Timestamp.fromDate(new Date()),
          created_by: firebase.auth().currentUser.uid,
          id: id,
        }).then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    editCategory(s, p) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection('categories').doc(p.id).update({
          title: p.title,
          updated_at: new firebase.firestore.Timestamp.fromDate(new Date()),
          icon: p.icon,
        }).then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    deleteCategory(s, p) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection('categories').doc(p.id).delete().then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
