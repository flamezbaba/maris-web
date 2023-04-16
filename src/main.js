import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import SvgIcon from "vue3-icon";
import vClickOutside from "click-outside-vue3";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vClickOutside);
app.use(VueSweetalert2);
app.component("svg-icon", SvgIcon);

app.mount("#app");
