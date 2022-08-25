<template>
  <Navbar />
  <div class="flex flex-row">
    <div class="hidden lg:block min-w-[200px] h-fit bg-secondary p-3">
      <h2>Filters:</h2>
    </div>
    <div class="container mx-auto h-full w-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "/src/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style></style>
