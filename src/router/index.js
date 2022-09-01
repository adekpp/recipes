import { createRouter, createWebHistory } from "vue-router";
import HomeView from "/src/view/HomeView.vue";
import { auth } from "../firebase/index";

const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const authCheck = (to, from, next) => {
  let user = auth.currentUser;
  if (user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/add",
    name: "AddRecipe",
    component: () => import("../view/AddRecipeView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../view/LoginView.vue"),
    beforeEnter: authCheck,
  },
  {
    path: "/recipes/user",
    name: "MyRecipes",
    component: () => import("../view/MyRecipesView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/tag/:tagName",
    name: "Tag",
    component: () => import("../view/TagView.vue"),
  },
  {
    path: "/search/:query",
    name: "Search",
    component: () => import("../view/SearchResults.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
