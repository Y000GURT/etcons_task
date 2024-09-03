<template>
    <nav class="menu">
        <button class="menu__button" @click="emit('handleMenuClick', 'Link')">Поле Link</button>
        <button class="menu__button" @click="emit('handleMenuClick', 'DateTimePicker')">DateTime Picker</button>
        <button class="menu__button" @click="emit('handleMenuClick', 'Select')">Select</button>
        <button class="menu__button" @click="emit('handleMenuClick', 'API')">API</button>
        <button class="menu__button" @click="emit('handleMenuClick', 'Table')">Таблица</button>
    </nav>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits<{
    handleMenuClick: [name: string]
}>()
</script>

<style scoped>
.menu {
    display: flex;
    justify-content: center;
    column-gap: 2rem;
}
.menu__button {
    outline: none;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: rgb(175, 218, 255);
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
}
.menu__button:hover {
    background-color: rgb(152, 207, 255);
    transform: scale(1.1)
}
</style>