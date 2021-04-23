<template>
    <div>
        <el-dialog :title="title" v-model="visible" :width="width" @close="onClose">
            <slot>Your Template</slot>
            
            <template #footer v-if="show">
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
        dialogtitle: string
        dialogwidth: string
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
            dialogtitle: {
                type: String as PropType<string>,
                default: ''
            },
            dialogwidth: {
                type: String as PropType<string>,
                default: '30%'
            },
            dialogFooter: {
                type: Boolean as PropType<boolean>,
                default: true
            }
        },
        setup(props, { emit }) {
            const { dialogVisible, dialogtitle, dialogwidth, dialogFooter } = toRefs(props as Props)

            const state = reactive<State>({
                visible: dialogVisible.value,
                title: dialogtitle.value,
                width: dialogwidth.value,
                show: dialogFooter.value
            })
            watch(
                ([dialogVisible, dialogtitle]),
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
