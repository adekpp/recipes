import { supabase } from "../supabase/config";
import { ref } from "vue";

export function useAllRecipes() {
  const recipes = ref([]);

  async function fetchAllRecipes() {
    recipes.value = [];
    const { data, error } = await supabase
      .from("recipes")
      .select()
      .order("created_at", { ascending: false });
    if (data) {
      recipes.value = data;
    }
  }

  return {
    fetchAllRecipes,
    recipes,
  };
}
