<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { showToast } from 'vant';
import Clipboard from 'clipboard'
import { onInviteFriendToBoost } from '@/constants/index'
import Popup from '../common/Popup.vue';
import Button from '../common/Button.vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    canGetData: {
        type: Boolean,
        default: false
    },
    percent: {
        type: String,
        default: '0.00',
    },
    inviteLink: {
        type: String,
        required: true,
    },
    copyText: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['onClose', 'onAddressSubmit'])

const popupIsShow = ref(false)

onMounted(() => {
})

onUnmounted(() => {
    
})

watch(
    () => [props.show, props.canGetData, props.address], (newVal) => {
        if (newVal) {
            popupIsShow.value = newVal[0] as any
            inputAddress.value = newVal[2] as any;
            // if (newVal[1]) {
                
            // }
        }
    }
);

function onClose() {
    emits("onClose");
}

const fireLeft = computed(() => {
    return 276 * parseFloat(props.percent) / 100 - 13;
})

function onInvite() {
    onInviteFriendToBoost(props.inviteLink)
}

function onCopy() {
    if (!props.copyText) {
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


const inputAddress = ref('')
function onPopupSubmit() {
    if (!inputAddress.value) {
        return;
    }
    emits("onAddressSubmit", inputAddress.value);
}

function onAddressCopy() {
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

</script>

<template>
    <Popup
        :show="popupIsShow"
        title="Claim Guide"
        @on-close="onClose"
    >
        <div class="list-content hidden-scroll-bar">
            <div class="rewards-guide">
                <div class="rewards-progress">
                    <div class="rewards-progress-title">Your progress</div>
                    <div class="rewards-progress-value">{{percent}}% completed</div>
                    <div class="rewards-progress-out">
                        <div class="rewards-fire" :style="{ left: fireLeft + 'px' }">
                            <img src="@/assets/images/rewards_fire.png">
                        </div>
                        <div class="rewards-progress-in" :style="{ width: percent + '%' }"></div>
                    </div>
                </div>

                <div v-if="parseFloat(percent) >= 100" class="address-input-container">
                  <div class="popup-desc">USDT Reward will deliver from Polygon Chain, please make sure you submit the right address</div>
                  <div class="popup-input">
                      <input type="text" v-model="inputAddress" />
                      <div class="copy-icon" :data-clipboard-text="inputAddress" @click="onAddressCopy">
                          <img src="@/assets/images/icon_copy.png" />
                      </div>
                  </div>
                  <Button @click="onPopupSubmit" text="Submit" size="max" :style="{background: inputAddress ? '#FF398B' : 'rgba(0, 0, 0, 0.35)'}" />
                </div>

                <template v-else>
                    <div class="rewards-desc">
                        Just one step away from withdrawing! 
                        <br>
                        Invite friends to boost!
                    </div>
                    <div class="rewards-guide-step">
                        <div class="guide-item">
                            <img src="@/assets/images/rewards_share_icon.png">
                            <p>Share with Friends</p>
                        </div>
                        <div class="right-icon">
                            <img src="@/assets/images/rewards_right.png">
                        </div>
                        <div class="guide-item">
                            <img src="@/assets/images/rewards_game_icon.png">
                            <p>Friend Plays a Game</p>
                        </div>
                        <div class="right-icon">
                            <img src="@/assets/images/rewards_right.png">
                        </div>
                        <div class="guide-item">
                            <img src="@/assets/images/rewards_boost_icon.png">
                            <p>Boost Successful</p>
                        </div>
                    </div>

                    <div class="rewards-guide-operation">
                        <div class="invite-btn" @click=onInvite>Invite Friends to Boost</div>
                        <div class="copy-icon" :data-clipboard-text="copyText" @click="onCopy">
                            <img src="@/assets/images/rewards_copy.png" />
                        </div>
                    </div>
                </template>
                
            </div>
        </div>

    </Popup>
</template>

<style lang="scss" scoped>
.list-content{
    width: 100%;
    height: 300px;
    overflow-y: auto;
    .rewards-guide{
        width: 350px;
        margin: 0 auto;
        .rewards-progress{
            width: 100%;
            height: 67px;
            border-radius: 8px;
            border: 1px solid #FDEBF2;
            background: #FFF1F7;
            padding: 12px 6px;
            box-sizing: border-box;
            .rewards-progress-title{
                width: 100%;
                text-align: center;
                color: rgba(255, 57, 139, 0.50);
                font-size: 10px;
                font-weight: 400;
                line-height: normal;
            }
            .rewards-progress-value{
                width: 100%;
                text-align: center;
                color: #FF398B;
                font-size: 16px;
                font-weight: 600;
                line-height: normal;
            }
            .rewards-progress-out{
                width: 276px;
                height: 8px;
                border-radius: 4px;
                background: #CEBAC3;
                margin: 2px auto;
                position: relative;
                .rewards-progress-in{
                    width: 90%;
                    height: 100%;
                    border-radius: 4px;
                    background: #FF398B;
                }
                .rewards-fire{
                    width: 25px;
                    height: 39px;
                    position: absolute;
                    top: -33px;
                    left: calc(90% - 13px);
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .rewards-desc{
            width: 100%;
            color: rgba(0, 0, 0, 0.5);
            text-align: center;
            font-size: 12px;
            font-weight: 400;
            line-height: normal;
            margin: 20px 0;
        }
        .rewards-guide-step{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .right-icon{
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 100%;
                }
            }
            .guide-item{
                width: 90px;
                height: 72px;
                border-radius: 8px;
                border: 1px solid #FDEBF2;
                background: rgba(255, 241, 247, 0.50);
                display: flex;
                padding: 4px 2px;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                img{
                    width: 24px;
                    height: 24px;
                }
                p{
                    color: #000;
                    font-size: 12px;
                    font-weight: 600;
                    line-height: normal;
                    text-align: center;
                }
            }
        }
        .rewards-guide-operation{
            width: 100%;
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .invite-btn{
                width: 300px;
                height: 40px;
                border-radius: 8px;
                background: #FF398B;
                color: #FFF;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
                line-height: normal;
            }
            .copy-icon{
                width: 40px;
                height: 40px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        
        .address-input-container{
            width: 100%;
            padding-top: 20px;
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
    }
}

</style>
