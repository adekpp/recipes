<script setup>
import RecipeCard from "./RecipeCard.vue";
import { useLatestRecipes } from "../composables/useLatestRecipes";
import { supabase } from "../supabase/config";
const props = defineProps(["textSize", "showLikes"])
const { fetchLatest, recipes } = useLatestRecipes();
await fetchLatest();
</script>

<template>
  <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" :textSize="textSize" :showLikes="showLikes" />
</template>

<style></style>
