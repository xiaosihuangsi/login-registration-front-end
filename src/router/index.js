import Vue from "vue";
import VueRouter from "vue-router";
import Web from "../views/Web/index.vue";
import Products from '../views/Products.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';

// Register the VueRouter plugin with Vue
Vue.use(VueRouter);

// Define route configurations
const routes = [
  {
    path: "/",
    name: "home",
    component: Web,
  },
  {
    path: "/login",
    name: "Login",
    // Route level code-splitting
    // This generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      blank: (resolve) => require(["../views/Login"], resolve),
    },
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
];

// Create a new VueRouter instance with the specified options
const router = new VueRouter({
  mode: "history", // Use HTML5 History API for routing
  base: process.env.BASE_URL, // The base URL for the app
  routes, // The route configurations defined above
});

export default router;
