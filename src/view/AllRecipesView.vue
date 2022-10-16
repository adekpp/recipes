<script setup>
import AllRecipes from '../components/AllRecipes.vue'
import Loader from '../components/Loader.vue'
</script>

<template>

      <h1 class="font-Title text-2xl font-semibold mb-6">All recipes:</h1>
      <Suspense>
        <AllRecipes />
        <template #fallback>
            <Loader />
        </template>
      </Suspense>
</template>

<style></style>
