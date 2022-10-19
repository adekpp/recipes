import { createApp } from "vue";
import { createPinia } from "pinia";
import { Toaster } from "@meforma/vue-toaster";
import App from "./App.vue";
import router from "./router/index";
import "./assets/main.css";
const pinia = createPinia();

createApp(App).use(router).use(Toaster).use(pinia).mount("#app");
