/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createApp } from "vue";
import VueToast from "vue-toast-notification";
import mitt, { Emitter } from "mitt";
import App from "./App.vue";
import router from "./router";
import Account from "@verida/vue-account";

import "vue-toast-notification/dist/theme-sugar.css";
import "./assets/scss/main.scss";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $emitter: Emitter<any>;
  }
}
const emitter = mitt();

const app = createApp(App);

app.config.globalProperties.$emitter = emitter;

app.use(Account);

app.use(router);

app.use(VueToast, {
  position: "top",
});

app.mount("#app");
