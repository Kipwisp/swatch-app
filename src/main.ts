import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Unicon from "vue-unicons";
import emitter from "./utils/EventHandler";
import App from "./App.vue";
import router from "./router";
import {
  uniImageUpload,
  uniClipboard,
  uniTimes,
  uniUpload,
  uniEstate,
} from "vue-unicons/dist/icons";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap";

Unicon.add([uniImageUpload, uniClipboard, uniTimes, uniUpload, uniEstate]);

const app = createApp(App).use(router).use(Unicon).use(Toast);
app.config.globalProperties.$emitter = emitter;
app.mount("#app");

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $emitter: typeof emitter;
  }
}
