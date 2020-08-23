import firebase from "firebase";
export default {
  actions: {
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
          image: p.image,
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
          image: p.image,
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
}
