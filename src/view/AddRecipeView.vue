<script setup>
import AddRecipeForm from "../components/Form/AddRecipeForm.vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase/config";
import getUser from "../composables/getUser";
import { ref } from "@vue/reactivity";

const router = useRouter();
const { user } = getUser();
const imageTitle = ref(null);
const isLoading = ref(null);

const setImageName = (imageName) => {
  imageTitle.value = imageName;
};

const handleAddDoc = async (recipe) => {
  try {
    isLoading.value = true;
    const { data: image } = await supabase.storage
      .from("recipes-images")
      .upload(`${user.value.id}/${imageTitle.value}`, recipe.cover, {
        upsert: false,
      });

    const { publicURL } = await supabase.storage
      .from("recipes-images")
      .getPublicUrl(`${user.value.id}/${imageTitle.value}`);

    const { data: addedRecipe, error } = await supabase
      .from("recipes")
      .insert([{ ...recipe, cover: publicURL }]);
    isLoading.value = false;
    router.push("/");
    if (error) {
      throw new error();
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <AddRecipeForm
    @add-doc="handleAddDoc"
    @image-name="setImageName"
    :isLoading="isLoading"
  />
</template>

<style></style>
