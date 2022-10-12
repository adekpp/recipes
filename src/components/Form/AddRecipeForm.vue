<script setup>
import { reactive, ref } from "@vue/reactivity";
import ImageCropper from "../Form/ImageCropper.vue";
import getUser from "../../composables/getUser";
import {
  BIconPlusCircleFill,
  BIconXCircleFill,
  BIconDashCircle,
  BIconTrash,
} from "bootstrap-icons-vue";

const emit = defineEmits(["add-doc", "image-name"]);
const { user } = getUser();

const time = ref("00:00");
const tag = ref("");
const ingredient = ref("");
const coverPreview = ref("");
const formatTime = () => {
  if (time !== "00:00") {
    const newTime = time.value.split(":");

    recipe.time.hours = newTime[0];
    recipe.time.minutes = newTime[1];
  }
};
const addTag = () => {
  const test = /^#[a-zA-Z0-9]{3,12}$/.test(tag.value);
  if (test & (recipe.tags.length <= 3)) {
    recipe.tags.push(tag.value.toLowerCase());
    tag.value = "";
  }
  return;
};

const addIngredient = () => {
  if (ingredient.value) {
    recipe.ingredients.push(ingredient.value);
  }
  ingredient.value = "";
};

const steps = [1, 2, 3];
let currentStep = ref(1);
const next = () => {
  if (currentStep.value >= steps.length) return;
  currentStep.value++;
};
const prev = () => {
  if (currentStep.value === 1) return;
  currentStep.value--;
};

// const cookingSteps = ref([{ 1: "" }]);
const addCookingStep = () => {
  if (recipe.cookingSteps.length === 4) return;
  recipe.cookingSteps.push({});
};

const lastStep = (cookingStep) => {
  if (recipe.cookingSteps.length > 1) {
    const lastIndex = recipe.cookingSteps[recipe.cookingSteps.length - 1];
    const lastStep = lastIndex == cookingStep;
    return lastStep;
  }
};

const recipe = reactive({
  cover: null,
  title: "",
  tags: [],
  cookingSteps: [{}],
  description: "",
  time: {
    hours: "",
    minutes: "",
  },
  servings: Number(),
  ingredients: [],
  uid: user.value.id,
});

const checkValues = () => {
  if (recipe.cookingSteps.length > 1) {
    recipe.cookingSteps.map((step, idx) => {
      const value = Object.values(step);
      if (!value[0]) {
        recipe.cookingSteps.splice(idx, 1);
      }
    });
  }
};

const handleFile = (image, imageName) => {
  recipe.cover = image;
  emit("image-name", imageName)
};

const handleSubmit = () => {
  const areTruthy = Object.values(recipe).every((value) => value);
  let value;
  recipe.cookingSteps.map((step, idx) => {
    value = Object.values(step);
  });
  if (areTruthy && value[0]) {
    emit("add-doc", recipe);
  }
};
</script>
<template>
  <div class="w-full text-gray-900 max-w-[700px] mx-auto p-4">
    <ul class="flex flex-row divide-x-2">
      <li
        v-for="(step, idx) in steps"
        :key="idx"
        class="cursor-pointer w-full text-center"
        :class="currentStep === step ? 'text-green-500' : null"
        @click="currentStep = step"
      >
        Step {{ idx + 1 }}
      </li>
    </ul>

    <section
      class="flex flex-col max-w-[500px] mx-auto mt-24 min-h-[500px]"
      v-if="currentStep === steps[0]"
    >
      <form class="flex flex-col place-items-center">
        <label class="flex flex-col italic text-sm mb-6 w-full max-w-[700px]">
          What is the name of your recipe?

          <input
            v-model="recipe.title"
            type="text"
            class="h-[40px] px-2 rounded-sm mb-6 border-b-2 focus:outline-none focus:border-orange-400"
            placeholder="Chicken BBQ"
          />
        </label>
        <label class="flex flex-col italic text-sm mb-6 w-full max-w-[700px]">
          A short description of what it's about? Max. 200 characters. ({{
            recipe.description.length
          }})

          <textarea
            v-model="recipe.description"
            type="text"
            class="h-[200px] px-2 rounded-sm mb-6 border-2 focus:outline-none focus:border-orange-400"
            placeholder="Discover how to cook BBQ chicken like a pro. The meat falls off the bone, and the marinade has a lovely balance of sweet, salty and spicy flavours"
            maxlength="200"
          />
        </label>

        <label class="flex flex-col italic text-sm w-full max-w-[700px] mb-6">
          Tags (max 3)
          <div class="flex w-full items-center gap-x-2">
            <input
              @keypress.enter="addTag"
              v-model="tag"
              type="text"
              class="h-[40px] px-2 rounded-sm border-b-2 focus:outline-none focus:border-orange-400 w-full"
              placeholder="#chicken"
            />
            <BIconPlusCircleFill
              @click="addTag"
              class="inline-flex text-2xl text-[#FF642F] hover:text-[#fd5a23] active:scale-95"
            />
          </div>
          <small class="block italic place-self-start mb-2"
            >Add one by one. Click on tag to delete.</small
          >
          <ul class="flex flex-row w-full gap-x-2 mb-6">
            <li v-for="(tag, index) in recipe.tags" :key="index">
              <div
                @click="recipe.tags.splice(index, 1)"
                class="bg-[#FF642F] text-white p-2 rounded-lg tracking-wider hover:bg-[#ff5b24] cursor-pointer transition-all duration-300 active:scale-95"
              >
                <p>{{ tag }}</p>
              </div>
            </li>
          </ul>
        </label>

        <div class="md:inline-flex place-content-start w-full gap-x-10 mb-6">
          <label class="flex flex-col italic text-sm mb-2 w-full max-w-[700px]">
            Prep + cooking time

            <input
              @change="formatTime"
              v-model="time"
              type="time"
              class="h-[40px] px-2 rounded-sm border-b-2 focus:outline-none focus:border-orange-400 mb-6"
              placeholder="4 eggs"
            />
          </label>
          <label class="flex flex-col italic text-sm mb-2 w-full max-w-[700px]">
            Servings

            <input
              v-model="recipe.servings"
              type="number"
              class="h-[40px] px-2 rounded-sm border-b-2 focus:outline-none focus:border-orange-400 mb-6"
              placeholder="4"
            />
          </label>
        </div>
        <label class="flex flex-col italic text-sm w-full max-w-[700px] mb-6">
          Ingredients
          <div class="flex w-full items-center gap-x-2">
            <input
              v-model="ingredient"
              @keypress.enter="addIngredient"
              type="text"
              class="h-[40px] px-2 rounded-sm border-b-2 focus:outline-none focus:border-orange-400 w-full"
              placeholder="2 carrots"
            />
            <BIconPlusCircleFill
              @click="addIngredient"
              class="inline-flex text-2xl text-[#FF642F] hover:text-[#fd5a23] active:scale-95"
            />
          </div>
          <small class="block italic place-self-start">Add one by one.</small>
          <ul class="flex flex-col w-full gap-x-2">
            <li
              v-for="(ing, index) in recipe.ingredients"
              :key="index"
              class="odd:bg-white even:bg-[#e8e8e8] text-md not-italic list-inside px-2 py-1 mt-2 w-full"
            >
              <div
                class="flex flex-row w-full place-content-between items-center"
              >
                - {{ ing }}
                <BIconDashCircle
                  @click="recipe.ingredients.splice(index, 1)"
                  class="text-xl text-red-500 cursor-pointer"
                />
              </div>
            </li>
          </ul>
        </label>
      </form>
    </section>

    <section
      class="flex flex-col max-w-[500px] mx-auto mt-24 min-h-[500px]"
      v-if="currentStep === steps[1]"
    >
      <form class="flex flex-col place-items-center">
        <p class="text-left w-full mb-2 italic">
          Cooking instructions (max 4 steps)
        </p>
        <ul class="w-full">
          <li v-for="(cookingStep, idx) in recipe.cookingSteps" :key="idx">
            <label
              class="flex flex-row italic text-sm mb-2 w-full max-w-[700px] place-content-between"
            >
              Step {{ idx + 1 }}
              <BIconDashCircle
                class="text-xl text-red-500 cursor-pointer"
                :class="lastStep(cookingStep) ? 'block' : 'hidden'"
                @click="recipe.cookingSteps.splice(idx, 1)"
              />
            </label>
            <textarea
              v-model="cookingStep.step"
              class="w-full min-h-[300px] px-2 rounded-sm mb-2 border-2 focus:outline-none focus:border-orange-400"
            />
          </li>
        </ul>
        <button
          class="border-2 border-[#FF642F] px-2 py-1 text-[#FF642F] hover:bg-[#FF642F] hover:text-white active:scale-95 transition-all duration-400 disabled:text-gray-500 disabled:hover:cursor-not-allowed disabled:hover:bg-gray-200 disabled:border-gray-500"
          @click.prevent="addCookingStep"
          :disabled="recipe.cookingSteps.length === 4"
        >
          Add next step
        </button>
      </form>
    </section>

    <section
      class="flex flex-col max-w-[500px] mx-auto mt-24"
      v-if="currentStep === steps[2]"
    >
      <ImageCropper @image-cropped="handleFile" />
    </section>

    <div class="hidden md:flex flex-row place-content-between mt-12">
      <button
        class="bg-[#FF642F] hover:bg-[#fd5a23] px-3 py-1 text-white rounded-sm active:scale-95 shadow-md disabled:bg-gray-500"
        :class="currentStep === 1 ? 'opacity-0' : null"
        @click="prev"
      >
        Prev
      </button>
      <button
        class="bg-[#FF642F] px-2 py-1 text-white rounded-sm hover:bg-[#fd5a23] active:scale-95 shadow-md disabled:bg-gray-500"
        @click="next"
        :class="currentStep === 3 ? 'hidden' : 'block'"
      >
        Next
      </button>
      <button
        class="bg-white px-2 py-1 text-[#FF642F] rounded-sm hover:bg-[#fd5a23] hover:text-white border-[#FF642F] border-2 active:scale-95 shadow-md"
        @click="handleSubmit"
        :class="currentStep === 3 ? 'block' : 'hidden'"
      >
        Submit
      </button>
    </div>
    <div class="flex place-content-center">
      <button
        class="block md:hidden bg-white px-2 py-1 text-[#FF642F] rounded-sm hover:bg-[#fd5a23] hover:text-white border-[#FF642F] border-2 active:scale-95 shadow-md mt-12"
        @click="handleSubmit"
        :class="currentStep === 3 ? 'block' : 'hidden'"
      >
        Submit
      </button>
    </div>
  </div>
</template>
