<template>
    <div class="page-table" :class="className">
        <!-- 显示表格 -->
        <el-table
            ref="table"
            :data="tableData"
            :show-header="showHeader"
            :default-sort="{ prop: sortProp, order: sortOrder === 1 ? 'ascending' : 'descending' }"
            :max-height="maxHeight || undefined"
            :height="height"
            :row-class-name="tableRowClassName"
            @selection-change="selectionChange"
            @row-click="tableRowClick"
            @sort-change="tableSortChange"
            border
            style="width:100%"
            @select-all="selectAll"
        >
            <!-- 选择框 -->
            <el-table-column v-if="checkBox" align="center" :key="'selection'" type="selection" width="55" />
            <!-- 序号 -->
            <el-table-column v-if="tabIndex" type="index" width="50"></el-table-column>

            <!-- 列表 支持 自定义列 嵌套表格 标签显示 图片 -->
            <el-table-column
                v-for="(item, index) in fieldList.filter(item => !item.hidden)"
                :key="index"
                :prop="item.value"
                :label="item.label"
                :fixed="item.fixed"
                align="center"
                :sortable="item.sortable || false"
                :width="item.width"
                :min-width="item.minWidth || '100px'"
            >
                <template v-slot="scope">
                    <!-- solt 自定义列-->
                    <template v-if="item.type === 'slot'">
                        <slot :name="'col-' + item.value" :row="scope.row" />
                    </template>
                    <!-- 嵌套表格 -->
                    <template v-else-if="item.children">
                        <el-table-column
                            v-for="(childItem, childIndex) in item.children"
                            :key="childIndex"
                            :prop="childItem.value"
                            :label="childItem.label"
                            align="center"
                            :width="item.width"
                            :min-width="item.minWidth || '85px'"
                        />
                    </template>
                    <!-- 标签 -->
                    <el-tag v-else-if="item.type === 'tag'">{{ scope.row[item.value] }}</el-tag>
                    <!-- 图片 -->
                    <img v-else-if="item.type === 'image' && scope.row[item.value]" height="50px" :src="scope.row[item.value]" />
                    <!-- 其他 -->
                    <span v-else>
                        {{
                        getDataName({
                        dataList: listTypeInfo[item.list],
                        value: 'value',
                        label: 'key',
                        data: scope.row[item.value]
                        }) || '-'
                        }}
                    </span>
                </template>
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column v-if="handle" :key="'handle'" :fixed="handle.fixed" align="center" :label="handle.label" :width="handle.width">
                <template v-slot="scope">
                    <template v-for="(item, index) in handle.btList">
                        <!-- 自定义操作类型 -->
                        <slot v-if="item.slot" :name="'bt-' + item.event" :data="{ item, row: scope.row }" />
                        <!-- 操作按钮 -->
                        <el-button
                            v-if=" !item.slot && item.show && (!item.ifRender || item.ifRender(scope.row)) "
                            :key="index"
                            size="mini"
                            :type="item.type"
                            :icon="item.icon"
                            :disabled="item.disabled"
                            :loading="scope.row[item.loading]"
                            @click="handleClick(item.event, scope.row)"
                        >{{ item.label }}</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <!-- <template v-if="paging">
            <div class="pagination-container">
                <el-pagination
                    :current-page.sync="listInfo.query.page"
                    :page-sizes="listInfo.pageSizes"
                    :page-size="listInfo.query.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="listInfo.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </template>-->
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { getDataName } from '@/utils/util'

interface IfieldList {
    type: string
    label: string
    btType: string
    icon: string
    event: string
    show: boolean
    value: string
    list: string
    width: string
    children: any
    minWidth: string
    sortable: string
    hidden: boolean
    fixed: string
    title: string
}

export default defineComponent({
    name: 'PageTable',
    props: {
        // 自定义类名
        className: {
            type: String as any
        },
        /**
         * 默认的排序列的 prop
         */
        sortProp: {
            type: String as any,
            default: ''
        },
        /**
         * 默认的排序列的排序顺序：1-升序，非1-降序
         */
        sortOrder: {
            type: Number as any,
            default: 0
        },
        /**
         * 表格最大高度
         */
        maxHeight: {
            type: Number as any,
            default: null
        },
        /**
         * 表格高度
         */
        height: {
            type: Number as any,
            default: null
        },

        // 是否显示序号
        tabIndex: {
            type: Boolean as any,
            default: false
        },
        // 是否显示表头
        showHeader: {
            type: Boolean as any,
            default: true
        },
        // 是否有选择框
        checkBox: {
            type: Boolean as any,
            default: false
        },
        // 选中列表
        checkedList: {
            type: Array as any,
            default: () => {
                return []
            }
        },
        // 类型列表
        listTypeInfo: {
            type: Object as any
        },
        // 表格字段配置
        fieldList: {
            type: Array as PropType<IfieldList[]>,
            default: () => {
                return []
            }
        },
        // 操作栏配置
        handle: {
            type: Object as any
        },
        // 是否分页
        paging: {
            type: Boolean as any,
            default: true
        },
        // 列表数据
        tableData: {
            type: Array as any
        }
    },
    emits: [
        'tableRowClassName',
        'selection-change',
        'row-click',
        'sort-change',
        'select-all',
        'handleClick'
    ],
    setup(props, context) {
        function tableRowClassName({ row, rowIndex }: { row: any; rowIndex: any }) {
            context.emit('tableRowClassName', { row, rowIndex })
        }

        function selectionChange(selection: any) {
            /**
             * 行勾选
             */
            context.emit('selection-change', selection)
        }

        function tableRowClick(row: any, event: any, column: any) {
            /**
             * 行点击
             */
            context.emit('row-click', { row, event, column })
        }

        function tableSortChange({ column, prop, order }: { column: any; prop: any; order: any }) {
            /**
             * 表格排序变化
             * @type {object}
             */
            context.emit('sort-change', { column: prop, order })
        }

        function selectAll(selection: any) {
            /**
             * 全部勾选
             * @type {object}
             */
            context.emit('select-all', selection)
        }

        function handleClick(event: string, row: any) {
            /**
             * 点击事件
             * @type {object}
             */
            context.emit('handleClick', event, row)
        }

        return {
            getDataName,
            tableRowClassName,
            selectionChange,
            tableRowClick,
            tableSortChange,
            selectAll,
            handleClick
        }
    }
})
</script>

<style lang="scss" scoped>
// 自定义表格相关
.page-table {
    .pagination-container {
        padding: 15px 0;
    }
}
</style>
