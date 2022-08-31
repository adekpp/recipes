<template>
  <TheNavbar />
  <router-view />
</template>

<script>
import TheNavbar from "/src/components/TheNavbar.vue";
export default {
  components: {
    TheNavbar,
  },
};
</script>
