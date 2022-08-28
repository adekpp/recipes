<template>
  <div class="grid place-content-center mt-9">
    <div class="hidden md:flex flex-col items-center">
      <button
        @click="handleFacebookLogin"
        class="btn btn-md btn-secondary flex gap-x-2"
      >
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
      <button
        @click="handleGoogleLogin"
        class="btn btn-md btn-secondary flex gap-x-2"
      >
        <img :src="GoogleIcon" class="w-6" alt="" />
        Login with Google
      </button>
    </div>
    <div class="md:hidden flex flex-col items-center">
      <button
        @click="handleFacebookLoginMobile"
        class="btn btn-md btn-secondary flex gap-x-2"
      >
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
      <button
        @click="handleGoogleLoginMobile"
        class="btn btn-md btn-secondary flex gap-x-2"
      >
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

export default {
  setup() {
    const router = useRouter();
    const {
      loginWithGoogle,
      loginWithGoogleMobile,
      loginWithFacebook,
      loginWithFacebookMobile,
    } = useLogin();
 

    const handleGoogleLogin = async () => {
      await loginWithGoogle();
      router.push("/")
    };

    const handleGoogleLoginMobile = async () => {
      await loginWithGoogleMobile();
    };

    const handleFacebookLogin = async () => {
      await loginWithFacebook();
      router.push("/")
    };

    const handleFacebookLoginMobile = async () => {
      await loginWithFacebookMobile();
    };
    return {
      GoogleIcon,
      FacebookIcon,
      handleGoogleLogin,
      handleFacebookLogin,
      handleFacebookLoginMobile,
      handleGoogleLoginMobile,
    };
  },
};
</script>

<style></style>
