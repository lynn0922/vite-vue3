<template>
    <div class="registered-table" v-for="(item, index) in tabelList" :key="index">
        <div class="table-row">
            <el-col :span="4">
                <div class="row-one">
                    <div class="row-title">{{ item.title }}</div>
                    <div class="all-user-num" v-if="item.showUserNum">
                        <span>共</span>
                        <span class="num">7891</span>
                        <span>人</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="row-title">
                    {{ item.timeTxt }} {{ item.time }}
                    <span class="refresh" v-if="item.refresh" @click="refreshTable(item.target)"
                        >刷新</span
                    >
                </div>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" v-if="item.create" @click="handelCreateTag(item.target)"
                    >新建标签</el-button
                >
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
            @select-all="selectAll"
            @selection-change="selectionChange"
        >
            <template v-slot:bt-check="scope">
                <el-button type="text" @click="handleClick('check', scope.data.row)"
                    >查看</el-button
                >
            </template>
            <template v-slot:bt-edit="scope">
                <el-button type="text" @click="handleClick('bt-edit', scope.data.row)"
                    >编辑</el-button
                >
            </template>
            <template v-slot:bt-del="scope">
                <el-button type="text" @click="handleClick('del', scope.data.row)">删除</el-button>
            </template>
        </page-table>
    </div>
</template>

<script lang="ts">
    import { onMounted, PropType, reactive, toRefs } from 'vue'
    import { Basic, IfieldList, Ihandle } from '@/components/PageTable/tableTypes'

    interface Iinfo {
        title: string
        timeTxt: string
        time: string
        refresh: boolean
        target: string
        create: boolean
        tableInfo: {
            data: Basic<any>[]
            fieldList: IfieldList
            sortProp: string
            sortOrder: number
            paging: boolean
            handle: Ihandle
        }
    }

    export default {
        name: 'tagTable',
        props: {
            tabelList: {
                type: Array as PropType<Iinfo[]>,
                required: true
            }
        },
        emits: [
            'handleClick',
            'handleSizeChange',
            'handleCurrentChange',
            'handelCreateTag',
            'refreshTable',
            'select-all',
            'selection-change'
        ],
        setup(props, { emit }) {
            onMounted(() => {
                console.log(props.tabelList)
            })

            const handleClick = (event: string, row: any) => {
                emit('handleClick', event, row)
            }
            const handleSizeChange = (val: number) => {
                emit('handleSizeChange', val)
            }

            const handleCurrentChange = (val: number) => {
                emit('handleCurrentChange', val)
            }

            const handelCreateTag = (val: any) => {
                emit('handelCreateTag', val)
            }

            const refreshTable = (target: string) => {
                emit('refreshTable', target)
            }

            const selectAll = (selection: any) => {
                emit('select-all', selection)
            }

            const selectionChange = (selection: any) => {
                emit('selection-change', selection)
            }

            return {
                handleClick,
                handelCreateTag,
                handleCurrentChange,
                handleSizeChange,
                refreshTable,
                selectAll,
                selectionChange
            }
        }
    }
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
