<!--
* @Component:
* @Maintainer: J.K. Yang
* @Description:
-->
<script setup lang="ts">
import { useUnsplashStore } from "../stores/unsplashStore";
import type { Photo } from "../types/unsplashTypes";
const unsplashStore = useUnsplashStore();
const showAdd = ref(false);

const removePhoto = (photo: Photo) => {
  unsplashStore.removeFromFavorite(photo);
};
</script>

<template>
  <v-card class="my-favorite">
    <v-toolbar height="64" class="pl-5" color="primary">
      <span> My favorite </span>
      <v-spacer />
      <v-btn icon variant="text">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-toolbar>
    <perfect-scrollbar
      v-if="unsplashStore.favoriteList.length > 0"
      class="favorate-container pa-3"
    >
      <transition-group name="fade" class="">
        <!-- <v-card
          class="my-2"
          v-for="item in unsplashStore.favoriteList"
          :key="item.id"
        >
          {{ item.id }}{{ item.user.username }}
        </v-card> -->

        <v-card
          v-for="item in unsplashStore.favoriteList"
          :key="item.id"
          class="d-flex align-center favorite-card mb-3"
        >
          <div style="width: 100px">
            <v-img
              :aspect-ratio="1"
              width="100"
              cover
              :src="item.urls.thumb"
              :lazy-src="item.urls.thumb"
            />
          </div>
          <div class="px-2 flex-1 two-line">
            {{ item.description || item.alt_description }}
          </div>
        </v-card>
      </transition-group>
    </perfect-scrollbar>

    <!-- <v-btn color="error" @click="deleteItem">delete</v-btn> -->
  </v-card>
</template>

<style scoped lang="scss">
.favorate-container {
  height: calc(100vh - 128px);
}

.favorite-card {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
  transition: all 0.5s;

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 24px 0px !important;
    transition: all 0.5s;
    border-right: 5px solid #344767;
  }
}
</style>
