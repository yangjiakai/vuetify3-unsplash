<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useUnsplashStore } from "@/stores/unsplashStore";
import PhotoCard from "@/components/PhotoCard.vue";
const unsplashStore = useUnsplashStore();

const photos = computed(() => {
  return unsplashStore.searchResult.results;
});

const total = computed(() => {
  const total = unsplashStore.searchResult.total;
  if (unsplashStore.searchResult.total == "10000") {
    return " (total: 10000+)";
  }
  return ` (total: ${total})`;
});
</script>

<template>
  <div class="">
    <v-container>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <v-card class="shadow-1">
            <v-card-title class="pa-4 d-flex align-end">
              <h2 class="font-weight-bold text-grey-darken-2">
                {{ unsplashStore.searchKey }}
              </h2>
              <div class="text-body-1 ml-2">{{ total }}</div>
            </v-card-title>

            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4" v-for="photo in photos" :key="photo.id">
                  <PhotoCard :photo="photo"></PhotoCard>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss"></style>
