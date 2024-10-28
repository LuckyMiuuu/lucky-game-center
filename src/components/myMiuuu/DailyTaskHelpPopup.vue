<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Popup from '../common/Popup.vue';

interface DailyTaskHelpPopupProp{
    show: Boolean,
}

const props = defineProps<DailyTaskHelpPopupProp>()

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

</script>

<template>
    <Popup 
        :show="popupIsShow"
        title="Daily Check-in Points Rules"
        @on-close="onClose"
    >
        <div class="help-content">
            <div class="img">
                <img src="@/assets/images/fire.png">
            </div>
            
            <div class="desc">
                On the initial day, users will receive a base score of <span>50 Miuuu</span>. Subsequently, for each consecutive day of check-ins, <span>an additional 10 points</span> will be added daily. 60 Miuuu for the second day, 70 Miuuu for the third day, and so on.
                <br>
                <br>
                If a user fails  to maintain the streak of consecutive check-ins, the points will reset to 50 Miuuu upon the next check-in, and accumulation will start over from there.
            </div>
            
            <div class="btn" @click="onClose">Ok, got it!</div>
            
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
.help-content{
    width: 100%;
    padding-bottom: 20px;
    box-sizing: border-box;
    .img{
        width: 96px;
        height: 104px;
        margin: 0 auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .desc{
        width: 100%;
        color: rgba(0, 0, 0,.5);
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        line-height: normal;
        margin: 20px 0;
        span{
            font-weight: 800
        }
    }
    .btn{
        width: fit-content;
        margin: 20px auto 0 auto;
        border-radius: 8px;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
        padding: 12px 16px;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.15px;
        line-height: 18px;
    }
}

</style>
