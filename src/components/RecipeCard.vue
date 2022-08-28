<template>
  <div
    class="flex flex-col w-72 md:w-[600px] md:flex-row overflow-hidden bg-white rounded-lg shadow-xl mt-4 mx-2"
  >
    <!-- media -->
    <div class="h-48 w-auto">
      <img
        class="inset-0 h-full w-full object-cover object-center"
        :src="recipe.cover"
      />
    </div>
    <!-- content -->
    <div class="w-full py-4 px-6 flex flex-col justify-between">
      <h3 class="font-semibold text-xl text-primary leading-tight truncate">
        {{ recipe.title }}
      </h3>
      <ul>
        <li
          class="inline-block text-secondary mr-2 text-sm"
          v-for="tag in recipe.tags"
          :key="tag"
        >
          <span>#{{ tag }}</span>
        </li>
      </ul>
      <div
        class="mt-2 mb-3 md:mb-0 text-gray-900 flex flex-row items-center gap-x-1"
      >
        <div class="tooltip flex flex-row" data-tip="Ingredients">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-secondary-focus"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="mr-3 text-accent">{{ ingredientsCount }}</span>
        </div>
        <div class="tooltip flex flex-row gap-x-1" data-tip="Time">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-secondary-focus"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-accent">{{ recipe.time }}min.</span>
        </div>
      </div>
      <div></div>
      <button class="btn btn-sm btn-primary text-white normal-case">
        Cook
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { BIconJournalText, BIconClock } from "bootstrap-icons-vue";
export default {
  props: ["recipe"],
  components: {
    BIconJournalText,
    BIconClock,
  },

  setup(props) {
    const shortDesc = computed(() => {
      return props.recipe.desc.slice(0, 60);
    });

    const ingredientsCount = computed(() => {
      return props.recipe.ingredients.length;
    });

    return { shortDesc, ingredientsCount };
  },
};
</script>

<style scoped>
/* li:after {
  content: ", \00a0";
}

li:last-child:after {
  content: "";
} */
</style>
