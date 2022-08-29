<template>
  <div class="wrapper">
    <TheNavbar />
    <div class="content">
      <router-view />
    </div>
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

<style>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
}
</style>
