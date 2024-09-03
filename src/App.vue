<template>
  <MainMenu @handle-menu-click="handleMenuClick"></MainMenu>
  
  <KeepAlive>
    <component :is="nameOfComponent"></component>
  </KeepAlive>
</template>

<script setup lang="ts">
import MainMenu from './components/MainMenu.vue'
import InputText from './components/InputText.vue'
import DateTimePicker from './components/DateTimePicker.vue';
import MultiSelect from './components/MultiSelect.vue';
import ApiTable from './components/ApiTable.vue';
import BigTable from './components/BigTable.vue';
import { shallowRef } from 'vue'
import type { Component } from 'vue'

const nameOfComponent = shallowRef<Component>(InputText);

function handleMenuClick(name: string) {
  switch(name) {
    case 'Link':
      nameOfComponent.value = InputText
      break;
    case 'DateTimePicker':
      nameOfComponent.value = DateTimePicker
      break;
    case 'Select':
      nameOfComponent.value = MultiSelect
      break;
    case 'API':
      nameOfComponent.value = ApiTable
      break;
    case 'Table':
      nameOfComponent.value = BigTable
      break;
  }
}
</script>


<style scoped>

</style>
