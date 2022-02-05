<template>
  <vda-login
    :onError="onError"
    :onSuccess="onSuccess"
    :contextName="contextName"
    :logo="logo"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CONTEXT_NAME, LOGO } from "@/constant";

export default defineComponent({
  name: "Connect",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      error: null,
      contextName: CONTEXT_NAME,
      logo: LOGO,
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
