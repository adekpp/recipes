<script setup>
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import Cropper from "cropperjs";
const emit = defineEmits(["image-cropped"]);
const selectedFile = ref(null);
const imageSrc = ref(null);
const fileReader = new FileReader();
const img = ref(null);
let cropper = null;
let preview = ref(null);
const imageInput = ref(null);
fileReader.onload = (event) => {
  imageSrc.value = event.target.result;
};
const imageName = ref("");

const handleCropImage = () => {
  cropper
    .getCroppedCanvas({
      width: 440,
      height: 400,
      imageSmoothingQuality: "high",
    })
    .toBlob((blob) => {
      preview.value = URL.createObjectURL(blob);
      emit("image-cropped", blob, imageName.value);
    }, "image/webp");
};

const handleChangeImage = () => {
  imageInput.value.click();
  fileReader.onload = (event) => {
    imageSrc.value = event.target.result;
    preview.value = null;
  };
};

const fileChanged = (e) => {
  const files = e.target.files;
  if (files.length) {
    selectedFile.value = files[0];
    imageName.value = files[0].name;
  }
};

onMounted(() => {
  cropper = new Cropper(img.value, {
    aspectRatio: 1.1 / 1,
    minCropBoxWidth: 440,
    viewMode: 3,
    dragMode: "none",
    background: false,
    cropBoxMovable: true,
    cropBoxResizable: false,
  });
});

onUnmounted(() => {
  cropper.destroy();
});

watch(
  imageSrc,
  () => {
    if (imageSrc.value) {
      cropper.replace(imageSrc.value);
    }
  },
  {
    flush: "post",
  }
);

watchEffect(() => {
  if (selectedFile.value) {
    fileReader.readAsDataURL(selectedFile.value);
  } else {
    imageSrc.value = null;
  }
});
</script>

<template>
  <div
    v-show="imageSrc && !preview"
    class="flex flex-col max-w-[500px] mx-auto"
  >
    <div class="my-2 md:w-full object-fill mx-auto overflow-hidden">
      <img class="block max-w-full" ref="img" :src="imageSrc" />
    </div>
  </div>
  <div
    v-show="preview"
    class="my-2 max-w-[440px] md:w-full object-fill mx-auto overflow-hidden"
  >
    <img class="max-w-full" :src="preview" />
  </div>
  <div
    class="flex flex-row max-w-[440px] w-full place-content-between mx-auto text-sm"
  >
    <button
      class="justify-center items-center bg-green-600 px-4 py-1 text-white font-normal hover:bg-green-700 active:scale-95"
      v-show="imageSrc && !preview"
      @click="handleCropImage"
    >
      Crop
    </button>
    <button
      class="justify-center items-center bg-[#FF642F] px-4 py-1 text-white font-normal hover:bg-[#fd5a23] active:scale-95"
      v-show="imageSrc"
      @click="handleChangeImage"
    >
      Change
    </button>
  </div>

  <form v-show="!imageSrc" class="flex flex-col place-items-center">
    <label
      for="dropzone-file"
      class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-[#FF642F] bg-white p-6 text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-[#FF642F]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>

      <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">
        Recipe Image
      </h2>

      <p class="mt-2 text-gray-500 tracking-wide">
        Click here to upload your recipe image.
      </p>
      <small class="mt-2 text-gray-500 tracking-wide">
        Max. size: 4 MB Allowed formats: PNG, JPG, WEBP.
      </small>

      <input
        id="dropzone-file"
        ref="imageInput"
        type="file"
        class="hidden"
        @change="fileChanged"
      />
    </label>
  </form>
</template>
