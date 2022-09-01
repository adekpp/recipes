<script setup>
import RecipeCard from "./RecipeCard.vue";
import Loader from "./Loader.vue";
import gsap from "gsap";
const props = defineProps(["recipes", "isLoading"]);

const beforeEnter = (el) => {
  el.style.opacity = 0;
};

const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 1,
    opacity: 1,
    duration: 0.8,
    onComplete: done,
    delay: el.dataset.index * 0.2,
  });
};
</script>

<template>
  <div class="container mx-auto flex flex-col place-items-center pb-6">
    <div v-if="isLoading" class="pt-20"><Loader /></div>
    <div class="mt-10" v-if="!isLoading && recipes.length === 0">No recipes</div>

    <transition-group
      tag="ul"
      appear
      @before-enter="beforeEnter"
      @enter="onEnter"
    >
      <li
        v-for="(recipe, index) in recipes"
        :key="recipe.id"
        :data-index="index"
      >
        <RecipeCard :recipe="recipe" />
      </li>
    </transition-group>
  </div>
</template>

<style></style>
