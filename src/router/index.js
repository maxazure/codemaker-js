import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  { path: '/test',
    component: () => import('@/views/test/index') },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/projects',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/projects',
    name: 'projects',
    redirect: '/projects/index',
    component: Layout,
    meta: { title: '项目管理', icon: 'dashboard' },
    children: [{
      path: 'index',
      name: 'projects',
      component: () => import('@/views/projects'),
      meta: { title: '项目管理', icon: 'example' }
    }, {
      path: 'edit',
      component: () => import('@/views/projects/edit'),
      hidden: true,
      meta: { title: '修改项目' }
    },
    {
      path: 'add',
      component: () => import('@/views/projects/add'),
      hidden: true,
      meta: { title: '添加项目' }
    },
    {
      path: 'bricks',
      component: () => import('@/views/projects/bricks'),
      hidden: true,
      meta: { title: '模块' }
    },
    {
      path: 'bricks/add',
      component: () => import('@/views/projects/add_brick'),
      hidden: true
    },
    {
      path: 'bricks/edit',
      component: () => import('@/views/projects/edit_brick'),
      hidden: true
    },
    {
      path: 'bricks/config',
      component: () => import('@/views/projects/config'),
      // component: () => import('@/views/projects/config_copy'),
      // component: () => import('@/views/projects/config_nested'),
      hidden: true
    },
    {
      path: 'bricks/fields/add',
      component: () => import('@/views/projects/add_field'),
      hidden: true
    },
    {
      path: 'bricks/fields/edit',
      component: () => import('@/views/projects/edit_field'),
      hidden: true
    }
    ]
  },
  {
    path: '/templates',
    name: 'templates',
    redirect: '/templates/index',
    component: Layout,
    children: [{
      path: 'index',
      name: 'templates',
      component: () => import('@/views/templates'),
      meta: { title: '模板管理', icon: 'form' }
    },
    {
      path: 'edit',
      component: () => import('@/views/templates/edit'),
      hidden: true,
      meta: { title: '修改模板' }
    },
    {
      path: 'add',
      component: () => import('@/views/templates/add'),
      hidden: true,
      meta: { title: '添加模板' }
    }
    ]
  },
  {
    path: '/widgets',
    name: 'widgets',
    redirect: '/widgets/index',
    component: Layout,
    children: [{
      path: 'index',
      name: 'widgets',
      component: () => import('@/views/widgets'),
      meta: { title: '控件管理', icon: 'tree' }
    },
    {
      path: 'edit',
      component: () => import('@/views/widgets/edit'),
      hidden: true,
      meta: { title: '修改控件' }
    },
    {
      path: 'add',
      component: () => import('@/views/widgets/add'),
      hidden: true,
      meta: { title: '添加控件' }
    }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
