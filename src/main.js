import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import router from "./router/index";
import "./assets/main.css";
import { supabase } from "./supabase/config";
createApp(App)
  .use(router)
  .mount("#app");
