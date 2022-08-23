import { createRouter, createWebHistory } from "vue-router";
import HomeView from "/src/view/HomeView.vue";
import AddRecipeView from '/src/view/AddRecipeView.vue'
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: '/add',
    name: 'AddRecipe',
    component: AddRecipeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('../view/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import ('../view/SignupView.vue')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
