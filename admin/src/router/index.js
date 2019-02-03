import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '后台管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order',
    name: 'Order',
    meta: { title: '订单管理', icon: 'money' },
    children: [
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'money' }
      }
    ]
  },
  {
    path: '/courses',
    component: Layout,
    redirect: '/courses/courses_edit',
    name: 'Courses',
    meta: { title: '课程管理', icon: 'component' },
    children: [
      {
        path: 'courses_edit',
        name: 'courses_edit',
        component: () => import('@/views/courses/index'),
        meta: { title: '课程管理', icon: 'component' }
      },
      {
        path: 'courses_class',
        name: 'courses_class',
        component: () => import('@/views/courses_class/index'),
        meta: { title: '课程分类管理', icon: 'component' }
      }
      // {
      //   path: 'banner',
      //   name: 'banner',
      //   component: () => import('@/views/banner/index'),
      //   meta: { title: '首页轮播课程', icon: 'excel' }
      // }
    ]
  },
  // {
  //   path: '/news',
  //   component: Layout,
  //   redirect: '/news/news_edit',
  //   name: 'News',
  //   meta: { title: '资讯管理', icon: 'documentation' },
  //   children: [
  //     {
  //       path: 'news_edit',
  //       name: 'news_edit',
  //       component: () => import('@/views/news/index'),
  //       meta: { title: '资讯管理', icon: 'documentation' }
  //     },
  //     {
  //       path: 'news_type',
  //       name: 'news_type',
  //       component: () => import('@/views/news_type/index'),
  //       meta: { title: '资讯分类管理', icon: 'documentation' }
  //     },
  //     {
  //       path: 'news_visit_log',
  //       name: 'news_visit_log',
  //       component: () => import('@/views/news_visit_log/index'),
  //       meta: { title: '资讯访问日志', icon: 'chart' }
  //     }
  //   ]
  // },
  {
    path: '/student',
    component: Layout,
    redirect: '/student/student',
    name: 'Student',
    meta: { title: '学生信息管理', icon: 'peoples' },
    children: [
      {
        path: 'student',
        name: 'student',
        component: () => import('@/views/student/index'),
        meta: { title: '学生信息', icon: 'peoples' }
      }
    ]
  }
  // {
  //   path: '/favorite',
  //   component: Layout,
  //   redirect: '/favorite/courses_favorite',
  //   name: 'Favorite',
  //   meta: { title: '收藏夹管理', icon: 'star' },
  //   children: [
  //     {
  //       path: 'courses_favorite',
  //       name: 'courses_favorite',
  //       component: () => import('@/views/courses_favorite/index'),
  //       meta: { title: '课程收藏夹', icon: 'star' }
  //     },
  //     {
  //       path: 'news_favorite',
  //       name: 'news_favorite',
  //       component: () => import('@/views/news_favorite/index'),
  //       meta: { title: '资讯收藏夹', icon: 'star' }
  //     }
  //   ]
  // }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    meta: { title: '管理员管理', icon: 'lock', roles: ['超级管理员', '管理员'] }, // 页面需要的权限
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/index'),
        name: 'admin_change',
        meta: { title: '管理员管理', icon: 'lock', roles: ['超级管理员'] }
      },
      {
        path: 'me',
        component: () => import('@/views/me/index'),
        name: 'Me',
        meta: { title: '个人管理', icon: 'user' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
