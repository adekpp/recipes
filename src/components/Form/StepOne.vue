<script setup>
import { reactive, ref } from "@vue/reactivity";
import {
  BIconPlusCircleFill,
  BIconXCircleFill,
  BIconDashCircle,
  BIconTrash,
} from "bootstrap-icons-vue";
const emit = defineEmits(["step-one"]);
const stepOne = reactive({
  title: "",
  description: "",
  tags: [],
  time: {
    hours: "",
    minutes: "",
  },
  ingredients: [],
  servings: Number(),
});

const tag = ref("");
const ingredient = ref("");
const time = ref("00:00");

const addTag = () => {
  const test = /^#[a-zA-Z0-9]{3,12}$/.test(tag.value);
  if (test & (stepOne.tags.length <= 3)) {
    stepOne.tags.push(tag.value.toLowerCase());
    tag.value = "";
  }
  return;
};

const addIngredient = () => {
  if (ingredient.value) {
    stepOne.ingredients.push(ingredient.value);
  }
  ingredient.value = "";
};

const formatTime = () => {
  if (time !== "00:00") {
    const newTime = time.value.split(":");

    stepOne.time.hours = newTime[0];
    stepOne.time.minutes = newTime[1];
  }
};

const handleStepOne = () => {
  emit("step-one", stepOne);
};
</script>

<template>
  <form @change="handleStepOne" class="flex flex-col w-full">
    <label class="italic text-sm mb-2">
      What is the name of your recipe?
    </label>
    <input
      v-model="stepOne.title"
      type="text"
      class="h-[40px] px-2 rounded-sm mb-10 border-b-2 focus:outline-none focus:border-orange-400 w-full"
      placeholder="Chicken BBQ"
    />

    <label class="flex flex-col italic text-sm mb-2">
      A short description of what it's about? Max. 200 characters. ({{
        stepOne.description.length
      }})
    </label>
    <textarea
      v-model="stepOne.description"
      type="text"
      class="min-h-[200px] px-2 rounded-sm mb-10 border-2 focus:outline-none focus:border-orange-400 w-full"
      placeholder="Discover how to cook BBQ chicken like a pro. The meat falls off the bone, and the marinade has a lovely balance of sweet, salty and spicy flavours"
      maxlength="200"
    />

    <label class="flex flex-col italic text-sm w-full mb-2">
      Tags (max 3)
    </label>
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
    <ul class="flex flex-row w-full gap-x-2 mb-10">
      <li v-for="(tag, index) in stepOne.tags" :key="index">
        <div
          @click="stepOne.tags.splice(index, 1)"
          class="bg-[#FF642F] text-white p-2 rounded-lg tracking-wider hover:bg-[#ff5b24] cursor-pointer transition-all duration-300 active:scale-95"
        >
          <p>{{ tag }}</p>
        </div>
      </li>
    </ul>

    <div
      class="md:inline-flex place-content-start w-full gap-x-10 mb-10 items-center"
    >
      <label class="flex flex-col italic text-sm whitespace-nowrap">
        Prep + cooking time:
      </label>
      <input
        @change="formatTime"
        v-model="time"
        type="time"
        class="h-[40px] px-2 rounded-sm border-b-2 focus:outline-none focus:border-orange-400 w-full mb-10 md:mb-0"
        placeholder="4 eggs"
      />

      <label class="flex flex-col italic text-sm"> Servings: </label>
      <input
        v-model="stepOne.servings"
        type="number"
        class="h-[40px] px-2 rounded-sm border-b-2 focus:outline-none focus:border-orange-400 w-full"
        placeholder="4"
      />
    </div>
    <label class="flex flex-col italic text-sm w-full">
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
          v-for="(ing, index) in stepOne.ingredients"
          :key="index"
          class="odd:bg-white even:bg-[#e8e8e8] text-md not-italic list-inside px-2 py-1 mt-2 w-full"
        >
          <div class="flex flex-row w-full place-content-between items-center">
            - {{ ing }}
            <BIconDashCircle
              @click="stepOne.ingredients.splice(index, 1)"
              class="text-xl text-red-500 cursor-pointer"
            />
          </div>
        </li>
      </ul>
    </label>
  </form>
</template>
