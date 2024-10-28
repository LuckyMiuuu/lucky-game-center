<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { storeToRefs } from 'pinia';
import { showSuccessToast, showFailToast, showToast } from 'vant';
import { useUserStore } from '@/stores/user';
import { base64Encode } from '@/utils/js-helpers'
import type { UrlParams } from '@/models'
import { SHARE_TEXT } from '@/constants'
import { joinOfficialChannel } from '@/utils/general'
import { getDailyTask, dailyTaskCheckin } from '@/api/index'
import {
    getUserWalletAddress,
    setUserWalletAddress,
} from '@/api/index'
import Clipboard from 'clipboard'
import AddressInputPopup from '@/components/common/AddressInputPopup.vue';

import DailyTaskHelpPopup from '@/components/myMiuuu/DailyTaskHelpPopup.vue';
import SelectCurrencyPopup from '@/components/games/SelectCurrencyPopup.vue';

import MyTasksPopup from '@/components/myMiuuu/MyTasksPopup.vue';
import MyGroupsPopup from '@/components/myMiuuu/MyGroupsPopup.vue';
import MyPropsPopup from '@/components/myMiuuu/MyPropsPopup.vue';

defineOptions({
  name: 'MyMiuuuView'
})

const props = defineProps({
    params: {
        type: Object as () => UrlParams,
        required: true,
    },
    canGetData: {
        type: Boolean,
        default: false
    }
})

const userStore = useUserStore()
const {
    selfTelegramUserId,
} = storeToRefs(userStore)

watch(() => [props.canGetData],
    (newVal) => {
        if (newVal) {
            if (newVal[0]) {
                getMyDailyTask()
            }
    }
});

onMounted(() => {
})

// daily task
const dailyTaskStatus = ref(0)
const dailyTaskCheckedDays = ref(0)
const dailyTaskTodayReward = ref(0)
const dailyTaskTomorrowReward = ref(0)

function getMyDailyTask() {
    getDailyTask().then((rsp: any) => {
        if (rsp.data) {
            dailyTaskStatus.value = rsp.data.status ? rsp.data.status : 0
            dailyTaskTodayReward.value = rsp.data.today_reward ? rsp.data.today_reward : 0
            dailyTaskTomorrowReward.value = rsp.data.tomorrow_reward ? rsp.data.tomorrow_reward : 0
            dailyTaskCheckedDays.value = rsp.data.current_streak ? rsp.data.current_streak : 0
        }
    }).catch((error) => {
    })
}

function onPlayNow() {
    // onSelectCurrencyPopupShow()
    // joinOfficialChannel()

    onSelectCurrencySubmit('miuuu_1')
}

const dailyTaskIsChecking = ref(false)
function onClaimReward() {
    if (dailyTaskIsChecking.value) {
        return
    }
    dailyTaskIsChecking.value = true
    dailyTaskCheckin().then((rsp: any) => {
        dailyTaskIsChecking.value = false
        if (rsp.code == 0) {
            showSuccessToast('Claim reward successfully');
            getMyDailyTask();
        } else {
            showFailToast('Claim reward failed');
        }
    }).catch((error) => {
        dailyTaskIsChecking.value = false
        showFailToast('Claim reward failed');
    })
}

const selectCurrencyPopupShow = ref(false)
function onSelectCurrencyPopupShow() {
    selectCurrencyPopupShow.value = true;
}
function onSelectCurrencyPopupClose() {
    selectCurrencyPopupShow.value = false;
}

// costType: 'why_1' 'miuuu_1'
function onSelectCurrencySubmit(costType: string) {
    let gameShortUrl = import.meta.env.VITE_SHARE_LINK
    var params = {
        chat_id: props.params.from_chat_id,
        room_id: props.params.from_room_id,
        group_mode: props.params.from_group_mode,
        tg_user_id: selfTelegramUserId.value,
        cost_type: costType
    }
    var gameUrl = gameShortUrl + '?startapp=' + base64Encode(JSON.stringify(params))
    window.open(gameUrl, '_blank');
}

const dailyTaskHelpPopupShow = ref(false)
function onDailyTaskHelpPopupShow() {
    dailyTaskHelpPopupShow.value = true;
}
function onDailyTaskHelpPopupHide() {
    dailyTaskHelpPopupShow.value = false;
}



// block 1
function onShare() {
    // let gameShortUrl = import.meta.env.VITE_SHARE_LINK
    // let text = SHARE_TEXT;
    // var params = {
    //     chat_id: props.params.from_chat_id,
    //     room_id: props.params.from_room_id,
    //     group_mode: props.params.from_group_mode,
    //     tg_user_id: selfTelegramUserId.value,
    // }
    // var gameUrl = gameShortUrl + '?startapp=' + base64Encode(JSON.stringify(params))
    // var shareUrl = 'https://t.me/share/url'
    // shareUrl += `?url=${encodeURIComponent(gameUrl)}`;
    // shareUrl += `&text=${encodeURIComponent(text)}`;
    // window.open(shareUrl, '_blank');

    const channelUrl = import.meta.env.VITE_JOIN_CHANNEL_LINK
    let text = SHARE_TEXT;
    var shareUrl = 'https://t.me/share/url'
    shareUrl += `?url=${encodeURIComponent(channelUrl)}`;
    shareUrl += `&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
}

const inviteTextLink = ref('')
function onCopyInviteLink() {
    const channelUrl = import.meta.env.VITE_JOIN_CHANNEL_LINK
    let text = SHARE_TEXT;
    inviteTextLink.value = `${channelUrl}
${text}`
    // console.log('inviteTextLink',inviteTextLink.value)
    const clipboard = new Clipboard('.copy-invite-link')
    clipboard.on('success', () => {
        showToast('Copied');
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        showToast('Copy failed');
        clipboard.destroy()
    })
}


// block 2
const myPropsPopupShow = ref(false)
function onMyPropsPopupShow() {
    myPropsPopupShow.value = true;
}
function onMyPropsPopupHide() {
    myPropsPopupShow.value = false;
}


// block 3
const taskPopupShow = ref(false)
function onTaskPopupShow() {
    taskPopupShow.value = true;
}
function onTaskPopupHide() {
    taskPopupShow.value = false;
}

// block 4
function onInviteBot() {
    const inviteUrl = import.meta.env.VITE_INVITE_BOT_URL
    const telegramWebApp = (window as any).Telegram?.WebApp
    if (telegramWebApp) {
        telegramWebApp.openTelegramLink(inviteUrl)
    } else {
        window.open(inviteUrl, '_blank');
    }
}

const myGroupPopupShow = ref(false)
function onMyGroupPopupShow() {
    myGroupPopupShow.value = true;
}
function onMyGroupPopupHide() {
    myGroupPopupShow.value = false;
}


// others
const selfWalletAddress = ref('')
const selfWalletAddressShort = computed(() => {
    let result = ''
    if (selfWalletAddress.value) {
        const length = selfWalletAddress.value.length;
        result = selfWalletAddress.value.substring(0,7)+ '...' + selfWalletAddress.value.substring(length-5)
    }
    return result;
})
function getAddress() {
    getUserWalletAddress().then((userRsp: any) => {
        if (userRsp.data && userRsp.data.address) {
            selfWalletAddress.value = userRsp.data.address
        }
    }).catch((error) => {
        
    })
}

const addressInputPopupShow = ref(false)
function onAddressClose() {
    addressInputPopupShow.value = false;
}
function onAddressSubmit(address: string) {
    let data = JSON.stringify({
        address: address
    })
    setUserWalletAddress(data).then((userRsp: any) => {
        if (userRsp.code == 0) {
            addressInputPopupShow.value = false;
            getAddress()
        } else {
            showFailToast('set address faild')
        }
    }).catch((error) => {
        showFailToast('set address faild')
    })
}

</script>

<template>
    <div class="page hidden-scroll-bar">

        <div class="miuuu-top main-bg-color1">
            <div class="main-top-bg"></div>
        </div>

        <div class="miuuu-main">
            <div class="daily-task">
                <div class="task-info">
                    <div class="task-title">
                      <p>Daily Party Check-in</p>
                      <div @click="onDailyTaskHelpPopupShow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M7.09096 11.91H8.90896V7.251H7.09096V11.91ZM7.99996 5.96287C8.27246 5.96287 8.5009 5.87069 8.68528 5.68631C8.86965 5.50194 8.96184 5.2735 8.96184 5.001C8.96184 4.7285 8.86965 4.50006 8.68528 4.31569C8.5009 4.13131 8.27246 4.03912 7.99996 4.03912C7.72746 4.03912 7.49903 4.13131 7.31465 4.31569C7.13028 4.50006 7.03809 4.7285 7.03809 5.001C7.03809 5.2735 7.13028 5.50194 7.31465 5.68631C7.49903 5.87069 7.72746 5.96287 7.99996 5.96287ZM7.99996 15.8614C6.90596 15.8614 5.88153 15.6554 4.92665 15.2434C3.9719 14.8314 3.1414 14.2722 2.43515 13.5658C1.72878 12.8596 1.16959 12.0291 0.757587 11.0743C0.345587 10.1194 0.139587 9.095 0.139587 8.001C0.139587 6.907 0.345587 5.88256 0.757587 4.92769C1.16959 3.97294 1.72878 3.14244 2.43515 2.43619C3.1414 1.72981 3.9719 1.17062 4.92665 0.758624C5.88153 0.346624 6.90596 0.140625 7.99996 0.140625C9.09396 0.140625 10.1184 0.346624 11.0733 0.758624C12.028 1.17062 12.8585 1.72981 13.5648 2.43619C14.2712 3.14244 14.8303 3.97294 15.2423 4.92769C15.6543 5.88256 15.8603 6.907 15.8603 8.001C15.8603 9.095 15.6543 10.1194 15.2423 11.0743C14.8303 12.0291 14.2712 12.8596 13.5648 13.5658C12.8585 14.2722 12.028 14.8314 11.0733 15.2434C10.1184 15.6554 9.09396 15.8614 7.99996 15.8614Z" fill="black"/>
                        </svg>
                      </div>
                    </div>
                    <div class="task-desc">
                        Play today to earn <span>{{ dailyTaskTodayReward }} MIUUU</span>! 
                        <br>
                        Come back tomorrow for <span>{{ dailyTaskTomorrowReward }} MIUUU</span>.
                    </div>
                    <div v-if="dailyTaskStatus == 1" class="task-btn" @click="onClaimReward">Claim Today’s Reward</div>
                    <div v-else-if="dailyTaskStatus == 2" class="task-btn finished" @click="onPlayNow">Reward Claimed Today</div>
                    <div v-else class="task-btn" @click="onPlayNow">Play now!</div>
                </div>
                <div 
                    class="task-date" 
                    :class="{
                        step1: dailyTaskCheckedDays <= 9,
                        step2: dailyTaskCheckedDays >= 10 && dailyTaskCheckedDays <= 19,
                        step3: dailyTaskCheckedDays >= 20 && dailyTaskCheckedDays <= 29,
                        step4: dailyTaskCheckedDays >= 30,
                    }"
                >
                    <div class="date" :class="{small: dailyTaskCheckedDays >= 100}">{{ dailyTaskCheckedDays }}</div>
                    <div class="date-desc">{{dailyTaskCheckedDays > 0 ? 'Days' : 'Day'}} Streak</div>
                </div>
            </div>

            <div class="miuuu-content">
                <div class="miuuu-content-inner">
                    <div class="miuuu-content-inner-box miuuu-cotent-invite">
                        <div class="icon">
                            <img src="@/assets/images/miuuu_invite.png">
                        </div>
                        <div class="content">
                            <div class="title">Invite Friend</div>
                            <div class="desc">Refer friends to Miuuu’s party, earn more Miuuu Points!</div>
                            <div class="operation">
                                <div class="btn" @click="onShare">Invite</div>
                                <div class="btn outline copy-invite-link" @click="onCopyInviteLink" :data-clipboard-text="inviteTextLink">Copy link</div>
                            </div>
                        </div>
                    </div>
                    <div class="miuuu-content-inner-box miuuu-content-item" @click="onMyPropsPopupShow">
                        <div class="icon">
                            <img src="@/assets/images/miuuu_item.png">
                        </div>
                        <div class="content">
                            <div class="title">Miuuu Store</div>
                            <div class="desc">Endless treasures await… Everything a happy Miuuu needs for the party!</div>
                        </div>
                    </div>
                </div>
                <div class="miuuu-content-inner">
                    <div class="miuuu-content-inner-box miuuu-content-task" @click="onTaskPopupShow">
                        <div class="icon">
                            <img src="@/assets/images/miuuu_task.png">
                        </div>
                        <div class="content">
                            <div class="title">Miuuu Task</div>
                            <div class="desc">Ding ding! Little Miuuus, complete the daily tasks to win more Miuuu Points!</div>
                        </div>
                    </div>
                    <div class="miuuu-content-inner-box miuuu-content-bot">
                        <div class="icon">
                            <img src="@/assets/images/miuuu_bot.png">
                        </div>
                        <div class="content">
                            <div class="title">Invite Bot to Group</div>
                            <div class="desc">Brave Miuuu captains, Add Miuuu Bot as an admin ! More groups, more rewards. Be the Miuuu that earns even while you sleep. Let’s RAVE!</div>
                            <div class="operation">
                                <div class="btn" @click="onInviteBot">Invite</div>
                                <div class="btn outline" @click="onMyGroupPopupShow">Details</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <DailyTaskHelpPopup
            :show="dailyTaskHelpPopupShow"
            @on-close="onDailyTaskHelpPopupHide"
        />

        <MyTasksPopup :show="taskPopupShow" :canGetData="canGetData" @onClose="onTaskPopupHide" />

        <MyGroupsPopup :show="myGroupPopupShow" :canGetData="canGetData" @onClose="onMyGroupPopupHide" />

        <MyPropsPopup :show="myPropsPopupShow" :canGetData="canGetData" @onClose="onMyPropsPopupHide" />

        <SelectCurrencyPopup
            :show="selectCurrencyPopupShow"
            @on-close="onSelectCurrencyPopupClose"
            @on-submit="onSelectCurrencySubmit"
        />

        <AddressInputPopup 
            :show="addressInputPopupShow" 
            :address="selfWalletAddress" 
            @on-close="onAddressClose"
            @on-submit="onAddressSubmit"
        />
    </div>
</template>

<style lang="scss" scoped>
.page{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    border-bottom: 82px transparent solid;
    .miuuu-top{
        width: 100%;
        padding: 0px 0 0px 0;
        box-sizing: border-box;
        .main-top-bg{
            width: 100%;
            height: 340px;
            background: url('@/assets/images/mymiuuu_head.png') 0 0 no-repeat;
            background-size: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            // justify-content: center;
        }

        
    }

    .miuuu-main{
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        margin-top: -80px;
        .daily-task{
            width: 100%;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 12px;
            background: #FFF;
            box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
            margin-bottom: 10px;
            .task-info{
                width: 202px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                .task-title{
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    p{
                      color: #000;
                      font-size: 18px;
                      font-weight: 600;
                      line-height: normal;
                    }
                    div{
                      cursor: pointer;
                      line-height: 0;
                    }
                }
                .task-desc{
                    color: #000;
                    font-size: 10px;
                    font-weight: 400;
                    line-height: normal;
                    span{
                        opacity: 0.5;
                        color: #FF398B;
                        font-size: 10px;
                        font-weight: 700;
                        line-height: normal;
                    }
                }
                .task-btn{
                    width: fit-content;
                    border-radius: 8px;
                    background: #000;
                    display: flex;
                    height: 30px;
                    padding: 0 16px;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.15px;
                    color: #fff;
                    cursor: pointer;
                }
                .task-btn.finished{
                    background-color: rgba(0, 0, 0, 0.35)
                }
            }
            .task-date{
                width: 106px;
                height: 102px;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .date{
                    font-size: 60px;
                    font-weight: 800;
                    line-height: normal;
                    letter-spacing: -4px;
                }
                .date.small{
                    font-size: 40px;
                }
                .date-desc{
                    font-size: 14px;
                    font-weight: 600;
                    line-height: normal;
                }
            }
            .task-date.step1{
                background: #FFF3DE;
                color: #FFAF25;
            }
            .task-date.step2{
                background: #FFEBE1;
                color: #FF5F25
            }
            .task-date.step3{
                background: #FFDEEC;
                color: #FF398B
            }
            .task-date.step4{
                background: #EEDEFF;
                color: #9955EC
            }
        }
        .miuuu-content{
            width: 100%;
            display: flex;
            gap: 10px;
            .miuuu-content-inner{
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 10px;
                .miuuu-content-inner-box{
                    width: 100%;
                    padding: 16px;
                    border-radius: 12px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .icon{
                        width: 24px;
                        height: 24px;
                        position: relative;
                        line-height: 0;
                        img{
                            width: 100%;
                        }
                    }
                    .content{
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        .title{
                            color: #000;
                            font-size: 18px;
                            font-weight: 600;
                            line-height: normal;
                        }
                        .desc{
                            color: rgba(0, 0, 0, .5);
                            font-size: 10px;
                            font-weight: 400;
                            line-height: normal;
                        }
                        .operation{
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 10px;
                            .btn{
                                width: 100%;
                                height: 30px;
                                border-radius: 8px;
                                background-color: #000;
                                color: #ffffff;
                                font-size: 12px;
                                font-weight: 600;
                                letter-spacing: 0.15px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-sizing: border-box;
                                cursor: pointer;
                            }
                            .btn.outline{
                                background-color: transparent;
                                color: #000;
                                border: 1px #000 solid;
                            }
                        }
                    }
                }

                .miuuu-cotent-invite{
                    height: 220px;
                    background: linear-gradient(149deg, rgba(57, 184, 255, 0.00) 0%, rgba(57, 184, 255, 0.50) 100%), #FFF;
                    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
                }
                .miuuu-content-item{
                    height: 140px;
                    background: linear-gradient(132deg, rgba(255, 169, 199, 0.00) 0%, rgba(255, 169, 199, 0.50) 100%), #FFF;
                    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
                    cursor: pointer;
                }
                .miuuu-content-task{
                    height: 140px;
                    background: linear-gradient(132deg, rgba(188, 255, 47, 0.00) 0%, rgba(188, 255, 47, 0.50) 100%), #FFF;
                    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
                    cursor: pointer;
                }
                .miuuu-content-bot{
                    height: 220px;
                    background: linear-gradient(149deg, rgba(156, 154, 255, 0.00) 0%, rgba(156, 154, 255, 0.50) 100%), #FFF;
                    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
                }
            }
        }
    }

    

    
}

</style>