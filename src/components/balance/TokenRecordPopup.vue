<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { toThousands } from '@/utils/js-helpers'
import ListEmpty from '@/components/common/ListEmpty.vue'
import Popup from '../common/Popup.vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
})

interface TokenRecordInfo{
    tg_user_id?: string,
    cost: number,
    cost_type: string,
    chat_id?: string,
    game_short_name: string,
    create_time?: string,
}

const emits = defineEmits(['onClose'])

const popupIsShow = ref(false)

onMounted(() => {
})

watch(
    () => [props.show], (newVal) => {
        if (newVal) {
            popupIsShow.value = newVal[0] as any
            if (newVal[0]) {
                getTokenRecordList()
            }
        }
    }
);

function onClose() {
    emits("onClose");
}

const recordList = ref<Array<TokenRecordInfo>>([])
function getTokenRecordList() {
    // getTokenRecord().then((rsp: any) => {
    //     if (rsp.data) {
    //         if (rsp.data.miu_balance) {
    //             miuuuBalance.value = rsp.data.miu_balance
    //         }
    //     }
    // }).catch((error) => {
    // })

    const list = [
        { game_short_name: 'Win the game', cost_type: 'add', cost: 100 },
        { game_short_name: 'Deposit', cost_type: 'add', cost: 300000 },
        { game_short_name: 'Play game', cost_type: 'sub', cost: 100 },
        { game_short_name: 'Withdraw', cost_type: 'sub', cost: 300000 },
        { game_short_name: 'Play game', cost_type: 'sub', cost: 100 },
        
    ]
    recordList.value = [...list]
}



</script>

<template>
    <Popup
        :show="popupIsShow"
        :title="symbol + ' Balance'"
        @on-close="onClose"
    >
        <div class="list-content hidden-scroll-bar">
            <ListEmpty v-if="recordList.length <= 0" size="small" text="No data yet" />
            <div v-else v-for="(item,index) in recordList" :key="index" class="list-item">
                <div class="item-detail">
                    <img v-if="item.game_short_name == 'Invite Friend'" src="@/assets/images/icon_share.png" />
                    <img v-else src="@/assets/images/icon_reward.png" />
                    <div class="item-info">
                        <div class="item-title">{{ item.game_short_name }}</div>
                    </div>
                </div>
                
                <div class="item-cost">
                    <div class="item-cost-type">{{ item.cost_type == 'add' ? '+' : '-' }}{{ toThousands(item.cost) }}</div>
                </div>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
.list-content{
    width: 100%;
    height: 182px;
    overflow-y: auto;
}

</style>
