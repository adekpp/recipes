import { createRouter, createWebHistory, useRoute } from "vue-router";
import HomeView from "/src/view/HomeView.vue";
import NotFound from "/src/view/NotFound.vue";
import getUser from "../composables/getUser";
const { user } = getUser();

const requireAuth = (to, from, next) => {
  if (!user.value) {
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
    path: "/recipes/:id",
    name: "RecipeDetails",
    component: () => import("../view/RecipeDetails.vue"),
  },

  {
    path: "/add",
    name: "AddRecipe",
    component: () => import("../view/AddRecipeView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/allrecipes",
    name: "AllRecipes",
    component: () => import("../view/AllRecipesView.vue"),
    // beforeEnter: requireAuth,
  },
  {
    path: "/tag/:tag",
    name: "Tag",
    component: () => import("../view/TagView.vue"),
  },
  {
    path: "/search/:query",
    name: "Search",
    component: () => import("../view/SearchResults.vue"),
  },
  { path: "/:pathMatch(.*)", name: "NotFound", component: NotFound },
];
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(),
  routes,
});
export default router;
