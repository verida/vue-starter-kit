<template>
  <vda-login
    :onError="onError"
    :onSuccess="onSuccess"
    :contextName="contextName"
    :logo="logo"
    loginText="Verida Vue Starter Kit"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

const { VUE_APP_CONTEXT_NAME, VUE_APP_LOGO } = process.env;

export default defineComponent({
  name: "Connect",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      error: null,
      contextName: VUE_APP_CONTEXT_NAME,
      logo: VUE_APP_LOGO,
    };
  },
  methods: {
    onSuccess(context: any) {
      console.log("App context", context);
      this.$router.push({ name: "Home" });
    },
    onError(error: Error) {
      console.log("Login Error", error);
    },
  },
});
</script>
