<template>
    <div class="page-content main">
        <div class="crowdManage">
            <div class="dowload">
                <el-button type="primary" @click="handleDowload">导出</el-button>
            </div>
            <div class="filter-list">
                <div class="list-top">
                    <el-input
                        placeholder="请输入昵称\备注搜索"
                        suffix-icon="el-icon-search"
                        v-model="filter.value"
                        style="width: 280px; margin-right: 30px"
                    ></el-input>
                    <el-select v-model="filter.sex" placeholder="性别" style="width: 90px">
                        <el-option
                            v-for="item in filter.sexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-cascader
                        v-model="filter.selectTags"
                        placeholder="标签(同个分组下多选是并集，不同分组下多选是交集)"
                        :options="filter.tagOptions"
                        :clearable="true"
                        :collapse-tags="true"
                        :props="{ multiple: true, lazy: true, lazyLoad: lazyLoad }"
                        filterable
                        style="margin: 0 30px"
                    ></el-cascader>
                    <el-button type="primary">查询</el-button>
                </div>
                <div class="list-bot">
                    <el-input
                        placeholder="请输入昵称\备注搜索"
                        v-model="filter.remark"
                        style="width: 400px"
                    >
                        <template #suffix>
                            <i class="el-input__icon el-icon-search"></i>
                            <!-- <el-button type="text">上传</el-button> -->
                        </template>
                    </el-input>
                    <el-select v-model="filter.group" placeholder="性别" style="margin: 0 30px">
                        <el-option
                            v-for="item in filter.groupOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-button>重置</el-button>
                </div>
            </div>
        </div>

        <div class="table-content">
            <div class="row">
                <el-button type="primary">批量打标</el-button>
                <el-button type="primary">批量删除</el-button>
                <el-button type="primary">批量加群</el-button>
                <el-button type="primary">创建用户群</el-button>
            </div>
            <page-table
                :tableData="tabelData.data"
                :checkBox="tabelData.checkBox"
                :paging="tabelData.paging"
                :total="tabelData.total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
                :handle="tabelData.handle"
                :field-list="tabelData.fieldList"
                @handleClick="handleClick"
                @select-all="selectAll"
                @selection-change="selectionChange"
            >
            </page-table>
        </div>
    </div>

    <page-dialog
        v-model:dialogVisible="dialogVisible"
        :dialogtitle="'请选择标签'"
        :dialogwidth="'40%'"
        @on-confirm="onConfirm"
    >
        <div class="tagGroup">
            <div class=""></div>
        </div>
    </page-dialog>
</template>

<script lang="ts">
    import { useTableData } from '@/hooks/wxUserManage/usetable'
    import { useFilter } from '@/hooks/wxUserManage/useFilter'
    import { ref } from 'vue'
    export default {
        name: 'wxUserManage',
        setup() {
            const {
                tabelData,
                handleSizeChange,
                handleClick,
                selectAll,
                selectionChange,
                handleCurrentChange
            } = useTableData()

            const { filter, handleDowload, lazyLoad } = useFilter()

            const dialogVisible = ref(false)

            const onConfirm = () => {
                console.log('onConfirm')
            }

            return {
                tabelData,
                handleSizeChange,
                handleClick,
                selectAll,
                selectionChange,
                handleDowload,
                filter,
                onConfirm,
                handleCurrentChange,
                dialogVisible,
                lazyLoad
            }
        }
    }
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
