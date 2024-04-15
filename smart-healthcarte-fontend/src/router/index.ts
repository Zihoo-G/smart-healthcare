import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/test.vue')
    },
    {
      path: '/departments',
      name: 'Departments',
      component: () => import('@/views/department.vue'),
      children: [
        {
          name: 'DepartmentInfo',
          path: 'info/:id',
          component: () => import('@/views/department-info.vue')
        }
      ]
    },
    {
      path: '/department/recommendation',
      name: 'DepartmentRecommendation',
      component: () => import('@/views/department-recommendation.vue')
    },
    {
      path: '/person/info',
      name: 'PersonInfo',
      component: () => import('@/views/person-info.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem('accessToken')
  if (hasToken) {
    const userStore = useUserStore()
    if (!userStore.user.username || userStore.user.id === 0) {
      userStore.getUserInfo()
    }
    next()
  }
})

export default router
