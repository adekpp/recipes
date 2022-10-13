<script setup>
import RecipesDropdown from "./RecipesDropdown.vue";
import LoginDropdown from "./LoginDropdown.vue";
import UserDropdown from "./UserDropdown.vue";
import MobileMenu from "./MobileMenu.vue";
import {
  BIconSearch,
  BIconList,
  BIconPersonCircle,
  BIconCaretDownFill,
} from "bootstrap-icons-vue";
import getUser from "../../composables/getUser";
import { useRouter } from "vue-router";
import googleIcon from "../../assets/googleIcon.svg";
import { ref } from "@vue/reactivity";
import { supabase } from "../../supabase/config";

const router = useRouter();
const { user } = getUser();
const searchValue = ref("");

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
};

const handleSearch = () => {
  if (searchValue.value) {
    router.push({
      name: "Search",
      params: { query: searchValue.value },
    });
    searchValue.value = "";
  }
};
</script>

<template>
  <div
    class="navbar sticky h-[50px] bg-white px-10 flex items-center place-content-between text-gray-900 mb-16 z-20 max-w-[1440px] mx-auto w-full"
  >
    <div class="absolute md:hidden right-[80px] -top-[12px]">
      <MobileMenu />
    </div>

    <div class="logo font-Playball font-semibold text-xl md:text-4xl min-w-fit">
      <router-link to="/">
        <h1 class="text-black text-xl">Delicious Recipes</h1>
      </router-link>
    </div>
    <nav class="hidden md:flex flex-row gap-x-10 text-md font-semibold mx-5">
      <router-link to="/">
        <p class="cursor-pointer">Homepage</p>
      </router-link>

      <RecipesDropdown />
    </nav>
    <div class="searchBox abolute top-[72px] right-[15px] md:right-[35px]">
      <input
        @keydown.enter="handleSearch"
        v-model="searchValue"
        class="searchInput"
        type="search"
        name=""
        placeholder="Search"
      />
      <button class="searchButton" href="#">
        <i class="material-icons"><BIconSearch /> </i>
      </button>
    </div>

    <div class="hidden md:flex items-center gap-x-2">
      <div v-if="user">
        <UserDropdown :user="user" />
      </div>
      <div v-if="!user" class="font-semibold">
        <LoginDropdown />
      </div>
    </div>
  </div>
</template>

<style>
.searchBox {
  position: absolute;
  right: 80px;
  background: #e8e8e8;
  height: 40px;
  border-radius: 40px;
  padding: 5px;
}

.searchBox:hover > .searchInput {
  width: 240px;
  padding: 0 6px;
}

.searchBox:hover > .searchButton {
  background: white;
  color: #e8e8e8;
}

.searchButton {
  color: white;
  float: right;
  width: 30px;
  height: 30px;
  border-radius: 60%;
  background: #7f7f7f;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.searchInput {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: #7f7f7f;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
}
</style>
