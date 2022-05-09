<template>
  <app-header @setDid="setDid" />
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
import AppHeader from "@/components/Header.vue";
import VeridaClient from "@/helpers/VeridaClient";

const { VUE_APP_CONTEXT_NAME } = process.env;

export default defineComponent({
  name: "Home",
  components: {
    AppHeader,
  },
  data(): {
    did: string;
    contextName: string;
  } {
    return {
      did: VeridaClient.did,
      contextName: VUE_APP_CONTEXT_NAME,
    };
  },
  methods: {
    setDid(did: string) {
      this.did = did;
    },
  },
});
</script>
