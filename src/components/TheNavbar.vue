<template>
  <header
    class="sticky top-0 h-[50px] md:h-[32px] bg-primary z-50 px-4 shadow-md"
  >
    <div
      class="w-full flex mx-auto max-w-5xl place-content-between place-items-center h-full"
    >
      <div v-if="user" class="md:hidden">
        <Menu arrow placement="bottom">
          <button class="btn btn-circle btn-sm"><BIconList /></button>
          <template #content="{ close }">
            <ul @click="close" v-if="user" class="flex flex-col">
              <li class="md:hidden hover:text-secondary cursor-pointer">
                <router-link to="/">All recipes</router-link>
              </li>
              <li class="md:hidden hover:text-secondary cursor-pointer">
                <router-link to="/recipes/user">My recipes</router-link>
              </li>
              <li class="md:hidden hover:text-secondary cursor-pointer">
                <router-link to="/add">Add recipe</router-link>
              </li>
              <li
                class="md:hidden hover:text-secondary cursor-pointer line-through"
              >
                Favorites
              </li>
            </ul>
          </template>
        </Menu>
      </div>

      <router-link
        to="/"
        class="flex flex-row max-w-md md:w-auto items-center transition-all ease-in-out duration-300 z-50"
        :class="{
          'opacity-0 translate-y-1': targetIsVisible,
          'opacity-100 translate-y-0 drop-shadow-sm': !targetIsVisible,
        }"
      >
        <div class="text-red-500 font-bold md:text-md">delicious</div>
        <span class="font-bold md:text-md text-white">.</span>
        <div class="text-white font-bold md:text-md">recipes</div>
      </router-link>
      <router-link v-if="!user" to="/login">
        <button
          class="btn btn-sm bg-transparent border-0 hover:bg-transparent normal-case"
        >
          <BIconPersonCircle class="inline-block mr-1 text-xl" />
          <span>Login</span>
        </button>
      </router-link>
      <div v-else>
        <Menu arrow placement="bottom">
          <button
            class="btn btn-sm bg-transparent border-0 hover:bg-transparent normal-case"
          >
            <BIconPersonCircle class="inline-block mr-1 text-xl" />
            <span class="hidden md:inline-block">{{ user.email }} </span>
            <BIconCaretDownFill class="inline-block md:ml-2" />
          </button>
          <template #content="{ close }">
            <ul @click="close" v-if="user" class="flex flex-col">
              <li
                @click="handleLogout"
                class="hover:text-secondary cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </template>
        </Menu>
      </div>
    </div>
  </header>

  <div class="logo w-full bg-gray-800 py-4 px-2">
    <div
      class="w-full flex flex-row gap-x-6 max-w-5xl mx-auto place-content-between"
    >
      <router-link to="/" class="flex flex-row max-w-md md:w-auto text-2xl">
        <div ref="target" class="text-red-500 font-bold md:text-3xl">
          delicious
        </div>
        <span class="font-bold md:text-3xl text-white">.</span>
        <div class="text-white font-bold md:text-3xl">recipes</div>
      </router-link>

      <div
        class="hidden md:block text-gray-600 focus-within:text-gray-400 relative"
      >
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </span>
        <form @submit.prevent="handleSearch">
          <input
            v-model="searchQuery"
            type="search"
            class="py-2 text-sm min-w-[300px] text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="Search by #tags"
          />
          <button class="btn btn-sm ml-2 ">Search</button>
        </form>
      </div>
    </div>
  </div>

  <div
    v-if="user"
    class="w-full hidden md:block sticky top-[32px] z-40 bg-gray-700 py-4 px-2 shadow-md"
  >
    <div class="w-full flex flex-row max-w-5xl mx-auto place-content-center">
      <ul class="flex flex-row gap-x-4 place-content-center">
        <li class="hover:text-secondary cursor-pointer">
          <router-link to="/">All recipes</router-link>
        </li>
        <li class="hover:text-secondary cursor-pointer">
          <router-link to="/recipes/user">My recipes</router-link>
        </li>
        <li class="hover:text-secondary cursor-pointer">
          <router-link to="/add">Add recipe</router-link>
        </li>
        <li class="hover:text-secondary cursor-pointer line-through">
          Favorites
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  BIconSearch,
  BIconList,
  BIconPersonCircle,
  BIconCaretDownFill,
} from "bootstrap-icons-vue";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/index";
import googleIcon from "../assets/googleIcon.svg";
import Menu from "./Menu.vue";
import { useElementVisibility } from "@vueuse/core";
import { ref } from "@vue/reactivity";
import getCollection from "../composables/getCollection";

export default {
  components: {
    BIconSearch,
    BIconList,
    BIconPersonCircle,
    BIconCaretDownFill,

    Menu,
  },
  setup() {
    const { documents, isLoading, getCollectionRTL } = getCollection("recipes");
    const router = useRouter();
    const { user } = getUser();
    const target = ref(null);
    const targetIsVisible = useElementVisibility(target);
    const searchQuery = ref("");
    const handleLogout = async () => {
      await signOut(auth);
      router.push("/");
    };

    const handleSearch = () => {
      if (searchQuery.value) {
        router.push({ name: "Search", params: { query: searchQuery.value } });
        searchQuery.value = "";
      }
    };

    return {
      user,
      handleLogout,
      googleIcon,
      targetIsVisible,
      target,
      searchQuery,
      handleSearch,
      documents,
      isLoading,
    };
  },
};
</script>

<style></style>
