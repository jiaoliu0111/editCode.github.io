import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    name: 'Home',
    path: '/home',
    component:() => import('@/views/home')
  },
  {
    name: 'List',
    path: '/list',
    component:() => import('@/views/list')
  }
]

const router = new createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
