<template>
    <MultiSelect v-model="selectedCities" :options="cities" placeholder="Select Cities" scrollHeight="300px">
        <template #header >
            <button v-if="selectedCities.length > 0" @click="clearSelect" class="clear">
                <span class="pi pi-times" style="font-size: 1.5rem"></span>
            </button>
        </template>
    </MultiSelect>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedCities = ref([]);
const cities = ref(['New York', 'Rome', 'London', 'Istanbul', 'Paris']);

function clearSelect()  {
    selectedCities.value = [];
};
</script>

<style>
.p-multiselect {
    width: 100%;
}
.p-multiselect-label-container {
    font-size: 1.5rem;
}
.p-multiselect-overlay {
    font-size: 1.5rem;
}
.clear {
    margin: 1rem 1rem 0;
    transition: all 0.3s ease;
}
.clear:hover {
    transform: scale(1.1);
}
</style>