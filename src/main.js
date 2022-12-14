import Vue from 'vue'
import App from './app'
import router from '@router'
import '@components/_globals'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
require('@/src/store/modules/suscriber')
// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}
store.dispatch('attempt',localStorage.getItem('token'))
 
Vue.use(BootstrapVue)

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}