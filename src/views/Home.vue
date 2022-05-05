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
import { defineComponent, toRaw } from "vue";
import AppHeader from "@/components/Header.vue";
import * as verida from "@verida/client-ts";
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
  mounted() {
    this.$options.veridaContext = null as null | verida.Context;
    this.$options.veridaAccount = null as null | veridaAccountModule.Account;
  },
  data(): {
    DID: null | string | undefined;
    contextName: null | string | undefined;
    isLoading: boolean;
  } {
    return {
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
    async onVeridaContextSet(vContext: verida.Context) {
      if (vContext != null) {
        // You are free to delete this logging

        // we have the veridaContext.        
        this.$options.veridaContext = vContext;

        console.log("Verida Context:");

        console.log(this.$options.veridaContext);
      
        // this is a Verida Account object
        this.$options.veridaAccount = this.$options.veridaContext.getAccount();

        console.log(this.$options.veridaAccount )

        // and this is how we get the DID
        this.DID = await this.$options.veridaAccount?.did();

        this.contextName = this.$options.veridaContext?.getContextName();
      } else {
        this.$options.veridaContext = null;
        this.$options.veridaAccount = null;
        this.DID = null;
      }
    },
    async issue() {
      if (this.$options.veridaContext) {
        try {
          console.log(this.$options.veridaContext);
          
          //let vCtx = toRaw(this.veridaContext);

          console.log("about to get messaging");
          this.isLoading = true;
          const messaging = await this.$options.veridaContext.getMessaging();
          //const messaging = await vCtx.getMessaging();
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
