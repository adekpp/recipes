<template>
  <div>
    <RecipesList :recipes="documents" />
  </div>
</template>

<script>
import RecipesList from "../components/RecipesList.vue";
import getCollection from "../composables/getCollection";

export default {
  components: {
    RecipesList,
  },
  setup() {
    const { documents } = getCollection("recipes");

    return {
      documents,
    };
  },
};
</script>

<style></style>
