<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-y-5">
    <div>
      <label>
        <input
          type="file"
          class="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
        />
      </label>
    </div>

    <div class="relative">
      <input
        v-model="newRecipe.title"
        type="text"
        id="title"
        aria-describedby="title_text"
        class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        for="title"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        >Title</label
      >
    </div>

    <div class="relative">
      <input
        @keypress.enter="handleAddTag"
        v-model="tag"
        type="text"
        id="tags"
        aria-describedby="tags_text"
        class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        for="tags"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        >Tags (max 3)</label
      >
      <small>Add tag by pressing ENTER</small>
      <ul
        class="inline-block float-right italic"
        v-for="tag in newRecipe.tags"
        :key="tag"
      >
        <li class="mr-2 text-secondary-content">
          <small>{{ tag }}</small>
        </li>
      </ul>
    </div>

    <div class="relative">
      <textarea
        v-model="newRecipe.desc"
        rows="6"
        id="desctription"
        aria-describedby="desctription_text"
        class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        for="desctription"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        >Cooking instructions</label
      >
    </div>

    <div class="flex flex-row gap-x-3">
      <div class="relative">
        <input
          v-model="newRecipe.time"
          type="number"
          id="time"
          aria-describedby="time_text"
          class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <p
          class="hidden text-gray-900 absolute top-1/2 -translate-y-1/3 right-8 peer-focus:block text-sm"
        >
          min.
        </p>
        <label
          for="time"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          ><small>Time(cooking + preparation)</small></label
        >
      </div>
      <div class="relative">
        <input
          v-model="newRecipe.servings"
          type="number"
          id="servings"
          aria-describedby="servings_text"
          class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          autocomplete="false"
        />
        <label
          for="servings"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >Servings</label
        >
      </div>
    </div>
    <button class="btn btn-accent btn-sm text-white">Add</button>
  </form>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
export default {
  setup() {
    const tag = ref("");
    const newRecipe = reactive({
      cover: null,
      title: "",
      tags: [],
      desc: "",
      time: "",
      servings: "",
    });

    const handleAddTag = () => {
      if (tag.value) {
        newRecipe.tags.push(tag.value);
        tag.value = "";
      }
    };

    const handleSubmit = () => {
        console.log(newRecipe)
    }

    return {
      newRecipe,
      tag,
      handleAddTag,
      handleSubmit
    };
  },
};
</script>

<style></style>
