import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import lara from '@primevue/themes/lara';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Calendar from 'primevue/calendar';
import Menu from 'primevue/menu';
import Checkbox from 'primevue/checkbox';
import './style.css'

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: lara,
        options: {
            prefix: 'p',
            darkModeSelector: 'false',
            cssLayer: false
        }
    }
})

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Tag', Tag)
app.component('Rating', Rating)
app.component('Button', Button)
app.component('MultiSelect', MultiSelect)
app.component('InputText', InputText)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('Calendar', Calendar)
app.component('Menu', Menu)
app.component('Checkbox', Checkbox)

app.mount('#app')
