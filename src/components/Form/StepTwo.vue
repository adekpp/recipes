<script setup>
import { reactive } from "@vue/reactivity";
import {
  BIconPlusCircleFill,
  BIconXCircleFill,
  BIconDashCircle,
  BIconTrash,
} from "bootstrap-icons-vue";
const emit = defineEmits(["step-two"]);
const stepTwo = reactive({
  cookingSteps: [{}],
});

const addCookingStep = () => {
  if (stepTwo.cookingSteps.length === 4) return;
  stepTwo.cookingSteps.push({});
};

const lastStep = (cookingStep) => {
  if (stepTwo.cookingSteps.length > 1) {
    const lastIndex = stepTwo.cookingSteps[stepTwo.cookingSteps.length - 1];
    const lastStep = lastIndex == cookingStep;
    return lastStep;
  }
};

const handleStepTwo = () => {
  emit("step-two", stepTwo);
};
</script>
<template>
  <form @change="handleStepTwo" class="flex flex-col w-full">
    <small class="text-left w-full mb-2 italic">
      Cooking instructions (max 4 steps)
    </small>

    <div
      v-for="(cookingStep, idx) in stepTwo.cookingSteps"
      :key="idx"
      class="flex flex-col mt-3"
    >
      <label
        class="inline-flex flex-row italic text-sm mb-2 place-content-between w-full"
      >
        Step {{ idx + 1 }}
        <BIconDashCircle
          class="text-xl text-red-500 cursor-pointer"
          :class="lastStep(cookingStep) ? 'block' : 'hidden'"
          @click="stepTwo.cookingSteps.splice(idx, 1)"
        />
      </label>
      <textarea
        v-model="cookingStep.step"
        class="min-h-[300px] px-2 rounded-sm mb-2 border-2 focus:outline-none focus:border-orange-400 w-full"
      />
    </div>
    <button
      class="max-w-[200px] text-sm border-2 border-[#FF642F] px-2 py-1 text-[#FF642F] hover:bg-[#FF642F] hover:text-white active:scale-95 transition-all duration-400 disabled:text-gray-500 disabled:hover:cursor-not-allowed disabled:hover:bg-gray-200 disabled:border-gray-500 place-self-end"
      @click.prevent="addCookingStep"
      :disabled="stepTwo.cookingSteps.length === 4"
    >
      Add next step
    </button>
  </form>
</template>
