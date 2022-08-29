<template>
  <div class="container mx-auto flex flex-col place-items-center pb-6">
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
