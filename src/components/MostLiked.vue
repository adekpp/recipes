<script setup>
import RecipeCard from "./RecipeCard.vue";
import { useMostLiked } from "../composables/useMostLiked";

const props = defineProps(["textSize", "showLikes"])
const { fetchMostLiked, recipes } = useMostLiked();
await fetchMostLiked();
</script>

<template>
  <RecipeCard
    v-for="recipe in recipes"
    :key="recipe.id"
    :recipe="recipe"
    :textSize="textSize"
    :showLikes="showLikes"
  />
</template>

<style></style>
