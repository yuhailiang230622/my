import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: () => import('../pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('../views/home'),
          meta: {
            name: '首页'
          }
        },
        {
          path: '/cart',
          component: () => import('../views/cart'),
          meta: {
            name: '购物车'
          }
        },
        {
          path: '/mine',
          component: () => import('../views/mine'),
          meta: {
            name: '个人中心'
          }
        },
        {
          path: '/sort',
          component: () => import('../views/sort'),
          meta: {
            name: '商品分类'
          }
        },
        {
          path: '*',
          redirect: '/home'
        }

      ]
    },
    {
      path: '/goodsDetail',
      component: () => import('../pages/goodsDetail'),
      meta: {
        name: '商品详情'
      }
    },
    {
      path: '/register',
      component: () => import('../pages/register'),
      meta: {
        name: '注册'
      }
    },
    {
      path: '/login',
      component: () => import('../pages/login'),
      meta: {
        name: '登录'
      }
    },
    {
      path: '/goodsList',
      component: () => import('../pages/goodsList'),
      meta: {
        name: '商品列表'
      }
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
