<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Popup from '../common/Popup.vue';

interface VerifyProp{
    show: Boolean,
}

const props = defineProps<VerifyProp>()

const emits = defineEmits(['onClose'])

const popupIsShow = ref(false)

onMounted(() => {
    
})

watch(() => [props.show],
    (newVal) => {
        if (newVal) {
            popupIsShow.value = newVal[0] as any
        }
    }
);


function onClose() {
    emits("onClose");
}

function jumpToOkx() {
    emits("onClose");
    window.open('https://www.okx.com/download?appendQuery=true&deeplink=okx%3A%2F%2Fminiapp&appid=okluanftactivity&pageurl=/cryptopedia&cryptopediaId=45&chainId=1', '_blank')
}



</script>

<template>
    <Popup
        :show="popupIsShow"
        title=""
        @on-close="onClose"
    >
        <div class="list-content">
            <div class="item-img">
                <img src="@/assets/images/verify.png">
            </div>
            <div class="item-name ellipsis1">Congratulations!</div>
            <div class="item-desc">
                Don’t forget to verify at OKX Cryptopedia to lock in your $Miuuu airdrop. Miuuu~
            </div>
            
            <div class="item-btn" @click="jumpToOkx">Go to verify</div>
            
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
.list-content{
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 20px;
    .item-img{
        width: 120px;
        height: 120px;
        margin: 0 auto;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .item-name{
        width: 100%;
        color: #000;
        text-align: center;
        font-size: 17px;
        font-weight: 600;
        line-height: 22px;
        margin-top: 20px;
    }
    .item-desc{
        color: rgb(0, 0, 0, 0.5);
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        line-height: normal;
        margin-top: 4px;
    }
    .item-btn{
        width: 100%;
        height: 42px;
        margin: 20px auto 0 auto;
        border-radius: 8px;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.15px;
    }
    .item-btn.disable{
        background: rgb(0, 0, 0, 0.35);
    }
}

</style>
