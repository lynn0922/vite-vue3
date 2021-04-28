import { ElMessage } from 'element-plus'
import { ElNotification } from 'element-plus'

import { Position } from 'element-plus/lib/el-notification/src/notification.type'

interface MessageOpt {
    status: string
    message: string
    showClose: boolean
}

export const createMessage = (Opt: MessageOpt) => {
    ;(ElMessage as any)[Opt.status]({
        showClose: Opt.showClose,
        message: Opt.message,
        type: Opt.status
    })
}

interface Notification {
    title?: string
    message?: string
    type?: 'success' | 'warning' | 'info' | 'error'
    position?: Position
}

export const createNotification = (Opt: Notification) => {
    ElNotification({
        title: Opt.title,
        message: Opt.message,
        type: Opt.type,
        position: Opt.position
    })
}
