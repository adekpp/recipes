<script setup>
import { useTags } from "../composables/useTags";
const { tags, fetchTags } = useTags();
await fetchTags();
</script>

<template>

  <div
    class="bg-[#ff642f] flex px-4 py-1 rounded-md place-content-center text-white hover:rotate-2 hover:bg-[#ff551d] transition-all cursor-pointer"
    v-for="tag in tags.slice(0,10)"
    :key="tag"
  >
  <router-link :to="{ name: 'Tag', params: { tag: tag } }">
    {{ tag }}
</router-link>
  </div>
</template>
