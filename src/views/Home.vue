<template>
  <app-header />
  <div style="text-align: center">
    <h1>{{ contextName }}: Home Page</h1>

    <button @click="issue" :disabled="isLoading">
      {{ isLoading ? "Loading..." : "Show problem" }}
    </button>
    <span>open console to view issue</span>

    <div>
      This
      <a href="https://developers.verida.io/docs/concepts/application-contexts"
        >application context</a
      >
      is called: <i>{{ contextName }}</i
      >. Change this by editing the value of VUE_APP_CONTEXT_NAME in the .env
      file included in this project.
    </div>

    <div>You logged in with DID {{ DID }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/Header.vue";
import * as verida from "@verida/client-ts/";
import * as veridaAccountModule from "@verida/account";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $VeridaHelper: any;
  }
}

export default defineComponent({
  name: "Home",
  components: {
    AppHeader,
  },
  data(): {
    veridaContext: null | verida.Context;
    veridaAccount: null | veridaAccountModule.Account;
    DID: null | string | undefined;
    contextName: null | string | undefined;
    isLoading: boolean;
  } {
    return {
      veridaContext: null,
      veridaAccount: null,
      DID: null,
      contextName: null,
      isLoading: false,
    };
  },
  async created() {
    this.$VeridaHelper.on("connected", async () => {
      this.onVeridaContextSet(this.$VeridaHelper.context);
    });
  },
  methods: {
    async onVeridaContextSet(veridaContext: any) {
      if (veridaContext != null) {
        // You are free to delete this logging
        console.log("Verida Context:");

        // console.log(veridaContext);

        // we have the veridaContext.
        this.veridaContext = veridaContext;

        // this is a Verida Account object
        this.veridaAccount = await veridaContext.account;

        // and this is how we get the DID
        this.DID = await this.veridaAccount?.did();

        this.contextName = this.veridaContext?.getContextName();
      } else {
        this.veridaContext = null;
        this.veridaAccount = null;
        this.DID = null;
      }
    },
    async issue() {
      if (this.veridaContext) {
        try {
          console.log("about to get messaging");
          this.isLoading = true;
          const messaging = await this.veridaContext.getMessaging();
          console.log("we have messaging", messaging);
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
});
</script>
