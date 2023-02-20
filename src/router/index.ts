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
          redirect: {name: 'meals'}
        },
        {
          path: 'meals',
          name: 'meals',
          component: () => import('../views/Home/Composites/Meals.vue')
        },
        {
          path: 'restaurants',
          name: 'restaurants',
          component: () => import('../views/Home/Composites/Restaurants.vue')
        }
      ]
    },
  ]
})

router.beforeEach((to, from) => {
  if(to === '/') {
    return { name: 'meals'}
  }
})

export default router
