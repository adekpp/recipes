<template>
  <div
    class="flex md:gap-4 md:max-w-[900px] max-w-[400px] mx-auto p-3  items-center place-content-center pt-4"
  >
    <AddRecipeForm @add-doc="handleAddDoc" />
  </div>
</template>

<script>
import AddRecipeForm from "../components/AddRecipeForm.vue";
import useCollection from "../composables/useCollection";
import { useRouter } from "vue-router";
import useStorage from "../composables/useStorage";
export default {
  components: {
    AddRecipeForm,
  },
  setup() {
    const { uploadFile, url } = useStorage();
    const router = useRouter();
    const { addDocument, error } = useCollection("recipes");

    const handleAddDoc = async (recipe, recipeCover) => {
      await uploadFile(recipeCover.value);
      await addDocument({ ...recipe, cover: url.value });
      if (!error.value) {
        router.push("/");
      }
    };

    return {
      handleAddDoc,
    };
  },
};
</script>

<style></style>
