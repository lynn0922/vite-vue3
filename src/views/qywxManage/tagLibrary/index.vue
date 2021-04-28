<template>
    <div class="page-content main">
        <el-row>
            <el-col :span="24">
                <el-tabs v-model="activeName" class="userManage-title" @tab-click="handleClickTab">
                    <el-tab-pane v-for="(tag, tagIdx) in tagList" :key="tagIdx" :label="tag.label" :name="tag.name">
                        <div v-for="(item, index) in table" :key="index" class="registered-table">
                            <div class="table-row">
                                <el-col :span="4">
                                    <div class="row-one">
                                        <div class="row-title">
                                            {{ item.title }}
                                        </div>
                                        <div v-if="item.showUserNum" class="all-user-num">
                                            <span>共</span>
                                            <span class="num">{{ item.userTotal }}</span>
                                            <span>人</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="18">
                                    <div class="row-title">
                                        {{ item.timeTxt }} {{ item.time }}
                                        <span v-if="item.refresh" class="refresh" @click="refreshTable(item)">刷新</span>
                                    </div>
                                </el-col>
                                <el-col :span="2">
                                    <el-button v-if="item.create" type="primary" @click="handelCreateTag(item.target)">
                                        新建标签
                                    </el-button>
                                </el-col>
                            </div>
                            <page-table
                                :table-data="item.tableInfo.data"
                                :sort-prop="item.tableInfo.sortProp"
                                :check-box="item.tableInfo.checkBox"
                                :sort-order="item.tableInfo.sortOrder"
                                :paging="item.tableInfo.paging"
                                :total="item.tableInfo.total"
                                :handle="item.tableInfo.handle"
                                :field-list="item.tableInfo.fieldList"
                                @handleSizeChange="handleSizeChange"
                                @handleCurrentChange="handleCurrentChange"
                                @handleClick="handleClick"
                                @select-all="selectAll"
                                @selection-change="selectionChange"
                            >
                                <template #bt-check="scope">
                                    <el-button type="text" @click="handleClick('check', scope.data.row)"> 查看 </el-button>
                                </template>
                                <template #bt-edit="scope">
                                    <el-button type="text" @click="handleClick('bt-edit', scope.data.row)"> 编辑 </el-button>
                                </template>
                                <template #bt-del="scope">
                                    <el-button type="text" @click="handleClick('del', scope.data.row)"> 删除 </el-button>
                                </template>
                            </page-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
    <page-dialog v-model:dialogVisible="dialogVisible" :dialog-title="dialogtitle" @on-confirm="onConfirm">
        <page-form
            v-model:refObj="formState.formInfo.ref"
            :formdata="formState.formInfo.data"
            :field-list="formState.formInfo.fieldList"
            :rules="formState.formInfo.rules"
            :label-width="formState.formInfo.labelWidth"
        />
    </page-dialog>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { useIndex } from '@/hooks/tagLibrary/useTag'

    export default defineComponent({
        name: 'TagLibrary',
        setup() {
            const {
                dialogVisible,
                dialogtitle,
                tagList,
                activeName,
                formState,
                table,
                handleClick,
                handleSizeChange,
                handleCurrentChange,
                handelCreateTag,
                onConfirm,
                refreshTable,
                selectAll,
                selectionChange,
                handleClickTab
            } = useIndex()

            return {
                dialogVisible,
                dialogtitle,
                tagList,
                activeName,
                formState,
                table,
                handleClick,
                handleSizeChange,
                handleCurrentChange,
                handelCreateTag,
                onConfirm,
                refreshTable,
                selectAll,
                selectionChange,
                handleClickTab
            }
        }
    })
</script>

<style lang="scss" scoped>
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

            .row-one {
                display: flex;
                align-items: center;

                .all-user-num {
                    margin-left: 60px;

                    .num {
                        color: $--color-primary;
                    }
                }
            }
        }

        .refresh {
            color: $--color-primary;
            cursor: pointer;
            margin-left: 30px;
        }
    }
</style>
