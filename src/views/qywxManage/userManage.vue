<template>
    <div class="page-content">
        <el-row>
            <el-col :span="24">
                <div class="userManage-title">
                    <div
                        :class="{ active: selectTag === item.id, 'fixation': true }"
                        @click="handleSelectTag(item.id)"
                        v-for="(item,index) in tagList"
                        :key="item.id"
                    >{{ item.title }}</div>
                </div>
            </el-col>
        </el-row>
        <div class="registered-table">
            <div class="table-row">
                <el-col :span="4">
                    <div class="row-title">注册来源</div>
                </el-col>
                <el-col :span="18">
                    <div class="row-title">
                        最后更新时间： 2021.04.11 00:01:30
                        <span class="refresh">刷新</span>
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary">新建标签</el-button>
                </el-col>
            </div>
            <page-table
                :tableData="tableInfo.data"
                :field-list="tableInfo.fieldList"
                :tab-index="true"
                sortProp="name"
                :sortOrder="1"
                :list-type-info="listTypeInfo"
                :handle="tableInfo.handle"
                @handleClick="handleClick"
            ></page-table>
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    getCurrentInstance,
    onMounted,
    PropType,
    reactive,
    ref,
    toRefs
} from 'vue'

interface Itag {
    title: string
    id: number
}

interface IState {
    tagList: Itag[]
    selectTag: number
    tableInfo: any
    filterInfo: any
    listTypeInfo: any
}

export default defineComponent({
    name: 'userManage',
    components: {
        // TODO 组件注册
    },
    setup(props, context) {
        const state = reactive<IState>({
            tagList: [
                {
                    title: '固定标签',
                    id: 0
                },
                {
                    title: '动态标签',
                    id: 1
                }
            ],
            selectTag: 0,

            tableInfo: {
                data: [
                    {
                        account: '测试数据',
                        name: 200
                    },
                    {
                        account: '测试数据1',
                        name: 201
                    },
                    {
                        account: '测试数据2',
                        name: 202
                    },
                    {
                        account: '测试数据3',
                        name: 203
                    },
                    {
                        account: '测试数据4',
                        name: 204
                    },
                    {
                        account: '测试数据5',
                        name: 205
                    }
                ],
                fieldList: [
                    { label: '标签名称', value: 'account' },
                    { label: '人数', value: 'name', sortable: true }
                ],
                handle: {
                    fixed: 'right',
                    label: '操作',
                    width: '600',
                    btList: [
                        {
                            label: '查看',
                            type: 'text',
                            event: 'status',
                            loading: 'statusLoading',
                            show: true
                        },
                        {
                            label: '编辑',
                            type: 'text',
                            event: 'status',
                            loading: 'statusLoading',
                            show: true
                        },
                        {
                            label: '删除',
                            type: 'text',
                            event: 'status',
                            loading: 'statusLoading',
                            show: true
                        }
                    ]
                }
            },
            // 过滤相关配置
            filterInfo: {
                // api 参数
                query: {
                    key: '',
                    userName: '',
                    source: ''
                },
                // 控制筛选头部组件的配置
                list: [
                    { type: 'input', label: '搜索内容', value: 'title' },
                    {
                        type: 'select',
                        label: '用户',
                        value: 'userName',
                        list: 'screeningUser'
                    },
                    {
                        type: 'select',
                        label: '来源',
                        value: 'source',
                        list: 'source'
                    },
                    {
                        type: 'button',
                        label: '查询',
                        btType: 'primary',
                        icon: 'el-icon-search',
                        event: 'search',
                        show: true
                    },
                    {
                        type: 'button',
                        label: '导出表格',
                        btType: 'primary',
                        icon: 'el-icon-search',
                        event: 'export',
                        show: true
                    }
                ]
            },
            listTypeInfo: {
                statusList: [
                    { key: '启用', value: 1 },
                    { key: '禁用', value: 0 }
                ]
            }
        })

        onMounted(() => {})

        function handleSelectTag(num: number) {
            state.selectTag = num
        }

        const handleClick = (event: string, row: any) => {
            console.log(event, toRefs(row).name.value)
        }

        function getTeacherList() {
            const { ctx } = getCurrentInstance() as any
            console.log('%c 🥘 ctx: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', ctx);
            return ctx.$api.get('home.banner')
        }

        return {
            ...toRefs(state),
            handleClick,
            getTeacherList,
            handleSelectTag
        }
    }
})
</script>

<style lang="scss" scoped>
.userManage-title {
    @extend .border-global;
    @extend .border-radius-10;
    padding: 12px 30px;
    display: flex;
    margin-bottom: 20px;

    .fixation {
        width: 174px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        border: 1px solid rgb(120, 120, 120);
        @extend .border-radius-10;

        &:hover {
            cursor: pointer;
        }
    }

    .active {
        background-color: $--color-primary;
        border: none;
        color: #fff;
        user-select: none;
    }

    & div:nth-child(2) {
        margin-left: 60px;
    }
}

.registered-table {
    @extend .border-global;
    @extend .border-radius-10;
    padding: 0 40px;

    .table-row {
        display: flex;
    }

    .refresh {
        color: $--color-primary;
        cursor: pointer;
    }
}
</style>