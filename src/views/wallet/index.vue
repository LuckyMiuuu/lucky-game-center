<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import { TonConnectUI, type TonProofItemReply, type TonProofItemReplySuccess } from '@tonconnect/ui'
import Button from '@/components/common/Button.vue'
import { nanoid } from 'nanoid';
import type { UrlParams } from '@/models'
import { base64Decode } from '@/utils/js-helpers'
import { useUserStore } from '@/stores/user'
import { login, getBindWallet, bindWallet, checkOkxTask } from '@/api/index'
import { toUserFriendlyAddress } from '@/utils/tonCore';

defineOptions({
  name: 'WalletView'
})

const route = useRoute()

const userStore = useUserStore()
const {
    bindWalletInfo
} = storeToRefs(userStore)
const {
    setAccessToken,
    setSelfTelegramUserId,
    setSelfTelegramUserName,
    setSelfTelegramFirstName,
    setSelfTelegramLastName,
    setSelfTelegramInitData,
    setBindWalletInfo
} = userStore

const telegramWebApp = (window as any).Telegram?.WebApp
telegramWebApp?.ready()
telegramWebApp?.expand()
telegramWebApp?.disableVerticalSwipes()

// const telegramInitData = telegramWebApp ? telegramWebApp.initData : ''
// setSelfTelegramUserId(telegramWebApp?.initDataUnsafe?.user?.id)
// setSelfTelegramUserName(telegramWebApp?.initDataUnsafe?.user?.username)
// setSelfTelegramFirstName(telegramWebApp?.initDataUnsafe?.user?.first_name)
// setSelfTelegramLastName(telegramWebApp?.initDataUnsafe?.user?.last_name)
// setSelfTelegramInitData(telegramInitData)

const telegramInitData = 'user=%7B%22id%22%3A6580267658%2C%22first_name%22%3A%22chen%22%2C%22last_name%22%3A%22kang%22%2C%22username%22%3A%22coding946%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-4181195251876422561&chat_type=supergroup&start_param=eyJjaGF0X2lkIjogIi0xMDAyMjEzNjk2MTY0IiwgImdyb3VwX21vZGUiOiB0cnVlfQ%3D%3D&auth_date=1722234656&hash=c36ae2432ceda069d70c49d42b1d83fcb76d14f1f99a2b539fedce979e446a6b'
setSelfTelegramUserId(6580267658)
setSelfTelegramUserName('coding946')
setSelfTelegramFirstName('chen')
setSelfTelegramLastName('kang')
setSelfTelegramInitData(telegramInitData)

const urlParams = ref<UrlParams>({
    from_chat_id: '',
    from_room_id: '',
    from_group_mode: true,
    from_tg_user_id: 0,
})
const tgWebAppStartParamBase64 = route.query.tgWebAppStartParam?.toString() as string
if (tgWebAppStartParamBase64) {
    const paramsJsonStr = base64Decode(tgWebAppStartParamBase64)
    let tgWebAppStartParam = JSON.parse(paramsJsonStr)
    urlParams.value.from_chat_id = tgWebAppStartParam.chat_id ? tgWebAppStartParam.chat_id : ''
    urlParams.value.from_room_id = tgWebAppStartParam.room_id ? tgWebAppStartParam.room_id : ''
    urlParams.value.from_group_mode = tgWebAppStartParam.group_mode ? tgWebAppStartParam.group_mode : true
    urlParams.value.from_tg_user_id = tgWebAppStartParam.tg_user_id ? tgWebAppStartParam.tg_user_id : 0
}


const taskList = ref([
    { id: 'bind_wallet', finished: false },
    { id: 'play_game_miuuu', finished: false },
])


const tonConnectUI = new TonConnectUI(
    {
        manifestUrl: import.meta.env.VITE_TONCONNECT_MANIFEST_URL,
        // buttonRootId: '<YOUR_CONNECT_BUTTON_ANCHOR_ID>'
        // manifestUrl: 'https://game-center-test-okx.miuuu.xyz/tonconnect-manifest.json',
    }
);

//Get current connected Wallet and WalletInfo
const currentWallet = ref();
const currentIsConnectedStatus = ref();

const unsubscribeConnectionStatus = ref()
function onConnectionStatusChange() {
    unsubscribeConnectionStatus.value = tonConnectUI.onStatusChange(async (walletAndwalletInfo) => {
        console.log('connection state changed:', walletAndwalletInfo);
        setWalletInfo()

        if (walletAndwalletInfo) {
            const originAddress = currentWallet.value?.account.address
            const userFriendlyAddress = toUserFriendlyAddress(originAddress)

            let connectItems = currentWallet.value.connectItems
            console.log('connectItems', connectItems)
            if (connectItems) {
                // const { tonProof } = connectItems as {tonProof?: TonProofItemReply;};
                // console.log('tonProof', tonProof)
                
                // const { proof: { signature, payload, domain, timestamp } } = tonProof as TonProofItemReplySuccess;
                // console.log('signature', signature)

                const tonProof = connectItems.tonProof
            

                const request = {
                    message: {
                        chain_id: currentWallet.value.account.chain,
                        ton_address: userFriendlyAddress,
                        publicKey: currentWallet.value.account.publicKey,
                        address: originAddress,
                        ton_proof: tonProof
                    }
                }
                bindWalletSend(JSON.stringify(request))
            } else {
                bindWalletInfo.value && bindWalletSend(bindWalletInfo.value)
            }

            

        }
    });
}
function onUnsubscribeConnectionStatusChange() {
    unsubscribeConnectionStatus.value && unsubscribeConnectionStatus.value()
}

function setWalletInfo() {
    currentWallet.value = tonConnectUI.wallet;
    currentIsConnectedStatus.value = tonConnectUI.connected;
    console.log('currentWallet', currentWallet.value);
    console.log('currentIsConnectedStatus', currentIsConnectedStatus.value);
}

async function onConnectOkx() {
    try {
        await tonConnectUI.openSingleWalletModal('okxTonWallet');
        const nanoidStr = nanoid()
        tonConnectUI.setConnectRequestParameters({
            state: 'ready',
            value: { tonProof: nanoidStr },
        });
        
    } catch (error) {
        console.log('connect wallet faild')
    }
}

async function onDisconnectOkx() {
    try {
        await tonConnectUI.disconnect();
    } catch (error) {
        console.log('disconnect wallet faild')
    }
}

onMounted(() => {
    onConnectionStatusChange();
    userLogin()
})

onUnmounted(() => {
    onUnsubscribeConnectionStatusChange()
})


function userLogin() {
    setAccessToken('')
    let requestStr = JSON.stringify({
        init_data: telegramInitData,
        start_param: {
            chat_id: urlParams.value.from_chat_id,
            room_id: urlParams.value.from_room_id,
            group_mode: urlParams.value.from_group_mode,
            tg_user_id: urlParams.value.from_tg_user_id,
        }
    })
    login(requestStr).then((rsp) => {
        if (rsp.data && rsp.data.access_token) {
            setAccessToken(rsp.data.access_token)
            checkOkxTaskList()
        } else {
            console.log('get user miuuu faild')
        }
    }).catch((error: any) => {
    })
}

const bingWalletIsLoading = ref(false)
function checkOkxTaskList() {
    if (bingWalletIsLoading.value) {
        return
    }
    bingWalletIsLoading.value = true
    checkOkxTask().then((rsp: any) => {
        bingWalletIsLoading.value = false
        if (rsp.task_info) {
            taskList.value.forEach(element => {
                for (var key in rsp.task_info) {
                    if (element.id == key) {
                        element.finished = rsp.task_info[key]
                    }
                }
            });
            taskList.value = [...taskList.value]
        }
        
    }).catch((error) => {
        bingWalletIsLoading.value = false
    })
}

function bindWalletSend(data: string) {
    if (taskList.value[1].finished) {
        return
    }
    if (bingWalletIsLoading.value) {
        return
    }
    bingWalletIsLoading.value = true
    bindWallet(data).then((rsp: any) => {
        bingWalletIsLoading.value = false
        if (rsp.code == 0) {
            setBindWalletInfo('')
            checkOkxTaskList()
        } else {
            setBindWalletInfo(data)
        }
    }).catch((error) => {
        bingWalletIsLoading.value = false
        setBindWalletInfo(data)
    })
}




</script>

<template>
    <div class="page">
        <div class="title">Wallet Connect</div>

        <div class="text">connect status <p>{{ currentIsConnectedStatus }}</p></div>
        <div class="text">chain <p>{{ currentWallet?.account.chain }}</p></div>
        <div class="text">address <p>{{ currentWallet?.account.address }}</p></div>
        <div v-if="currentIsConnectedStatus" class="btn">
            <Button text="Disconnect OKX" size="max" @click="onDisconnectOkx" />
        </div>
        <div v-else class="btn">
            <Button text="Connect OKX" size="max" @click="onConnectOkx" />
        </div>

        <div class="text">bing wallet task <p>{{ taskList[1].finished }}</p></div>

    </div>
</template>

<style lang="scss" scoped>
.page{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px 16px;
    box-sizing: border-box;
    .title{
        width: 100%;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
    }
    .text{
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        margin-top: 15px;
        p{
            font-size: 12px;
            font-weight: normal;
        }
    }
    .btn{
        width: 100%;
        margin-top: 20px;
    }
   
}

</style>