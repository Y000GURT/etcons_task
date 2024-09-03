<template>
    <DataTable 
        ref="dt" 
        :value="searchedProducts" 
        v-model:selection="selectedProducts" 
        dataKey="id"
        :paginator="true" 
        :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
        :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">

        <template #header>
            <div class="flex align-items-center justify-content-between">
                <InputGroup class="w-8">
                    <Button icon="pi pi-sliders-v" @click="toggleMultiSelect" aria-haspopup="true" aria-controls="overlay_menu"></Button>
                    <MultiSelect class="mr-2"v-show="showMultiSelect" display="chip" v-model="selectedColumnsForSearch" :options="Columns" placeholder="Поля для поиска" :showToggleAll="false" :selectAll="true"/>

                    <InputText v-model="inputSearch" @keyup.enter="handleInputSearch" placeholder="Поиск..." />

                    <Button v-if="inputSearch.length !== 0" icon="pi pi-times" @click="clearInputSearch"></Button>
                    <Button label="Search" severity="info" @click="handleInputSearch"></Button>
                </InputGroup>

                <MultiSelect class="w-2" v-model="selectedColumns" placeholder="Поля таблицы" :options="Columns" :showToggleAll="false" :selectAll="true" >
                </MultiSelect>
            </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>

        <Column v-if="selectedColumns.includes('code')" field="code" header="Code" sortable style="min-width:12rem"></Column>

        <Column v-if="selectedColumns.includes('name')" field="name" header="Name" sortable style="min-width:16rem"></Column>

        <Column v-if="selectedColumns.includes('image')" header="Image">
            <template #body="slotProps">
                <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="border-round" style="width: 64px" />
            </template>
        </Column>

        <Column v-if="selectedColumns.includes('price')" field="price" header="Price" sortable style="min-width:8rem">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.price)}}
            </template>
        </Column>

        <Column v-if="selectedColumns.includes('category')" field="category" header="Category" sortable style="min-width:10rem"></Column>

        <Column v-if="selectedColumns.includes('rating')" field="rating" header="Reviews" sortable style="min-width:12rem">
            <template #body="slotProps">
                <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
            </template>
        </Column>

        <Column v-if="selectedColumns.includes('inventoryStatus')" field="inventoryStatus" header="Status" sortable style="min-width:12rem">
            <template #body="slotProps">
                <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
            </template>
        </Column>
    </DataTable>

</template>

<script setup lang="ts">
import { productsData } from '../API/products';
import { onMounted, ref } from 'vue';
import IProducts from '../models/IProducts';

const products = ref<IProducts[]>([]);
const selectedProducts = ref<IProducts[]>([]);
const Columns = ['code', 'name', 'image', 'price', 'category', 'rating', 'inventoryStatus'];
const selectedColumns = ref<string[]>(Columns);
const inputSearch = ref<string>('');
const searchedProducts = ref<IProducts[]>([]);
const showMultiSelect = ref<boolean>(false);
const selectedColumnsForSearch = ref<string[]>(Columns)

onMounted(() => {
    productsData.getProducts().then(data => {
        products.value = data
        searchedProducts.value = data
    })
})
function handleInputSearch() {
    if (inputSearch.value === '') { return }
    
    searchedProducts.value = products.value.filter((product) => {
        for (let value of Object.keys(product) as (keyof IProducts)[]) {

            // существуте ли текст поиска в данном продукте
            const productInSearchedProducts = product[value].toString().toLowerCase().includes(inputSearch.value.toLowerCase())

            // отсекаем столбцы, которые отключили в таблице, и смотрим столбцы, по которым пользователь ведет поиск, 
            // и плюс убираем поиск по ключу image
            const isValidColumns = selectedColumns.value.includes(value) && selectedColumnsForSearch.value.includes(value) && value !== 'image'

            if (isValidColumns) {
                if (productInSearchedProducts) { 
                    return true 
                }
            }
            else { continue }
        }
    })
}
function clearInputSearch() {
    searchedProducts.value = products.value
    inputSearch.value = '';
}
function formatCurrency(value: number) {
    if(value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    return;
}
function toggleMultiSelect() {
    showMultiSelect.value = !showMultiSelect.value;

};
function getStatusLabel(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return undefined;
    }
}
</script>

<style scoped>

</style>