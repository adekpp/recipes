<script setup>
import RecipesByTag from "../components/RecipesByTag.vue";
import { useRoute } from "vue-router";
import { onMounted, onUpdated, ref } from "@vue/runtime-core";
import { supabase } from "../supabase/config";
import Loader from "../components/Loader.vue";
const route = useRoute();
onMounted(() => {
  scrollTo(0, 0);
});
</script>

<template>
  <h2 class="font-Title font-semibold text-2xl mb-3">
    Recipes with tag {{ route.params.tag }}
  </h2>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
    <suspense>
      <RecipesByTag :tag="route.params.tag" />
      <template #fallback
        ><div class="grid grid-cols-1 items-center"><Loader /></div>
      </template>
    </suspense>
  </div>  
</template>

<style></style>
