<script setup>
import { Slide } from "vue3-burger-menu";
import { useLogin } from "../../composables/useLogin";

import {
  BIconHouseDoor,
  BIconFileEarmarkPlus,
  BIconBinoculars,
} from "bootstrap-icons-vue";
const { isLoading, login } = useLogin();
</script>

<template>
  <Slide :right="true" :noOverlay="true" :closeOnNavigation="true">
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
    <h1 class="font-Title block whitespace-nowrap text-sm">Login with:</h1>
    <div
    @click="login('facebook')"
     class="flex flex-row items-center text-sm">
      <img
        class="w-7 h-7 -ml-[9px]"
        src="../../assets/facebookIcon.svg"
        alt=""
      />
      <p>Facebook</p>
    </div>
    <div
    @click="login('google')"
     class="flex flex-row items-center text-sm">
      <img
        class="w-5 h-5 mr-1 -ml-[5px] inline-block"
        src="../../assets/googleIcon.svg"
        alt=""
      />
      <p class="inline-block">Google</p>
    </div>

    <img
      class="w-4 h-4 mr-2 inline-block"
      src="../../assets/googleIcon.svg"
      alt=""
    />
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
