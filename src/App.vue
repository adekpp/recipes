<template>
  <TheNavbar />
  <div class="container mx-auto pb-6">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "/src/components/TheNavbar.vue";
export default {
  components: {
    TheNavbar,
  },
};
</script>

<style></style>
