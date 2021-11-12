import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Unicon from "vue-unicons";
import { uniImageUpload, uniClipboard } from "vue-unicons/dist/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap";

Unicon.add([uniImageUpload, uniClipboard]);

createApp(App).use(router).use(Unicon).mount("#app");
