<template>
  <RecipesList :recipes="documents" />
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import RecipesList from "../components/RecipesList.vue";
import getCollection from "../composables/getCollection";
import getUser from "../composables/getUser";

export default {
  components: {
    RecipesList,
  },
  setup() {
    const { user } = getUser();
    const query = ["uid", "==", user.value.uid]
    const { documents } = getCollection("recipes", query);

    onMounted(() => {
      console.log(user.value.uid)
    })

    return {
      documents,
    };
  },
};
</script>

<style></style>
