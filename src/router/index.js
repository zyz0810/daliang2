import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
import Main from '@/view/layout/sidebar/app-main'
Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/view/login/login'),
    meta: { title: '登录',}
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'admin',
        name: 'adminhome',
        component: () => import('@/view/admin/index'),
        meta: {title: '首页'}
      }
    ]
  },
  // 配置404页面
  {
    path: '*',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import('@/view/admin/404'),
        meta: {title: '网页走丢了'}
      }
    ]
  },
]
//所有权限路由
export default new Router({
  mode: 'hash',
  routes: constantRouterMap
})

//动态权限路由
export const asyncRouterMap = [
  {
    path: '/task',
    hidden: false,
    component: Layout,
    meta: {icon: '',title: '流向流量业务系统',permissionRouter:[1]},
    children:[
      {
        path:'list',
        component: Main,
        meta: {icon: 'svg-listico',title: '任务列表'},
        children:[
              {
                hidden: true,
                path:'/task/list',
                name:'list',
                component: () => import('@/view/task/list'),
                meta: {icon: '',title: '任务列表',isshow:'1'},
              },
              {
                hidden: true,
                path:'taskadd',
                name:'listtaskadd',
                component: () => import('@/view/task/addinfo'),
                meta: {icon: '',title: '添加任务'},
              },
              {
                hidden: true,
                path:'taskdetails',
                component: Main,
                meta: {icon: '',title: '合同详情'},
                children:[
                   {
                     hidden: true,
                     path:'/task/list/taskdetails',
                     name:'taskdetails',
                     component: () => import('@/view/task/details'),
                     meta: {icon: '',title: '合同详情',isshow:'1'},
                   },
                   {
                     hidden: true,
                     path:'taskinfo',
                     name:'taskinfo',
                     component: () => import('@/view/task/info'),
                     meta: {icon: '',title: '详情'},
                   }
                ]
              }
          ]
      },
      {
        hidden: false,
        path:'datalist',
        name:'datalist',
        component: () => import('@/view/Dataresults/list'),
        meta: {icon: 'svg-dataico',title: '数据结果'},
      }
    ],
  },
  {
    path: '/Salestask',
    hidden: false,
    component: Layout,
    meta: {icon: '',title: '流向流量业务系统',permissionRouter:[2]},
    children:[
      {
        path:'list',
        component: Main,
        meta: {icon: 'svg-listico',title: '任务列表'},
        children:[
          {
            hidden: true,
            path:'/Salestask/list',
            name:'Saleslist',
            component: () => import('@/view/task/list'),
            meta: {icon: '',title: '任务列表',isshow:'1'},
          },
          {
            hidden: true,
            path:'taskdetails',
            component: Main,
            meta: {icon: '',title: '合同详情'},
            children:[
               {
                 hidden: true,
                 path:'/Salestask/list/taskdetails',
                 name:'Salestaskdetails',
                 component: () => import('@/view/task/details'),
                 meta: {icon: '',title: '合同详情',isshow:'1'},
               },
               {
                 hidden: true,
                 path:'taskinfo',
                 name:'Salestaskinfo',
                 component: () => import('@/view/task/info'),
                 meta: {icon: '',title: '详情'},
               }
            ]
          }
        ]
      },
      {
        path:'forwardlist',
        component: Main,
        meta: {icon: 'svg-listico',title: '转发任务列表'},
        children:[
          {
            hidden: true,
            path:'/Salestask/forwardlist',
            name:'forwardlist',
            component: () => import('@/view/forward/list'),
            meta: {icon: '',title: '转发任务列表',isshow:'1'},
          },
          {
            hidden: true,
            path:'forwardinfo',
            component: Main,
            meta: {icon: '',title: '合同详情'},
            children:[
               {
                 hidden: true,
                 path:'/Salestask/forwardlist/forwardinfo',
                 name:'Salesforwardinfo',
                 component: () => import('@/view/task/details'),
                 meta: {icon: '',title: '合同详情',isshow:'1'},
               },
               {
                 hidden: true,
                 path:'taskinfo',
                 name:'Salesforwardinfotaskinfo',
                 component: () => import('@/view/task/info'),
                 meta: {icon: '',title: '详情'},
               }
            ]
          }
        ]
      },
      {
        hidden: false,
        path:'datalist',
        name:'Salestasklist',
        component: () => import('@/view/Dataresults/list'),
        meta: {icon: 'svg-dataico',title: '数据结果'},
      },
      {
        hidden: false,
        path:'user',
        name:'userlist',
        component: () => import('@/view/UserSet/list'),
        meta: {icon: 'svg-UserSetting',title: '人员管理'},
      }
    ],
  },

]
