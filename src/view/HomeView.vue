<script setup>
import {
  computed,
  onBeforeMount,
  onMounted,
  ref,
  watch,
} from "@vue/runtime-core";
import PromotedRecipe from "../components/PromotedRecipe.vue";
import LatestRecipes from "../components/LatestRecipes.vue";
import MostLiked from "../components/MostLiked.vue";
import TagList from "../components/TagList.vue";
import { useRouter } from "vue-router";
import useApi from "../supabase/useApi";
import { BIconArrowRight } from "bootstrap-icons-vue";
const router = useRouter();
</script>

<template>
  <Suspense>
    <PromotedRecipe />
    <template #fallback>Loading...</template>
  </Suspense>

  <div class="flex flex-col mt-12 font-semibold">
    <h2 class="font-Title text-2xl">Most liked</h2>
    <div
      class="grid grid-cols-1 max-w-fit md:grid-cols-3 lg:grid-cols-4 gap-[16px] mt-3"
    >
      <Suspense>
        <MostLiked textSize="text-sm" :showLikes="true" />
        <template #fallback> Loading... </template>
      </Suspense>
    </div>
  </div>

  <div class="flex flex-col mt-12 font-semibold">
    <h2 class="font-Title text-2xl">Latest recipes</h2>

    <div
      class="grid grid-cols-1 max-w-fit md:grid-cols-3 lg:grid-cols-4 gap-[16px] mt-3"
    >
      <Suspense>
        <LatestRecipes textSize="text-sm" :showLikes="true" />
        <template #fallback> Loading... </template>
      </Suspense>
    </div>
  </div>

  <div
    class="flex flex-col mt-12 font-semibold items-center lg:items-baseline mb-3"
  >
    <h2 class="font-Title text-2xl">Popular tags</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-[8px] mt-3">
      <Suspense>
        <TagList />
        <template #fallback> Loading... </template>
      </Suspense>
    </div>
  </div>
</template>
