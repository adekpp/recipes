<script setup>
import RecipeCard from "./RecipeCard.vue";
import { useAllRecipes } from "../composables/useAllRecipes";
import { supabase } from "../supabase/config";
const props = defineProps(["textSize", "showLikes"]);
const { fetchAllRecipes, recipes } = useAllRecipes();
await fetchAllRecipes();
</script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
      :textSize="textSize"
      :showLikes="showLikes"
    />
  </div>
</template>

<style></style>
