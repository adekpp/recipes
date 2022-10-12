<script setup>
import TheNavbar from "/src/components/Navbar/TheNavbar.vue";
import TheFooter from "/src/components/TheFooter.vue";
</script>

<template>
  <TheNavbar />
  <div class="content flex flex-1">
    <router-view />
  </div>

  <TheFooter />
</template>
