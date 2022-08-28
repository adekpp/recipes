<template>
  <!-- Hardcoded "hover", "openDelay" and "closeDelay" -->
  <Popper v-bind="$attrs">
    <slot />
    <template #content="props">
      <slot name="content" v-bind="props" />
    </template>
  </Popper>
</template>

<script>
import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default defineComponent({
  name: "PopperWrapper",
  components: {
    Popper,
  },
});
</script>
