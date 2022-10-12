<script setup>
import RecipeCard from "./RecipeCard.vue";
import { useRecipeByTag } from "../composables/useRecipeByTag";

const props = defineProps(["textSize", "showLikes", "tag"]);
const { recipes, fetchRecipeByTag } = useRecipeByTag();
await fetchRecipeByTag(props.tag);
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
