<script setup>
import { useRoute } from "vue-router";
import getUser from "../composables/getUser";
import { computed, onMounted, ref, watch } from "vue";
import { useSingleRecipe } from "../composables/useSingleRecipe";
import { useLike } from "../composables/useLikeUnlike";
import useApi from "../supabase/useApi";
import moment from "moment";
import CardsHeartIcon from "vue-material-design-icons/CardsHeart.vue";
import CardsHeartOutlineIcon from "vue-material-design-icons/CardsHeartOutline.vue";
import MostLiked from "../components/MostLiked.vue";
import Loader from "../components/Loader.vue";
const route = useRoute();
const { recipe, getSingleRecipe, isLoading } = useSingleRecipe();

const { like } = useLike();
const { isUserLike } = useApi();
const recipeLikes = ref(recipe.likes);
const { user } = getUser();
const cookingSteps = ref([]);
const isLiked = ref();
const likeRecipe = async (recipe) => {
  if (!user.value) return;
  if (isLiked.value) {
    isLiked.value = false;
  } else {
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
  isLiked.value = await isUserLike(`${route.params.id}`);
});

const formattedTime = computed(() => {
  const created_at = recipe.value.created_at;
  new Date(created_at);
  const newTime = moment(created_at).format("MMMM Do YYYY");
  return newTime;
});

const formattedPrepTime = computed(() => {
  let time = { ...recipe.value.time };
  let prepTime = "";
  let hours = time.hours;
  let minutes = time.minutes;
  if (hours === "00") {
    prepTime = minutes + " MIN";
  } else {
    prepTime = hours + " H " + minutes + " MIN";
    return prepTime.slice(1);
  }
  return prepTime;
});

onMounted(async () => {
  await getSingleRecipe(route.params.id);
  if (recipe) {
    const instruction = recipe.value.cookingSteps.map((step) =>
      JSON.parse(step)
    );
    cookingSteps.value = instruction;
  }
  scrollTo(0, 0);
});

watch(
  () => route.params.id,
  async (newId) => {
    if (route.name === "RecipeDetails") {
      await getSingleRecipe(newId);
      scrollTo(0, 0);
    }
  }
);
</script>
<template>
  <div v-if="!isLoading">

      <div
        class="flex md:max-w-full text-gray-900 mx-auto md:p-0 place-content-between items-center"
      >
        <div class="max-w-full">
          <h1 class="font-Title text-3xl font-semibold">
            {{ recipe.title }}
          </h1>
          <p class="text-sm italic mt-2">Created at {{ formattedTime }}</p>
        </div>
        <div @click="likeRecipe(recipe)" class="flex flex-col items-center cursor-pointer">
          <span v-if="isLiked">
            <cards-heart-icon :size="28" class="text-red-600" />
          </span>
          <span v-if="!isLiked">
            <cards-heart-outline-icon :size="28" class="text-red-600" />
          </span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="flex flex-col md:flex-row place-items-center">
        <img
          class="rounded-md md:max-w-[300px]"
          :src="recipe.cover"
          alt="recipe image"
        />
        <div class="w-full max-w-2xl flex flex-col mt-6 md:mt-0 md:ml-6">
          <p>{{ recipe.description }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 mt-6 mb-3">
        <div
          class="col-span-full md:col-span-4 lg:col-span-5 flex flex-col w-full md:pr-5"
        >
          <div
            class="flex flex-row gap-x-4 place-content-center md:place-content-start"
          >
            <div class="flex flex-col items-center">
              <p class="text-gray-400 font-light">PREP TIME</p>
              <p class="text-sm">{{ formattedPrepTime }}</p>
            </div>
            <div
              class="divider divider-horizontal before:bg-gray-100 after:bg-gray-100"
            ></div>
            <div class="flex flex-col items-center">
              <p class="text-gray-400 font-light">SERVINGS</p>
              <p class="text-sm">{{ recipe.servings }}</p>
            </div>
          </div>
          <h2 class="font-Title text-2xl font-semibold mt-12">Ingredeints</h2>
          <ul
            class="space-y-4 md:space-y-2 max-w-xl list-disc list-inside text-gray-500 dark:text-gray-400 mt-3"
          >
            <li
              v-for="ing in recipe.ingredients"
              :key="ing"
              class="text-sm text-gray-900"
            >
              {{ ing }}
            </li>
          </ul>
          <h2 class="font-Title text-2xl font-semibold mt-12">Instructions</h2>
          <ul class="mt-6 mb-6">
            <li
              v-for="(instruction, i) in cookingSteps"
              :key="i"
              class="flex flex-col py-3"
            >
              <h4 class="font-semibold">Step {{ i + 1 }}</h4>
              <p class="break-all">{{ instruction.step }}</p>
            </li>
          </ul>
        </div>
        <div class="mx-auto">
          <h3 class="font-semibold text-xl font-Title mb-3">Most Liked</h3>
          <div
            class="grid grid-cols-2 md:flex md:flex-col gap-4 max-w-[300px] md:max-w-[150px] justify-self-end gap-y-3"
          >
            <suspense>
              <MostLiked textSize="text-xs" :showLikes="false" />
              <template #fallback>Loading...</template>
            </suspense>
            <div
              class="divider divider-horizontal before:bg-gray-100 after:bg-gray-100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  <div v-else class="flex w-full place-content-center mt-7">
    <Loader />
  </div>
</template>
