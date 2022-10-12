import { supabase } from "../supabase/config";
import { ref } from "vue";

export function useMostLiked() {
  const recipes = ref([]);

  async function fetchMostLiked() {
    recipes.value = [];
    const { data, error } = await supabase
      .from("recipes")
      .select()
      .limit(4)
      .order("likes", { ascending: false });
    if (data) {
      recipes.value = data;
    }
  }

  return {
    fetchMostLiked,
    recipes,
  };
}
