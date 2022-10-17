<script setup>
import TheNavbar from "/src/components/Navbar/TheNavbar.vue";
import TheFooter from "/src/components/TheFooter.vue";
</script>

<template>
  <TheNavbar />
  <div
    class="flex flex-col min-h-screen justify-between text-gray-900 px-3 w-full"
  >
    <div class="max-w-[1200px] w-full mx-auto">
      <router-view />
    </div>

    <TheFooter />
  </div>
</template>
