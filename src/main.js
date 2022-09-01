import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import router from "./router/index";
import "./assets/main.css";
import { auth } from "./firebase/index";
import { onAuthStateChanged } from "firebase/auth";
import { MotionPlugin } from "@vueuse/motion";

let app;
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).use(MotionPlugin).mount("#app");
  }
});
