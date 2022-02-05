<template>
  <header class="header">
    <div><img src="../assets/images/verida_logo.svg" alt="logo" /></div>
    <vda-account :logo="logo" :contextName="contextName" :onLogout="onLogout" />
  </header>
</template>

<script>
import { defineComponent } from "vue";
import { CONTEXT_NAME, LOGO } from "@/constant";

export default defineComponent({
  name: "Header",
  data() {
    return {
      contextName: CONTEXT_NAME,
      logo: LOGO,
    };
  },
  methods: {
    async onLogout() {
      this.$router.push({ name: "Connect" });
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
