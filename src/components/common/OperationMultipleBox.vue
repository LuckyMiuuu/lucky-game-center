<script setup lang="ts">
import Button from '@/components/common/Button.vue'
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    desc: {
        type: String,
        default: '',
    },
    btnText: {
        type: String,
        default: 'Confirm',
    },
    btnIcon: {
        type: String,
        default: '',
    },
    btnDisable: {
        type: Boolean,
        default: false,
    },
    headText: {
        type: String,
        default: '',
    },
    small: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['onSubmit'])

function onSubmit() {
    emits("onSubmit");
}

</script>

<template>
    <div class="operation-box main-bg-color1" :class="small ? 'small' : ''">
        <div v-if="headText" class="head">{{ headText }}</div>
        <div class="title">{{ title }}</div>
        <!-- <pre class="desc">{{ desc }}</pre> -->
        <div class="desc" v-html="desc"></div>
        <slot></slot>
        <div class="btn">
            <Button @click="onSubmit" :text="btnText" :icon="btnIcon" :disable="btnDisable" size="small" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.operation-box{
    width: 100%;
    margin: 0 auto;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    .head{
        width: fit-content;
        width: -webkit-fit-content;
        height: 32px;
        border-radius: 16px;
        border: 2px #FF398B solid;
        padding: 0 10px;
        display: flex;
        align-items: center;
        color: #FF398B;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.1px;
        margin: 0 auto 20px auto;
    }
    .title{
        color: #000;
        text-align: center;
        font-size: 18px;
        font-weight: 590;
        line-height: 22px;
    }
    .desc{
        color: rgb(0, 0, 0, 0.5);
        text-align: center;
        font-size: 12px;
        line-height: 15px;
        margin-top: 4px;
        white-space: pre-wrap;
    }
    .btn{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.operation-box.small{
    width: calc(100% - 8px);
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
.btn-box.small{
    padding: 12px 16px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.15px;
    line-height: 18px;
}
</style>
