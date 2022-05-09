<template>
  <header class="header">
    <div><img src="../assets/images/verida_logo.svg" alt="logo" /></div>
    <vda-account
      :logo="logo"
      :contextName="contextName"
      @onLogout="onLogout"
      @onError="onError"
      @onConnected="onSuccess"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VeridaClient from "@/helpers/VeridaClient";
import store from "store";
import * as verida from "@verida/client-ts/";

const { VUE_APP_CONTEXT_NAME, VUE_APP_LOGO } = process.env;

export default defineComponent({
  name: "Header",
  emits: ["setDid"],
  data() {
    return {
      contextName: VUE_APP_CONTEXT_NAME,
      logo: VUE_APP_LOGO,
      error: null,
    };
  },
  methods: {
    async onLogout() {
      store.remove(VUE_APP_CONTEXT_NAME);
      this.$router.push({ name: "Connect" });
    },
    onError(error: any) {
      this.error = error;
    },
    async onSuccess(veridaContext: verida.Context) {
      await VeridaClient.setContext(veridaContext);

      this.$emit("setDid", VeridaClient.did);
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  padding: 0 2rem;
  background: #ffffff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
}
</style>
