<template>
    <div class="page-content main">
        <div class="registered-table">
            <div class="table-row">
                <el-col :span="4">
                    <div class="row-title">
                        <div class="one"> 标签组-标签名称 </div>
                        <div class="two"> 总共 {{ countTotal }} 人 </div>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="row-title">
                        <div class="one"> 最后更新时间： </div>
                        <div class="two">
                            {{ lastUpdateTime }}
                        </div>
                    </div>
                </el-col>
                <el-col :span="2">
                    <!-- <el-button type="primary">导出</el-button> -->
                </el-col>
            </div>
            <user-list-table />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, toRefs } from 'vue'
    import { usePageTable } from '@/hooks/tagLibrary/useTagUserDetail'
    import userListTable from '../components/userListTable.vue'

    export default defineComponent({
        name: 'TagUserDetail',
        components: { userListTable },
        setup() {
            const { state } = usePageTable()

            return {
                ...toRefs(state)
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
