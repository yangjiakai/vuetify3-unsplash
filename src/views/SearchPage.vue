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
</script>

<template>
  <div class="">
    <v-container>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <v-card class="shadow-1">
            <v-card-title>
              <h3 class="text-h5">Search Result</h3>
            </v-card-title>
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
