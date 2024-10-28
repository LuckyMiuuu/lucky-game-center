import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    const accessToken = ref('')
    const selfTelegramUserId = ref(0)
    const selfTelegramUserName = ref('')
    const selfTelegramFirstName = ref('')
    const selfTelegramLastName = ref('')
    const selfTelegramInitData = ref('')
    const activeTab = ref(0)
    const bindWalletInfo = ref('')

    function setAccessToken(token: string) {
        accessToken.value = token;
    }

    function setSelfTelegramUserId(uid: number) {
        selfTelegramUserId.value = uid;
    }

    function setSelfTelegramUserName(userName: string) {
        selfTelegramUserName.value = userName;
    }

    function setSelfTelegramFirstName(name: string) {
        selfTelegramFirstName.value = name;
    }

    function setSelfTelegramLastName(name: string) {
        selfTelegramLastName.value = name;
    }

    function setSelfTelegramInitData(initData: string) {
        selfTelegramInitData.value = initData;
    }

    function setActiveTab(index: number) {
        activeTab.value = index;
    }

    function setBindWalletInfo(data: string) {
        bindWalletInfo.value = data;
    }


    return {
        accessToken,
        selfTelegramUserId,
        selfTelegramUserName,
        selfTelegramFirstName,
        selfTelegramLastName,
        selfTelegramInitData,
        activeTab,
        bindWalletInfo,
        setAccessToken,
        setSelfTelegramUserId,
        setSelfTelegramUserName,
        setSelfTelegramFirstName,
        setSelfTelegramLastName,
        setSelfTelegramInitData,
        setActiveTab,
        setBindWalletInfo
    }
}, {
    persist: {
        // storage: localStorage,//default localStorage
        // paths: ['darkMode', 'profile']
    }
})