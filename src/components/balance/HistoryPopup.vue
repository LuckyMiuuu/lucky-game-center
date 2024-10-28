<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { toThousands, decimalBalance } from '@/utils/js-helpers'
import type { UserTokenHistory} from '@/models/index'
import ListEmpty from '@/components/common/ListEmpty.vue'
import Popup from '../common/Popup.vue'

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    coinName: {
        type: String,
        default: '',
    },
    history: {
        type: Array<UserTokenHistory>,
        default: [],
    },
})

const emits = defineEmits(['onClose'])

const popupIsShow = ref(false)

onMounted(() => {
})

watch(
  () => [props.show],
    (newVal) => {
        if (newVal) {
        popupIsShow.value = newVal[0] as any
    }
  }
);

function onClose() {
    emits("onClose");
}

function isReward(historyItem: UserTokenHistory) {
    let result = false
    if (historyItem.cost_type == 'add') {
        result = true
    } else {
        if (historyItem.change_type == 'games') {
            result = true
        }
    }
    return result
}
function isGame(historyItem: UserTokenHistory) {
    let result = false
    if (historyItem.game_short_name) {
        result = true
    } else {
        if (historyItem.change_type == 'why_1') {
            result = true
        }
    }
    return result
}
function isInvite(historyItem: UserTokenHistory) {
    return historyItem.game_short_name == 'Invite Friend' ? true : false
}
function isRecharge(historyItem: UserTokenHistory) {
    return historyItem.change_type == 'recharge' ? true : false
}
function getTitle(historyItem: UserTokenHistory) {
    let result = ''
    if (historyItem.game_short_name) {
        result = historyItem.game_short_name
    } else {
        if (historyItem.change_type == 'recharge') {
            result = 'Recharge'
        } else {
            if (historyItem.detail) {
                const detail = JSON.parse(historyItem.detail)
                if (detail) {
                    result = detail.game_short_name
                }
            }
        }
    }
    return result
}
function getCostType(historyItem: UserTokenHistory) {
    let result = ''
    if (historyItem.cost_type == 'add') {
        result = '+'
    } else if(historyItem.cost_type == 'sub') {
        result = '-'
    } else {
        if (historyItem.amount) {
            const symbol = historyItem.amount.substring(0, 1)
            result = symbol == '-' ? '-' : '+'
        }
    }
    return result
}
function getAmount(historyItem: UserTokenHistory) {
    let result = '0'
    if (historyItem.cost) {
        result = historyItem.cost + ''
    } else {
        if (historyItem.amount) {
            const symbol = historyItem.amount.substring(0, 1)
            if (symbol == '-') {
                result = toThousands(decimalBalance(historyItem.amount.substring(1)))
            } else {
                result = toThousands(decimalBalance(historyItem.amount))
            }
        }
    }
    return result
}
</script>

<template>
    <Popup 
        :show="popupIsShow"
        :title="coinName + ' History'"
        @on-close="onClose"
    >
        <div class="list-content hidden-scroll-bar">
            <ListEmpty v-if="history.length <= 0" size="small" text="No Data yet!" />
            <div v-els v-for="(item,index) in history" :key="index" class="list-item">
                <div class="item-detail">
                    <img v-if="isReward(item)" src="@/assets/images/icon_reward.png" />
                    <img v-else-if="isGame(item)" src="@/assets/images/icon_game.png" />
                    <img v-else-if="isInvite(item)" src="@/assets/images/icon_share.png" />
                    <img v-else-if="isRecharge(item)" src="@/assets/images/task_icon_1.png" />
                    <img v-else src="@/assets/images/task_icon_2.png" />

                    <div class="item-info">
                        <div class="item-title item-title-w-limit2 ellipsis1">{{ getTitle(item) }}</div>
                    </div>
                </div>
                
                <div class="item-cost">
                    <div class="item-cost-type">{{ getCostType(item) }}{{ getAmount(item) }}</div>
                </div>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
.list-content{
    width: 100%;
    height: 192px;
    overflow-y: auto;
}

</style>
