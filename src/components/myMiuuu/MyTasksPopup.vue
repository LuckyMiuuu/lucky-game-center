<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { showSuccessToast, showFailToast, showToast } from 'vant';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { TonConnectUI } from '@tonconnect/ui'
import { toUserFriendlyAddress } from '@/utils/tonCore';
import { nanoid } from 'nanoid';
import { TOKEN_NAME } from '@/constants'
import { joinOfficialChannel } from '@/utils/general'
import {
    bindWallet,
    checkOkxTask,
    getUserTasks,
    claimUserTask,
} from '@/api/index'
import ListEmpty from '@/components/common/ListEmpty.vue'
import OkxTaskVerifyPopup from '@/components/myMiuuu/OkxTaskVerifyPopup.vue';
import Popup from '../common/Popup.vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    canGetData: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['onClose'])

const popupIsShow = ref(false)

const userStore = useUserStore()
const {
    selfTelegramUserId,
    selfTelegramUserName,
    selfTelegramFirstName,
    selfTelegramLastName,
} = storeToRefs(userStore)

onMounted(() => {
})

onUnmounted(() => {
    offWatchConnectionStatus()
})

watch(
    () => [props.show, props.canGetData], (newVal) => {
        if (newVal) {
            popupIsShow.value = newVal[0] as any
            if (newVal[1]) {
                taskList.value.length <= 0 && getCommonTaskList()
                okxTaskShow.value && okxTaskList.value.length <= 0 && checkOkxTaskList()
            }
        }
    }
);

function onClose() {
    emits("onClose");
}


const okxTaskShow = ref(true)
interface OkxTask{
    taskId: string,
    finished: boolean,
    headText: string,
    title: string,
    desc: string,
    btnText: string,
    btnDisableText: string,
    btnIcon: string,
}

const needShowTaskList = [
    {
        taskId: 'bind_wallet',
        finished: false,
        headText: 'TASK #1',
        title: 'Connect OKX Web3 Wallet',
        desc: 'Connect your OKX Web3 wallet and evenly split 40% of the $Miuuu prize pool',
        btnText: 'Connect',
        btnDisableText: 'Done',
        btnIcon: new URL('@/assets/images/icon_done.png', import.meta.url).href,
    },
    {
        taskId: 'play_game_miuuu',
        finished: false,
        headText: 'TASK #2',
        title: 'Boost Reward – Play Lucky Miuuu!',
        desc: 'Dive into the chaos, play to boost your share of the 60% $Miuuu bounty! </br>The crazier you play, the more you rake in! Miuuu~',
        btnText: 'Play Now',
        btnDisableText: 'Play More',
        btnIcon: '',
    }
]

function isTaskNeedShow(taskId: string) {
    const task = needShowTaskList.filter((item) => {
        return item.taskId == taskId
    })

    return task && task.length > 0 ? task[0] : null
}
const bindWalletTaskId = needShowTaskList[0].taskId
const playGameMiuuuTaskId = needShowTaskList[1].taskId
const okxTaskList = ref<Array<OkxTask>>([])


const checkWalletIsLoading = ref(false)
function checkOkxTaskList() {
    if (checkWalletIsLoading.value) {
        return
    }
    checkWalletIsLoading.value = true
    checkOkxTask().then((rsp: any) => {
        checkWalletIsLoading.value = false
        if (rsp.task_info) {
            let tasks = []
            for (var key in rsp.task_info) {
                let needShowTask = isTaskNeedShow(key)
                if (needShowTask) {
                    needShowTask.finished = rsp.task_info[key]
                    tasks.push(needShowTask)
                }
            }
            okxTaskList.value = [...tasks]
            tonConnectUiInit()
            
        } else {
            okxTaskList.value = []
            showFailToast('Failed to get tasks');
        }
        
    }).catch((error) => {
        checkWalletIsLoading.value = false
        okxTaskList.value = []
        showFailToast('Failed to get tasks');
    })
}


const { bindWalletInfo } = storeToRefs(userStore)
const { setBindWalletInfo } = userStore


const tonConnectUI = ref()
const currentWallet = ref();
const currentIsConnectedStatus = ref();

function tonConnectUiInit() {
    if (!tonConnectUI.value) {
        tonConnectUI.value = new TonConnectUI({
            manifestUrl: import.meta.env.VITE_TONCONNECT_MANIFEST_URL,
            // buttonRootId: '<YOUR_CONNECT_BUTTON_ANCHOR_ID>'
        });
    }

    onWatchConnectionStatus()

    // TonConnectUI.getWallets().then((rsp) => {
    //     console.log('walletList', rsp)
    // })
}

const unwatchConnectionStatus = ref()
function onWatchConnectionStatus() {
    if (unwatchConnectionStatus.value) {
        return
    }
    unwatchConnectionStatus.value = tonConnectUI.value.onStatusChange(async (walletAndwalletInfo: any) => {
        console.log('connection state changed:', walletAndwalletInfo);
        setWalletInfo()

        if (walletAndwalletInfo) {
            const originAddress = currentWallet.value?.account.address
            const userFriendlyAddress = toUserFriendlyAddress(originAddress)

            let connectItems = currentWallet.value.connectItems
            console.log('connectItems', connectItems)
            if (connectItems) {
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
function offWatchConnectionStatus() {
    unwatchConnectionStatus.value && unwatchConnectionStatus.value()
}

function setWalletInfo() {
    currentWallet.value = tonConnectUI.value.wallet;
    currentIsConnectedStatus.value = tonConnectUI.value.connected;
    console.log('currentWallet', currentWallet.value);
    console.log('currentIsConnectedStatus', currentIsConnectedStatus.value);
}

async function onConnectOkx() {
    try {
        await tonConnectUI.value.openSingleWalletModal('okxTonWallet');
        const nanoidStr = nanoid()
        tonConnectUI.value.setConnectRequestParameters({
            state: 'ready',
            value: { tonProof: nanoidStr },
        });
        
    } catch (error) {
        console.log('connect wallet faild')
    }
}

async function onDisconnectOkx() {
    try {
        await tonConnectUI.value.disconnect();
    } catch (error) {
        console.log('disconnect wallet faild')
    }
}

function isBindWalletTaskFinished() {
    let finished = false
    okxTaskList.value.forEach((item) => {
        if (item.taskId == bindWalletTaskId) {
            finished = item.finished
        }
    })
    return finished
}

const bingWalletIsLoading = ref(false)
function bindWalletSend(data: string) {
    if (isBindWalletTaskFinished()) {
        return
    }
    if (bingWalletIsLoading.value) {
        return
    }
    bingWalletIsLoading.value = true
    bindWallet(data).then((rsp: any) => {
        bingWalletIsLoading.value = false
        if (rsp.code == 0) {
            onVerifyPopupShow()
            onDisconnectOkx();
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

function onOkxTask(task: OkxTask) {
    if (task.taskId == bindWalletTaskId) {
        if (isBindWalletTaskFinished()) {
            return
        }

        if (currentIsConnectedStatus.value) {
            onDisconnectOkx();
            onConnectOkx();
        } else {
            onConnectOkx();
        }
    } else if (task.taskId == playGameMiuuuTaskId) {
        joinOfficialChannel()
    }
}

const verifyPopupShow = ref(false)
function onVerifyPopupShow() {
    verifyPopupShow.value = true
}


// common task
interface CommonTaskTarget{
    url?: string,
    include?: string,
    task_type: string,
}
interface CommonTask{
    task_id: string,
    task_name: string,
    rewards: number,
    target: CommonTaskTarget,
    has_claim: boolean,
    show_claim?: boolean,
}

const taskListLoaidng = ref(false)
const taskList = ref<Array<CommonTask>>([])
function getCommonTaskList() {
    if (taskListLoaidng.value) {
        return
    }
    taskListLoaidng.value = true

    getUserTasks().then((userRsp: any) => {
        taskListLoaidng.value = false
        if (userRsp.data) {
            if (userRsp.data.objects) {
                taskList.value = [...userRsp.data.objects]
            } else {
                taskList.value = []
            }
        } else {
            taskList.value = []
        }
    }).catch((error) => {
        taskListLoaidng.value = false
        taskList.value = []
    })
}

function onClainCommonTask(task: CommonTask, index: number) {
    if (taskListLoaidng.value) {
        return
    }

    if (task.has_claim) {
        return
    } else {
        if (task.target.task_type == 'jump') {
            if (!task.show_claim) {
                task.show_claim = true
                taskList.value = [...taskList.value]

                const telegramWebApp = (window as any).Telegram?.WebApp
                telegramWebApp?.ready()
                if (telegramWebApp) {
                    telegramWebApp.openLink(task.target.url)
                } else {
                    window.open(task.target.url, '_blank');
                }
                return;
            }
            
        } else if (task.target.task_type == 'change_name') {
            const includeStr = task.target.include
            if (includeStr) {
                if (selfTelegramFirstName.value.indexOf(includeStr) <= 0 && selfTelegramLastName.value.indexOf(includeStr) <= 0) {
                    showToast(`Please add ${includeStr} to your telegram name`);
                    return;
                }
            }
        }
            
        
    }


    taskListLoaidng.value = true
    claimUserTask(JSON.stringify({"task_id": task.task_id})).then((userRsp: any) => {
        taskListLoaidng.value = false
        if (userRsp.code == 0) {
            showSuccessToast('Claim successfully');
            getCommonTaskList();
        } else {
            showFailToast('Claim faild')
        }
    }).catch((error) => {
        taskListLoaidng.value = false
        showFailToast('Claim faild')
    })
}


</script>

<template>
    <Popup
        :show="popupIsShow"
        title="Miuuu Task"
        @on-close="onClose"
    >
        <div class="list-content hidden-scroll-bar">
            <ListEmpty v-if="okxTaskList.length <= 0 && taskList.length <= 0" size="small" text="No data yet" />
            <template v-else>
                <div v-for="(item,index) in okxTaskList" :key="index" class="list-item">
                    <div class="item-detail">
                        <img src="@/assets/images/task_icon_2.png" />
                        <div class="item-info">
                            <div class="item-title item-title-w-limit1 ellipsis1">{{ item.title }}</div>
                        </div>
                    </div>
                    
                    <div v-if="item.finished" class="item-btn disable">Done</div>
                    <div v-else class="item-btn" @click="onOkxTask(item)">Start</div>
                    
                </div>
                
                <div v-for="(item,index) in taskList" :key="index" class="list-item">
                    <div class="item-detail">
                        <img src="@/assets/images/task_icon_2.png" />
                        <div class="item-info">
                            <div class="item-title item-title-w-limit1 ellipsis1">{{ item.task_name }}</div>
                            <div class="item-desc">+{{ item.rewards }} {{ TOKEN_NAME }}</div>
                        </div>
                    </div>
                    
                    <div v-if="item.has_claim" class="item-btn disable">Done</div>
                    <template v-else>
                        <div v-if="item.show_claim" class="item-btn" @click="onClainCommonTask(item, index)">Claim</div>
                        <div v-else class="item-btn" @click="onClainCommonTask(item, index)">Start</div>
                    </template>
                    
                </div>
            </template>
        </div>

        <OkxTaskVerifyPopup :show="verifyPopupShow" @on-close="verifyPopupShow = false" />
    </Popup>
</template>

<style lang="scss" scoped>
.list-content{
    width: 100%;
    height: 260px;
    overflow-y: auto;
}

</style>
