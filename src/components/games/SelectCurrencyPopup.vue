<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Popup from '../common/Popup.vue';

const props = defineProps({
    show: {
        type: Boolean,
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

function onClose() {
    emits("onClose");
}


function onSend(costType: string) {
    emits("onSubmit", costType);
}


</script>

<template>
    <Popup 
        :show="popupIsShow" 
        title="Select Currency"
        @on-close="onClose"
    >
        <div class="list-content hidden-scroll-bar">
            <div class="icon"><img src="@/assets/images/select_currency.png"></div>
            <div class="btn btn-why" @click="onSend('why_1')">
                <div class="currency-detail">
                    <div class="currency-info">
                        <img src="@/assets/images/token/token_Why.png">
                        <p>WHY</p>
                    </div>
                    <div class="currency-desc">Start game with WHY tokens</div>
                </div>
                <img class="next-icon" src="@/assets/images/icon_code_next.png">
            </div>

            <div class="btn btn-miuuu" @click="onSend('miuuu_1')">
                <div class="currency-detail">
                    <div class="currency-info">
                        <img src="@/assets/images/token/token_miuuu.png">
                        <p>MIUUU</p>
                    </div>
                    <div class="currency-desc">Start game with MIUUU tokens</div>
                </div>
                <img class="next-icon" src="@/assets/images/icon_code_next.png">
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
.list-content{
    width: 100%;
    height: 300px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-color: #ffffff;
    .icon{
        width: 100%;
        padding: 0 0 20px 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 160px;
        }
    }
    .btn{
        width: 100%;
        height: 63px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .currency-detail{
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 4px;
            .currency-info{
                height: 24px;
                display: flex;
                align-items: center;
                img{
                    width: 24px;
                    height: 24px;
                    border-radius: 100%;
                }
                p{
                    font-size: 20px;
                    font-weight: 600;
                    color: #000;
                    padding-left: 4px;
                    line-height: 24px;
                }
            }
            .currency-desc{
                font-size: 12px;
                font-weight: 400;
                color: rgba(0,0,0,0.5);
                line-height: 15px;
            }
        }
        .next-icon{
            width: 20px;
            height: 20px;
        }
    }
    .btn.btn-why{
        background-color: rgba(254, 204, 73, 0.20);
    }
    .btn.btn-miuuu{
        background-color: rgba(255, 57, 139, 0.10);
        margin-top: 10px;
    }
    .close-btn{
        width: 60%;
        margin: 15px auto;
    }
}

.btn-box{
    width: auto;
    border-radius: 8px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    img{
        width: 24px;
        height: 24px;
    }
}

.btn-box.large{
    padding: 15px 40px;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.1px;
    line-height: 20px;
}
.btn-box-miuuu{
    background-color: #FD016A;
    color: #ffffff;
}
.btn-box-why{
    background-color: #FECC49;
    color: #ffffff;
}

</style>
