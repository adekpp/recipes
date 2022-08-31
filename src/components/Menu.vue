<template>
  <Popper v-bind="$attrs">
    <slot />
    <template #content="props">
      <slot
        @click="
          {
            close;
          }
        "
        name="content"
        v-bind="props"
      />
    </template>
  </Popper>
</template>

<script>
import { defineComponent, ref } from "vue";
import Popper from "vue3-popper";
import { watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Menu",
  components: {
    Popper,
  },

  setup() {
    const route = useRoute();
    const isOpen = ref(null);
    watch(
      () => route.params,
      () => {
        isOpen.value = false;
      }
    );

    return {
      isOpen,
    };
  },
});
</script>
