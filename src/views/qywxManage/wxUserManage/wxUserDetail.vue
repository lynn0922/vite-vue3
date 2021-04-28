<template>
    <div class="page-content">
        <div class="crowdDetail">
            <img :src="userDetail.avatar" alt="" class="img" />
            <div class="crowd-center">
                <div class="name"> 昵称：{{ userDetail.userName }} </div>
                <div class="sex"> 性别： {{ Gender[userDetail.gender] }} </div>
                <div class="remark"> 备注： {{ userDetail.nameRemark }} </div>
            </div>
            <div class="crowd-r">
                <div class="ucode"> ucode: {{ userDetail.ucode || '' }} </div>
                <div class="add-time">
                    添加时间：
                    <span v-for="(item, index) in userDetail.memberAddTimes" :key="index">
                        {{ item }}
                        <span v-if="index !== userDetail.memberAddTimes.length - 1">/</span>
                    </span>
                </div>
                <div class="wx-code">
                    添加成员名称：
                    <span v-for="(item, index) in userDetail.workWeixinMemberNames" :key="index">
                        {{ item }}
                        <span v-if="index !== userDetail.workWeixinMemberNames.length - 1">/</span>
                    </span>
                </div>
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
                    <div v-if="item.name === 'detail'" class="detail-content">
                        <div class="detail-title-fixed">
                            <span style="margin-right: 20px">固定标签</span>
                            <!-- <el-button type="text" @click="addTag">添加标签</el-button> -->
                            <div class="tags">
                                <el-tag
                                    v-for="(tag, tagIdx) in fixedTags"
                                    :key="tagIdx"
                                    style="margin-right: 10px"
                                    closable
                                    effect="plain"
                                    @close="closeTag"
                                >
                                    {{ tag.tagName }}
                                </el-tag>
                            </div>
                        </div>
                        <div class="detail-title-dy">
                            <div style="padding: 9px 0"> 动态标签 </div>
                            <div class="tags">
                                <el-tag
                                    v-for="(tag, tagIdx) in dynamicTags"
                                    :key="tagIdx"
                                    style="margin-right: 10px"
                                    effect="plain"
                                >
                                    {{ tag.tagName }}
                                </el-tag>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>

    <page-dialog v-model:dialogVisible="dialogVisible" :dialog-title="'添加标签'" :dialog-width="'20%'" @on-confirm="onConfirm">
        <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button style="margin-left: 10px" type="text" @click="handleCreate"> 新建 </el-button>
        <el-input
            v-if="showInput"
            v-model="tagName"
            placeholder="请输入标签名称"
            style="margin-top: 10px"
            @keyup.enter="handleKeyup"
        />
        <div class="radio-group">
            <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="(item, index) in checkData" :key="index" :label="item.id" style="margin-bottom: 10px">
                    {{ item.label }}
                </el-checkbox>
            </el-checkbox-group>
        </div>
    </page-dialog>
</template>

<script lang="ts">
    import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
    import { useTabs } from '@/hooks/wxUserManage/usetabs'
    import { useRoute } from 'vue-router'
    import { getWxUserDetail } from '@/http/wxUserManage'
    import { Gender } from '@/enum/gender'

    interface ItagGroupDataList {
        type: number
        tagList: {
            id: string
            lastUpdateTime: any
            tagName: string
            userCount: any
        }
    }

    interface IuserDeatil {
        accountNo: string
        avatar: string
        b2cUserId: number
        createBy: string
        createTime: string
        gender: number
        id: string
        isDeleted: number
        memberAddTimes: string[]
        nameRemark: string
        tagGroupDataList: ItagGroupDataList[]
        tagIds: string
        tagNameList: string[]
        ucode: string | null
        unionid: string
        updateBy: string
        updateTime: string
        userName: string
        workWeixinMemberNames: string[]
    }

    interface user {
        userDetail: IuserDeatil
    }

    export default defineComponent({
        name: 'WxUserDetail',
        setup() {
            let user = reactive<user>({
                userDetail: {
                    accountNo: '',
                    avatar: '',
                    b2cUserId: 0,
                    createBy: '',
                    createTime: '',
                    gender: 0,
                    id: '',
                    isDeleted: 0,
                    memberAddTimes: [],
                    nameRemark: '',
                    tagGroupDataList: [],
                    tagIds: '',
                    tagNameList: [],
                    ucode: null,
                    unionid: '',
                    updateBy: '',
                    updateTime: '',
                    userName: '',
                    workWeixinMemberNames: []
                }
            })

            const route = useRoute()

            onMounted(() => {
                getUserDetail(route.query.id as string)
            })

            const getUserDetail = async (id: string) => {
                const res = await getWxUserDetail(id)

                user.userDetail = res

                const { tagGroupDataList } = res

                tagGroupDataList.map((item: { type: number; tagList: { tagName: string; id: number }[] }) => {
                    if (item.type === 1) {
                        ;(state.fixedTags as { tagName: string; id: number }[]) = item.tagList
                    }

                    if (item.type === 2) {
                        ;(state.dynamicTags as { tagName: string; id: number }[]) = item.tagList
                    }
                })
            }

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
                handleKeyup,
                ...toRefs(user),
                Gender
            }
        }
    })
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
