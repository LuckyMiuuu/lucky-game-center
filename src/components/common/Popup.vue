<script setup lang="ts">
import { ref, watch } from 'vue'
import ListEmpty from '@/components/common/ListEmpty.vue'

defineOptions({
  name: 'PopupComponent'
})

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
})

const emits = defineEmits(['onClose'])

const popupIsShow = ref(false)

watch(
    () => [props.show], (newVal) => {
        if (newVal) {
            popupIsShow.value = newVal[0] as any
        }
    }
);

function onPopupEvent(event: string) {
    if (event == 'closed') {
        emits("onClose");
    }
}


</script>

<template>
    <van-popup
        v-model:show="popupIsShow"
        round
        position="bottom"
        class="van-popup-container"
        @open="onPopupEvent('open')"
        @opened="onPopupEvent('opened')"
        @close="onPopupEvent('close')"
        @closed="onPopupEvent('closed')"
    >
        <div class="popup-container">
            <div v-if="title" class="popup-title">{{ title }}</div>
            <div class="popup-content">
                <slot></slot>
            </div>

        </div>
    </van-popup>
</template>

<style lang="scss" scoped>
.van-popup-container{
    width: 100%;
    height: fit-content;
    .popup-container{
        width: 100%;
        height: fit-content;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: #ffffff;
        .popup-title{
            width: 100%;
            color: #000;
            text-align: center;
            font-size: 20px;
            font-weight: 590;
            line-height: 24px;
            padding: 20px 0;
        }
        .popup-content{
            width: 100%;
        }
    }
}


</style>
