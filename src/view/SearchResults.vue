<script setup>
import { useRoute } from "vue-router";
import {
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  watch,
} from "@vue/runtime-core";
import useApi from "../supabase/useApi";
import RecipeCard from "../components/RecipeCard.vue";
import Loader from "../components/Loader.vue";
const { dataQuery, searchResults, isLoading } = useApi();
const route = useRoute();

onMounted(() => {
  if (route.params.query) {
    dataQuery(route.params.query);
  }
});

onUnmounted(() => {
  searchResults.value = [];
});

watch(
  () => route.params.query,
  () => {
    if (route.params.query) {
      dataQuery(route.params.query);
    }
  }
);
</script>

<template>
  <div
    class="max-w-[1200px] mx-auto text-gray-900 min-h-screen overflow-x-hidden"
  >
    <div class="mx-3">
      <div class="flex flex-col items-center w-full" v-if="isLoading">
        <h2 class="font-Title text-2xl md:place-self-start mb-5 font-semibold">
          Searching for {{ route.params.query }}
        </h2>
        <Loader />
      </div>
      <h2
        class="font-Title text-2xl md:place-self-start mb-5 font-semibold"
        v-if="searchResults.length >= 1"
      >
        Search results for {{ route.params.query }}
      </h2>
      <h2
        class="font-Title text-2xl md:place-self-start mb-5 font-semibold"
        v-if="searchResults.length === 0 && !isLoading"
      >
        No recipes for {{ route.params.query }}
      </h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <RecipeCard
          v-for="recipe in searchResults"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
