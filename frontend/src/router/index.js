import Main from "../pages/MainPage.vue";
import NotFound from "../pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/RegisterPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../pages/SearchPage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/AboutPage.vue"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("../pages/RecipeViewPage.vue"),
  },
  {
  path: "/favorites",
  name: "favorites",
  component: () => import("../pages/FavoriteRecipesPage.vue"),
  },
  {
  path: "/my-recipes",
  name: "my-recipes",
  component: () => import("../pages/MyRecipesPage.vue"),
  },
  {
  path: "/family",
  name: "family",
  component: () => import("../pages/FamilyRecipesPage.vue"),
  },
  {
  path: "/create",
  name: "create",
  component: () => import("../pages/CreateRecipePage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFound,
  }
];

export default routes;
