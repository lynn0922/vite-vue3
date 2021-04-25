<template>
    <div class="page-content">
        <div class="crowdDetail">
            <img src="" alt="" class="img" />
            <div class="crowd-center">
                <div class="name">昵称：哈哈</div>
                <div class="sex">性别： 女</div>
                <div class="remark">备注： 可爱多</div>
            </div>
            <div class="crowd-r">
                <div class="ucode">ucode: 12345</div>
                <div class="add-time">添加时间：2021年2月12日17：09：04</div>
                <div class="wx-code">添加微信号：小唯</div>
            </div>
        </div>
        <div class="crowd-tabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                    v-for="(item, index) in tabData"
                    :key="index"
                    :disabled="item.disabled"
                    :label="item.label"
                    :name="item.name"
                >
                    <div class="detail-content" v-if="item.name === 'detail'">
                        <div class="detail-title-fixed">
                            <span style="margin-right: 20px">固定标签</span>
                            <!-- <el-button type="text" @click="addTag">添加标签</el-button> -->
                            <div class="tags">
                                <el-tag
                                    v-for="tag in tags"
                                    :key="tag.name"
                                    style="margin-right: 10px"
                                    closable
                                    @close="closeTag"
                                    :type="tag.type"
                                    effect="plain"
                                >
                                    {{ tag.name }}
                                </el-tag>
                            </div>
                        </div>
                        <div class="detail-title-dy">
                            <div style="padding: 9px 0">动态标签</div>
                            <div class="tags">
                                <el-tag
                                    v-for="tag in tags"
                                    :key="tag.name"
                                    style="margin-right: 10px"
                                    :type="tag.type"
                                    effect="plain"
                                >
                                    {{ tag.name }}
                                </el-tag>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>

    <page-dialog
        v-model:dialogVisible="dialogVisible"
        :dialogtitle="'添加标签'"
        :dialogwidth="'20%'"
        @on-confirm="onConfirm"
    >
        <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <el-button style="margin-left: 10px" type="text" @click="handleCreate">新建</el-button>
        <el-input
            v-model="tagName"
            placeholder="请输入标签名称"
            v-if="showInput"
            @keyup.enter="handleKeyup"
            style="margin-top: 10px"
        ></el-input>
        <div class="radio-group">
            <el-checkbox-group v-model="checkList">
                <el-checkbox
                    :label="item.id"
                    v-for="(item, index) in checkData"
                    :key="index"
                    style="margin-bottom: 10px"
                >
                    {{ item.label }}
                </el-checkbox>
            </el-checkbox-group>
        </div>
    </page-dialog>
</template>

<script lang="ts">
    import { reactive, ref, toRefs } from 'vue'
    import { useTabs } from '@/hooks/wxUserManage/usetabs'

    export default {
        name: 'wxUserDetail',
        setup() {
            const { state, closeTag, handleClick, onConfirm, addTag } = useTabs()

            let showInput = ref(false)
            let tagName = ref('')

            const handleCreate = () => {
                showInput.value = true
            }

            const handleKeyup = () => {
                console.log(tagName.value)
            }

            return {
                ...toRefs(state),
                closeTag,
                handleClick,
                onConfirm,
                addTag,
                tagName,
                handleCreate,
                showInput,
                handleKeyup
            }
        }
    }
</script>

<style lang="scss" scoped>
    .crowdDetail {
        @extend .border-global;
        @extend .border-radius-10;
        padding: 20px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;

        .img {
            width: 100px;
            height: 100px;
            margin-right: 30px;
        }

        .crowd-r,
        .crowd-center {
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .crowd-center {
            margin-right: 70px;
        }
    }

    .crowd-tabs {
        @extend .border-global;
        @extend .border-radius-10;
        padding: 20px;
        margin-bottom: 30px;

        .detail-content {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;

            .detail-title-fixed,
            .detail-title-dy {
                width: 50%;
                min-height: 300px;
                font-weight: 700;
            }

            .detail-title-dy {
                border-left: 1px solid $--border-color;
                padding-left: 20px;
            }
        }
    }

    .radio-group {
        margin-top: 20px;
    }
</style>
