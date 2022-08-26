<template>
  <button @click="handleLogin" class="btn btn-primary btn-lg">
    Signin with google
  </button>
</template>

<script>
import useLogin from "../composables/useLogin";

export default {
  setup() {
    const { loginWithGoogle } = useLogin();
    const handleLogin = async () => {
      await loginWithGoogle();
    };
    return {
      handleLogin,
    };
  },
};
</script>

<style></style>
