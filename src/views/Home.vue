<template>
  <app-header />
  <div style="text-align: center">
    <h1>Home Page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/Header.vue";

export default defineComponent({
  name: "Home",
  components: {
    AppHeader,
  },
  methods: {},
});
</script>

