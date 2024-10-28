<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { showFailToast } from 'vant';
import { useUserStore } from '@/stores/user'
import type { UrlParams, UserTokenInfo, UserTokenHistory } from '@/models';
import { getUserWallet } from '@/api/index'
import { toThousands, base64Encode, decimalBalance } from '@/utils/js-helpers'
import HistoryPopup from '@/components/balance/HistoryPopup.vue';
import ListEmpty from '@/components/common/ListEmpty.vue'

defineOptions({
  name: 'BalanceView'
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



const {
    accessToken,
    selfTelegramUserName,
} = useUserStore()

const userMemo = ref('')
const userBalance = ref('0')
const tokenIconList = {
    'miuuu': new URL('@/assets/images/token/token_miuuu.png', import.meta.url).href,
    'why': new URL('@/assets/images/token/token_Why.png', import.meta.url).href
}

onMounted(() => {

})

watch(() => [props.canGetData],
    (newVal) => {
        if (newVal) {
            if (newVal[0]) {
                getTokenList()
            }
    }
});


function onDeposit() {
    if (!userMemo.value) {
        return
    }
    jumpToDepositOrWithdrawPage();
}

function onWithdraw() {
    if (!userMemo.value) {
        return
    }
    jumpToDepositOrWithdrawPage();
}

function jumpToDepositOrWithdrawPage() {
    console.log('deposit username', selfTelegramUserName)
    const paramsStr = JSON.stringify({
        memo: userMemo.value,
        username: selfTelegramUserName,
        balance: userBalance.value,
        access_token: accessToken,
    })
    console.log('deposit params', paramsStr)
    const paramsEncodeStr = base64Encode(paramsStr)
    console.log('deposit paramsEncode', paramsEncodeStr)
    const url = `${import.meta.env.VITE_DEPOSIT_PAGE_URL}?params=${paramsEncodeStr}`
    const telegramWebApp = (window as any).Telegram?.WebApp
    if (telegramWebApp) {
        telegramWebApp.openLink(url)
    } else {
        window.open(url, '_blank')
    }
}

const tokenList = ref<Array<UserTokenInfo>>([])
const tokenListLoading = ref(false)
function getTokenList() {
    if (tokenListLoading.value) {
        return
    }
    tokenListLoading.value = true
    getUserWallet().then((rsp: any) => {
        tokenListLoading.value = false
        if (rsp.data && rsp.data.objects && rsp.data.objects.length > 0) {
            tokenList.value = rsp.data.objects
            tokenList.value.forEach((item) => {
                if (item.memo) {
                    userMemo.value = item.memo
                    userBalance.value = item.balance ? decimalBalance(item.balance) : '0'
                }
                if (item.coin_name == 'why' || item.coin_name == 'miuuu') {
                    item.icon = tokenIconList[item.coin_name]
                }
            })
        }
    }).catch((error) => {
        tokenListLoading.value = false
    })
    
    // const list = [
    //     {
    //         coin_name: 'why',
    //         icon: '',
    //         balance: '123456789',
    //         balance_usd: '123456789',
    //         income: '123456789',
    //         outcome: '123456789',
    //         memo: '',
    //     },
    //     {
    //         coin_name: 'miuuu',
    //         icon: '',
    //         balance: '123456789',
    //         balance_usd: '123456789',
    //         income: '123456789',
    //         outcome: '123456789'
    //     },
    // ]
    // list.forEach((item) => {
    //     if (item.memo) {
    //         userMemo.value = item.memo
    //         userBalance.value = item.balance ? decimalBalance(item.balance) : '0'
    //     }
    //     if (item.coin_name == 'why' || item.coin_name == 'miuuu') {
    //         item.icon = tokenIconList[item.coin_name]
    //     }
    // })
    // tokenList.value = [...list] as any
    // tokenListLoading.value = false
}


function onTokenDetailClick(token: UserTokenInfo) {
    coinName.value = token.coin_name
    curCoinHistoryList.value = token.history!
    onHistoryPopupShow();
}

const historyPopupShow = ref(false)
const coinName = ref('')
const curCoinHistoryList = ref<Array<UserTokenHistory>>([])
function onHistoryPopupShow() {
    historyPopupShow.value = true;
}
function onHistoryPopupClose() {
    historyPopupShow.value = false;
}

</script>

<template>
    <div class="page hidden-scroll-bar">

        <div class="miuuu-main main-bg-color2">
            <div class="main-bg">
                <div class="top-img">
                    <img src="@/assets/images/balance-top.png" />
                </div>

                <div class="operation-box">
                    <div class="operation-btn" @click="onDeposit">
                        <img src="@/assets/images/icon_deposit.png" />
                        <p>Deposit</p>
                    </div>
                    <div class="operation-btn" @click="onWithdraw">
                        <img src="@/assets/images/icon_withdraw.png" />
                        <p>Withdraw</p>
                    </div>
                </div>
            </div>
        </div>

        <ListEmpty v-if="tokenList.length <= 0" text="No Data Yet" />
        <div v-else class="token-list">
            <div v-for="(item, index) in tokenList" :key="index" class="token-item">
                <div class="token-info">
                    <div class="token-icon main-bg-color1">
                        <img :src="item.icon" />
                    </div>
                    <p>{{ item.coin_name }}</p>
                </div>
                <div class="token-balance">{{ toThousands(decimalBalance(item.balance)) }}</div>
                <div class="token-usd">{{ item.balance_usd ? $+toThousands(item.balance_usd)+' USD' : '' }}</div>
                <div class="token-stastics">
                    <div class="token-stastics-box">
                        <img src="@/assets/images/income.png" />
                        <h5>{{ toThousands(decimalBalance(item.income)) }}</h5>
                        <p>Income</p>
                    </div>
                    <div class="token-stastics-box">
                        <img src="@/assets/images/spend.png" />
                        <h5>{{ toThousands(decimalBalance(item.outcome)) }}</h5>
                        <p>Spend</p>
                    </div>
                </div>
                <div class="token-detail" @click="onTokenDetailClick(item)">
                    <img src="@/assets/images/icon_details.png" />
                    <p>Details</p>
                </div>
            </div>
        </div>

        <HistoryPopup 
            :show="historyPopupShow" 
            :coinName="coinName" 
            :history="curCoinHistoryList"
            @on-close="onHistoryPopupClose"
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
    border-bottom: 82px transparent solid;
    .miuuu-main{
        width: 100%;
        // padding: 20px 0 80px 0;
        padding: 20px 0 0px 0;
        box-sizing: border-box;
        .main-bg{
            width: 100%;
            height: 289px;
            // height: 220px;
            background: url('@/assets/images/bg.png') 0 0 no-repeat;
            background-size: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            // justify-content: center;
            .balance-logo{
                width: 350px;
                height: 147px;
                // background: url('@/assets/images/miuuu-top.png') 0 0 no-repeat;
                background-size: 100%;
                margin: 40px auto 0 auto;
                .balance-text{
                    width: 100%;
                    text-align: center;
                    color: #000000;
                    font-size: 40px;
                    font-weight: 700;
                    line-height: 44px;
                    letter-spacing: -0.96px;
                    // padding-top: 70px;
                    padding-top: 50px;
                }
                .token-name{
                    width: 100%;
                    text-align: center;
                    color: #000000;
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 26.4px;
                    letter-spacing: -0.48px;
                }
            }
            .address-btn{
                margin-top: 18px;
            }
            .top-img{
                width: 252px;
                height: 180px;
                margin: 0 auto;
                img{
                    width: 100%;
                }
            }
            .operation-box{
                width: 100%;
                margin-top: 10px;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .operation-btn{
                    width: 165px;
                    height: 50px;
                    border-radius: 8px;
                    background-color: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    cursor: pointer;
                    img{
                        width: 24px;
                        height: 24px;
                    }
                    p{
                        font-size: 17px;
                        font-weight: 600;
                        line-height: 26px;
                        letter-spacing: 0.1px;
                        color: #ffffff;
                    }
                }
            }
        }
    }
    .invite-container{
        width: 100%;
        // margin-top: -70px;
        margin-top: -60px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        gap: 8px;
    }

    .token-list{
        width: 100%;
        padding: 0 20px;
        margin-top: -20px;
        box-sizing: border-box;
        .token-item{
            width: 100%;
            border-radius: 12px;
            background: #FFF;
            box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.20);
            padding: 20px 10px 10px 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 20px;
            .token-info{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                .token-icon{
                    width: 32px;
                    height: 32px;
                    border-radius: 100%;
                    overflow: hidden;
                    line-height: 0;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                p{
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 29px;
                    color: #000;
                    text-transform: uppercase;
                }
            }
            .token-balance{
                width: 100%;
                text-align: center;
                font-size: 24px;
                font-weight: 600;
                line-height: 29px;
                color: #000;
                margin-top: 5px;
            }
            .token-usd{
                width: 100%;
                text-align: center;
                font-size: 12px;
                font-weight: 400;
                line-height: 15px;
                color: rgba(0, 0, 0, 0.5);
            }
            .token-stastics{
                width: 100%;
                margin: 16px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                .token-stastics-box{
                    width: 100%;
                    border-radius: 8px;
                    border: 1px rgba(0, 0, 0, 0.10) solid;
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 20px;
                        height: 20px;
                    }
                    h5{
                        font-size: 14px;
                        font-weight: 600;
                        line-height: 17px;
                        color: #000;
                        margin-top: 5px;
                    }
                    p{
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 15px;
                        color: rgba(0, 0, 0, 0.5);
                    }

                }
            }
            .token-detail{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                gap: 2px;
                img{
                    width: 24px;
                    height: 24px;
                }
                p{
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 22px;
                    letter-spacing: 0.15px;
                    color: #000;
                }
            }
        }
    }

    .miuuu-history{
        width: 100%;
        margin-top: 40px;
        padding: 0 20px;
        border-bottom: 0px #eeeeee solid;
        box-sizing: border-box;
        .miuuu-title{
            color: #000;
            font-size: 20px;
            font-weight: 590;
            line-height: 24px;
        }
        .miuuu-list{
            width: 100%;
            padding-bottom: 30px;
            .miuuu-item{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                .game-detail{
                    display: flex;
                    align-items: center;
                    .game-icon{
                        width: 30px;
                        height: 30px;
                        margin-right: 8px;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .game-info{
                        .game-name{
                            color: #000;
                            font-size: 16px;
                            font-weight: 590;
                            line-height: 19px;
                        }
                        .game-desc{
                            font-size: 12px;
                            color: #555555;
                            line-height: 15px;
                        }
                    }
                }
                
                .miuuu-info{
                    display: flex;
                    align-items: center;
                    // justify-content: center;
                    .miuuu-cost-type{
                        color: #000;
                        font-size: 16px;
                        font-weight: 590;
                        line-height: 19px;
                    }
                    .miuuu-cost{
                        color: #000;
                        font-size: 16px;
                        font-weight: 590;
                        line-height: 19px;
                    }
                    .miuuu-logo{
                        width: 30px;
                        height: 30px;
                        border-radius: 30px;
                        overflow: hidden;
                        margin-left: 10px;
                        img{
                            width: 100%;
                        }
                    }
                }
                .game-time{
                    font-size: 18px;
                    color: #555555;
                }
                .pk-btn{
                    width: 80px;
                    height: 40px;
                    font-size: 24px;
                    color: #ffffff;
                    border-radius: 20px;
                    background-color: #000000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
            }
        }
    }

    .more-btn{
        width: 60%;
        height: 40px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #ffffff;
        background-color: #000000;
        margin: 20px auto;
    }

    .params-text{
        width: 100%;
        margin-top: 40px;
        font-size: 20px;
        color: #D43327;
        word-break: break-all;
    }
}

</style>