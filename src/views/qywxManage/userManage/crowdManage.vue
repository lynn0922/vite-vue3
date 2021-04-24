<template>
    <div class="page-content main">
        <div class="crowdManage">
            <div class="dowload">
                <el-button type="primary">导出</el-button>
            </div>
            <div class="filter-list">
                <div class="list-top">
                    <el-input
                        placeholder="请输入昵称\备注搜索"
                        suffix-icon="el-icon-search"
                        v-model="input1"
                        style="width: 280px; margin-right: 30px"
                    ></el-input>
                    <el-select v-model="value" placeholder="性别" style="width: 90px">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="标签" style="margin: 0 30px">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-button type="primary">查询</el-button>
                </div>
                <div class="list-bot">
                    <el-input
                        placeholder="请输入昵称\备注搜索"
                        suffix-icon="el-icon-search"
                        v-model="input1"
                        style="width: 400px"
                    >
                    </el-input>
                    <el-select v-model="value" placeholder="性别" style="margin: 0 30px">
                        <el-option
                            v-for="item in options"
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
                :tableData="data"
                :checkBox="checkBox"
                :paging="paging"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
                :handle="handle"
                :field-list="fieldList"
                @handleClick="handleClick"
                @select-all="selectAll"
                @selection-change="selectionChange"
            >
            </page-table>
        </div>
    </div>
</template>

<script lang="ts">
    import { reactive, toRefs } from 'vue'
    import { useIndex, useTableData } from '@/hooks/useCrowdManage/useIndex'
    export default {
        name: 'App',
        setup() {
            const { options, value } = useIndex()
            const { data, fieldList, paging, checkBox, handle, total } = useTableData()

            return {
                options,
                value,
                data,
                fieldList,
                paging,
                checkBox,
                handle,
                total
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
</style>
