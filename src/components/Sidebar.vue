<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import FavoriteCard from "./FavoriteCard.vue";
import { useUnsplashStore } from "../stores/unsplashStore";
const unsplashStore = useUnsplashStore();
</script>

<template>
  <v-navigation-drawer
    temporary
    v-model="unsplashStore.showSideBar"
    location="right"
    width="400"
    color="rgba(40,40,40,.1)"
  >
    <FavoriteCard />
  </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
