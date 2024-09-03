<template>
    <DataTable :value="products" tableStyle="min-width: 50rem" showGridlines>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name">
            <template #body="slotProps">
                <ul v-if="slotProps.index === 1">
                    <li v-for="item in dateArray" :key="item"> {{ item }} </li>
                </ul>
                <div v-else>
                    {{ slotProps.data.name }}
                </div>
            </template>
        </Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
    </DataTable>
</template>

<script setup lang="ts">
import { someString } from '../API/someString';
import { computed, onMounted, ref } from 'vue'

const date = ref<string>('')

const dateArray = computed(() => {
    if (!date.value) {return ''}
    return date.value.match(/(\[\d{2}:\d{2}:\d{2}\]\s[^[]+)/g)
})

const products = ref([
    { code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: 24 },
    { code: 'nvklal433', name: 'Black Watch', category: 'Accessories', quantity: 25 },
    { code: 'zz21cz3c1', name: 'Blue Band', category: 'Fitness', quantity: 23 },
    { code: '244wgera2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 35 },
    { code: 'h456wer53', name: 'Bracelet', category: 'Accessories', quantity: 14 },
]);

onMounted(() => {
    date.value = someString
})
</script>

<style >
.p-datatable {
    width: 100%;
    font-size: 1.5rem;
}
ul {
    list-style-type: none;
}
</style>