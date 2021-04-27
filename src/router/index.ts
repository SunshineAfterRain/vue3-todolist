import { createRouter , createWebHashHistory , RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
    {
        path: './todo',
        name: 'todo',
        component: () => import('@/views/todo.vue') 
    }
] 

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router