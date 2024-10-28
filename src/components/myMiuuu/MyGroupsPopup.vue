<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { TOKEN_NAME } from '@/constants'
import { toThousands } from '@/utils/js-helpers'
import { getMyGroups } from '@/api/index'
import type { GroupInfo } from '@/models';
import ListEmpty from '@/components/common/ListEmpty.vue'
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

onMounted(() => {
})

watch(
    () => [props.show, props.canGetData], (newVal) => {
        if (newVal) {
            popupIsShow.value = newVal[0] as any
            if (newVal[1]) {
                myGroupList.value.length <= 0 && getGroups()
            }
        }
    }
);

function onClose() {
    emits("onClose");
}


const myGroupList = ref<Array<GroupInfo>>([])
function getGroups() {
    getMyGroups().then((rsp: any) => {
        if (rsp.data && rsp.data.objects) {
            myGroupList.value = rsp.data.objects
        }
    }).catch((error) => {
    })
}


</script>

<template>
    <Popup 
        :show="popupIsShow"
        title="My Group"
        @on-close="onClose"
    >
        <div class="list-content hidden-scroll-bar">
            <ListEmpty v-if="myGroupList.length <= 0" text="No data yet" />
            <div v-else v-for="(item,index) in myGroupList" :key="index" class="list-item">
                <div class="item-detail">
                    <img src="@/assets/images/tab_groups_active.png" />
                    <div class="item-info">
                        <div class="item-title item-title-w-limit3 ellipsis1">{{ item.tg_group_name }}</div>
                        <div class="item-desc">{{ toThousands(item.rounds) }} Round</div>
                    </div>
                </div>

                <div class="item-cost">
                    <div class="item-cost-type">+{{ toThousands(item.rewards) }}</div>
                    <div class="item-cost-coin">{{ TOKEN_NAME }}</div>
                </div>
                
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
.list-content{
    width: 100%;
    height: 260px;
    overflow-y: auto;
}

</style>
