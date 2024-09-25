import { i18n } from "@/core/i18n"
import App from "@/views/Popup.vue"
import { createApp } from "vue"
// Global styles
import "@/style.css"

const app = createApp(App)
app.use(i18n)
app.mount("#app")
