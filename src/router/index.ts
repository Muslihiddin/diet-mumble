import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home',
          redirect: {name: 'dishes'}
        },
        {
          path: 'dishes',
          name: 'dishes',
          component: () => import('../views/Home/Composites/Dishes.vue')
        },
        {
          path: 'restaurants',
          name: 'restaurants',
          component: () => import('../views/Home/Composites/Restaurants.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  if(to === '/') {
    return { name: 'dishes'}
  }
})

export default router
