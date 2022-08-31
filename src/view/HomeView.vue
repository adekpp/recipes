<template>
  <div>
    <RecipesList :recipes="documents" :isLoading="isLoading" />
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import RecipesList from "../components/RecipesList.vue";
import getCollection from "../composables/getCollection";

export default {
  components: {
    RecipesList,
  },
  setup() {
    const { documents, isLoading, getCollectionRTL } = getCollection("recipes");

  onMounted(() => {
    getCollectionRTL()
  })

    return {
      documents,
      isLoading,
    };
  },
};
</script>

<style></style>
