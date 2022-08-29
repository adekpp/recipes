<template>
  <div class="grid place-content-center h-full">
    <div class="flex flex-col items-center max-w-[300px]">
      <button @click="login" class="btn w-full btn-secondary flex gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.0"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 50 50"
          style="null"
          fill="#4267B2"
        >
          <path
            d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"
          ></path>
        </svg>

        Login with Facebook
      </button>
      or
      <button @click="login" class="btn w-full btn-secondary flex gap-x-2">
        <img :src="GoogleIcon" class="w-6" alt="" />
        Login with Google
      </button>
    </div>
  </div>
</template>

<script>
import useLogin from "../composables/useLogin";
import GoogleIcon from "../assets/googleIcon.svg";
import FacebookIcon from "../assets/facebookIcon.svg";
import { useRouter } from "vue-router";
import { onMounted, onUnmounted, onUpdated, ref } from "vue";

export default {
  setup() {
    const width = ref(null);
    const router = useRouter();
    const {
      loginWithGoogle,
      loginWithGoogleMobile,
      loginWithFacebook,
      loginWithFacebookMobile,
    } = useLogin();

    const login = async ($event) => {
      const isMobile = handleResize();
      if ($event.target.innerText === "LOGIN WITH GOOGLE" && isMobile) {
        await loginWithGoogleMobile();
      }
      if ($event.target.innerText === "LOGIN WITH GOOGLE" && !isMobile) {
        await loginWithGoogle();
      }
      if ($event.target.innerText === "LOGIN WITH FACEBOOK" && isMobile) {
        await loginWithFacebookMobile();
      }
      if ($event.target.innerText === "LOGIN WITH FACEBOOK" && !isMobile) {
        await loginWithFacebook();
      }
      router.push('/')
    };

    const handleResize = () => window.innerWidth < 768;

    onMounted(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      GoogleIcon,
      FacebookIcon,
      login,
    };
  },
};
</script>

<style></style>
