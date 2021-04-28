<template>
    <div class="page-content main">
        <div class="crowdManage">
            <!-- <div class="dowload">
                <el-button type="primary" @click="handleDowload">导出</el-button>
            </div> -->
            <div class="filter-list">
                <div class="list-top">
                    <el-select v-model="filter.searchUserType" placeholder="请选择" style="width: 120px">
                        <el-option
                            v-for="item in filter.searchKeyOpt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                    <el-input
                        v-model="filter.searchUserKey"
                        placeholder="请输入昵称\备注搜索"
                        suffix-icon="el-icon-search"
                        style="width: 280px; margin-right: 30px"
                    />
                    <el-select v-model="filter.gender" placeholder="性别" style="margin-right: 30px">
                        <el-option v-for="item in filter.sexOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-button type="primary" @click="searchList"> 查询 </el-button>
                </div>
                <div class="list-bot">
                    <el-input v-model="filter.ucodes" placeholder="请输入ucode进行搜索，多个ucode用,隔开" style="width: 400px">
                        <template #suffix>
                            <i class="el-input__icon el-icon-search" />
                            <!-- <el-button type="text">上传</el-button> -->
                        </template>
                    </el-input>
                    <!-- lazy: true, lazyLoad: lazyLoad -->
                    <el-cascader
                        v-model="filter.tagIds"
                        placeholder="标签(同个分组下多选是并集，不同分组下多选是交集)"
                        :options="filter.tagOptions"
                        :clearable="true"
                        :props="{
                            multiple: true,
                            value: 'id',
                            label: 'name',
                            children: 'children'
                        }"
                        filterable
                        style="margin: 0 30px"
                    />
                    <el-button @click="reset"> 重置 </el-button>
                </div>
            </div>
        </div>

        <div class="table-content">
            <!-- <div class="row">
                <el-button type="primary">批量打标</el-button>
                <el-button type="primary">批量删除</el-button>
                <el-button type="primary">批量加群</el-button>
                <el-button type="primary">创建用户群</el-button>
            </div> -->
            <user-list-table :search-obj="searchObj" />
        </div>
    </div>

    <!-- <page-dialog v-model:dialogVisible="dialogVisible" :dialog-title="'请选择标签'" :dialog-width="'40%'" @on-confirm="onConfirm">
        <div class="tagGroup"> </div>
    </page-dialog> -->
</template>

<script lang="ts">
    // import { useTableData } from '@/hooks/wxUserManage/usetable'
    import { useFilter } from '@/hooks/wxUserManage/useFilter'
    import { defineComponent, reactive, ref } from 'vue'
    import userListTable from '../components/userListTable.vue'

    export default defineComponent({
        name: 'WxUserManage',
        components: { userListTable },
        setup() {
            // const {} = useTableData()

            const { filter, handleDowload, lazyLoad } = useFilter()

            const dialogVisible = ref(false)

            const onConfirm = () => {
                console.log('onConfirm')
            }

            const searchObj = reactive({
                searchUserType: '',
                searchUserKey: '',
                gender: '',
                ucodes: '',
                tagIds: ''
            })

            const searchList = () => {
                searchObj.searchUserType = filter.searchUserType
                searchObj.searchUserKey = filter.searchUserKey
                searchObj.gender = filter.gender
                searchObj.ucodes = filter.ucodes

                let strTagID = ''
                filter.tagIds.map((item, index) => {
                    strTagID += item[(item as any).length - 1] + (index === filter.tagIds.length - 1 ? '' : ',')
                })

                searchObj.tagIds = strTagID
            }

            const reset = () => {
                searchObj.searchUserType = ''
                searchObj.searchUserKey = ''
                searchObj.gender = ''
                searchObj.ucodes = ''
                searchObj.tagIds = ''

                filter.searchUserType = ''
                filter.searchUserKey = ''
                filter.gender = ''
                filter.ucodes = ''
                filter.tagIds = []
            }

            return {
                handleDowload,
                filter,
                onConfirm,
                searchList,
                dialogVisible,
                lazyLoad,
                searchObj,
                reset
            }
        }
    })
</script>

<style lang="scss" scoped>
    .crowdManage {
        @extend .border-global;
        @extend .border-radius-10;
        padding: 20px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;

        .dowload {
            width: 100px;
        }

        .filter-list {
            flex: 1;

            .list-top,
            .list-bot {
                display: flex;
                align-items: center;
            }

            .list-top {
                margin-bottom: 20px;
            }
        }
    }
    .table-content {
        @extend .border-global;
        @extend .border-radius-10;
        padding: 20px;
        margin-bottom: 30px;

        .row {
            margin-bottom: 20px;
        }
    }

    // .tagDialog {
    //     ::v-deep(.el-input__inner) {
    //         cursor: pointer;
    //     }
    // }
</style>
