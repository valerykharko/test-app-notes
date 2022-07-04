import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/:id",
    name: "notePage",
    component: () => import("@/pages/PersonalPage"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
