<script setup>
import { Slide } from "vue3-burger-menu";
import { useLogin } from "../../composables/useLogin";
import getUser from "../../composables/getUser";
import {
  BIconHouseDoor,
  BIconFileEarmarkPlus,
  BIconBinoculars,
} from "bootstrap-icons-vue";
import { supabase } from "../../supabase/config";
const { user } = getUser();

const { isLoading, login } = useLogin();
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
};
</script>

<template>
  <Slide :right="true" :noOverlay="true" :closeOnNavigation="true">
    <div v-if="user" class="flex flex-row items-center">
      <div class="avatar">
        <div class="w-8 rounded-full ring ring-[#FFD7C9] ring-offset-2">
          <img :src="user.user_metadata.avatar_url" />
        </div>
      </div>
    </div>
    <router-link to="/">
      <p class="inline-flex items-center gap-x-2">
        <BIconHouseDoor />Home
      </p></router-link
    >
    <router-link to="/add">
      <p class="inline-flex items-center gap-x-2 whitespace-nowrap">
        <BIconFileEarmarkPlus />Add recipe
      </p></router-link
    >
    <router-link to="/allrecipes">
      <p class="inline-flex items-center gap-x-2 whitespace-nowrap">
        <BIconBinoculars />Browse recipes
      </p></router-link
    >
    <div v-if="!user" class="flex flex-col gap-y-3">
      <h1 class="font-Title block whitespace-nowrap text-sm">Login with:</h1>
      <div
        @click="login('facebook')"
        class="flex flex-row items-center text-sm cursor-pointer"
      >
        <img
          class="w-7 h-7 -ml-[9px]"
          src="../../assets/facebookIcon.svg"
          alt=""
        />
        <p>Facebook</p>
      </div>
      <div
        @click="login('google')"
        class="flex flex-row items-center text-sm cursor-pointer"
      >
        <img
          class="w-5 h-5 mr-1 -ml-[5px]"
          src="../../assets/googleIcon.svg"
          alt=""
        />
        <p>Google</p>
      </div>
    </div>
    <div v-if="user" class="flex flex-col gap-y-3">
      <button
        @click.prevent="handleLogout()"
        class="inline-flex w-full justify-center items-center bg-[#FF642F] px-4 py-1 text-white font-normal hover:bg-[#fd5a23] active:scale-95 max-w-sm"
      >
        Logout
      </button>
    </div>
  </Slide>
</template>
<style>
.bm-burger-button {
  position: absolute;
  width: 22px !important;
  height: 17px !important;
  right: 10px;
  top: 36px;
  cursor: pointer;
}

.bm-burger-bars {
  background-color: #000000;
}

.bm-menu {
  height: 100vh; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;

  background-color: #ffffff !important; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
  -webkit-box-shadow: inset 0px 0px 23px -9px #00000048;
  box-shadow: inset 0px 0px 23px -9px #00000048;
}
.bm-cross {
  background: #000000;
}
</style>
