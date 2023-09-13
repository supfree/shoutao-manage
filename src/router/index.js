import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import("../views/Home.vue"),
  },
  {
    path: "/live",
    name: "live",
    component: () =>
      import("../views/Live.vue"),
  },
  {
    path: "/master",
    name: "master",
    component: () =>
      import("../views/Master.vue"),
  },
  {
    path: "/join",
    name: "join",
    component: () =>
      import("../views/Join.vue"),
  },
  {
    path: "/new",
    name: "new",
    component: () =>
      import("../views/New.vue"),
  },
  {
    path: "/about",
    name: "about",
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
