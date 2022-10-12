import { supabase } from "../supabase/config";
import { ref } from "vue";

export function useSingleRecipe() {
  const recipe = ref({});
  const isLoading = ref(false)
  const getSingleRecipe = async (recipeId) => {
    isLoading.value = true
    const { data, error } = await supabase
    .from('recipes')
    .select()
    .eq('id', `${recipeId}`)
    .single()
    if(data){
      recipe.value = data
      isLoading.value = false
    }
    else{
      isLoading.value = false
      console.log(error)
    }
  };

  return { recipe, getSingleRecipe, isLoading };
}
