import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dong from '../views/Dong.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dong',
    name: 'Dong',
    component: Dong
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
