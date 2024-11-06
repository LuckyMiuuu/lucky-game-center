import axiosRequest from '@/utils/axios'

export function getRoomList(params: any, data: any) {
    return axiosRequest({
        method: 'post',
        url: 'api/v1/telegram/webapp/roomlist',
        params: params,
        data: data
    })
}

export function login(data: any) {
    return axiosRequest({
        method: 'post',
        url: `api/v1/telegram/webapp/login/${import.meta.env.VITE_TELEGRAM_BOT_ID}`,
        data: data
    })
}

export function getMyGroups() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/telegram/webapp/mygroups',
    })
}

export function pushGame(data: any) {
    return axiosRequest({
        method: 'post',
        url: `api/v1/telegram/webapp/pushgame`,
        data: data
    })
}

export function getUserMiuuu() {
    return axiosRequest({
        method: 'post',
        url: 'api/v1/telegram/webapp/usermiuuu',
    })
}

export function getUserWallet() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/telegram/webapp/mywallet',
    })
}

export function getUserWalletAddress() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/telegram/webapp/getaddress',
    })
}

export function setUserWalletAddress(data: string) {
    return axiosRequest({
        method: 'post',
        url: 'api/v1/telegram/webapp/setaddress',
        data
    })
}

export function getGameStatistical() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/telegram/webapp/gamestatistical',
    })
}

export function getUserTasks() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/telegram/webapp/tasks',
    })
}

export function claimUserTask(data: string) {
    return axiosRequest({
        method: 'post',
        url: 'api/v1/telegram/webapp/tasks/claim',
        data,
    })
}

export function getProps() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/propshop/props',
    })
}

export function getUserProps() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/propshop/userprops',
    })
}

export function exchangeProp(data: string) {
    return axiosRequest({
        method: 'post',
        url: 'api/v1/propshop/exchangeprop',
        data,
    })
}

export function getUserPropExchangeRecords() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/propshop/exchangerecords',
    })
}

export function getBindWallet() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/telegram/webapp/getbindwallet',
    })
}

export function bindWallet(data: string) {
    return axiosRequest({
        method: 'post',
        url: 'api/v1/telegram/webapp/bindwallet',
        data,
    })
}

export function checkOkxTask() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/telegram/webapp/okx/checkbind',
    })
}

export function getDailyTask() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/telegram/usertask/checkininfo',
    })
}

export function dailyTaskCheckin() {
    return axiosRequest({
        method: 'post',
        url: 'api/v1/telegram/usertask/checkin',
    })
}

export function getRewardBoostHistory() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/usertask/reward/list', 
    })
}

export function getRewardAchivedHistory() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/usertask/reward/completes',
    })
}

export function getRewardUserTaskInfo() {
    return axiosRequest({
        method: 'get',
        url: 'api/v1/usertask/reward/open',
    })
}