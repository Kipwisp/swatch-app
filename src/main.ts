import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Unicon from "vue-unicons";
import { uniImageUpload } from "vue-unicons/dist/icons";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Unicon.add([uniImageUpload]);

createApp(App).use(router).use(Unicon).mount("#app");
