/*
 * @Author: Tango
 * @Date: 2021-04-27 12:12:11
 * @LastEditTime: 2021-12-16 17:16:35
 * @LastEditors: Tango
 * @Description:
 * @FilePath: \vite-todolist\src\router\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/todo'
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('@/views/todo.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/demo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
