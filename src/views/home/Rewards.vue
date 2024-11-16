<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { storeToRefs } from 'pinia';
import { showSuccessToast, showFailToast, showToast } from 'vant';
import type { UrlParams } from '@/models'
import { getRewardBoostHistory, getRewardAchivedHistory, getRewardUserTaskInfo } from '@/api/index'
import {
    getUserWalletAddress,
    setUserWalletAddress,
} from '@/api/index'
import { base64Encode } from '@/utils/js-helpers'
import { useUserStore } from '@/stores/user';
import { getInviteFriendToBootGameLink,onInviteFriendToBoost, INVITE_FRIEND_TO_BOOST_TEXT } from '@/constants/index'
import Clipboard from 'clipboard'

import GuidePopup from '@/components/rewards/GuidePopup.vue';

import ListEmpty from '@/components/common/ListEmpty.vue'

defineOptions({
  name: 'GamesView'
})

const props = defineProps({
    params: {
        type: Object as () => UrlParams,
        required: true,
    },
    canGetData: {
        type: Boolean,
        default: false
    },
    show: {
        type: Boolean,
        default: false
    }
})

const userStore = useUserStore()
const {
    selfTelegramUserId,
} = storeToRefs(userStore)

onMounted(() => {
    
})

const progressAnimateShow = ref(false)
watch(() => [props.canGetData, props.show],
    (newVal) => {
        if (newVal) {
            if (newVal[0]) {
                getUserTaskInfo()
                getBoostList()
                getAchivedList()
                getAddress()
            }

            if (newVal[1]) {
                progressAnimateShow.value = true
                if (amount.value > 0) {
                    console.log('animate run2')
                    animateRun()
                }
            }
    }
});

const amount = ref(0)
const percent = ref('0.00')
const singleAddPercent = ref<string | number>(0.00)
const fireLeft = computed(() => {
    return 276 * percentValue.value / 10000 - 13;
})
const completeNess = ref(0)

const percentValue = ref(0)

const miuuuActiveTab = ref(2)
function onMiuuuTab(index: number) {
    if (miuuuActiveTab.value != index) {
        miuuuActiveTab.value = index
    }
}

function getUserTaskInfo() {
    getRewardUserTaskInfo().then((rsp: any) => {
        if (rsp.data) {
            amount.value = rsp.data.usdt_cent ? rsp.data.usdt_cent / 100 : 0.00
            percent.value = rsp.data.complete_ness ? (rsp.data.complete_ness / 100) + '' : '0.00'

            if (rsp.data.complete_ness && rsp.data.complete_ness_start) {
                singleAddPercent.value = (rsp.data.complete_ness - rsp.data.complete_ness_start) / rsp.data.complete_number / 100
                singleAddPercent.value = singleAddPercent.value.toFixed(2)
            }

            completeNess.value = rsp.data.complete_ness

            if (progressAnimateShow.value) {
                console.log('animate run1')
                animateRun()
            }
        }
    }).catch((error) => {
    })
}

const animateRunStatus = ref(0)
function animateRun() {
    if (animateRunStatus.value > 0 || completeNess.value <= 0) {
        return
    }
    animateRunStatus.value = 1
    let timer = setInterval(() => {
        if (percentValue.value < completeNess.value) {
            if (percentValue.value + 300 > completeNess.value) {
                percentValue.value = completeNess.value
            } else {
                percentValue.value += 300
            }
        } else {
            percentValue.value = completeNess.value
            clearInterval(timer)
            animateRunStatus.value = 2
        }
    }, 90);
}

interface BoostUserInfo{
    user_id: string;
    username: string;
}
const boostList = ref<Array<BoostUserInfo>>([])
function getBoostList() {
    getRewardBoostHistory().then((rsp: any) => {
        if (rsp.data) {
            boostList.value = rsp.data
        }
    }).catch((error) => {
        
    })
}

interface AchivedUserInfo{
    usdt_cent: number;
    username: string;
    complete_at: string;
}
const claimAchivedList = ref<Array<AchivedUserInfo>>([])
function getAchivedList() {
    getRewardAchivedHistory().then((rsp: any) => {
        if (rsp.data) {
            claimAchivedList.value = rsp.data
        }
    }).catch((error) => {
        
    })
}


const inviteLink = computed(() => {
    let gameShortUrl = getInviteFriendToBootGameLink()
    var params = {
        chat_id: props.params.from_chat_id,
        room_id: props.params.from_room_id,
        group_mode: props.params.from_group_mode,
        tg_user_id: selfTelegramUserId.value,
    }
    var gameUrl = gameShortUrl + '?startapp=' + base64Encode(JSON.stringify(params))
    return gameUrl
})

const copyText = computed(() => {
    return `${inviteLink.value}
        ${INVITE_FRIEND_TO_BOOST_TEXT}
    `
})

function onInvite() {
    onInviteFriendToBoost(inviteLink.value)
}

function onCopy() {
    if (!copyText.value) {
        return;
    }
    const clipboard = new Clipboard('.copy-icon')
    clipboard.on('success', () => {
        showToast('Copied');
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        showToast('Copy failed');
        clipboard.destroy()
    })

}


const guidePopupShow = ref(false)
function onGuidePopupShow() {
    guidePopupShow.value = true;
}
function onGuidePopupHide() {
    guidePopupShow.value = false;
}

const selfWalletAddress = ref('')
function getAddress() {
    getUserWalletAddress().then((userRsp: any) => {
        if (userRsp.data && userRsp.data.address) {
            selfWalletAddress.value = userRsp.data.address
        }
    }).catch((error) => {
        
    })
}
function onAddressSubmit(address: string) {
    let data = JSON.stringify({
        address: address
    })
    setUserWalletAddress(data).then((userRsp: any) => {
        if (userRsp.code == 0) {
            showSuccessToast('set address successfully')
            onGuidePopupHide()
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
        <div class="rewards-title">Claim Your Reward</div>
        <div class="rewards-desc">Invite More Friends, Earn More USDT!</div>

        <div class="rewards-bg">
            <div class="rewards-bg-claim" @click="onGuidePopupShow">Claim</div>
            <div class="rewards-bg-title">FREE USDT Reward</div>
            <div class="rewards-bg-amount">
                <img src="@/assets/images/rewards_amount_icon.png" />
                <p>{{ amount }} USDT</p>
            </div>
        </div>

        <div class="rewards-progress">
            <div class="rewards-progress-title">Your progress</div>
            <div class="rewards-progress-value">{{percentValue / 100}}% completed</div>
            <div class="rewards-progress-out">
                <div class="rewards-fire" :style="{ left: fireLeft + 'px' }">
                    <img src="@/assets/images/rewards_fire.png">
                </div>
                <div class="rewards-progress-in" :style="{ width: (percentValue/100) + '%' }"></div>
            </div>
        </div>

        <div class="rewards-claim-btn" @click="onGuidePopupShow">Claim Now</div>

        <div class="miuuu-tab">
            <div 
                class="miuuu-tab-btn boost" 
                :class="miuuuActiveTab == 0 ? 'miuuu-tab-active' : ''" 
                @click="() => {
                    onMiuuuTab(0);
                    // getTaskList();
                }"
            >Boost History</div>
            <div 
                class="miuuu-tab-btn claim" 
                :class="miuuuActiveTab == 1 ? 'miuuu-tab-active' : ''" 
                @click="() => {
                    onMiuuuTab(1)
                    // getMiuuuHistory();
                }"
            >Successful Claim</div>
            <div 
                class="miuuu-tab-btn guide" 
                :class="miuuuActiveTab == 2 ? 'miuuu-tab-active' : ''" 
                @click="() => {
                    onMiuuuTab(2)
                    // getUserPropList();
                }"
            >Claim Guide</div>
        </div>

        <div v-if="miuuuActiveTab == 0" class="rewards-list">
            <ListEmpty v-if="boostList.length <= 0" size="small" text="No data yet" />
            <div v-else v-for="(item,index) in boostList" :key="index" class="list-item">
                <div class="user-info">
                    <div class="avatar"><img src="@/assets/images/tab_mymiuuu_active.png" ></div>
                    <div class="user">
                        <div class="name ellipsis1">{{ item.username }}</div>
                        <div class="desc">Successfully boosted for you!</div>
                    </div>
                </div>
                <div class="percent">+ {{singleAddPercent}}%</div>
            </div>
        </div>

        <div v-else-if="miuuuActiveTab == 1" class="rewards-list">
            <ListEmpty v-if="claimAchivedList.length <= 0" size="small" text="No data yet" />
            <div v-else v-for="(item,index) in claimAchivedList" :key="index" class="list-item">
                <div class="user-info-claim">
                    <div class="avatar"><img src="@/assets/images/tab_mymiuuu_active.png" ></div>
                    <div class="user">
                        <div class="user-detail">
                            <div class="user-name">
                                <div class="name ellipsis1">{{ item.username }}</div>
                                <div class="amount">+{{ item.usdt_cent / 100 }} USDT</div>
                            </div>
                            <div class="time">{{ item.complete_at.substring(0,10) }}</div>
                        </div>
                        <div class="desc">Successfully received a {{ item.usdt_cent / 100 }} USDT reward</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="miuuuActiveTab == 2" class="rewards-guide">
            <div class="rewards-guide-step">
                <div class="guide-item">
                    <img src="@/assets/images/rewards_share_icon.png">
                    <p>Share with Friends</p>
                </div>
                <div class="right-icon">
                    <img src="@/assets/images/rewards_right.png">
                </div>
                <div class="guide-item">
                    <img src="@/assets/images/rewards_game_icon.png">
                    <p>Friend Plays a Game</p>
                </div>
                <div class="right-icon">
                    <img src="@/assets/images/rewards_right.png">
                </div>
                <div class="guide-item">
                    <img src="@/assets/images/rewards_boost_icon.png">
                    <p>Boost Successful</p>
                </div>
            </div>

            <div class="rewards-guide-operation">
                <div class="invite-btn" @click="onInvite">Invite Friends to Boost</div>
                <div class="copy-icon" :data-clipboard-text="copyText" @click="onCopy">
                    <img src="@/assets/images/rewards_copy.png" />
                </div>
            </div>
            
        </div>

        <GuidePopup 
            :show="guidePopupShow" 
            :canGetData="canGetData" 
            :percent="percent"
            :inviteLink="inviteLink"
            :copyText="copyText"
            :address="selfWalletAddress" 
            @onClose="onGuidePopupHide" 
            @on-address-submit="onAddressSubmit"
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
    overflow-y: auto;
    background: linear-gradient(180deg, #FFDEEC 0%, #F9F9F9 62.01%);
    border-bottom: 82px transparent solid;
    padding-top: 40px;
    .rewards-title{
        width: 100%;
        text-align: center;
        color: #000;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    .rewards-desc{
        width: 100%;
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 10px;
    }

    .rewards-bg{
        width: 300px;
        height: 190px;
        background: url('@/assets/images/rewards_bg.png') 0 0 no-repeat;
        background-size: 100%;
        margin: 20px auto 12px auto;
        padding: 16px;
        box-sizing: border-box;
        position: relative;
        .rewards-bg-claim{
            display: flex;
            padding: 4px;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0px;
            top: 44px;
            border-radius: 8px 0px 0px 8px;
            background: #FFB956;
            color: #FFF;
            font-size: 14px;
            font-weight: 600;
            line-height: normal;
            letter-spacing: -1px;
        }
        .rewards-bg-title{
            color: #FFF;
            font-size: 14px;
            font-weight: 600;
            line-height: normal;
        }
        .rewards-bg-amount{
            width: 100%;
            display: flex;
            align-items: center;
            gap: 4px;
            margin-top: 4px;
            img{
                width: 29px;
                height: 29px;
            }
            p{
                color: #FFF;
                font-size: 32px;
                font-weight: 700;
                line-height: normal;
                letter-spacing: -1px;
            }
        }
    }
    .rewards-progress{
        width: 300px;
        height: 67px;
        margin: 0 auto;
        border-radius: 8px;
        border: 1px solid #FDEBF2;
        background: #FFF1F7;
        padding: 12px 6px;
        box-sizing: border-box;
        .rewards-progress-title{
            width: 100%;
            text-align: center;
            color: rgba(255, 57, 139, 0.50);
            font-size: 10px;
            font-weight: 400;
            line-height: normal;
        }
        .rewards-progress-value{
            width: 100%;
            text-align: center;
            color: #FF398B;
            font-size: 16px;
            font-weight: 600;
            line-height: normal;
        }
        .rewards-progress-out{
            width: 276px;
            height: 8px;
            border-radius: 4px;
            background: #CEBAC3;
            margin: 2px auto;
            position: relative;
            .rewards-progress-in{
                width: 90%;
                height: 100%;
                border-radius: 4px;
                background: #FF398B;
            }
            .rewards-fire{
                width: 25px;
                height: 39px;
                position: absolute;
                top: -33px;
                left: calc(90% - 13px);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .rewards-claim-btn{
        width: 200px;
        height: 42px;
        border-radius: 8px;
        margin: 12px auto 0 auto;
        background: #FF398B;
        color: #ffffff;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .miuuu-tab{
        width: fit-content;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        border: 1px rgba(0, 0, 0, 0.10) solid;
        background-color: rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        margin: 20px auto 0 auto;
        .miuuu-tab-btn{
            width: 125px;
            height: 30px;
            color: #000;
            font-size: 15px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        .miuuu-tab-btn.boost{
            width: 120px;
        }
        .miuuu-tab-btn.claim{
            width: 140px;
        }
        .miuuu-tab-btn.guide{
            width: 100px;
        }
        .miuuu-tab-btn.miuuu-tab-active{
            background: #000;
            color: #ffffff;
            border-radius: 6px;
        }
        .miuuu-tab-btn:first-child.miuuu-tab-active{
            margin-left: -1px;
        }
        .miuuu-tab-btn:last-child.miuuu-tab-active{
            margin-right: -1px;
        }
    }

    .rewards-list{
        width: 350px;
        margin: 20px auto 0 auto;
        .list-item{
            width: 100%;
            height: 58px;
            padding: 12px;
            box-sizing: border-box;
            border-radius: 8px;
            border: 1px solid #FDEBF2;
            background: rgba(255, 241, 247, 0.50);
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
            .user-info{
                width: calc(100% - 100px);
                display: flex;
                align-items: center;
                gap: 8px;
                .avatar{
                    width: 30px;
                    height: 30px;
                    border-radius: 100%;
                    background: #FF398B;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .user{
                    width: calc(100% - 32px);
                    .name{
                        width: 100%;
                        color: #000;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: normal;
                    }
                    .desc{
                        width: 100%;
                        color: rgba(0, 0, 0, 0.50);
                        font-size: 12px;
                        font-weight: 400;
                        line-height: normal;
                        margin-top: 2px;
                    }
                }
            }
            .percent{
                width: 80px;
                color: #FF398B;
                font-size: 14px;
                font-weight: 600;
                line-height: normal;
                text-align: right;
            }

            .user-info-claim{
                width: 100%;
                display: flex;
                align-items: center;
                gap: 8px;
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 100%;
                    background: #FF398B;
                }
                .user{
                    width: calc(100% - 38px);
                    .user-detail{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .user-name{
                            width: calc(100% - 70px);
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            .name{
                                width: auto;
                                max-width: calc(100% - 100px);
                                color: #000;
                                font-size: 14px;
                                font-weight: 500;
                                line-height: normal;
                            }
                            .amount{
                                width: auto;
                                max-width: 100px;
                                display: flex;
                                padding: 2px 4px;
                                justify-content: center;
                                align-items: center;
                                border-radius: 8px;
                                background: #FFDEEC;
                                color: #FF398B;
                                font-size: 12px;
                                font-weight: 500;
                                line-height: normal;
                            }
                        }
                        .time{
                            width: 70px;
                            text-align: right;
                            color: rgba(0, 0, 0, 0.30);
                            font-size: 12px;
                            font-weight: 400;
                            line-height: normal;
                        }
                    }
                    
                    .desc{
                        width: 100%;
                        color: rgba(0, 0, 0, 0.50);
                        font-size: 12px;
                        font-weight: 400;
                        line-height: normal;
                        margin-top: 2px;
                    }
                }
            }
        }
    }

    .rewards-guide{
        width: 350px;
        margin: 20px auto 0 auto;
        .rewards-guide-step{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .right-icon{
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 100%;
                }
            }
            .guide-item{
                width: 90px;
                height: 72px;
                border-radius: 8px;
                border: 1px solid #FDEBF2;
                background: rgba(255, 241, 247, 0.50);
                display: flex;
                padding: 4px 2px;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                img{
                    width: 24px;
                    height: 24px;
                }
                p{
                    color: #000;
                    font-size: 12px;
                    font-weight: 600;
                    line-height: normal;
                    text-align: center;
                }
            }
        }
        .rewards-guide-operation{
            width: 100%;
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .invite-btn{
                width: 300px;
                height: 40px;
                border-radius: 8px;
                background: #FF398B;
                color: #FFF;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
                line-height: normal;
            }
            .copy-icon{
                width: 40px;
                height: 40px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        
    }

}

</style>