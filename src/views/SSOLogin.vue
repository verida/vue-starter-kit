<template>
  <vda-login
    @onError="onError"
    @onConnected="onConnected"
    :contextName="contextName"
    :logo="logo"
    :loginText="loginText"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VeridaClient from "@/helpers/VeridaClient";
import store from "store";

const { VUE_APP_CONTEXT_NAME, VUE_APP_LOGO, VUE_APP_LOGIN_TEXT } = process.env;

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
      loginText: VUE_APP_LOGIN_TEXT,
    };
  },
  methods: {
    onConnected(context: any) {
      // user has successfully logged in

      //save login status in Local-storage
      // This is checked in /router/index.ts
      store.set(VUE_APP_CONTEXT_NAME, true);
      // Forward to the home page

      VeridaClient.setContext(context);

      this.$router.push({ name: "Home" });
    },
    onError(error: Error) {
      console.log("Login Error", error);
    },
  },
});
</script>
