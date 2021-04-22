<template>
    <div class="page-content main">
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

        <div class="registered-table" v-for="(item,index) in TableListInfo" :key="index">
            <div class="table-row">
                <el-col :span="4">
                    <div class="row-title">{{ item.title }}</div>
                </el-col>
                <el-col :span="18">
                    <div class="row-title">
                        {{ item.timeTxt }} {{ item.time }}
                        <span class="refresh" v-if="item.refresh">刷新</span>
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" v-if="item.create">新建标签</el-button>
                </el-col>
            </div>
            <page-table
                :tableData="item.tableInfo.data"
                :sortProp="item.tableInfo.sortProp"
                :checkBox="item.tableInfo.checkBox"
                :sortOrder="item.tableInfo.sortOrder"
                :paging="item.tableInfo.paging"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
                :handle="item.tableInfo.handle"
                :field-list="item.tableInfo.fieldList"
                @handleClick="handleClick"
            ></page-table>

            <!-- 弹框 -->
            <!-- <el-dialog :title="dialogInfo.title[dialogInfo.type]" v-model="dialogInfo.visible">
        <span>
            <page-form
                :ref-obj.sync="formInfo.ref"
                :data="formInfo.data"
                :field-list="formInfo.fieldList"
                :rules="formInfo.rules"
                :label-width="formInfo.labelWidth"
                :list-type-info="listTypeInfo"
            ></page-form>
        </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogInfo.visible = false">取 消</el-button>
                <el-button type="primary" @click="dialogInfo.visible = false">确 定</el-button>
            </span>
        </template>
            </el-dialog>-->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, toRefs, watch } from 'vue'
import { useDialog } from '@/hooks/userManageHook/useDialog'
import { useFormData } from '@/hooks/userManageHook/useForm'
import { useRoute, useRouter } from 'vue-router'
import { getUserList } from '@/http/userManage'

export default defineComponent({
    name: 'userManage',
    components: {},
    setup() {
        const router = useRouter()

        const tableList = {
            tagList: [
                { id: 0, title: '固定标签' },
                { id: 1, title: '动态标签' }
            ],
            selectTag: 0,
            TableListInfo: [
                {
                    title: '注册来源',
                    timeTxt: '最后更新时间：',
                    time: '2021.04.11 00:01:30',
                    refresh: true,
                    create: true,
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
                        sortProp: 'name',
                        sortOrder: 1,
                        paging: false,
                        checkBox: false,
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
                    }
                },
                {
                    title: '添加来源',
                    timeTxt: '最后更新时间：',
                    time: '2021.04.11 00:01:30',
                    refresh: true,
                    create: true,
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
                        sortProp: 'name',
                        sortOrder: 1,
                        paging: false,
                        checkBox: false,
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
                    }
                },
                {
                    title: '自定义标签',
                    timeTxt: '最后更新时间：',
                    time: '2021.04.11 00:01:30',
                    refresh: true,
                    create: true,
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
                        sortProp: 'name',
                        sortOrder: 1,
                        paging: false,
                        checkBox: false,
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
                    }
                }
            ]
        }

        const state = reactive(tableList)

        onMounted(() => {})
        const { dialogState } = useDialog()
        const { formState } = useFormData()

        function handleSelectTag(num: number) {
            state.selectTag = num
        }

        const handleClick = (event: string, row: any) => {
            console.log(row.name)
            // console.log(event, toRefs(row))

            router.push({
                path: '/userDetail',
                query: {
                    id: '123456'
                }
            })
        }

        // function getTeacherList() {
        //     const { ctx } = getCurrentInstance() as any
        //     console.log('%c 🥘 ctx: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', ctx)
        //     return ctx.$api.get('home.banner')
        // }

        const handleSizeChange = (val: number) => {
            console.log(val)
        }

        const handleCurrentChange = (val: number) => {
            console.log(val)
        }

        const handelCreateTag = () => {
            console.log(dialogState.dialogInfo.visible)
            dialogState.dialogInfo.visible = true
        }

        return {
            ...toRefs(state),
            ...toRefs(dialogState),
            ...toRefs(formState),
            handleClick,
            handleSelectTag,
            handleSizeChange,
            handleCurrentChange,
            handelCreateTag
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
        border: 1px solid $--border-gray;
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
    padding: 0 40px 10px 40px;
    margin-bottom: 30px;

    .table-row {
        display: flex;
        padding: 10px 0;
        align-items: center;
        border-bottom: 1px solid $--border-d7;
        margin-bottom: 20px;
    }

    .refresh {
        color: $--color-primary;
        cursor: pointer;
    }
}
</style>