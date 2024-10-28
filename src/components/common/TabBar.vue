<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'

const props = defineProps({
  activeTabIndex: {
    type: Number,
    default: 0,
  },
})

const activeTab = ref(0);
const tabs = [
    { text: 'Home', route: '/home', activeIcon: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png', inactiveIcon: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png' },
    { text: 'Demo', route: '/demo', activeIcon: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png', inactiveIcon: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png' },
    { text: 'UserMiuuu', route: '/userMiuuu', activeIcon: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png', inactiveIcon: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png' },
    { text: 'Home', route: '/home', activeIcon: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png', inactiveIcon: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png' },
]

watch(
  () => [props.activeTabIndex],
    (newVal) => {
        if (newVal) {
        activeTab.value = newVal[0] as any
    }
  }
);

</script>

<template>
    <van-tabbar v-model="activeTab" active-color="#ee0a24">
        <van-tabbar-item v-for="(tab, index) in tabs" :key="index" replace :to="tab.route">
            <span>{{ tab.text }}</span>
            <template #icon="props">
                <img :src="props.active ? tab.activeIcon : tab.inactiveIcon" />
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<style lang="scss" scope>

</style>
