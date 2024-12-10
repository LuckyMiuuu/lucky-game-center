<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { showToast } from 'vant';
import { type UserProp } from '@/models';
import Popup from '../common/Popup.vue';

interface UserPropOperationProp{
    show: Boolean,
    userProp?: UserProp
}

const props = defineProps<UserPropOperationProp>()

const emits = defineEmits(['onClose', 'onSubmit'])

const popupIsShow = ref(false)
const curUserProp = ref<UserProp>()

onMounted(() => {
    
})

watch(() => [props.show, props.userProp],
    (newVal) => {
        if (newVal) {
            popupIsShow.value = newVal[0] as any
            curUserProp.value = newVal[1] as any;
        }
    }
);

function onPopupSubmit() {
    emits("onSubmit", curUserProp.value);
}


function onClose() {
    emits("onClose");
}

function jumpToShopMall(url: string) {
    // window.open('https://rewards.ultiverse.io/store?projectId=lucky-miuuu', '_blank')
   url && window.open(url, '_blank')
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
                <img :src="curUserProp?.img">
            </div>
            <div class="item-detail">
                <div class="item-name ellipsis1">{{ curUserProp?.name }}</div>
                <div v-if="curUserProp?.has" class="item-expire">{{ curUserProp.expire_text }}</div>
                <!--
                <div v-if="curUserProp!.id < 100" class="item-desc">
                    Discover the magic! 
                    <br>
                    This {{ curUserProp?.name }} can boosts your Miuuu points by 10% for 7 enchanting days!
                    <br>
                    <br>
                    You can buy it from
                    <br>
                    <span @click="jumpToShopMall">Game Summer Shopmall</span>
                </div>
                -->
                <div v-if="curUserProp!.id < 100" class="item-desc">
                    <pre>{{ curUserProp?.desc }}</pre>
                    <br>
                    <br>
                    <div v-if="curUserProp?.jump_url">
                        You can buy it from
                        <br>
                        <span @click="jumpToShopMall(curUserProp?.jump_url)">Game Summer Shopmall</span>
                    </div>
                </div>
            </div>
            

            <!-- <div class="item-price">4,000 MIUUU</div>
            
            <div class="item-btn" @click="onPopupSubmit">Buy Now</div> -->
            
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
.list-content{
    width: 100%;
    // padding: 16px 20px;
    box-sizing: border-box;
    .item-img{
        // width: 120px;
        // height: 100px;
        width: calc(100% + 40px);
        margin-left: -20px;
        position: relative;
        line-height: 0;
        img{
            width: 100%;
            // height: 100%;
        }
    }
    .item-detail{
        width: 100%;
        padding: 36px 20px;
        box-sizing: border-box;
        .item-name{
            width: 100%;
            color: #000;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            line-height: 24px;
        }
        .item-expire{
            width: fit-content;
            height: 19px;
            border-radius: 9.5px;
            background: #FFDEEC;
            color: #FF398B;
            font-size: 12px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 6px;
            margin: 4px auto 8px auto;
        }

        .item-desc{
            color: rgb(0, 0, 0, 0.5);
            text-align: center;
            font-size: 12px;
            font-weight: 400;
            line-height: 15px;
            margin-top: 12px;
            pre{
                white-space: pre-wrap;
                word-break: break-all;
            }
            span{
                font-weight: 600;
                color: #000;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .item-price{
            width: 100%;
            height: 35px;
            border-radius: 8px;
            background: #FFDEEC;
            color: #FF398B;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
        }
        .item-input{
            width: 100%;
            height: 35px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            border: 1px solid rgba(0, 0, 0, 0.10);
            input{
                width: 100%;
                height: 15px;
                border: none;
                padding: 0 8px;
                box-sizing: border-box;
                // color: rgb(0, 0, 0, 0.5);
                color: #000;
                font-size: 12px;
                font-weight: 400;
                line-height: 15px;
                text-align: center;

            }
            input:focus{
                border: none;
                outline: none;
            }
        }
        .item-btn{
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
        .item-btn.disable{
            background: rgb(0, 0, 0, 0.35);
        }
    }
    
}

</style>
