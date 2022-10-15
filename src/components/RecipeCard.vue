<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import CardsHeartIcon from "vue-material-design-icons/CardsHeart.vue";
import CardsHeartOutlineIcon from "vue-material-design-icons/CardsHeartOutline.vue";
import getUser from "../composables/getUser";
import useApi from "../supabase/useApi";
import { useLike } from "../composables/useLikeUnlike";

const props = defineProps(["recipe", "textSize", "showLikes"]);
const { like } = useLike();

const { isUserLike } = useApi();
let isLiked = ref();
const { user } = getUser();
const recipeLikes = ref(props.recipe.likes);

const likeRecipe = async (recipe) => {
  if (!user.value) return;
  if (isLiked.value) {
    recipeLikes.value--;
    isLiked.value = false;
  } else {
    recipeLikes.value++;
    isLiked.value = true;
  }
  await like({ x: 1, id: recipe.id });
};
watch(user, () => {
  if (!user.value) {
    isLiked.value = false;
  }
});
onMounted(async () => {
  isLiked.value = await isUserLike(`${props.recipe.id}`);
});
</script>

<template>
  <div class="recipeCard md:max-w-[360px]">
    <figure class="relative group">
      <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id } }">
        <img :src="recipe.cover" alt="" class="peer transition-all" />
      </router-link>
      <div
        class="hidden md:flex absolute top-0 right-0 w-0 h-full flex-col justify-start pt-4 items-center bg-black bg-opacity-80 opacity-0 group-hover:w-[40px] group-hover:opacity-100 duration-300"
        :class="!showLikes ? 'md:hidden' : null"
      >
        <div @click="likeRecipe(recipe)" class="cursor-pointer">
          <span v-if="isLiked"
            ><cards-heart-icon :size="24" class="text-red-600"
          /></span>
          <span v-if="!isLiked"
            ><cards-heart-outline-icon :size="24" class="text-white"
          /></span>
        </div>
        <span class="text-white text-md antialiased font-light">{{
          recipeLikes > 0 ? recipeLikes : null
        }}</span>
      </div>
    </figure>

    <div class="flex flex-row mt-2 justify-between font-semibold items-center">
      <router-link
        class="truncate pr-2"
        :to="{ name: 'RecipeDetails', params: { id: recipe.id } }"
      >
        <p :class="textSize" class="truncate">{{ recipe.title }}</p>
      </router-link>
      <div
        class="flex flex-row md:hidden"
        :class="!showLikes ? 'hidden' : null"
      >
        <div @click="likeRecipe(recipe)" class="cursor-pointer">
          <span v-if="isLiked"
            ><cards-heart-icon :size="24" class="text-red-600"
          /></span>
          <span v-if="!isLiked"
            ><cards-heart-outline-icon :size="24" class="text-red-600"
          /></span>
        </div>
        <span class="text-black text-md antialiased font-light">{{
          recipeLikes > 0 ? recipeLikes : null
        }}</span>
      </div>
    </div>
  </div>
</template>
