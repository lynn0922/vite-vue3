<template>
    <div class="page-content main">
        <el-row>
            <el-col :span="24">
                <div class="userManage-title">
                    <div
                        :class="{ active: selectTag === item.id, fixation: true }"
                        @click="handleSelectTag(item.id)"
                        v-for="(item, index) in tagList"
                        :key="item.id"
                    >{{ item.title }}</div>
                </div>
            </el-col>
        </el-row>

        <div class="registered-table" v-for="(item, index) in TableListInfo" :key="index">
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
                    <el-button type="primary" v-if="item.create" @click="handelCreateTag">新建标签</el-button>
                </el-col>
            </div>
            <page-table
                :tableData="item.tableInfo.data"
                :sortProp="item.tableInfo.sortProp"
                :checkBox="item.tableInfo.checkBox"
                :sortOrder="item.tableInfo.sortOrder"
                :paging="item.tableInfo.paging"
                :total="item.tableInfo.total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
                :handle="item.tableInfo.handle"
                :field-list="item.tableInfo.fieldList"
                @handleClick="handleClick"
            >
                <template v-slot:bt-check="scope">
                    <el-button type="text" @click="handleClick('check', scope.data.row)
                        ">查看</el-button>
                </template>
                <template v-slot:bt-edit="scope">
                    <el-button type="text" @click="handleClick('bt-edit', scope.data.row)
                        ">编辑</el-button>
                </template>
                <template v-slot:bt-del="scope">
                    <el-button type="text" @click="handleClick('del', scope.data.row)
                        ">删除</el-button>
                </template>
            </page-table>
        </div>
    </div>
    <page-dialog v-model:dialogVisible="dialogVisible" :dialogtitle="dialogtitle" @on-confirm="onConfirm">
        <page-form
            v-model:refObj="formState.formInfo.ref"
            :formdata="formState.formInfo.data"
            :field-list="formState.formInfo.fieldList"
            :rules="formState.formInfo.rules"
            :list-type-info="formState.listTypeInfo"
            :label-width="formState.formInfo.labelWidth"
        ></page-form>
    </page-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useIndex } from '@/hooks/userManageHook/useIndex'

export default defineComponent({
    name: 'userManage',
    setup() {
        const {
            dialogVisible,
            dialogtitle,
            tagList,
            selectTag,
            formState,
            TableListInfo,
            handleClick,
            handleSelectTag,
            handleSizeChange,
            handleCurrentChange,
            handelCreateTag,
            onConfirm
        } = useIndex()

        return {
            dialogVisible,
            dialogtitle,
            tagList,
            selectTag,
            formState,
            TableListInfo,
            handleClick,
            handleSelectTag,
            handleSizeChange,
            handleCurrentChange,
            handelCreateTag,
            onConfirm
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
