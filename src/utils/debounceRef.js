import { customRef } from "vue";

/**
 * @param {*} value 
 * @param {*} duration 
 * @returns 
 */
export function debounceRef(value, duration = 1000) {
    let timer;
    return customRef((track, trigger) => {
        return {
            get() {
                track();
                return value;
            },
            set(val) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    trigger();
                    value = val;
                }, duration);
            }
        }
    })
}

/*
example：
<template>
    <div class="container">
        <input v-model="text" />
        <p class="result">{{ text }}</p>
    </div>
</template>

<script setup>
import { debounceRef } from './debounceRef';
const text = debounceRef('', 500);
</script>
*/