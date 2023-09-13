import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// lib-flexible
import "lib-flexible/flexible";

const app = createApp(App);

app.config.globalProperties.$utils = {
    _isMobile () {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag;
    }
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, { size: "small", zIndex: 3000 }).use(router).mount("#app");
