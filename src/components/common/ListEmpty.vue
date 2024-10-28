<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'

const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    size: {
        type: String,
        default: 'large',
    },
})
</script>

<template>
    <div class="list-empty" :class="size == 'small' ? 'small': '' ">
        <img src="@/assets/images/empty.png" />
        <p>{{ text }}</p>
    </div>
</template>

<style lang="scss" scope>
.list-empty{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    margin-top: 20px;
    p{
        width: 100%;
        text-align: center;
        color: rgba(0, 0, 0, 0.30);
        font-size: 16px;
        line-height: 19px;
        margin-top: 10px;
    }
    img{
        width: 30%;
    }
}
.list-empty.small{
    padding: 10px 0;
    img{
        width: 20%;
    }
}
</style>
