<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useFocusWithin } from "@vueuse/core";
import { useUnsplashStore } from "../stores/unsplashStore";
import SearchPanel from "../components/SearchPanel.vue";
import { searchAllApi, searchPhotosApi } from "@/api/unsplashApi";
import { Icon } from "@iconify/vue";
const unsplashStore = useUnsplashStore();
const router = useRouter();
const route = useRouter();

const search = async () => {
  const params = {
    query: unsplashStore.searchKey,
    per_page: 30,
    page: 1,
  };
  // if unsplashStore.searchKey is empty，return
  if (!unsplashStore.searchKey) {
    return;
  } else {
    unsplashStore.addToRecentSearchList();
  }

  const result = await searchPhotosApi(params);
  if (result.status === 200) {
    unsplashStore.updateSearchResult(result.data);
  } else {
    console.log(result);
  }

  if (route.currentRoute.value.name !== "unsplash-search") {
    router.push({
      name: "unsplash-search",
    });
  }
};
</script>

<template>
  <v-card elevation="0" width="1000" class="pa-5">
    <v-text-field
      v-model="unsplashStore.searchKey"
      variant="solo"
      density="compact"
      append-inner-icon="mdi-magnify"
      @click:append-inner="search"
      @keyup.enter="search"
      hide-details
    ></v-text-field>
  </v-card>
</template>

<style scoped lang="scss"></style>
