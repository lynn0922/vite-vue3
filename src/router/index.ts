import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { PageEnum, RoteName } from '@/enum/route'

const routes: Array<RouteRecordRaw> = [
    {
        path: PageEnum.ROOT,
        name: RoteName.ROOT,
        redirect: PageEnum.TAGLIBRARY,
        meta: {
            title: 'Root'
        }
    },
    {
        path: PageEnum.TAGLIBRARY,
        name: RoteName.TAGLIBRARY,
        meta: {
            title: '标签库'
        },
        component: () => import('@/views/qywxManage/tagLibrary/index.vue')
    },
    {
        path: PageEnum.TAGUSERDETAIL,
        name: RoteName.TAGUSERDETAIL,
        meta: {
            title: '标签库详情'
        },
        component: () => import('@/views/qywxManage/tagLibrary/tagUserDetail.vue')
    },
    {
        path: PageEnum.WXUSERMANAGE,
        name: RoteName.WXUSERMANAGE,
        meta: {
            title: '微信用户管理'
        },
        component: () => import('@/views/qywxManage/wxUserManage/index.vue')
    },
    {
        path: PageEnum.WXUSERDETAIL,
        name: RoteName.WXUSERDETAIL,
        meta: {
            title: '微信用户详情'
        },
        component: () => import('@/views/qywxManage/wxUserManage/wxUserDetail.vue')
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
