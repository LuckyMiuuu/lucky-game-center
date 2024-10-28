<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { showSuccessToast, showFailToast } from 'vant';
import type { UrlParams, GroupInfo, GameInfo } from '@/models'
import { getMyGroups, pushGame, getGameStatistical } from '@/api/index'
import { toThousandsK } from '@/utils/js-helpers'
import { joinOfficialChannel } from '@/utils/general'
import OperationBox from '@/components/common/OperationBox.vue';
import SelectGroupPopup from '@/components/games/SelectGroupPopup.vue';
import SelectCurrencyPopup from '@/components/games/SelectCurrencyPopup.vue';

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
    }
})

onMounted(() => {
    const gamesTest = [
        {
            game_id: 1,
            game_short_name: 'LuckyTrump',
            game_show_name: 'Luck Trump',
            game_url: 'https://t.me/myweb3gamebot/LuckyTrump',
            game_img: new URL('@/assets/images/game_trump.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 2,
            game_short_name: 'LuckyJump',
            game_show_name: 'Lucky Jump',
            game_url: 'https://t.me/myweb3gamebot/LuckyJump',
            game_img: new URL('@/assets/images/game_jump.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 3,
            game_short_name: 'LuckyPile',
            game_show_name: 'Lucky Pile',
            game_url: 'https://t.me/myweb3gamebot/LuckyPile',
            game_img: new URL('@/assets/images/game_pile.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 4,
            game_short_name: 'LuckyEater',
            game_show_name: 'Lucky Eater',
            game_url: 'https://t.me/myweb3gamebot/LuckyEater',
            game_img: new URL('@/assets/images/game_eater.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 5,
            game_short_name: 'LuckyCombine',
            game_show_name: 'Lucky Combine',
            game_url: 'https://t.me/myweb3gamebot/LuckyCombine',
            game_img: new URL('@/assets/images/game_combine.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 6,
            game_short_name: 'LuckyShooter',
            game_show_name: 'Lucky Shooter',
            game_url: 'https://t.me/myweb3gamebot/LuckyShooter',
            game_img: new URL('@/assets/images/game_shooter.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 7,
            game_short_name: 'LuckyStacker',
            game_show_name: 'Lucky Stacker',
            game_url: 'https://t.me/myweb3gamebot/LuckyStacker',
            game_img: new URL('@/assets/images/game_stacker.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
    ]
    const gamesProd = [
        {
            game_id: 1,
            game_short_name: 'LuckyTrump',
            game_show_name: 'Luck Trump',
            game_url: 'https://t.me/LuckyMiuuu_bot/LuckyTrump',
            game_img: new URL('@/assets/images/game_trump.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 2,
            game_short_name: 'LuckyJump',
            game_show_name: 'Lucky Jump',
            game_url: 'https://t.me/LuckyMiuuu_bot/LuckyJump',
            game_img: new URL('@/assets/images/game_jump.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 3,
            game_short_name: 'LuckyPile',
            game_show_name: 'Lucky Pile',
            game_url: 'https://t.me/LuckyMiuuu_bot/LuckyPile',
            game_img: new URL('@/assets/images/game_pile.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 4,
            game_short_name: 'LuckyEater',
            game_show_name: 'Lucky Eater',
            game_url: 'https://t.me/LuckyMiuuu_bot/LuckyEater',
            game_img: new URL('@/assets/images/game_eater.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 5,
            game_short_name: 'LuckyCombine',
            game_show_name: 'Lucky Combine',
            game_url: 'https://t.me/LuckyMiuuu_bot/LuckyCombine',
            game_img: new URL('@/assets/images/game_combine.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 6,
            game_short_name: 'LuckyShooter',
            game_show_name: 'Lucky Shooter',
            game_url: 'https://t.me/LuckyMiuuu_bot/LuckyShooter',
            game_img: new URL('@/assets/images/game_shooter.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
        {
            game_id: 7,
            game_short_name: 'LuckyStacker',
            game_show_name: 'Lucky Stacker',
            game_url: 'https://t.me/LuckyMiuuu_bot/LuckyStacker',
            game_img: new URL('@/assets/images/game_stacker.png', import.meta.url).href,
            groups: 0,
            rounds: 0,
        },
    ]
    if (import.meta.env.VITE_NODE_ENV == 'prod') {
        mainGame.value = gamesProd[1]
        gameList.value = gamesProd.filter((item,index) => item.game_id != mainGame.value?.game_id)
    } else {
        mainGame.value = gamesTest[1]
        gameList.value = gamesTest.filter((item,index) => item.game_id != mainGame.value?.game_id)
    }
})

watch(() => [props.canGetData],
    (newVal) => {
        if (newVal) {
            if (newVal[0]) {
                getGameList()
                getGroups()
            }
    }
});

const mainGame = ref<GameInfo>()
const gameList = ref<Array<GameInfo>>([])
const pendingGame = ref<GameInfo>()

const myGroupList = ref<Array<GroupInfo>>([])
function getGroups() {
    getMyGroups().then((rsp: any) => {
        if (rsp.data && rsp.data.objects) {
            myGroupList.value = rsp.data.objects
        }
    }).catch((error) => {
    })
}

function getGameList() {
    getGameStatistical().then((rsp: any) => {
        if (rsp.data && rsp.data.objects) {
            rsp.data.objects.forEach((element: any) => {
                if (mainGame.value && mainGame.value?.game_short_name == element.game_short_name) {
                    mainGame.value.groups = element.groups
                    mainGame.value.rounds = element.rounds
                }
                gameList.value.forEach(game => {
                    if (game.game_short_name == element.game_short_name) {
                        game.groups = element.groups
                        game.rounds = element.rounds
                    }
                });
            });

            gameList.value = [...gameList.value]
        }
    }).catch((error) => {
    })

    
}

function onGame(game: GameInfo | undefined) {
    if (!game) {
        return
    }
    pendingGame.value = game
    onSendGamePopupShow()
}


const sendGamePopupShow = ref(false)
function onSendGamePopupShow() {
    sendGamePopupShow.value = true;
}
function onSendGamePopupClose() {
    sendGamePopupShow.value = false;
}

const sendGameToChatId = ref('')
function onSendGameSubmit(chatId: string) {
    sendGameToChatId.value = chatId
    onSelectCurrencyPopupShow()
}


const selectCurrencyPopupShow = ref(false)
function onSelectCurrencyPopupShow() {
    selectCurrencyPopupShow.value = true;
}
function onSelectCurrencyPopupClose() {
    selectCurrencyPopupShow.value = false;
}

function onSelectCurrencySubmit(costType: string) {
    const request = JSON.stringify({
        chat_ids: [sendGameToChatId.value],
        cost_type: costType,
        game_short_name: pendingGame.value?.game_short_name
    })
    pushGame(request).then((rsp: any) => {
        if (rsp.code == 0) {
            showSuccessToast('Send successfully');
            onSelectCurrencyPopupClose()
            onSendGamePopupClose()
        } else {
            showFailToast('Send failed');
        }
    }).catch((error) => {
        showFailToast('Send failed');
    })
}

</script>

<template>
    <div class="page hidden-scroll-bar">

        <div class="invite-container">
            <!-- <OperationBox 
                title="Add Bot" 
                desc="Lorem ipsum dolor sit amet, consectetur." 
                btn-text="Add"
                @on-submit="() => {}"
            /> -->

            <OperationBox 
                title="Join Miuuu Community" 
                desc="Join the wildest PVP game party with Lucky Miuuu!</br>24-hour non-stop USDT & Points giveaway! Miuuu～" 
                btn-text="Join Channel"
                @on-submit="joinOfficialChannel"
            />
        </div>

        <div class="game-main">
            <img :src="mainGame?.game_img" @click="onGame(mainGame)">
            <div class="game-detail">
                <div class="game-name">{{ mainGame?.game_show_name }}</div>
                <div class="game-tags">
                    <div class="game-tag">{{ toThousandsK(mainGame?.groups ? mainGame.groups : 0)}} Groups</div>
                    <div class="game-tag">{{ toThousandsK(mainGame?.rounds ? mainGame.rounds : 0)}} Rounds</div>
                </div>
            </div>
        </div>

        <div class="game-list">
            <div v-for="(item,index) in gameList" :key="index" class="game-box" @click="onGame(item)">
                <img :src="item.game_img">
                <div class="game-detail">
                    <div class="game-name">{{ item.game_show_name }}</div>
                    <div class="game-tags">
                        <div class="game-tag">{{ toThousandsK(item.groups ? item.groups : 0)}} Groups</div>
                        <div class="game-tag">{{ toThousandsK(item.rounds ? item.rounds : 0)}} Rounds</div>
                    </div>
                </div>
            </div>
        </div>

        <SelectGroupPopup 
            :show="sendGamePopupShow" 
            :groups="myGroupList"
            @on-close="onSendGamePopupClose"
            @on-submit="onSendGameSubmit"
        />

        <SelectCurrencyPopup
            :show="selectCurrencyPopupShow"
            @on-close="onSelectCurrencyPopupClose"
            @on-submit="onSelectCurrencySubmit"
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
    background: #F9F9F9;
    border-bottom: 82px transparent solid;
    .invite-container{
        width: 100%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        gap: 8px;
    }

    .game-main{
        width: 100%;
        padding: 0 20px;
        margin-top: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        img{
            width: 100%;
            border-radius: 12px 12px 0px 0px;
            cursor: pointer;
        }
        .game-detail{
            width: 100%;
            padding: 12px 16px;
            box-sizing: border-box;
            background-color: #ffffff;
            border-radius: 0px 0px 12px 12px;
            .game-name{
                color: #000;
                font-family: Inter;
                font-size: 16px;
                font-weight: 600;
                line-height: 19px;
            }
            .game-tags{
                width: 100%;
                margin-top: 4px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                .game-tag{
                    border-radius: 6px;
                    background:  rgba(0, 0, 0, 0.05);
                    padding: 2px 3px;
                    color: rgba(0, 0, 0, 0.50);
                    font-family: Inter;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 15px;
                    margin-right: 4px;
                }
            }
        }
        
        
    }
    
    .game-list{
        width: 100%;
        padding: 20px 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .game-box{
            width: calc( (100% - 10px) / 2);
            margin-bottom: 10px;
            margin-right: 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            &:nth-child(2n){
                margin-right: 0;
            }
            img{
                width: 100%;
                border-radius: 10px;
                cursor: pointer;
            }
            .game-detail{
                width: 100%;
                padding: 10px 6px;
                box-sizing: border-box;
                .game-name{
                    color: #000;
                    font-family: Inter;
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 19px;
                }
                .game-tags{
                    width: 100%;
                    margin-top: 4px;
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    .game-tag{
                        border-radius: 6px;
                        background:  rgba(0, 0, 0, 0.05);
                        padding: 2px 3px;
                        color: rgba(0, 0, 0, 0.50);
                        font-family: Inter;
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 15px;
                        margin-right: 4px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        &:last-child{
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}

</style>