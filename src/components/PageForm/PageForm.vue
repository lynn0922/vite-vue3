<template>
    <el-form ref="form" class="page-form" :class="className" :model="data" :rules="rules" :label-width="labelWidth">
        <el-form-item v-for="(item, index) in getConfigList()" :key="index" :prop="item.value" :label="item.label" :class="item.className">
            <!-- solt -->
            <template v-if="item.type === 'slot'">
                <slot :name="'form-' + item.value" />
            </template>
            <!-- 普通输入框 -->
            <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                v-model="data[item.value]"
                :type="item.type"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
                @focus="handleEvent(item.event)"
            />
            <!-- 文本输入框 -->
            <el-input
                v-if="item.type === 'textarea'"
                v-model.trim="data[item.value]"
                :type="item.type"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
                :autosize="item.autosize || { minRows: 2, maxRows: 10 }"
                @focus="handleEvent(item.event)"
            />
            <!-- 计数器 -->
            <el-input-number
                v-if="item.type === 'inputNumber'"
                v-model="data[item.value]"
                size="small"
                :min="item.min"
                :max="item.max"
                @change="handleEvent(item.event)"
            />
            <!-- 选择框 -->
            <el-select
                v-if="item.type === 'select'"
                v-model="data[item.value]"
                :disabled="item.disabled"
                :clearable="item.clearable"
                :filterable="item.filterable"
                :placeholder="getPlaceholder(item)"
                @change="handleEvent(item.event, data[item.value])"
            >
                <el-option v-for="(childItem, childIndex) in listTypeInfo[item.list]" :key="childIndex" :label="childItem.key" :value="childItem.value" />
            </el-select>
            <!-- 日期选择框 -->
            <el-date-picker
                v-if="item.type === 'date'"
                v-model="data[item.value]"
                :type="item.dateType"
                :picker-options="item.TimePickerOptions"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
                @focus="handleEvent(item.event)"
            />
            <!-- 信息展示框 -->
            <el-tag v-if="item.type === 'tag'">
                {{
                getDataName({
                dataList: listTypeInfo[item.list],
                value: 'value',
                label: 'key',
                data: data[item.value]
                }) || '-'
                }}
            </el-tag>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, watch, ref } from 'vue'
import { getDataName } from '@/utils/util'
import { ElRef , Basic } from './formtypes'

export default defineComponent({
    name: 'PageForm',
    props: {
        // 自定义类名
        className: {
            type: String as PropType<string>
        },
        // 表单数据
        data: {
            type: Object as PropType<Basic<any>>,
            default: () => {}
        },
        // 相关字段
        fieldList: {
            type: Array as PropType<any[] | null>
        },
        // 验证规则
        rules: {
            type: Object as PropType<Basic<any>>
        },
        // 相关的列表
        listTypeInfo: {
            type: Object as PropType<Basic<any>>,
            default: () => {}
        },
        // label宽度
        labelWidth: {
            type: String as PropType<string>,
            default: '120px'
        },
        refObj: {
            type: Object as PropType<ElRef>
        }
    },
    emits: ['update:refObj', 'handleEvent', 'handleClick'],
    setup(props, { emit }) {
        const refForm = ref<ElRef>(null)

        onMounted(() => {
            emit('update:refObj', refForm.value)
        })

        watch(
            () => props.data,
            () => {
                emit('update:refObj', refForm.value)
            }
        )

        // 获取字段列表
        const getConfigList = () => {
            return props.fieldList?.filter(
                (item) => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show)
            )
        }
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
            getConfigList,
            getDataName
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
