<template>
    <page-table
        :table-data="tabelData.data"
        :check-box="tabelData.checkBox"
        :paging="tabelData.paging"
        :pagination="tabelData.pagination"
        :handle="tabelData.handle"
        :field-list="tabelData.fieldList"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @handleClick="handleClick"
        @select-all="selectAll"
        @selection-change="selectionChange"
    >
        <template #col-workWeixinMemberNames="scope">
            <div v-for="item in scope.row.workWeixinMemberNames" :key="item">
                {{ item }}
            </div>
        </template>
        <template #col-gender="scope">
            <div>{{ Gender[scope.row.gender] }}</div>
        </template>
        <template #col-memberAddTimes="scope">
            <div v-for="item in scope.row.memberAddTimes" :key="item">
                {{ item }}
            </div>
        </template>
        <template #col-tagNameList="scope">
            <div v-for="item in scope.row.tagNameList" :key="item">
                {{ item }}
            </div>
        </template>
    </page-table>
</template>

<script lang="ts">
    import { defineComponent, onMounted, PropType, reactive, watch } from 'vue'
    import { Basic, IfieldList, Ihandle } from '@/components/PageTable/tableTypes'
    import { getWxUserList } from '@/http/wxUserManage'
    import { PageEnum } from '@/enum/route'
    import { useRouter, useRoute } from 'vue-router'
    import { Gender } from '@/enum/gender'

    interface ItableData {
        data: Basic<any>[]
        fieldList: IfieldList[]
        paging: boolean
        checkBox: boolean
        handle: Ihandle
        pagination: {
            page: number
            limit: number
            total: number
        }
    }

    interface IsearchObj {
        searchUserType?: string
        searchUserKey?: string
        gender?: string
        ucodes?: string
        tagIds?: string
    }

    export default defineComponent({
        name: 'UserListTable',

        props: {
            searchObj: {
                type: Object as PropType<IsearchObj>
            }
        },

        setup(props) {
            const route = useRoute()

            const data: ItableData = {
                data: [],
                fieldList: [
                    { label: '昵称', value: 'userName' },
                    { label: 'ucode', value: 'ucode' },
                    { label: '备注', value: 'nameRemark' },
                    { label: '性别', value: 'gender', type: 'slot' },
                    { label: '所加成员昵称', value: 'workWeixinMemberNames', type: 'slot' },
                    { label: '标签', value: 'tagNameList', type: 'slot' },
                    { label: '添加时间', value: 'memberAddTimes', type: 'slot' }
                ],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 0
                },
                paging: true,
                checkBox: false,
                handle: {
                    fixed: 'right',
                    label: '操作',
                    width: '200',
                    btList: [
                        {
                            label: '查看详情',
                            type: 'text',
                            event: 'wxUserCheckDetail'
                        }
                    ]
                }
            }

            const tabelData = reactive(data)

            watch(
                () => props.searchObj,
                (v) => {
                    getList(v)
                },
                { deep: true }
            )

            onMounted(() => {
                getList()
            })

            const getList = async (searchObj?: IsearchObj) => {
                const params = {
                    pageNo: tabelData.pagination.page,
                    pageSize: tabelData.pagination.limit,
                    ...searchObj
                }

                if (route.query?.id) (params as any).tagIds = route.query?.id

                const list = await getWxUserList(params)

                tabelData.data = list.records
                tabelData.pagination.total = parseInt((list as any).total)
            }

            const handleSizeChange = (val: number) => {
                tabelData.pagination.limit = val
                getList()
            }

            const handleCurrentChange = (val: number) => {
                tabelData.pagination.page = val
                getList()
            }

            const router = useRouter()

            const handleClick = (val: string, data: any) => {
                router.push({
                    path: PageEnum.WXUSERDETAIL,
                    query: {
                        id: data.id
                    }
                })
            }

            const selectAll = (val: any[]) => {
                console.log(val)
            }

            const selectionChange = (val: any[]) => {
                console.log(val)
            }

            return {
                tabelData,
                handleSizeChange,
                handleCurrentChange,
                handleClick,
                selectAll,
                selectionChange,
                Gender
            }
        }
    })
</script>

<style lang="scss" scoped></style>
