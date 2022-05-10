<template>
  <app-header @onVeridaContextSet="onVeridaContextSet" />
  <div style="text-align: center">
    <h1>{{ contextName }}: Home Page</h1>

    <div>
      This
      <a href="https://developers.verida.io/docs/concepts/application-contexts"
        >application context</a
      >
      is called: <i>{{ contextName }}</i
      >. Change this by editing the value of VUE_APP_CONTEXT_NAME in the .env
      file included in this project.
    </div>

    <div>You logged in with DID {{ did }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Context } from "@verida/client-ts";
import { mapState } from "vuex";
import { Account } from "@verida/account";
import AppHeader from "@/components/Header.vue";

// const { VUE_APP_CONTEXT_NAME } = process.env;

interface IData {
  veridaContext: Context | null;
  did: string;
  contextName: string | undefined;
  veridaAccount: Account | null;
}

export default defineComponent({
  name: "Home",
  components: {
    AppHeader,
  },
  computed: mapState(["veridaContext"]),
  mounted() {
    this.$options.veridaContext = null as null | Context;
    this.$options.veridaAccount = null as null | Account;
  },
  created() {
    this.$emitter.on("veridaConnect", (vContext: Context) => {
      this.onVeridaContextSet(vContext);
    });
  },
  data(): IData {
    return {
      veridaContext: null,
      veridaAccount: null,
      did: "",
      contextName: "",
    };
  },
  methods: {
    setDid(did: string) {
      this.did = did;
    },

    async onVeridaContextSet(vContext: Context) {
      if (vContext !== null) {
        // console.log("enter", vContext);
        // You are free to delete this logging
        // we have the veridaContext.
        this.$options.veridaContext = vContext;

        this.contextName = this.veridaContext?.getContextName();

        // this is a Verida Account object
        this.$options.veridaAccount = this.veridaContext.getAccount();

        // and this is how we get the DID
        // this.did = await this.veridaAccount?.did();
      }
    },
  },
});
</script>
