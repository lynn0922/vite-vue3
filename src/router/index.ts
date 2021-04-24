import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { PageEnum } from '@/enum/route'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Root',
        redirect: PageEnum.USERMANAGE,
        meta: {
            title: 'Root'
        }
    },
    {
        path: '/userManage',
        name: 'userManage',
        meta: {
            title: '个人用户管理'
        },
        component: () => import('@/views/qywxManage/userManage/userManage.vue')
    },
    {
        path: '/userDetail',
        name: 'userDetail',
        meta: {
            title: '个人用户详情'
        },
        component: () => import('@/views/qywxManage/userManage/userDetail.vue')
    },
    {
        path: '/crowdManage',
        name: 'crowdManage',
        meta: {
            title: '人群管理'
        },
        component: () => import('@/views/qywxManage/userManage/crowdManage.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export function setupRouter(app: App<Element>) {
    app.use(router)
}

export default router
