import { supabase } from "../supabase/config";
import { ref } from "vue";

export function useLatestRecipes() {
  const recipes = ref([]);

  async function fetchLatest() {
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
    fetchLatest,
    recipes,
  };
}
