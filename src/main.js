import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index.js";
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const pinia = createPinia();
library.add(faCartShopping);

createApp(App).use(router).use(pinia).component('font-awesome-icon', FontAwesomeIcon).mount('#app');