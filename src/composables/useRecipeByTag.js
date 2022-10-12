import { supabase } from "../supabase/config";
import { ref } from "vue";

export function useRecipeByTag() {
  const isLoading = ref(false);
  const recipes = ref([]);

  async function fetchRecipeByTag(tag) {
    recipes.value = [];
    isLoading.value = true;
    const { data, error } = await supabase
      .from("recipes")
      .select()
      .contains("tags", [tag]);
    if (data) {
      recipes.value = data;
      isLoading.value = false;
    }
  }
  return {
    fetchRecipeByTag,
    recipes,
  };
}
