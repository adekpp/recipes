<script setup>
import AllRecipes from '../components/AllRecipes.vue'
import Loader from '../components/Loader.vue'
</script>

<template>
  <div
    class="max-w-[1200px] mx-auto text-gray-900 min-h-screen overflow-x-hidden"
  >
    <div class="mx-3">
      <h1 class="font-Title text-2xl font-semibold mb-6">All recipes:</h1>
      <suspense>
        <AllRecipes />
        <template #fallback>
            <Loader />
        </template>
      </suspense>
    </div>
  </div>
</template>

<style></style>
