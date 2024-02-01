import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/myanime',
      name: 'myanime',
      component: () => import('../views/MyAnime.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/suggestion',
      name: 'suggestion',
      component: () => import('../views/Suggestion.vue')
    }
  ]
})

export default router
