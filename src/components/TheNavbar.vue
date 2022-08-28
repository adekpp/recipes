<template>
  <header
    class="w-full bg-primary flex place-content-center md:place-content-between px-2 py-3 flex-wrap items-center"
  >
    <router-link to="/" class="flex flex-row max-w-md md:w-auto text-2xl">
      <div class="text-red-500 font-bold md:text-3xl">delicious</div>
      <span class="font-bold md:text-3xl text-white">.</span>
      <div class="text-white font-bold md:text-3xl">recipes</div>
    </router-link>

    <div
      class="mx-auto flex w-xs max-w-md md:max-w-xs items-center w-full place-content-center lg:place-content-start py-3"
    >
      <label className="relative text-gray-600 focus-within:text-white block">
        <BIconSearch
          class="z-50 absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none"
        />

        <input
          type="text"
          placeholder="Search"
          class="input input-sm w-full min-w-sm z-10 pl-8"
        />
      </label>
    </div>

    <ul
      v-if="user"
      class="hidden lg:flex flex-row gap-x-3 mt-3 lg:mt-0 w-full lg:w-auto place-content-center"
    >
      <li class="hover:text-secondary cursor-pointer">
        <router-link to="/">All recipes</router-link>
      </li>
      <li class="hover:text-secondary cursor-pointer">
        <router-link to="/recipes/user">My recipes</router-link>
      </li>
      <li class="hover:text-secondary cursor-pointer">
        <router-link to="/add">Add recipe</router-link>
      </li>
      <li class="hover:text-secondary cursor-pointer">Favorites</li>
    </ul>
    <button
      v-if="user"
      @click="handleLogout"
      class="hidden lg:static btn btn-sm btn-secondary lg:flex flex-row place-items-center ml-3 bg-secondary px-2 py-1 rounded-md hover:bg-secondary-focus"
    >
      Logout
    </button>
    <router-link to="/login">
      <button
        class="hidden md:block absolute top-6 right-2 btn btn-sm btn-secondary place-items-center gap-1 bg-secondary px-4 py-1 rounded-md hover:bg-secondary-focus"
        v-if="!user"
      >
        Login
      </button>
    </router-link>

    <router-link to="/login">
      <button
        v-if="!user"
        class="block md:hidden absolute top-1 right-1 btn btn-xs btn-secondary place-items-center gap-1 bg-secondary px-2 py-1 rounded-md hover:bg-secondary-focus"
      >
        Login
      </button>
    </router-link>

    <div v-if="user" class="absolute top-2 right-1 lg:hidden">
      <Menu>
        <ul class="flex flex-col gap-y-3">
          <li class="hover:text-primary cursor-pointer">
            <router-link to="/">All recipes</router-link>
          </li>
          <li class="hover:text-primary cursor-pointer">
            <router-link to="/recipes/user">My recipes</router-link>
          </li>
          <li class="hover:text-primary cursor-pointer">
            <router-link to="/add">Add recipe</router-link>
          </li>
          <li class="hover:text-primary cursor-pointer">Favorites</li>
          <div class="divide-x-0"></div>
          <li @click="handleLogout" class="cursor-pointer hover:text-primary">
            Logout
          </li>
        </ul>
      </Menu>
    </div>
  </header>
</template>

<script>
import Menu from "../components/Menu.vue";

import { BIconSearch, BIconList } from "bootstrap-icons-vue";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/index";
import googleIcon from "../assets/googleIcon.svg";
import { onMounted } from '@vue/runtime-core';

export default {
  components: {
    BIconSearch,
    BIconList,
    Menu,
  },
  setup() {
    const router = useRouter();
    const { user } = getUser();

    const handleLogout = async () => {
      await signOut(auth);
      router.push("/");
    };


    return {
      user,
      handleLogout,
      googleIcon,
    };
  },
};
</script>

<style>
.router-link-active {
  color: rgb(21 128 61);
}
</style>
