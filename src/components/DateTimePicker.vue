<template>
    <p class="time-value"> Значение переменной time: {{ timeValue }}</p>
    <Calendar class="calendar h-3rem" id="calendar-timeonly" v-model="time" timeOnly showButtonBar showIcon />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const time = ref<Date | null>(null);

const timeValue = computed(() => {
    if (!time.value) {return ''}
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    }
    return time.value.toLocaleTimeString('ru-RU', options)
})
</script>

<style>
.time-value {
    font-size: 1.5rem;
}

.p-datepicker {
    width: 100%;
}
.p-inputtext {
    font-size: 1.5rem !important;
}
.p-icon {
    width: 1.4rem !important;
    height: 1.4rem !important;
}
.p-datepicker-time-picker span {
    font-size: 1.4rem !important;
}
.p-button {
    font-size: 1.4rem !important;
}
</style>