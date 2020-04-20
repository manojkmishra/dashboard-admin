import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('access_token') || null,
    roles: [],
  },

  plugins: [createPersistedState({storage: sessionStorage})],
  
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    isAdmin(state) {
      const roles = state.roles
      return (roles.includes("admin") ? true : false) 
    }
  },

  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
    getRoles(state, roles) {
      state.roles = roles
    },
    destroyRoles(state) {
      state.roles = []
    },
  },

  actions: {
    
    
    /**-------------------------------------------------------------------
    ***                   Retrieve User Details
    ***-------------------------------------------------------------------
    *** Function: The login function. This retrieves a token for the user
    *** and saves it into state and sessionStorage
    ***------------------------------------------------------------------
    **/
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', {
          email: credentials.email,
          password: credentials.password
        })
        .then(response => {
          const token = response.data.access_token
          sessionStorage.setItem('access_token', token)
          context.commit('retrieveToken', token)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    getUserDetails(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/auth/me')
        .then(response => {
          
          const _roles = response.data.roles
          const roles = []

          _roles.forEach(el => {
            roles.push(el.role)
            //console.log(el.role)
          })

          context.commit('getRoles', roles)

          resolve(response)
        })
        .catch(error => {
            reject(error)
            console.log(error)
        })
      })
    },

    /**-------------------------------------------------------------------
    ***                    Destroy User Details
    ***-------------------------------------------------------------------
    *** Function: The logout function. This destroys the token for the 
    *** user and their user details
    ***-------------------------------------------------------------------
    **/
    destroyUserDetails(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/auth/logout')
          .then(response => {
            sessionStorage.removeItem('access_token')
            context.commit('destroyToken')
            context.commit('destroyRoles')
            resolve(response)
          })
          .catch(error => {
            sessionStorage.removeItem('access_token')
            context.commit('destroyToken')
            context.commit('destroyRoles')
            reject(error)
          })
        })
      }
    },

    destroyUserDetails2(context) {
      sessionStorage.removeItem('access_token')
      context.commit('destroyToken')
      context.commit('destroyRoles')
    }

  }
})
