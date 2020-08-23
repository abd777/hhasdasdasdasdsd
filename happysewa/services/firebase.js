// This is `services/fireinit.js`

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
var config = {
  apiKey: "AIzaSyBXbdMX41IDBbscri5ak03V8SM9k00K3wA",
  authDomain: "blanker-e763d.firebaseapp.com",
  databaseURL: "https://blanker-e763d.firebaseio.com",
  projectId: "blanker-e763d",
  storageBucket: "blanker-e763d.appspot.com",
  messagingSenderId: "1047943751171",
  appId: "1:1047943751171:web:e8d6ea182c1c186a84d036"
}
console.log('here');
!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase
