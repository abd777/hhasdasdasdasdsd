/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'
// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.use(Vuesax)


// axios
import axios from "./axios.js"
Vue.prototype.$http = axios

// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import {
  VueHammer
} from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')


Vue.config.productionTip = false
// NOTE
// Please use your own firebase details below. For more details visit: https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/development/firebaseIntegration.html
import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXbdMX41IDBbscri5ak03V8SM9k00K3wA",
  authDomain: "blanker-e763d.firebaseapp.com",
  databaseURL: "https://blanker-e763d.firebaseio.com",
  projectId: "blanker-e763d",
  storageBucket: "blanker-e763d.appspot.com",
  messagingSenderId: "1047943751171",
  appId: "1:1047943751171:web:e8d6ea182c1c186a84d036"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    firebase.firestore().collection("users").doc(user.uid).get().then(snapshot => {
      console.log('Role', snapshot.data());
      if (snapshot.exists && snapshot.data() != null && snapshot.data().role == "admin") {
        console.log('portion');
        store.commit('setUser', snapshot.data())
      } else {
        console.log('else portion');
        firebase.auth().signOut().then(res => {
          router.push('/pages/login')
          store.commit('setUser', null)
        })
      }
    }).catch(err => {
      console.log('Error', err);
    })
  } else {}
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
