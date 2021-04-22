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
                        查看时间：2021.4.5 17:20:00
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary">导出</el-button>
                </el-col>
            </div>
            <!-- <page-table
                :tableData="tableInfo.data"
                :field-list="tableInfo.fieldList"
                sortProp="name"
                :sortOrder="1"
                :list-type-info="listTypeInfo"
                :handle="tableInfo.handle"
            ></page-table> -->
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    getCurrentInstance,
    ComponentInternalInstance,
    onMounted,
    toRefs
} from 'vue'
import { useRoute } from 'vue-router'
import { usePageTable } from "@/hooks/userManageHook/useUserDetail";

export default defineComponent({
    name: 'userDetail',
    setup() {
        const route = useRoute()

        const { state } = usePageTable();

        onMounted(() => {
            console.log('....userDetail', route.query.id)
        })

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
    }

    .refresh {
        color: $--color-primary;
        cursor: pointer;
    }
}
</style>