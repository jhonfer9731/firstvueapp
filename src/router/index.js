import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cliente',
    name: 'Cliente',
    alias: '/',
    component: () => import(/* webpackChunkName: "registro" */ '../views/cliente/Cliente.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'productos',
        name: 'Productos',
        component: () => import(/* webpackChunkName: "productos" */ '../views/Productos.vue')
      },
      {
        path: 'registro',
        name: 'Registro',
        component: () => import(/* webpackChunkName: "registro" */ '../views/Registro.vue')
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/administrador/Admin.vue'),
    children: [
      {
        path: 'pizarra',
        name: 'Pizarra',
        alias: '/',
        component: () => import(/* webpackChunkName: "registro" */ '../views/administrador/Pizarra.vue')
      },
      {
        path: 'productos',
        name: 'ProductosAdmin',
        component: () => import(/* webpackChunkName: "productos" */ '../views/Productos.vue')
      }
    ]
  }
]

const router = new VueRouter({
  linkExactActiveClass: "clase-activacion-rutas",
  base: process.env.BASE_URL,
  mode: 'history',
  routes,

})

export default router
