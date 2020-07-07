import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery';
import VueFirestore from 'vue-firestore';
Vue.use(VueFirestore)
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)
window.$ = window.jQuery = jQuery;
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import {fb} from '@/firebase.js';
import Swal from 'sweetalert2';

/* Swal */


window.Swal = Swal;


window.Toast = window.Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})



Vue.config.productionTip = false

export const bus = new Vue();

let app = null;
// Way to get the current User by setting an observer on the Auth Object
fb.auth().onAuthStateChanged(function (){

  if(!app){ // it renders the app until the callback is executed
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }

})



