import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PaymentPage from '../views/PaymentPage.vue'
import { useOrderStore } from '../stores/order'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'رقمي بلس - أرقام عالمية للتفعيل والشات'
    }
  },
  {
    path: '/payment/:bundleId',
    name: 'payment',
    component: PaymentPage,
    meta: {
      title: 'رقمي بلس - إتمام الدفع',
      requiresUserInfo: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard to prevent direct access to payment without user info
router.beforeEach((to, from, next) => {
  const title = to.meta?.title || 'رقمي بلس'
  document.title = title

  // Check if route requires user info
  if (to.meta.requiresUserInfo) {
    const orderStore = useOrderStore()
    
    // If user info is missing, redirect to home
    if (!orderStore.hasUserInfo()) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
