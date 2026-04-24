import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { FrappeUI } from "frappe-ui";
let app = createApp(App);
app.use(FrappeUI);
app.mount("#app");
