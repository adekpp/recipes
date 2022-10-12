<script setup>
import { onMounted, onUpdated, ref } from "@vue/runtime-core";
import RecipesList from "../components/RecipesList.vue";
import getUser from "../composables/getUser";
import { supabase } from "../supabase/config";
import useApi from "../supabase/useApi";
const { user } = getUser();
const { userFavorites, isLoading, getUserFavorites } = useApi();
onMounted(async () => {
  await getUserFavorites(user.value.id);
});
</script>

<template>
  <div v-if="userFavorites">
    <RecipesList :recipes="userFavorites" :isLoading="isLoading" />
  </div>
</template>

<style></style>
