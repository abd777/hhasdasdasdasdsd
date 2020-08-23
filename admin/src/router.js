/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import firebase from "firebase"
import Vue from 'vue'
import Router from 'vue-router'
import store from "./store/store"
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      beforeEnter: (to, from, next) => {
        console.log('in main befire enter hook ', firebase.auth().currentUser)
        if (firebase.auth().currentUser) {
          next()
        } else {
          next('/pages/login')
        }
      },
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue'),
        },
        {
          path: '/manage_service',
          name: 'service',
          component: () => import('./views/Services.vue')
        }, 
        {
          path: '/manage_categories',
          name: 'Categories',
          component: () => import('./views/Categories.vue')
        }, 
        {
          path: '/manage_users',
          name: 'users',
          component: () => import('./views/Users.vue')
        },


        {
          path: '/manage_orders',
          name: 'orders',
          component: () => import('./views/Orders.vue')
        },
        {
          path: '/sign_out',
          name: 'signout',
          component: () => import('./views/Signout.vue')
        },
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue'),
          beforeEnter: (from, to, next) => {
            var cUser = firebase.auth().currentUser
            console.log('in login befire enter hook ', cUser)
            if (!cUser) {
              next()
            } else {
              next('/')
            }
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})



export default router
