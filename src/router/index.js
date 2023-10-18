import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: '首页'
    },
    component: () =>
      import("../views/Home.vue"),
  },
  {
    path: "/live",
    name: "live",
    meta: {
      title: '直播'
    },
    component: () =>
      import("../views/Live.vue"),
  },
  {
    path: "/master",
    name: "master",
    meta: {
      title: '达人'
    },
    component: () =>
      import("../views/Master.vue"),
  },
  {
    path: "/join",
    name: "join",
    meta: {
      title: '加入我们'
    },
    component: () =>
      import("../views/Join.vue"),
  },
  {
    path: "/new",
    name: "new",
    meta: {
      title: '新闻中心'
    },
    component: () =>
      import("../views/New.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      title: '关于光生'
    },
    component: () =>
      import("../views/About.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () =>
      import("../views/Detail.vue"),
  },
  {
    path: "/artist",
    name: "artist",
    component: () =>
      import("../views/Artist.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import("../views/Search.vue"),
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
