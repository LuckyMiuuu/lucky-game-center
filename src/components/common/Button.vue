<script setup lang="ts">
defineOptions({
  name: 'ButtonComponent'
})

defineProps({
    text: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
    disable: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'large',
    }
})

const emits = defineEmits(['click'])
function onClick() {
    emits("click");
}
</script>

<template>
    <div class="btn-box main-btn-bg-color" :class="{'small': size == 'small', 'large': size == 'large', 'max': size == 'max', 'main-bg-color3': disable}" @click="onClick">
        <img v-if="icon" :src="icon">
        <div>{{ text }}</div>
    </div>
</template>

<style lang="scss" scope>
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
.btn-box.large{
    padding: 15px 40px;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.1px;
    line-height: 20px;
}
.btn-box.max{
    width: 100%;
    padding: 15px 0;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.1px;
    line-height: 20px;
    text-align: center;
}
</style>
