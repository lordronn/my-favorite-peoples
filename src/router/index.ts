import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/peoples",
    name: "Peoples",
    component: () => import("@/views/PeoplesPage.vue"),
  },
  {
    path: "/peoples/:id",
    name: "PeoplesDetail",
    component: () => import("@/views/PeoplesDetailPage.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("@/views/FavoritesPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
