<template>
  <div class="container">
    <InputText 
      type="text" 
      placeholder="https://" 
      v-model="inputText" 
      :disabled="isDisabled"
      :invalid="isInputError"
      @keyup.enter="fetchTitle"
      @blur="fetchTitle">
    </InputText>

    <button class="edit" @click="editUrl">
      <span class="pi pi-pencil"></span>
    </button>
  </div>
  <span v-if="isLoading" class="pi pi-spin pi-spinner" style="font-size: 3rem;"></span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputText = ref<string | null>(null);
const cachedInputText = ref<string | null>(null);
const title = ref<string>('');
const isInputError = ref<boolean>(false);
const isDisabled = ref<boolean>(false);
const isEditing = ref<boolean>(false);
const isLoading = ref<boolean>(false);

async function fetchTitle() {
  if (!inputText.value) {return}

  isLoading.value = true;

  try {
    const response = await fetch(inputText.value)
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    title.value = doc.querySelector('title')?.textContent || 'No title found';

    cachedInputText.value = inputText.value
    inputText.value = title.value;
    isDisabled.value = true;
    isInputError.value = false;
    isEditing.value = false
  }
  catch (error) {
    console.error('Error fetching title:', error);
    title.value = 'Error fetching title';

    cachedInputText.value = inputText.value
    inputText.value = title.value;
    isDisabled.value = true;
    isEditing.value = false
    isInputError.value = true
  }
  finally {
    isLoading.value = false;
  }
}
function editUrl() {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    isDisabled.value = false
    inputText.value = cachedInputText.value
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  width: 100%;
}
.container > .p-inputtext {
  width: 100%;
  height: 3rem;
}

.edit {
  height: 3rem;
  width: 3rem;
  border: solid 1px rgb(197, 208, 219);
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;
}
.edit:hover {
  border: solid 1px rgb(104, 122, 145);
  transform: scale(1.1);
}
</style>