<template>
  <div class="flex flex-row flex-wrap gap-5 justify-center ml-2">
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </div>
</template>

<script>
import RecipeCard from "./RecipeCard.vue";
export default {
  components: {
    RecipeCard,
  },
  props: ["recipes"],
};
</script>

<style></style>
