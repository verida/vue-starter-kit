<template>
  <vda-login
    :onError="onError"
    :onSuccess="onSuccess"
    :contextName="contextName"
    :logo="logo"
    :loginText="loginText"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "store";
import * as verida from "@verida/client-ts/";

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
    onSuccess(context: verida.Context) {
      // user has successfully logged in

      //save login status in Local-storage
      // This is checked in /router/index.ts
      store.set(VUE_APP_CONTEXT_NAME, true);

      // Forward to the home page
      this.$router.push({ name: "Home" });
    },
    onError(error: Error) {
      console.log("Login Error", error);
    },
  },
});
</script>
