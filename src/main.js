import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import {fb} from '@/firebase.js';

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



