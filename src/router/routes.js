// import store from '@state/store'
import store from '../store/modules/user'

export default [
 {
    path: '/dashboard',
    name: 'dashboard',
    component: () => lazyLoadView(import('@views/home')),
    
    meta: {
      authRequired: false,
      title: 'Dashboard' 

    },
  //  props: (route) => ({ user: store.state.auth.user || {}}),
  },
  
  {
    path: '/service/airtime',
    name: 'Airtime Transaction',
    component: () => lazyLoadView(import('@views/service/airtime')),
    meta: {
      authRequired: false,
      title: 'Airtime Transaction' 
    },
  // props: (route) => ({ user: store.state.auth.user || {}}),
  },
  {
    path: '/service/data',
    name: 'Data Transaction',
    component: () => lazyLoadView(import('@views/service/data')),
    meta: {
      authRequired: false,
      title: 'Data Transaction' 
    },
  //  props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/service/userbyid/:id',
    name: 'User Transaction',
    component: () => lazyLoadView(import('@views/service/userbyid')),
    meta: {
      authRequired: false,
      title: 'User Transaction' 
    },
  //  props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/service/upgrade',
    name: 'Merchant Upgrade',
    component: () => lazyLoadView(import('@views/service/upgrade')),
    meta: {
      authRequired: false,
      title: 'Merchant Upgrade' 
    },
  //  props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/service/transfer',
    name: 'Transfer Transaction',
    component: () => lazyLoadView(import('@views/service/transfer')),
    meta: {
      authRequired: false,
      title: 'Transfer Transaction' 
    },
 // props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/service/bill',
    name: 'Bill Transaction',
    component: () => lazyLoadView(import('@views/service/bill')),
    meta: {
      authRequired: false,
      title: 'Bill Transaction' 
    },
  // props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/service/tv',
    name: 'Tv Transaction',
    component: () => lazyLoadView(import('@views/service/tv')),
    meta: {
      authRequired: false,
      title: 'Tv Transaction' 
    },
 // props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/settings/admin-settings',
    name: 'Admin Settings',
    component: () => lazyLoadView(import('@views/settings/admin-settings')),
    meta: {
      authRequired: false,
      title: 'Admin Settings' 
    },
 // props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/service/referral',
    name: 'Referral ',
    component: () => lazyLoadView(import('@views/service/referral')),
    meta: {
      authRequired: false,
      title: 'Referral' 
    },
 // props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/settings/network',
    name: 'Network Settings',
    component: () => lazyLoadView(import('@views/settings/network')),
    meta: {
      authRequired: false,
      title: 'Network Settings' 
    },
 // props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/settings/broadcast',
    name: 'Broadcast',
    component: () => lazyLoadView(import('@views/settings/broadcast')),
    meta: {
      authRequired: false,
      title: 'Broadcast' 
    },
 // props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/settings/password',
    name: 'Reset Password',
    component: () => lazyLoadView(import('@views/settings/password')),
    meta: {
      authRequired: false,
      title: 'Password' 
    },
 // props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/users/userdetailtransaction/:id/:user',
    name: 'Transaction Details',
    component: () => lazyLoadView(import('@views/users/userdetailtransaction')),
    meta: {
      authRequired: false,
      title: 'Transaction Details' 
    },
 // props: (route) => ({ user: store.state.auth.currentUser || {}}),
  },
  {
    path: '/',
    name: 'login',
    component: () => lazyLoadView(import('@views/login')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.state.user !== null) {
          console.log(store.state.user)
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => lazyLoadView(import('@views/register')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.state.user !== null) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/confirm-account',
    name: 'confirm-account',
    component: () => lazyLoadView(import('@views/confirm')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: () => lazyLoadView(import('@views/forgetPassword')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/verify',
    name: 'Reset Password',
    component: () => lazyLoadView(import('@views/verify')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.state.user !== null) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.meta.authRequired
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/_404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@views/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
