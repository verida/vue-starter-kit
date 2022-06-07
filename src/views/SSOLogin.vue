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
import { mapMutations } from "vuex";
import { APP_CONTEXT_NAME, APP_LOGO, APP_LOGIN_TEXT } from "../constant";

export default defineComponent({
  name: "Connect",
  props: {},
  components: {},
  emits: ["setLogin"],
  data() {
    return {
      veridaContext: null,
      isLoading: false,
      error: null,
      contextName: APP_CONTEXT_NAME,
      logo: APP_LOGO,
      loginText: APP_LOGIN_TEXT,
    };
  },
  methods: {
    ...mapMutations(["setContext"]),
    onConnected(context: any) {
      this.setContext(context);
      this.$router.push({ name: "Home" });
    },

    onError(error: Error) {
      console.log("Login Error", error);
    },
  },
});
</script>
