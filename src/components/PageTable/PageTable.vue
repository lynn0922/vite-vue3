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
            border
            style="width: 100%"
            @selection-change="selectionChange"
            @row-click="tableRowClick"
            @sort-change="tableSortChange"
            @select-all="selectAll"
        >
            <!-- 选择框 -->
            <el-table-column v-if="checkBox" :key="'selection'" align="center" type="selection" width="55" />
            <!-- 序号 -->
            <el-table-column v-if="tabIndex" align="center" type="index" width="55" />

            <!-- 列表 支持 自定义列 嵌套表格 标签显示 图片 -->
            <el-table-column
                v-for="(item, index) in fieldList.filter((item) => !item.hidden)"
                :key="index"
                :column-key="item.key"
                :type="item.type"
                :prop="item.value"
                :label="item.label"
                :fixed="item.fixed"
                :align="item.align"
                :sortable="item.sortable || false"
                :width="item.width"
                :min-width="item.minWidth || '100px'"
            >
                <template #default="scope">
                    <!-- solt 自定义列-->
                    <template v-if="item.type === 'slot'">
                        <slot :name="'col-' + item.value" :row="scope.row" />
                    </template>
                    <!-- 嵌套表格 -->
                    <template v-else-if="item.children">
                        <el-table-column
                            v-for="(childItem, childIndex) in item.children"
                            :key="childIndex"
                            :column-key="childItem.key"
                            :prop="childItem.value"
                            :label="childItem.label"
                            :align="childItem.align"
                            :width="childItem.width"
                            :min-width="childItem.minWidth || '85px'"
                        />
                    </template>
                    <!-- 标签 -->
                    <el-tag v-else-if="item.type === 'tag'">
                        {{ scope.row[item.value] }}
                    </el-tag>
                    <!-- 图片 -->
                    <img v-else-if="item.type === 'image' && scope.row[item.value]" height="50px" :src="scope.row[item.value]" />
                    <!-- 其他 -->
                    <span v-else>
                        {{ returnName(scope.row, item) || '-' }}
                    </span>
                </template>
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column
                v-if="handle"
                :column-key="'handle'"
                :fixed="handle.fixed"
                :align="handle.align"
                :label="handle.label"
                :width="handle.width"
            >
                <template #default="scope">
                    <template v-for="(item, index) in handle.btList">
                        <!-- 自定义操作类型 -->
                        <slot v-if="item.slot" :name="'bt-' + item.event" :data="{ item, row: scope.row }" />
                        <!-- 操作按钮 -->
                        <el-button
                            v-if="!item.slot && (!item.ifRender || item.ifRender(scope.row))"
                            :key="index"
                            :type="item.type"
                            :icon="item.icon"
                            :disabled="item.disabled"
                            :loading="returnLoading(scope.row, item) || false"
                            @click="handleClick(item.event, scope.row)"
                        >
                            {{ item.label }}
                        </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <template v-if="paging">
            <div class="pagination-container">
                <el-pagination
                    :current-page="pagination.page"
                    :page-sizes="listInfo.pageSizes"
                    :page-size="pagination.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType, reactive, toRefs } from 'vue'
    import { getDataName } from '@/utils/util'
    import { Basic, IbtList, IfieldList, Ihandle, Ipagination, IState } from './tableTypes'

    export default defineComponent({
        name: 'PageTable',
        props: {
            // 自定义类名
            className: {
                type: String as PropType<string>
            },

            /**
             * 默认的排序列的 prop
             */
            sortProp: {
                type: String as PropType<string>,
                default: ''
            },

            /**
             * 默认的排序列的排序顺序：1-升序，非1-降序
             */
            sortOrder: {
                type: Number as PropType<number>,
                default: 0
            },

            /**
             * 表格最大高度
             */
            maxHeight: {
                type: Number as PropType<number | null>,
                default: null
            },

            /**
             * 表格高度
             */
            height: {
                type: Number as PropType<number | null>,
                default: null
            },

            // 是否显示表头
            showHeader: {
                type: Boolean as PropType<boolean>,
                default: true
            },

            // 类型列表
            listTypeInfo: {
                type: Object as PropType<Basic<any>>
            },

            // 表格字段配置
            fieldList: {
                type: Array as PropType<IfieldList[]>,
                required: true,
                default: () => []
            },
            // 操作栏配置
            handle: {
                type: Object as PropType<Ihandle>
            },
            // 是否分页
            paging: {
                type: Boolean as PropType<boolean>,
                default: true
            },
            // 列表数据
            tableData: {
                type: Array as PropType<Basic<any>[]>
            },

            // 是否有选择框
            checkBox: {
                type: Boolean as PropType<boolean>,
                default: false
            },

            // 是否显示序号
            tabIndex: {
                type: Boolean as PropType<boolean>,
                default: false
            },

            // 分页
            pagination: {
                type: Object as PropType<Ipagination>,
                default: () => {
                    return {
                        page: 1,
                        limit: 10,
                        total: 0
                    }
                }
            }
        },
        emits: [
            'tableRowClassName',
            'selection-change',
            'row-click',
            'sort-change',
            'select-all',
            'handleClick',
            'handleSizeChange',
            'handleCurrentChange'
        ],
        setup(props, context) {
            const state = reactive<IState>({
                listInfo: {
                    pageSizes: [5, 10, 20, 50, 100],
                    query: {
                        page: 1,
                        limit: 10
                    }
                }
            })

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
                context.emit('sort-change', { column, prop, order })
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

            const handleSizeChange = (val: number) => {
                props.pagination.limit = val
                props.pagination.page = 1
                context.emit('handleSizeChange', val)
            }

            const handleCurrentChange = (val: number) => {
                props.pagination.page = val
                context.emit('handleCurrentChange', val)
            }

            const returnName = (row: any, item: IfieldList) => {
                if (item?.list) {
                    const dataName = getDataName({
                        dataList: (props.listTypeInfo as Basic<any>)[item?.list],
                        value: 'value',
                        label: 'key',
                        data: row[item.value]
                    })
                    return dataName
                }

                return row[item.value]
            }

            const returnLoading = (row: any, item: IbtList) => {
                if (item?.loading) {
                    return row[item?.loading]
                }

                return false
            }

            return {
                ...toRefs(state),
                tableRowClassName,
                selectionChange,
                tableRowClick,
                tableSortChange,
                selectAll,
                handleClick,
                handleSizeChange,
                handleCurrentChange,
                returnName,
                returnLoading
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
