<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { showSuccessToast, showFailToast, showToast } from 'vant';
import { secondsToHMS } from '@/utils/js-helpers'
import { getProps, getUserProps, exchangeProp } from '@/api/index'
import type { UserProp } from '@/models'
import ListEmpty from '@/components/common/ListEmpty.vue'
import Popup from '../common/Popup.vue';
import UserPropOperationPopup from '@/components/myMiuuu/UserPropOperationPopup.vue';

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
                userPropList.value.length <= 0 && getUserPropList()
            }
        }
    }
);

function onClose() {
    emits("onClose");
}



const userPropLoaidng = ref(false)
const userPropList = ref<Array<UserProp>>([])
function getUserPropList() {
    if (userPropLoaidng.value) {
        return
    }
    userPropLoaidng.value = true

    getProps().then((rsp: any) => {
        if (rsp.data && rsp.data.objects && rsp.data.objects.length > 0) {
            const totalProps = rsp.data.objects
            totalProps.forEach((element: any) => { 
                element.has = false
                element.valid_time = ''
                element.expire_text = ''
            })
            getUserProps().then((userRsp: any) => {
                userPropLoaidng.value = false
                if (userRsp.data && userRsp.data.objects && userRsp.data.objects.length > 0) {
                    const userProps = userRsp.data.objects

                    totalProps.forEach((element: any) => {
                        userProps.forEach((userItem: any) => {
                            if (element.id == userItem.prop.id) {
                                element.has = true
                                element.valid_time = userItem.valid_time
                                const timestamp = new Date(userItem.valid_time).getTime()
                                const diffTimestamp = timestamp - new Date().getTime()
                                if (diffTimestamp <= 0) {
                                  element.expire_text = element.type ? 'expired' : 'Long-term validity'
                                } else {
                                  const hms = secondsToHMS(Math.floor(diffTimestamp / 1000))
                                  element.expire_text = element.type ? `Expires in ${hms.hours}h ${hms.minutes}mins` : 'Long-term validity'
                                }
                                
                            }
                        });
                    });
                    
                }

                const tempProp = {
                    id: 100,
                    name: 'Why Moon Dazzler',
                    img: new URL('@/assets/images/item_1.png', import.meta.url).href,
                    price: 100,
                    type: 1,
                    has: true,
                    expire_text: 'coming soon'
                }

                userPropList.value = [...totalProps, tempProp]

            }).catch((error) => {
                userPropLoaidng.value = false
                userPropList.value = []
            })

        } else {
            userPropLoaidng.value = false
            userPropList.value = []
        }
    }).catch((error) => {
        userPropLoaidng.value = false
        userPropList.value = []
    })


    

    // const list = [
    //     {
    //         id: 1,
    //         name: 'Wet Cat Food #1',
    //         img: new URL('@/assets/images/daoju1.png', import.meta.url).href,
    //         price: 100,
    //         type: 1,
    //         has: true,
    //         expire_text: 'Long-term validity'
    //     },
    //     {
    //         id: 2,
    //         name: 'Wet Cat Food #2',
    //         img: new URL('@/assets/images/daoju2.png', import.meta.url).href,
    //         price: 200,
    //         type: 1,
    //         has: false,
    //         expire_text: 'Long-term validity'
    //     },
    //     {
    //         id: 3,
    //         name: 'Wet Cat Food #3',
    //         img: new URL('@/assets/images/daoju1.png', import.meta.url).href,
    //         price: 300,
    //         type: 1,
    //         has: true,
    //         expire_text: 'Long-term validity'
    //     },
    // ]
    // userPropList.value = [...list]
    // userPropLoaidng.value = false
}

const inputCode = ref('')
const userPropIsExchanging = ref(false)
function onExchangeSend() {
    if (!inputCode.value) {
        return
    }

    if (userPropIsExchanging.value) {
        return
    }

    userPropIsExchanging.value = true

    exchangeProp(JSON.stringify({code: inputCode.value})).then((rsp: any) => {
        userPropIsExchanging.value = false
        if (rsp.code == 0) {
            inputCode.value = ''
            showSuccessToast('Redeem successfully');
            getUserPropList()
        } else {
            showFailToast('Redeem faild')
        }
    }).catch((error) => {
        userPropIsExchanging.value = false
        showFailToast('Redeem faild')
    })
}

const curUserProp = ref<UserProp>()
function onUserProp(item: UserProp) {
    curUserProp.value = item
    onUserPropOperationPopupShow()
}
const userPropOpertaionPopupShow = ref(false)
function onUserPropOperationPopupShow() {
    userPropOpertaionPopupShow.value = true
}
function onUserPropOperationPopupHide() {
    userPropOpertaionPopupShow.value = false
}

const userPropIsBuying = ref(false)
function onBuySend(item: UserProp) {
    console.log(item.name)

    if (userPropIsBuying.value) {
        return
    }

    userPropIsBuying.value = true

    // exchangeProp(JSON.stringify({"id": item.id, code: code})).then((rsp: any) => {
    //     userPropIsBuying.value = false
    //     if (rsp.code == 0) {
    //         onMiuuuItemOperationPopupHide()
    //         showSuccessToast('Redeem successfully');
    //         emits("refreshList");
    //     } else {
    //         showFailToast('Redeem faild')
    //     }
    // }).catch((error) => {
    //     userPropIsBuying.value = false
    //     showFailToast('Redeem faild')
    // })

    setTimeout(() => {
        userPropIsBuying.value = false
        onUserPropOperationPopupHide()
        showSuccessToast('Redeem successfully');
        getUserPropList()
    }, 2000);
}

</script>

<template>
    <Popup
        :show="popupIsShow"
        title="My Store"
        @on-close="onClose"
    >
        <div class="list-content">
            <div class="code-input">
                <div class="code-icon-left">
                    <img src="@/assets/images/icon_code.png" >
                </div>
                <input type="text" v-model="inputCode" placeholder="Enter the code to redeem the game item" />
                <div class="code-icon-right" @click="onExchangeSend">
                    <img src="@/assets/images/icon_code_next.png" >
                </div>
            </div>

            <div class="content-view hidden-scroll-bar">
                <ListEmpty v-if="userPropList.length <= 0" text="No data yet" />
                <div v-else class="props-list">
                    <van-grid :border="false" :column-num="2" :gutter="0">
                        <van-grid-item v-for="(item,index) in userPropList" :key="index">
                            <div class="item-box" @click="onUserProp(item)">
                                <div class="icon">
                                    <img :src="item.img">
                                </div>
                                <div class="name ellipsis1">{{ item.name }}</div>
                                <div v-if="item.has" class="expire ellipsis1">{{ item.expire_text }}</div>
                                <div v-else class="buy">Not obtained</div>
                            </div>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>

            <UserPropOperationPopup 
                :show="userPropOpertaionPopupShow" 
                :user-prop="curUserProp" 
                @on-close="onUserPropOperationPopupHide"
                @on-submit="onBuySend"
            />
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
.list-content{
    width: 100%;
    height: 474px;
}

.code-input{
    width: 100%;
    height: 42px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.10);
    overflow: hidden;
    .code-icon-left{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 24px;
            height: 24px;
        }
    }
    .code-icon-right{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img{
            width: 16px;
            height: 16px;
        }
    }
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

    }
    input:focus{
        border: none;
        outline: none;
    }
}

.content-view{
    width: 100%;
    height: 392px;
    padding: 0;
    box-sizing: border-box;
    overflow-y: auto;
    .props-list{
        width: 100%;
        padding-bottom: 30px;
    }
}

:deep(.van-grid-item){
    padding-bottom: 10px;
}

:deep(.van-grid .van-grid-item:nth-child(odd)) {
  padding-right: 5px;
}

:deep(.van-grid .van-grid-item:nth-child(even)) {
  padding-left: 5px;
}


:deep(.van-grid-item__content){
    padding: 0;
}

.item-box{
    width: 100%;
    padding: 16px 10px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px rgba(0, 0, 0, 0.10) solid;
    cursor: pointer;
    .icon{
        width: 120px;
        height: 100px;
        margin: 0 auto;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .name{
        width: 140px;
        color: #000;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        line-height: 19px;
        margin-top: 12px;
    }
    .expire{
        max-width: 100%;
        width: fit-content;
        height: 19px;
        border-radius: 9.5px;
        background: #FFDEEC;
        color: #FF398B;
        text-align: center;
        font-size: 12px;
        font-weight: 500;
        margin: 0 auto;
        margin-top: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 6px;
    }
    .buy{
        max-width: 100%;
        width: fit-content;
        height: 19px;
        border-radius: 9.5px;
        border: 1px rgba(0, 0, 0, 0.5) solid;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
        font-size: 12px;
        font-weight: 500;
        margin: 0 auto;
        margin-top: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 6px;
    }

}

</style>
