<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { GroupInfo } from '@/models'
import { toThousands } from '@/utils/js-helpers'
import OperationBox from '@/components/common/OperationBox.vue';
import Popup from '../common/Popup.vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    groups: {
        type: Array<GroupInfo>,
        required: true,
    },
})

const emits = defineEmits(['onClose', 'onSubmit'])

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

function onSend(groupId: string) {
    emits("onSubmit", groupId);
}

function onClose() {
    emits("onClose");
}

function onInviteBot() {
    const inviteUrl = import.meta.env.VITE_INVITE_BOT_URL
    const telegramWebApp = (window as any).Telegram?.WebApp
    if (telegramWebApp) {
        telegramWebApp.openTelegramLink(inviteUrl)
    } else {
        window.open(inviteUrl, '_blank');
    }
}



</script>

<template>
    <Popup 
        :show="popupIsShow" 
        :title="groups.length > 0 ? 'Send Game to Group' : 'Invite Bot to Group'"
        @on-close="onClose"
    >
        <div class="list-content hidden-scroll-bar">
            <OperationBox 
                v-if="groups.length <= 0"
                title="Invite Bot to Group" 
                desc="Add the Miuuu bot as an admin.  The more groups, the more rewards.  Let’s have a big party! Miuuu~ " 
                btn-text="Invite"
                @on-submit="onInviteBot"
            />
            <div v-else v-for="(item,index) in groups" :key="index" class="list-item">
                <div class="item-detail">
                    <img src="@/assets/images/tab_groups_active.png">
                    <div class="item-info">
                        <div class="item-title item-title-w-limit1 ellipsis1">{{ item.tg_group_name }}</div>
                        <div class="item-desc">{{ toThousands(item.rounds) }} Round</div>
                    </div>
                </div>
                <div class="item-btn" @click="onSend(item.tg_group_id)">Send</div>
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
