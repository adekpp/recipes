import { ref } from "vue";
import { supabase } from "./config";
import getUser from "../composables/getUser";
const { user } = getUser();
const userRecipes = ref([]);
const userFavorites = ref([]);
const isLoading = ref(false);
const searchResults = ref([]);

const useApi = () => {
  const getUserRecipes = async (user) => {
    try {
      isLoading.value = true;
      const { data, error } = await supabase
        .from("recipes")
        .select()
        .eq("uid", user);

      if (data) {
        isLoading.value = false;
        userRecipes.value = data;
      } else {
        isLoading.value = false;
        throw error;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const dataQuery = async (query) => {
    try {
      isLoading.value = true;
      searchResults.value = [];
      if (Array.from(query)[0] === "#") {
        const { data, error } = await supabase
          .from("recipes")
          .select()
          .contains("tags", [query]);
        searchResults.value = data;
        isLoading.value = false;
        if (error) {
          throw error;
        }
      } else {
        const { data, error } = await supabase
          .from("recipes")
          .select()
          .textSearch("fts", query);
        console.log(data);
        searchResults.value = data;
        isLoading.value = false;
        if (error) {
          throw error;
        }
      }
    } catch (e) {
      console.log(e.message);
      isLoading.value = false;
    }
  };

  const isUserLike = async (recipeId) => {
    let userLiked = [];
    if (user.value) {
      const { data: userLikes, error } = await supabase
        .from("profiles")
        .select("user_likes")
        .eq("id", user.value.id);

      userLiked = userLikes;
      if (userLikes[0].user_likes === null) return false;
      if (userLikes[0].user_likes.includes(recipeId)) return true;
      else return false;
    }
  };

  return {
    userRecipes,
    isLoading,
    userFavorites,
    dataQuery,
    searchResults,
    isUserLike,
  };
};

export default useApi;
