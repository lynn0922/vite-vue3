<template>
    <div>
        <el-dialog v-model="visible" :title="title" :width="width" @close="onClose">
            <slot>Your Template</slot>

            <template v-if="show" #footer>
                <span class="dialog-footer">
                    <el-button size="mini" @click="onClose">取 消</el-button>
                    <el-button size="mini" type="primary" @click="onConfirm">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { defineComponent, toRefs, reactive, watch, PropType } from 'vue'
    interface Props {
        dialogVisible: boolean
        dialogTitle: string
        dialogWidth: string
        dialogFooter: boolean
    }
    interface State {
        visible: boolean
        title: string
        width: string
        show: boolean
    }
    export default defineComponent({
        name: 'PageDialog',
        props: {
            dialogVisible: {
                type: Boolean as PropType<boolean>,
                default: false
            },
            dialogTitle: {
                type: String as PropType<string>,
                default: ''
            },
            dialogWidth: {
                type: String as PropType<string>,
                default: '30%'
            },
            dialogFooter: {
                type: Boolean as PropType<boolean>,
                default: true
            }
        },
        emits: ['update:dialogVisible', 'on-confirm'],
        setup(props, { emit }) {
            const { dialogVisible, dialogTitle, dialogWidth, dialogFooter } = toRefs(props as Props)

            const state = reactive<State>({
                visible: dialogVisible.value,
                title: dialogTitle.value,
                width: dialogWidth.value,
                show: dialogFooter.value
            })
            watch(
                [dialogVisible, dialogTitle],
                ([newValue, newTitle]) => {
                    state.visible = newValue
                    state.title = newTitle
                },
                { immediate: true }
            )
            const onClose = () => {
                emit('update:dialogVisible', false)
            }
            const onConfirm = () => {
                emit('on-confirm', 'confirm')
            }
            return {
                ...toRefs(state),
                onClose,
                onConfirm
            }
        }
    })
</script>
