<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import SearchInput from "@/components/SearchInput.vue";
import { useUnsplashStore } from "../stores/unsplashStore";
const unsplashStore = useUnsplashStore();
</script>

<template>
  <v-app-bar elevation="1">
    <!-- <template v-slot:prepend>
      <Icon class="mx-3" width="30" icon="logos:bubble-icon" />
    </template> -->

    <v-toolbar-title class="font-weight-bold">
      <RouterLink to="/">
        <img width="100" src="@/assets/logo.svg" />
      </RouterLink>
    </v-toolbar-title>
    <template v-slot:append>
      <SearchInput />
      <!-- <v-btn
        icon="mdi-dots-vertical"
        @click="unsplashStore.showSideBar = !unsplashStore.showSideBar"
      ></v-btn> -->
    </template>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<style scoped lang="scss"></style>
