import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/views/HomePage.vue"),
  },
  {
    path: "/peoples",
    name: "Peoples",
    component: () => import("@/components/views/PeoplesPage.vue"),
  },
  {
    path: "/peoples/:id",
    name: "PeoplesDetail",
    component: () => import("@/components/views/PeoplesDetailPage.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("@/components/views/FavoritesPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
