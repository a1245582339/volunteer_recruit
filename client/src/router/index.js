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
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Index',
    hidden: true,
    children: [
      {
        name: 'index',
        path: 'index',
        component: () => import('@/views/index/index')
      },
      {
        name: 'courselist',
        path: 'courselist',
        params: {classid:'classid'},
        component: () => import('@/views/courselist/index'),
      },
      {
        name: 'coursedetail',
        path: 'coursedetail',
        component: () => import('@/views/course_detail/index'),
      },
      {
        name: 'news',
        path: 'news',
        params: { typeid: 'typeid' },
        component: () => import('@/views/news/index'),
      },
      {
        name: 'newsdetail',
        path: 'newsdetail',
        component: () => import('@/views/news_detail/index'),
      },
      {
        name: 'me',
        path: 'me',
        component: () => import('@/views/me/index'),
      },
      {
        name: 'order',
        path: 'order',
        component: () => import('@/views/order/index'),
      },
      {
        name: 'favorite',
        path: 'favorite',
        component: () => import('@/views/favorite/index'),
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
// export const asyncRouterMap = [
//   {
//     path: '/admin',
//     component: Layout,
//     redirect: '/admin/index',
//     meta: { title: '管理员管理', icon: 'form', roles: ['超级管理员','管理员'] }, // 页面需要的权限
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/admin/index'),
//         name: 'admin_change',
//         meta: { title: '管理员管理', icon: 'form', roles: ['超级管理员'] }
//       },
//       {
//         path: 'me',
//         component: () => import('@/views/me/index'),
//         name: 'Me',
//         meta: { title: '个人管理', icon: 'form' }
//       }
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ]
