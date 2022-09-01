<script setup>
import RecipesList from "../components/RecipesList.vue";
import { useRoute } from "vue-router";
import getCollection from "../composables/getCollection";
import { onMounted, onUpdated, ref, watch } from "@vue/runtime-core";

const props = defineProps(["query"]);
const route = useRoute();

const { documents, isLoading, getCollectionRTL } = getCollection("recipes");

const handleSearch = () => {
  const newQuery = ["tags", "array-contains", route.params.query];
  getCollectionRTL(newQuery);
};

onMounted(() => {
  handleSearch();
});

watch(
  () => route.params.query,
  () => {
    if (route.params.query) {
      handleSearch();
    }
  }
);
</script>

<template>
  <RecipesList :recipes="documents" :isLoading="isLoading" />
</template>

<style></style>
