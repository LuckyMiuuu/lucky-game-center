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
    tabParam.value = tgWebAppStartParam.tab ? tgWebAppStartParam.tab : 0
    tabParam.value = tabParam.value > 2 ? 0 : tabParam.value
}

const activeTab = ref(tabParam.value ? tabParam.value : 0);
const tabs = [
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
        <Games v-show="activeTab == 0" :params="urlParams" :canGetData="canGetData" />
        <Balance v-show="activeTab == 2" :params="urlParams" :canGetData="canGetData" />
        <MyMiuuu v-show="activeTab != 0 && activeTab != 2" :params="urlParams" :canGetData="canGetData" />

        <van-tabbar v-model="activeTab" active-color="#000000" inactive-color="#AEAEAE" @change="onTabChange">
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