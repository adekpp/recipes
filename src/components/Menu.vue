<template>
  <div>
    <button
      v-if="!isOpen"
      @click="isOpen = true"
      class="p-2 rounded-md active:bg-secondary-focus bg-neutral hover:bg-secondary-focus"
    >
      <svg
        class="fill-current h-5 w-5"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </button>

    <button
      v-if="isOpen"
      @click="isOpen = false"
      class="p-2 rounded-md active:bg-secondary-focus hover:bg-secondary-focus bg-neutral"
    >
      <svg
        class="fill-current h-5 w-5"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </button>
  </div>

  <div
    ref="target"
    v-if="isOpen"
    class="absolute bg-base-100 top-[37px] right-0 flex flex-col pl-4 py-2 w-[160px] text-left rounded-md z-50 border-l-2 border-accent"
  >
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onClickOutside } from "@vueuse/core";
import { watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const isOpen = ref(false);
    const target = ref(null);

    onClickOutside(target, (event) => (isOpen.value = false));
    watch(
      () => route.params,
      () => {
        isOpen.value = false;
      }
    );

    return { isOpen, target };
  },
};
</script>

<style></style>
