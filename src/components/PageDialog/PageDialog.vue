<template>
    <!-- <el-dialog
        :title="title"
        v-model="visible"
        :width="width"
        :before-close="handleClose"
        custom-class="page-dialog"
        :append-to-body="appendToBody"
        :class="className"
        :fullscreen="fullscreen"
        :destroy-on-close="destroyOnClose"
    >
        <slot />
        <div v-if="btList" slot="footer" class="dialog-footer">
            <template
                v-for="(item, index) in btList.filter(
                (item) => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show)
            )"
            >
                <el-button
                    v-if="item.show"
                    :key="index"
                    :type="item.type"
                    :icon="item.icon"
                    :disabled="item.disabled"
                    :loading="btLoading"
                    @click="handleClick(item.event)"
                >{{ item.label }}</el-button>
            </template>
        </div>
    </el-dialog>-->

    
    
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, watch } from 'vue'
import { IbtList } from './dialogTypes'

export default defineComponent({
    name: 'PageDialog',
    props: {
        // 自定义类名
        className: {
            type: String as PropType<string>
        },
        // 弹窗标题
        title: {
            type: String as PropType<string>
        },
        // 弹窗是否显示
        visible: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        // 弹窗宽度
        width: {
            type: String as PropType<string>
        },
        // 按钮加载
        btLoading: {
            type: Boolean as PropType<boolean>
        },
        // 操作栏配置
        btList: {
            type: Array as PropType<IbtList[]>
        },
        // 是否销毁弹框内的元素
        destroyOnClose: {
            type: Boolean as PropType<boolean>,
            default: true
        },
        // 嵌套dialog 必须指定 为true
        appendToBody: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        // 是否设置为全屏
        fullscreen: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    emits: ['update:visible', 'handleClick'],
    setup(props, { emit }) {
        watch(
            () => props.visible,
            (visible) => {
                console.log(visible)
                emit('update:visible', visible)
            }
        )

        const handleClick = (event: string) => {
            emit('handleClick', event)
        }

        const handleClose = () => {
            console.log('....')
            emit('update:visible', false)
        }

        return {
            handleClick,
            handleClose
        }
    }
})
</script>

<style scoped></style>
