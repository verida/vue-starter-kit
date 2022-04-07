<template>
  <app-header @veridaContextSet="onVeridaContextSet" />
  <div style="text-align: center">
    <h1>{{contextName}}: Home Page</h1>
    

    <div>
      This <a href="https://developers.verida.io/docs/concepts/application-contexts">application context</a> is called: <i>{{contextName}}</i>. 
      Change this by editing the value of VUE_APP_CONTEXT_NAME in the .env file included in this project. 
    </div>

    <div>
      You logged in with DID {{DID}}
    </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/Header.vue";
import * as verida from "@verida/client-ts/";
import * as veridaAccountModule from "@verida/account"

export default defineComponent({
  name: "Home",
  components: {
    AppHeader,
  },
  data(): {
    veridaContext: null | verida.Context,
    veridaAccount: null | veridaAccountModule.Account,
    DID:  null | string | undefined,
    contextName: null | string | undefined,
  } {
    return {
      veridaContext: null,
      veridaAccount: null,
      DID: null,
      contextName: null,
    };
  },
  methods: {
    async onVeridaContextSet(veridaContext: any) {
      if (veridaContext != null) {

        // You are free to delete this logging
        console.log("Verida Context:")
        console.log(veridaContext)

        // we have the veridaContext. 
        this.veridaContext = await veridaContext;

        // this is a Verida Account object
        this.veridaAccount = await veridaContext.account;

        // and this is how we get the DID
        this.DID = await this.veridaAccount?.did();

        this.contextName = await this.veridaContext?.getContextName()
      } else {
        this.veridaContext = null;
        this.veridaAccount = null;
        this.DID = null;
      }
    },
  },
});
</script>
