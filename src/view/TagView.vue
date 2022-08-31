<template>
  <RecipesList :recipes="documents" :isLoading="isLoading" />
</template>

<script>
import RecipesList from "../components/RecipesList.vue";

import { onBeforeRouteUpdate, useRoute } from "vue-router";
import getCollection from "../composables/getCollection";
import { onMounted, onUpdated, ref,} from "@vue/runtime-core";

export default {
  components: {
    RecipesList,
  },
  setup() {
    const route = useRoute();
    const currentTag = ref(route.params.tagName);
    const query = ref(["tags", "array-contains", route.params.tagName]);

    const { documents, isLoading, getCollectionRTL } = getCollection("recipes");

    onMounted(() => {
      getCollectionRTL(query.value);
    });

    onUpdated(() => {
      const newQuery = ["tags", "array-contains", route.params.tagName];
      getCollectionRTL(newQuery);
    });

    return {
      documents,
      isLoading,
    };
  },
};
</script>

<style></style>
