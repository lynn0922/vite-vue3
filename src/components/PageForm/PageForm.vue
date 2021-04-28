<template>
    <el-form
        ref="formRef"
        class="page-form"
        :class="className"
        :model="formdata"
        :rules="rules"
        :label-width="labelWidth"
        :inline="inline"
        :label-position="labelPosition"
        :hide-required-asterisk="hideRequiredAsterisk"
        :status-icon="statusIcon"
        :disabled="disabled"
    >
        <el-form-item
            v-for="(item, index) in fieldList.filter(
                (item) => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show)
            )"
            :key="index"
            :prop="item.value"
            :label="item.label"
            :class="item.className"
        >
            <!-- solt -->
            <template v-if="item.type === 'slot'">
                <slot :name="'form-' + item.value" />
            </template>
            <!-- 普通输入框 -->
            <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                v-model="formdata[item.value]"
                :type="item.type"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
                @focus="handleEvent(item.event)"
            />
            <!-- 文本输入框 -->
            <el-input
                v-if="item.type === 'textarea'"
                v-model.trim="formdata[item.value]"
                :type="item.type"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
                :autosize="item.autosize || { minRows: 2, maxRows: 10 }"
                @focus="handleEvent(item.event)"
            />
            <!-- 计数器 -->
            <el-input-number
                v-if="item.type === 'inputNumber'"
                v-model="formdata[item.value]"
                :min="item.min"
                :max="item.max"
                @change="handleEvent(item.event)"
            />
            <!-- 选择框 -->
            <el-select
                v-if="item.type === 'select'"
                v-model="formdata[item.value]"
                :disabled="item.disabled"
                :value-key="item.key"
                :multiple="item.multiple"
                :collapse-tags="item.collapseTags"
                :filter-method="item.filterMethod"
                :remote="item.remote"
                :remote-method="item.remoteMethod"
                :loading="item.loading"
                :loading-text="item.loadingText"
                :reserve-keyword="item.reserveKeyword"
                :default-first-option="item.defaultFirstOption"
                :clearable="item.clearable"
                :filterable="item.filterable"
                :placeholder="getPlaceholder(item)"
                @change="handleEvent(item.event, formdata[item.value])"
            >
                <el-option
                    v-for="(childItem, childIndex) in listTypeInfo[item.list]"
                    :key="childIndex"
                    :disabled="childItem.disabled"
                    :label="childItem.key"
                    :value="childItem.value"
                />
            </el-select>
            <!-- 信息展示框 -->
            <el-tag v-if="item.type === 'tag'">
                {{
                    getDataName({
                        dataList: listTypeInfo ? listTypeInfo[item.list] : [],
                        value: 'value',
                        label: 'key',
                        data: formdata[item.value]
                    }) || '-'
                }}
            </el-tag>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
    import { defineComponent, onMounted, PropType, watch, ref } from 'vue'
    import { getDataName } from '@/utils/util'
    import { ElRef, Basic, Irules, IfieldList, IlistType } from './formtypes'

    export default defineComponent({
        name: 'PageForm',
        props: {
            // 自定义类名
            className: {
                type: String as PropType<string>,
                default: ''
            },
            // 表单数据
            formdata: {
                type: Object as PropType<Basic<any>>,
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                default: () => {}
            },
            // 相关字段
            fieldList: {
                type: Array as PropType<IfieldList[]>,
                required: true
            },
            // 验证规则
            rules: {
                type: Object as PropType<Basic<Irules[]>>
            },
            // label宽度
            labelWidth: {
                type: String as PropType<string>,
                default: '120px'
            },
            // 行内表单模式
            inline: {
                type: Boolean as PropType<boolean>,
                default: false
            },
            // label 对齐方式
            labelPosition: {
                type: String as PropType<string>,
                default: 'left'
            },
            // 必填字段是否显示红色星号
            hideRequiredAsterisk: {
                type: Boolean as PropType<boolean>,
                default: true
            },
            // 是否反馈结果图标
            statusIcon: {
                type: Boolean as PropType<boolean>,
                default: false
            },
            // 禁止表单输入， 该字段开启， form-item 的disabled失效
            disabled: {
                type: Boolean as PropType<boolean>,
                default: false
            },
            // 相关的列表
            listTypeInfo: {
                type: Object as PropType<Basic<IlistType[]>>,
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                default: () => {}
            },
            // ref
            refObj: {
                type: Object as PropType<ElRef>
            }
        },
        emits: ['update:refObj', 'handleEvent', 'handleClick'],
        setup(props, { emit }) {
            const formRef = ref<ElRef>()

            onMounted(() => {
                emit('update:refObj', formRef.value)
            })

            watch(
                () => props.formdata,
                () => {
                    emit('update:refObj', formRef.value)
                }
            )

            // 得到placeholder的显示
            const getPlaceholder = (row: any) => {
                let placeholder
                if (row.type === 'input' || row.type === 'textarea') {
                    placeholder = '请输入' + row.label
                } else if (row.type === 'select' || row.type === 'time' || row.type === 'date') {
                    placeholder = '请选择' + row.label
                } else {
                    placeholder = row.label
                }
                return placeholder
            }
            // 绑定的相关事件
            const handleEvent = (evnet: string, data?: any) => {
                emit('handleEvent', evnet, data)
            }
            // 派发按钮点击事件
            const handleClick = (event: string, data: any) => {
                emit('handleClick', event, data)
            }

            return {
                handleEvent,
                handleClick,
                getPlaceholder,
                getDataName,
                formRef
            }
        }
    })
</script>

<style lang="scss" scoped>
    // 自定义form相关
    .page-form {
        .el-form-item {
            display: inline-block;
            // float: left;
            width: 48%;
            .el-form-item__content {
                .el-input,
                .el-select,
                .el-textarea {
                    width: 240px;
                }
                .el-input-number {
                    .el-input {
                        width: inherit;
                    }
                }
            }
        }
        .el-form-block {
            display: block;
            width: 100%;
            .el-form-item__content {
                .el-textarea,
                .el-input {
                    width: 90%;
                }
            }
        }
    }
    .page-form-block {
        .el-form-item {
            display: block;
            .el-form-item__content {
                .el-input,
                .el-select,
                .el-textarea {
                    width: inherit;
                }
                .el-input-number {
                    .el-input {
                        width: inherit;
                    }
                }
            }
        }
        .el-form-block {
            display: block;
            width: 100%;
            .el-form-item__content {
                .el-textarea {
                    width: 100%;
                }
            }
        }
    }
</style>
