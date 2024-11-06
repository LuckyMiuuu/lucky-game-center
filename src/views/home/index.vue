<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { UrlParams } from '@/models'
import { login } from '@/api/index'
import { base64Decode } from '@/utils/js-helpers'
import Games from './Games.vue';
import MyMiuuu from './MyMiuuu.vue';
import Balance from './Balance.vue'
import Rewards from './Rewards.vue'

defineOptions({
  name: 'HomeView'
})

onMounted(() => {
    userLogin()
})

const route = useRoute()

const userStore = useUserStore()
const { setAccessToken } = userStore
const canGetData = ref(false)

const {
    selfTelegramUserId,
    selfTelegramUserName,
    selfTelegramFirstName,
    selfTelegramLastName,
    selfTelegramInitData
} = toRefs(useUserStore())

const {
    setSelfTelegramUserId,
    setSelfTelegramUserName,
    setSelfTelegramFirstName,
    setSelfTelegramLastName,
    setSelfTelegramInitData
} = useUserStore()

const telegramWebApp = (window as any).Telegram?.WebApp
telegramWebApp?.ready()
telegramWebApp?.expand()
telegramWebApp?.disableVerticalSwipes()

var telegramInitData = telegramWebApp ? telegramWebApp.initData : ''
setSelfTelegramUserId(telegramWebApp?.initDataUnsafe?.user?.id)
setSelfTelegramUserName(telegramWebApp?.initDataUnsafe?.user?.username)
setSelfTelegramFirstName(telegramWebApp?.initDataUnsafe?.user?.first_name)
setSelfTelegramLastName(telegramWebApp?.initDataUnsafe?.user?.last_name)
setSelfTelegramInitData(telegramInitData)

if (!import.meta.env.PROD) {
    telegramInitData = 'user=%7B%22id%22%3A6580267658%2C%22first_name%22%3A%22chen%22%2C%22last_name%22%3A%22kang%22%2C%22username%22%3A%22coding946%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-4181195251876422561&chat_type=supergroup&start_param=eyJjaGF0X2lkIjogIi0xMDAyMjEzNjk2MTY0IiwgImdyb3VwX21vZGUiOiB0cnVlfQ%3D%3D&auth_date=1722234656&hash=c36ae2432ceda069d70c49d42b1d83fcb76d14f1f99a2b539fedce979e446a6b'
    setSelfTelegramUserId(6580267658)
    setSelfTelegramUserName('coding946')
    setSelfTelegramFirstName('chen')
    setSelfTelegramLastName('kang')
    setSelfTelegramInitData(telegramInitData)
}

const tabParam = ref(0)
const urlParams = ref<UrlParams>({
    from_chat_id: '',
    from_room_id: '',
    from_group_mode: true,
    from_tg_user_id: 0,
})
const tgWebAppStartParamBase64 = route.query.tgWebAppStartParam?.toString() as string
console.log('tgWebAppStartParamBase64', tgWebAppStartParamBase64)
if (tgWebAppStartParamBase64) {
    const paramsJsonStr = base64Decode(tgWebAppStartParamBase64)
    console.log('paramsJsonStr', paramsJsonStr)
    let tgWebAppStartParam = JSON.parse(paramsJsonStr)
    urlParams.value.from_chat_id = tgWebAppStartParam.chat_id ? tgWebAppStartParam.chat_id : ''
    urlParams.value.from_room_id = tgWebAppStartParam.room_id ? tgWebAppStartParam.room_id : ''
    urlParams.value.from_group_mode = tgWebAppStartParam.group_mode ? tgWebAppStartParam.group_mode : true
    urlParams.value.from_tg_user_id = tgWebAppStartParam.tg_user_id ? tgWebAppStartParam.tg_user_id : 0

    const tabMap = [
        { paramTab: 3, tabIndex: 0 }, // 3 rewards => tab index 0
        { paramTab: 0, tabIndex: 1 }, // 0 rewards => tab index 1
        { paramTab: 1, tabIndex: 2 }, // 1 rewards => tab index 2
        { paramTab: 2, tabIndex: 3 }, // 2 rewards => tab index 3
    ]
    tabParam.value = tgWebAppStartParam.tab ? tgWebAppStartParam.tab : 0
    tabParam.value = tabParam.value > 3 ? 0 : tabParam.value
    if (tabParam.value >= 0 && tabParam.value <= 3) {
        const tab = tabMap.filter((item) => {
            return item.paramTab == tabParam.value
        })
        tabParam.value = tab && tab.length > 0 ? tab[0].tabIndex : 0;
    }
}

const activeTab = ref(tabParam.value ? tabParam.value : 0);
const tabs = [
    {
        text: 'Rewards',
        activeIcon: new URL('@/assets/images/tab_rewards_active.png', import.meta.url).href,
        inactiveIcon: new URL('@/assets/images/tab_rewards_inactive.png', import.meta.url).href
    },
    {
        text: 'Games',
        activeIcon: new URL('@/assets/images/tab_games_active.png', import.meta.url).href,
        inactiveIcon: new URL('@/assets/images/tab_games_inactive.png', import.meta.url).href
    },
    {
        text: 'My Miuuu',
        activeIcon: new URL('@/assets/images/tab_mymiuuu_active.png', import.meta.url).href,
        inactiveIcon: new URL('@/assets/images/tab_mymiuuu_inactive.png', import.meta.url).href
    },
    {
        text: 'Balance',
        activeIcon: new URL('@/assets/images/tab_balance_active.png', import.meta.url).href,
        inactiveIcon: new URL('@/assets/images/tab_balance_inactive.png', import.meta.url).href
    },
]

function onTabChange(index: number) {
    // console.log('index', index)
}

function userLogin() {
    // setAccessToken('')
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
            canGetData.value = true
        } else {
            console.log('get user miuuu faild')
        }
    }).catch((error: any) => {
    })
}


</script>

<template>
    <div class="page">
        <Rewards v-show="activeTab == 0" :params="urlParams" :canGetData="canGetData" :show="activeTab == 0" />
        <Games v-show="activeTab == 1" :params="urlParams" :canGetData="canGetData" />
        <Balance v-show="activeTab == 2" :params="urlParams" :canGetData="canGetData" />
        <MyMiuuu v-show="activeTab != 0 && activeTab != 1 && activeTab != 2" :params="urlParams" :canGetData="canGetData" />

        <van-tabbar v-model="activeTab" active-color="#000000" inactive-color="#AEAEAE" @click="onTabChange">
            <van-tabbar-item v-for="(tab, index) in tabs" :key="index">
                <span>{{ tab.text }}</span>
                <template #icon="props">
                    <img :src="props.active ? tab.activeIcon : tab.inactiveIcon" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="scss" scoped>
.page{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-y: auto;
}
.van-tabbar{
    height: 82px;
    box-sizing: border-box;
}
.van-tabbar-item{
    padding: 8px 0 20px 0;
    line-height: 14px;
}
.van-tabbar-item__text span{
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
}
.van-tabbar-item__icon{
    margin-bottom: 8px;
}
.van-tabbar-item__icon img {
    height: 27px;
}

</style>