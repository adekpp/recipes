<template>
  <div class="flex flex-col md:flex-row justify-center gap-y-8 md:gap-x-8">
    <div v-if="preview" class="relative">
      <img
        class="relative object-cover mx-auto max-w-[376px] max-h-[376px] rounded-md"
        :src="preview"
        alt=""
      />
      <div
        @click="handleDeleteCover"
        class="absolute top-2 right-1 bg-white rounded-full p-1"
      >
        <BIconXCircleFill
          class="text-xl text-red-700 hover:text-red-600 active:scale-95"
        />
      </div>
    </div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-y-5">
      <label v-if="!preview">
        <input
          @change="handleChange"
          type="file"
          class="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
        />
      </label>

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
          >Tag e.g. #dinner
        </label>
        <button @click.prevent="handleAddTag">
          <BIconPlusCircleFill
            class="z-50 absolute top-4 right-5 text-2xl text-accent hover:text-accent-focus active:scale-95"
          />
        </button>
        <small>Click on tag to delete (max. 3 tags)</small>
        <ul
          class="inline-block float-right italic"
          v-for="(tag, index) in newRecipe.tags"
          :key="tag"
        >
          <li @click="deleteTag(index)" class="mr-2 text-secondary-content">
            <small>{{ tag }}</small>
          </li>
        </ul>
      </div>

      <div class="relative">
        <input
          v-model="ingredient"
          type="text"
          id="ingredients"
          aria-describedby="ingredients_text"
          class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="ingredients"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >Ingredient e.g. 4 tbsp olive oil
        </label>

        <button @click.prevent="handleAddIngredient">
          <BIconPlusCircleFill
            class="z-50 absolute top-4 right-5 text-2xl text-accent hover:text-accent-focus active:scale-95"
          />
        </button>
        <small>Click on ingredient to delete </small>
        <ul v-for="(ing, index) in newRecipe.ingredients" :key="ing">
          <li
            @click="deleteIngredient(index)"
            class="mr-2 text-secondary-content"
          >
            - {{ ing }}
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
      <button class="btn btn-primary btn-sm text-white">Add</button>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import getUser from "../composables/getUser";
import { serverTimestamp } from "firebase/firestore";
import { BIconPlusCircleFill, BIconXCircleFill } from "bootstrap-icons-vue";
export default {
  emits: ["add-doc"],
  components: {
    BIconPlusCircleFill,
    BIconXCircleFill,
  },
  setup(props, ctx) {
    const { user } = getUser();
    const tag = ref("");
    const ingredient = ref("");
    const preview = ref(null);
    const recipeCover = ref(null);
    const newRecipe = reactive({
      cover: null,
      title: "",
      tags: [],
      desc: "",
      time: "",
      servings: "",
      ingredients: [],
      uid: user.value.uid,
      createdAt: serverTimestamp(),
    });

    const handleAddTag = () => {
      if (tag.value) {
        newRecipe.tags.push(tag.value);
        tag.value = "";
      }
    };

    const handleAddIngredient = () => {
      if (ingredient.value) {
        newRecipe.ingredients.push(ingredient.value);
        ingredient.value = "";
      }
    };

    const deleteIngredient = (index) => {
      newRecipe.ingredients.splice(index, 1);
    };

    const deleteTag = (index) => {
      newRecipe.tags.splice(index, 1);
    };

    const handleChange = async (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        preview.value = URL.createObjectURL(selectedFile);
        recipeCover.value = selectedFile;
      }
    };

    const handleDeleteCover = () => {
      preview.value = null;
      recipeCover.value = null;
    };

    const handleSubmit = () => {
      ctx.emit("add-doc", newRecipe, recipeCover);
    };

    return {
      newRecipe,
      tag,
      ingredient,
      handleAddTag,
      handleAddIngredient,
      deleteIngredient,
      handleSubmit,
      handleChange,
      preview,
      deleteTag,
      handleDeleteCover,
    };
  },
};
</script>
