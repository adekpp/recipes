<script setup>
import TheNavbar from "/src/components/Navbar/TheNavbar.vue";
import TheFooter from "/src/components/TheFooter.vue";
</script>

<template>
  <TheNavbar />
  <div class="flex flex-col min-h-screen justify-between">
    <div class="max-w-[1200px] mx-auto text-gray-900 px-3">
        <router-view />
      </div>

    <TheFooter />
  </div>
</template>
