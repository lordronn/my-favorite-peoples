import App from "@/App.vue";
import "@/assets/styles.css";
import router from "@/router";
import store from "@/store";
import { createApp } from "vue";

const appVue = createApp(App);

appVue.use(store);
appVue.use(router);
appVue.mount("#app");
