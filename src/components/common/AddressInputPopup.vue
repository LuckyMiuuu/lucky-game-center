<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Clipboard from 'clipboard'
import { showToast } from 'vant';
import Popup from './Popup.vue';
import Button from '@/components/common/Button.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['onClose', 'onSubmit'])

const popupIsShow = ref(false)
const inputAddress = ref('')

onMounted(() => {
    
})

watch(
  () => [props.show, props.address],
    (newVal) => {
        if (newVal) {
        popupIsShow.value = newVal[0] as any
        inputAddress.value = newVal[1] as any;
    }
  }
);

function onPopupSubmit() {
    if (!inputAddress.value) {
        return;
    }
    emits("onSubmit", inputAddress.value);
}

function onCopy() {
    if (!inputAddress.value) {
        return;
    }
    const clipboard = new Clipboard('.copy-icon')
    clipboard.on('success', () => {
        showToast('Copied');
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        showToast('Copy failed');
        clipboard.destroy()
    })

}

function onClose() {
    emits("onClose");
}



</script>

<template>
    <Popup
        :show="popupIsShow"
        title="Connect wallet"
        @on-close="onClose"
    >
        <div class="list-content">
            <div class="popup-desc">USDT Reward will deliver from Polygon Chain, please make sure you submit the right address</div>
            <div class="popup-input">
                <input type="text" v-model="inputAddress" />
                <div class="copy-icon" :data-clipboard-text="inputAddress" @click="onCopy">
                    <img src="@/assets/images/icon_copy.png" />
                </div>
            </div>
            <Button @click="onPopupSubmit" text="Submit" size="max" />
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
.popup-container{
    width: 100%;
    height: 240px;
}
.list-content{
    width: 100%;
    height: 240px;
    background-color: #ffffff;
    .popup-desc{
        color: rgb(0, 0, 0, 0.5);
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 19px;
        margin-top: 4px;
    }
    .popup-input{
        width: 100%;
        height: 48px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        overflow: hidden;
        input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 0 16px;
            color: #000;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: -0.4px;

        }
        input:focus{
            border: none;
            outline: none;
        }
        .copy-icon{
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            img{
                width: 24px;
                height: 24px;
            }
        }
    }
}

</style>
