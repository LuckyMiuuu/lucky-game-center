<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRoomList } from '@/api/index'
import { base64Encode, base64Decode } from '@/utils/js-helpers'

const route = useRoute()

interface GameInfo{
    game_id: number;
    game_short_name: string;
    game_desc?: string;
    game_url: string;
    game_show_name: string;
}

interface LivingGameInfo{
    room_id: number,
    game_short_name: string, //"web3",
    play1_id: string,
    play2_id?: string,
    play1_name: string,
    play2_name?: string,
    play1_score: number,
    play2_score?: number,
    play1_status?: number,
    play2_status?: number,
    game_status?: number,
    chat_id?: string,
    update_time?: string,
    create_time?: string,
    creater?: number,
    game_show_name?: string,

}

defineOptions({
  name: 'GameCenterView'
})

const paramsJsonStr = ref('')
const chat_id = ref('')

const strParams = ref('')
const tgWebAppStartParamBase64 = ref('')
const gameList = ref<Array<GameInfo>>([])
const pagination = reactive({
    page: 1,
    page_size: 50,
    total_records: 0,
    total_pages: 0
})
const livingGameLoaidng = ref(false)
const livingGameList = ref<Array<LivingGameInfo>>([])

function paramsInit() {
    strParams.value = window.location.search
    tgWebAppStartParamBase64.value = route.query.tgWebAppStartParam?.toString() as string
    if (tgWebAppStartParamBase64.value) {
        paramsJsonStr.value = base64Decode(tgWebAppStartParamBase64.value)
        let tgWebAppStartParam = JSON.parse(paramsJsonStr.value)
        chat_id.value = tgWebAppStartParam.chat_id
    }
}

function getAvailableGameList() {

    const games = [
        { game_id: 1, game_short_name: 'web3', game_show_name: 'Aircraft Battle', game_desc: 'Aircraft Battle 1 desc', game_url: 'https://t.me/myweb3gamebot/web3' },
        { game_id: 2, game_short_name: 'boxstaking', game_show_name: 'Box Staking', game_desc: 'Box Staking', game_url: 'https://t.me/myweb3gamebot/boxstaking' },
        { game_id: 3, game_short_name: 'snake', game_show_name: 'Snake', game_desc: 'Snake', game_url: 'https://t.me/myweb3gamebot/snake' },
        { game_id: 4, game_short_name: 'jump', game_show_name: 'Just Jump', game_desc: 'Just Jump', game_url: 'https://t.me/myweb3gamebot/jump' },
        // { game_id: 5, game_short_name: 'dogewarrior', game_show_name: 'Doge Warrior', game_desc: 'Doge Warrior', game_url: 'https://t.me/myweb3gamebot/dogewarrior' },
    ]
    if (import.meta.env.VITE_NODE_ENV == 'prod') {
        gameList.value = []
    } else {
        gameList.value = [...games]
    }
}

function getLivingRoomeList() {
    if (livingGameLoaidng.value) {
        return
    }
    livingGameLoaidng.value = true
    getRoomList(pagination, JSON.stringify({
        "chat_id": chat_id.value,
        "status": 0
    })).then((rsp: any) => {
        livingGameLoaidng.value = false
        if (rsp.data && rsp.data.objects) {
            livingGameList.value = [...rsp.data.objects]
        } else {
            livingGameList.value = []
        }
        if (rsp.meta) {
            pagination.total_pages = rsp.meta.total_pages
            pagination.total_records = rsp.meta.total_records
        }
    }).catch((error) => {
        livingGameLoaidng.value = false
        livingGameList.value = []
    })

    // const list = [
    //     { game_short_name: 'web3', room_id: 1, play1_id: '1', play1_name: 'coding1', play1_score: 10000, play2_id: '', play2_name: '', play2_score: 0 },
    //     { game_short_name: 'web3', room_id: 2, play1_id: '2', play1_name: 'coding2', play1_score: 20000, play2_id: '', play2_name: '', play2_score: 0 },
    //     { game_short_name: 'web3', room_id: 3, play1_id: '3', play1_name: 'coding3', play1_score: 300000, play2_id: '', play2_name: '', play2_score: 0 },
        
    // ]
    // livingGameList.value = [...list]
}

onMounted(() => {
    paramsInit();

    getAvailableGameList();
    getLivingRoomeList()
})

function onGame(game: GameInfo) {
    // let url = game.game_url + strParams.value
    let url = game.game_url + '?startapp='+tgWebAppStartParamBase64.value
    // window.location.href = url
    window.open(url, '_blank');
}

function onGroupGame(game: GameInfo) {
    let params = {
        chat_id: chat_id.value,
        group_mode: true
    }
    let url = game.game_url + '?startapp=' + base64Encode(JSON.stringify(params))
    // window.location.href = url
    window.open(url, '_blank');
}

function onLivingGame(livingGame: LivingGameInfo) {
    let params = {
        chat_id: chat_id.value,
        room_id: livingGame.room_id
    }
    let url = getGameUrl(livingGame.game_short_name) + '?startapp=' + base64Encode(JSON.stringify(params))
    // window.location.href = url
    window.open(url, '_blank');
}

function getGameUrl(gameShortName: string) {
    let gameUrl = ''
    gameList.value.forEach((item) => {
        if (item.game_short_name == gameShortName) {
            gameUrl = item.game_url
            return;
        }
    })
    return gameUrl;
}

function onMoreLivingGames() {
    if (livingGameLoaidng.value) {
        return
    }
    if (pagination.page >= pagination.total_pages) {
        return
    }
    pagination.page++
    getLivingRoomeList()
}

</script>

<template>
    <div class="page">
        <div class="title">Game Center</div>

        <div class="game border">
            <div class="game-title">Group Games:</div>
            <div v-if="gameList.length <= 0" class="list-empty">
                <img src="@/assets/images/empty.png" />
                <p>Sorry, No data yet!</p>
            </div>
            <div v-else class="game-list">
                <div v-for="item in gameList" :key="item.game_id" class="game-item" @click="onGroupGame(item)" >
                    <p>{{ item.game_show_name }}</p>
                    <!-- <p>{{ item.game_url }}</p> -->
                </div>
            </div>
        </div>

        <div class="one-to-one-game">
            <div class="game">
                <div class="game-title">1v1 games:</div>
                <div v-if="gameList.length <= 0" class="list-empty">
                    <img src="@/assets/images/empty.png" />
                    <p>Sorry, No data yet!</p>
                </div>
                <div v-else class="game-list">
                    <div v-for="item in gameList" :key="item.game_id" class="game-item" @click="onGame(item)" >
                        <p>{{ item.game_show_name }}</p>
                        <!-- <p>{{ item.game_url }}</p> -->
                    </div>
                </div>
            </div>

            <div class="living-game">
                <div class="living-game-title">Living Games:</div>
                <div v-if="livingGameList.length <= 0" class="list-empty">
                    <img src="@/assets/images/empty.png" />
                    <p>Sorry, No data yet!</p>
                </div>
                <div v-else class="living-game-list">
                    <div v-for="item in livingGameList" :key="item.room_id" class="living-game-item" @click="onLivingGame(item)">
                        <div class="game-info">
                            <div class="game-name">{{ item.game_show_name }}</div>
                            <div class="game-desc">Room id: {{ item.room_id }}</div>
                        </div>
                        <div class="launch-info">
                            <div class="launch-user-name">@{{ item.play1_name }}</div>
                            <div class="launch-user-score">score: {{ item.play1_score }}</div>
                        </div>
                        <div class="pk-btn">PK</div>
                    </div>
                </div>
                <div v-if="pagination.page < pagination.total_pages " class="more-btn" @click="onMoreLivingGames">More</div>
            </div>
        </div>

        

        

        <!-- <div class="params-text">{{ strParams }}</div>
        <div class="params-text">params: {{ paramsJsonStr }}</div>
        <div class="params-text">chart_id: {{ chat_id }}</div> -->
    </div>
</template>

<style lang="scss" scoped>
.page{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 14px 30px 14px;
    box-sizing: border-box;
    .title{
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        padding: 30px 0;
    }
    .game{
        width: 100%;
        padding: 20px;
        border-bottom: 0px #eeeeee solid;
        background-color: #D2D2D2;
        border-radius: 8px;
        margin: 20px 0;
        box-sizing: border-box;
        .game-title{
            font-size: 20px;
            font-weight: 700;
            line-height: 1.4;
            color: #000000;
        }
         .game-list{
            width: 100%;
            padding: 20px 0;
            .game-item{
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background-color: #000000;
                color: #ffffff;
                border-radius: 25px;
                margin-bottom: 20px;
                cursor: pointer;
                p{
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 24px;
                }
            }
        }
    }
    .game.border{
        border-bottom: 1px #eeeeee solid;
    }
   
    .living-game{
        width: 100%;
        padding: 20px;
        border-bottom: 0px #eeeeee solid;
        .living-game-title{
            font-size: 20px;
            font-weight: 700;
            line-height: 1.4;
            color: #000000;
        }
        .living-game-list{
            width: 100%;
            .living-game-item{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px #eeeeee solid;
                .game-info{
                    .game-name{
                        font-size: 18px;
                        color: #000000;
                        font-weight: 500;
                    }
                    .game-desc{
                        font-size: 16px;
                        color: #555555;
                    }
                }
                .launch-info{
                    .launch-user-name{
                        font-size: 18px;
                        color: #555555;
                    }
                    .launch-user-score{
                        font-size: 18px;
                        color: #D43327;
                    }
                }
                .pk-btn{
                    width: 50px;
                    height: 30px;
                    font-size: 18px;
                    color: #ffffff;
                    border-radius: 15px;
                    background-color: #000000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
            }
        }
    }
    .one-to-one-game{
        background-color: #D2D2D2;
        border-radius: 8px;
    }

    .list-empty{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 0;
        p{
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            color: #555555;
            text-align: center;
        }
        img{
            width: 30%;
        }
    }
    .more-btn{
        width: 60%;
        height: 40px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #ffffff;
        background-color: #000000;
        margin: 20px auto;
    }

    .params-text{
        width: 100%;
        margin-top: 20px;
        font-size: 16px;
        color: #D43327;
        word-break: break-all;
    }
}

</style>