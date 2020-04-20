
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

//Filters file
import "./filter"

//Boostrap, Admin, Fontawesome CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/sb-admin-2.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

//JQuery, Popper and Bootstrap JS files
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import {initialize} from './helper';
//VForm 
import { Form, HasError, AlertError } from 'vform'
initialize(store, router);
//Use JQuery globally
window.$ = window.jQuery = require('jquery');

//Laravel-Vue Pagination
Vue.component('pagination', require('laravel-vue-pagination'));

//Vue Multi Select
import VueMultiSelect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
Vue.component('multiselect', VueMultiSelect)

// Vue Form
window.Form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

// SweetAlert
import swal from 'sweetalert2'
window.swal = swal
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
window.toast = toast
window.Fire = new Vue()

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_URL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


