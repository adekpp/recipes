<script setup>
import { useMostLiked } from "../composables/useMostLiked";
import { BIconArrowRight } from "bootstrap-icons-vue";
import { computed } from "@vue/runtime-core";
const { fetchMostLiked, recipes } = useMostLiked();
await fetchMostLiked();

const randomRecipe = computed(() => {
  return [...recipes.value][Math.floor(Math.random() * recipes.value.length)];
});
</script>

<template>
  <div
    class="relative max-w-sm md:max-w-full grid grid-cols-1 md:grid-cols-2 bg-[#E3F1FF] text-gray-900 rounded-lg shadow-md mx-auto pb-10 md:p-0"
  >
    <img :src="randomRecipe.cover" alt="" />
    <div
      class="flex flex-col max-w-xs md:max-w-md place-content-center mx-auto px-2 md:px-4 mt-6 md:mt-0"
    >
      <h2 class="text-4xl font-bold mb-3 font-Title">
        {{ randomRecipe.title }}
      </h2>
      <p>
        {{ randomRecipe.description }}
      </p>
    </div>
    <span
      class="absolute bottom-4 right-6 text-2xl cursor-pointer active:scale-95 z-10 before:absolute before:z-[-10] before:block before:w-[40px] before:h-[40px] before:bg-white before:rounded-full before:-translate-y-[50%] before:top-[50%] before:-translate-x-[50%] before:left-[50%] shadow-md transition-all duration-100"
      >
      <router-link :to="{ name: 'RecipeDetails', params: { id: randomRecipe.id } }">
      <BIconArrowRight />
      </router-link>
    </span>
  </div>
</template>
