import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [   //常规配置
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/login',  //登录
    name: 'login',
    component: () => import('../views/login/index')
  },
  {
    path: '/home',  //布局页
    name: 'home',
    redirect:'/index',
    meta:{title:'首页',roles: ['input','approve'] },
    component: () => import('../layout/index'),
    // children:[

    // ]
  }
]

export const asyncRoutes = [   //异步路由  
  {
    path: '/index',   //首页
    name: 'index',
    meta:{title:'首页',roles: ['input','approve']},
    component: () => import('../views/home/index')
  },
  {
    path: '/loan-input',   //贷款申请
    name: 'loan-input',
    meta:{title:'贷款申请',roles: ['input']},
    component: () => import('../views/loan-input/index')
  },
  {
    path: '/input-manager',
    name: 'input-manager',
    meta: { title: '申请管理' ,roles: ['input']},
    component: () => import('../views/input-manager/index'),
  },
  {
    path: '/loan-approve',   //贷款审批
    name: 'loan-approve',
    meta:{title:'贷款审批',roles: ['approve']},
    component: () => import('../views/loan-approve/index'),
    children:[
      {
        path: '/loan-approve/first',   //初审
        name: 'first',
        meta:{title:'初审'},
        component: () => import('../views/loan-approve/first')
      },
      {
        path: 'end',   //终审
        name: 'end',
        meta:{title:'终审'},
        component: () => import('../views/loan-approve/end')
      },
    ]
  },
  {
    path: '/contract',
    name: 'contract',
    meta: { title: '标的管理' ,roles: ['approve']},
    component: () => import('@/views/contract/index'),
  },
  {
    path: '/permission',
    name: 'permission',
    meta: { title: '权限管理'},
    component: () => import('@/views/permission/index'),
    children:[
      {
        path: '/permission/list',
        meta: { title: '列表展示' },
        component: () => import('@/views/permission/list'),
      }
    ]
  },
]

const router = new VueRouter({
  routes:constantRoutes
})

export default router
