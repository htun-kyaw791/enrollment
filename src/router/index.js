import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const getRole = ()=>{
  return localStorage.getItem("role")
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // meta: { requiresGuest: true },
    },
    {
      path: '/403',
      name: '403',
      component: () => import('../views/403.vue'),
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/Course.vue'),
      // meta: { requiresGuest: true },
    },
    {
      path: '/sections',
      name: 'sections',
      component: () => import('../views/Sections.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes

    },
    {
      path: '/tutor',
      name: 'tutor',
      component: () => import('../views/Tutor.vue'),
    },
    {
      path: '/coursedetailed',
      name: 'coursedetailed',
      component: () => import('../views/CourseDetailed.vue'),
      // meta: { requiresGuest: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      meta: { requiresGuest: true }, // Add a meta field for guest-only routes
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/Register.vue'),
      // meta: { requiresGuest: true }, // Add a meta field for guest-only routes
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('../views/student/Dashboard.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/teacher/profile',
      name: 'teacherprofile',
      component: () => import('../views/teacher/Profile.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('../views/teacher/Dashboard.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/teacher/class',
      name: 'teacherclass',
      component: () => import('../views/teacher/Class.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/Dashboard.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/student/profile',
      name: 'profile',
      component: () => import('../views/student/Profile.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/payment_type',
      name: 'paymenttype',
      component: () => import('../views/admin/payment_type/ListView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/payment_type_create',
      name: 'paymenttypecreate',
      component: () => import('../views/admin/payment_type/CreateView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/payment_type_edit',
      name: 'paymenttypedit',
      component: () => import('../views/admin/payment_type/EditView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/course',
      name: 'course',
      component: () => import('../views/admin/course/ListView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/coursecreate',
      name: 'coursecreate',
      component: () => import('../views/admin/course/CreateView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/courseedit',
      name: 'courseedit',
      component: () => import('../views/admin/course/EditView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/chapter',
      name: 'chapter',
      component: () => import('../views/admin/chapter/ListView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/chaptercreate',
      name: 'chaptercreate',
      component: () => import('../views/admin/chapter/CreateView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/chapteredit',
      name: 'chapteredit',
      component: () => import('../views/admin/chapter/EditView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/section',
      name: 'section',
      component: () => import('../views/admin/section/ListView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/sectioncreate',
      name: 'sectioncreate',
      component: () => import('../views/admin/section/CreateView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/sectionedit',
      name: 'sectionedit',
      component: () => import('../views/admin/section/EditView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/teacher',
      name: 'teacher',
      component: () => import('../views/admin/teacher/ListView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/teacheredit',
      name: 'teacheredit',
      component: () => import('../views/admin/teacher/EditView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/teachercreate',
      name: 'teachercreate',
      component: () => import('../views/admin/teacher/CreateView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/enrollment',
      name: 'enrollment',
      component: () => import('../views/admin/enrollment/ListView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/enrollmentedit',
      name: 'enrollmentedit',
      component: () => import('../views/admin/enrollment/EditView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/payment',
      name: 'payment',
      component: () => import('../views/admin/payment/ListView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/paymentedit',
      name: 'paymentedit',
      component: () => import('../views/admin/payment/EditView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    {
      path: '/admin/user',
      name: 'user',
      component: () => import('../views/admin/user/ListView.vue'),
      meta: { requiresAuth: true }, // Add a meta field for protected routes
    },
    
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }else if(to.meta.requiresAuth && isAuthenticated){
    const role = localStorage.getItem("role");
    if(to.path.startsWith('/admin') && role !== 'admin'){
      return next({ name: '403' });
    }else if(to.path.startsWith('/student') && role !== 'student'){
      return next({ name: '403' });
    }else if(to.path.startsWith('/teacher') && role !== 'teacher'){
      return next({ name: '403' });
    }
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'home' });
  }

  next();
});

export default router;
