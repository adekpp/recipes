import { supabase } from "../supabase/config";
import { ref } from "vue";

export function useTags() {
  const tags = ref([]);

  async function fetchTags() {
    tags.value = [];
    const { data, error } = await supabase.from("recipes").select("tags");
    if (data) {
      const flatted = data.map((recipe) => recipe.tags).flat();
      const map = flatted.reduce(function (p, c) {
        p[c] = (p[c] || 0) + 1;
        return p;
      }, {});
      const popularTags = Object.keys(map).sort(function (a, b) {
        return map[b] - map[a];
      });
      tags.value = popularTags;
    }
  }

  return {
    fetchTags,
    tags,
  };
}
