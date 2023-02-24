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
          redirect: { name: 'meals' }
        },
        {
          path: 'meals',
          name: 'meals',
          component: () => import('../views/Home/Composites/MealsView.vue')
        },
        {
          path: 'restaurants',
          name: 'restaurants',
          component: () => import('../views/Home/Composites/RestaurantsView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue')
    },
  ]
})

router.beforeEach((to) => {
  if (to === '/') {
    return { name: 'meals' }
  }
})

export default router
