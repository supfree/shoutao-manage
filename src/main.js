import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./assets/js/request.js";
import utils from "./assets/js/utils.js";
// element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// lib-flexible
import "lib-flexible/flexible";
// animate
import "animate.css";
// i18n
import i18n from "./assets/lang/index.js";
// 引入字体样式
import "./assets/font/font.css";

const app = createApp(App);

// 工具类
app.config.globalProperties.$utils = utils;
// 封装axios
app.config.globalProperties.$axios = axios;
// 设置标题
router.beforeEach((to, from, next) => {
  // 重置位置
  window.scroll(0, 0);
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app
  .use(ElementPlus, { size: "small", zIndex: 3000 })
  .use(i18n)
  .use(router)
  .mount("#app");
