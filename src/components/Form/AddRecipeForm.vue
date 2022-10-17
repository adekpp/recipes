<script setup>
import { reactive, ref } from "@vue/reactivity";

import getUser from "../../composables/getUser";
import {
  BIconPlusCircleFill,
  BIconXCircleFill,
  BIconDashCircle,
  BIconTrash,
} from "bootstrap-icons-vue";
import StepOne from "../Form/StepOne.vue";
import StepTwo from "../Form/StepTwo.vue";
import StepThree from "./StepThree.vue";
const props = defineProps(["isLoading"]);
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
  emit("image-name", imageName);
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

const handleStepOne = (stepOne) => {
  for (let data in stepOne) recipe[data] = stepOne[data];
};

const handleStepTwo = (stepTwo) => {
  for (let data in stepTwo) recipe[data] = stepTwo[data];
};
</script>
<template>
  <div class="max-w-[800px] mx-auto">
    <ul class="flex flex-row divide-x-2 mb-24 w-full">
      <li
        v-for="(step, idx) in steps"
        :key="idx"
        class="cursor-pointer w-full text-center"
        :class="
          currentStep === step
            ? 'text-orange-500 underline underline-offset-4'
            : null
        "
        @click="currentStep = step"
      >
        Step {{ idx + 1 }}
      </li>
    </ul>

    <section class="flex flex-col" v-if="currentStep === steps[0]">
      <StepOne @step-one="handleStepOne" />
    </section>

    <section class="flex flex-col" v-if="currentStep === steps[1]">
      <StepTwo @step-two="handleStepTwo" />
    </section>

    <section class="flex flex-col" v-if="currentStep === steps[2]">
      <StepThree @image-cropped="handleFile" />
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
        {{isLoading ? 'Loading' : 'Submit'}}
      </button>
    </div>
    <div class="flex place-content-center">
      <button
        class="block md:hidden bg-white px-2 py-1 text-[#FF642F] rounded-sm hover:bg-[#fd5a23] hover:text-white border-[#FF642F] border-2 active:scale-95 shadow-md mt-12"
        @click="handleSubmit"
        :class="currentStep === 3 ? 'block' : 'hidden'"

      >
        {{isLoading ? 'Loading' : 'Submit'}}
      </button>
    </div>
  </div>
</template>
