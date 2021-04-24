<template>
    <div class="page-content main">
        <el-row>
            <el-col :span="24">
                <el-tabs class="userManage-title" v-model="activeName">
                    <el-tab-pane
                        :label="item.label"
                        :name="item.name"
                        v-for="(item, index) in tagList"
                        :key="index"
                    >
                        <template v-if="'0' === activeName">
                            <tag-table
                                :tableListInfo="tableListInfo"
                                @handleClick="handleClick"
                                @handleSizeChange="handleSizeChange"
                                @handleCurrentChange="handleCurrentChange"
                                @handelCreateTag="handelCreateTag"
                                @refreshTable="refreshTable"
                                @select-all="selectAll"
                                @selection-change="selectionChange"
                            ></tag-table>
                        </template>
                        <template v-if="'1' === activeName">
                            <tag-table
                                :tableListInfo="dynamicListInfo"
                                @handleClick="handleClick"
                                @handleSizeChange="handleSizeChange"
                                @handleCurrentChange="handleCurrentChange"
                                @handelCreateTag="handelCreateTag"
                                @refreshTable="refreshTable"
                            ></tag-table>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
    <page-dialog
        v-model:dialogVisible="dialogVisible"
        :dialogtitle="dialogtitle"
        @on-confirm="onConfirm"
    >
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
    import tagTable from './../components/tagTable.vue'

    export default defineComponent({
        name: 'userManage',
        components: {
            tagTable
        },
        setup() {
            const {
                dialogVisible,
                dialogtitle,
                dynamicListInfo,
                tagList,
                activeName,
                formState,
                tableListInfo,
                handleClick,
                handleSizeChange,
                handleCurrentChange,
                handelCreateTag,
                onConfirm,
                refreshTable,
                selectAll,
                selectionChange
            } = useIndex()

            return {
                dialogVisible,
                dynamicListInfo,
                dialogtitle,
                tagList,
                activeName,
                formState,
                tableListInfo,
                handleClick,
                handleSizeChange,
                handleCurrentChange,
                handelCreateTag,
                onConfirm,
                refreshTable,
                selectAll,
                selectionChange
            }
        }
    })
</script>

<style lang="scss" scoped></style>
