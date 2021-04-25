<template>
    <div class="page-content main">
        <div class="registered-table">
            <div class="table-row">
                <el-col :span="4">
                    <div class="row-title">
                        <div class="one">标签组-标签名称</div>
                        <div class="two">总共xx人</div>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="row-title">
                        <div class="one">查看时间：</div>
                        <div class="two">2021.4.5 17:20:00</div>
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary">导出</el-button>
                </el-col>
            </div>
            <page-table
                :tableData="tableInfo.data"
                :paging="tableInfo.paging"
                :total="tableInfo.total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
                :field-list="tableInfo.fieldList"
            ></page-table>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, toRefs } from 'vue'
    import { useRoute } from 'vue-router'
    import { usePageTable } from '@/hooks/tagLibrary/tagUserDetail'

    export default defineComponent({
        name: 'tag-user-detail',
        setup() {
            const route = useRoute()

            const { state, handleSizeChange, handleCurrentChange } = usePageTable()

            onMounted(() => {
                console.log('....userDetail', route.query.id)
            })

            return {
                ...toRefs(state),
                handleSizeChange,
                handleCurrentChange
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

            .row-title {
                display: flex;
                align-items: center;

                .two {
                    margin-left: 20px;
                }
            }
        }
    }
</style>
