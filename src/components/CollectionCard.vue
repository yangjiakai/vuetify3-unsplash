<!--
* @Component: PhotoCard
* @Maintainer: J.K. Yang
* @Description:
-->
<script setup lang="ts">
import type { Collection } from "../types/unsplashTypes";
import { useUnsplashStore } from "../stores/unsplashStore";
const props = defineProps<{
  collection: Collection;
}>();

const unsplashStore = useUnsplashStore();
const snackbar = reactive({
  isShow: false,
  timeout: 1000,
  text: "",
});
</script>

<template>
  <div class="">
    <v-card class="collection-card shadow-1">
      <router-link :to="`collection/${collection.id}`">
        <div class="card-top">
          <v-row no-gutters>
            <v-col cols="8">
              <v-img
                height="304"
                aspect-ratio="1/2"
                cover
                :src="collection.cover_photo.urls.small"
                :lazy-src="collection.cover_photo.urls.small"
                class="mr-1"
              />
            </v-col>
            <v-col cols="4">
              <div class="flex-1 pb-1">
                <v-img
                  v-if="collection.preview_photos.length > 2"
                  height="150"
                  cover
                  :src="collection.preview_photos[1].urls.small"
                  :lazy-src="collection.preview_photos[1].urls.small"
                  class="mb-1"
                />
                <v-img
                  v-if="collection.preview_photos.length > 3"
                  height="150"
                  cover
                  :src="collection.preview_photos[2].urls.small"
                  :lazy-src="collection.preview_photos[2].urls.small"
                />
              </div>
            </v-col>
          </v-row>
        </div>
      </router-link>
      <v-card-title>
        <router-link :to="`collection/${collection.id}`">
          <h4 class="font-weight-bold">
            {{ collection.title }}
          </h4>
        </router-link>
      </v-card-title>
      <v-card-subtitle>
        <span> {{ collection.total_photos }} photos.</span>
        <span class="ml-2"
          >Curated by
          <router-link :to="`user/${collection.user.username}`">
            <b>{{ collection.user.username }}</b>
          </router-link>
        </span>
      </v-card-subtitle>

      <v-card-text>
        <div class="two-line" style="height: 100px">
          <v-chip
            v-for="item in collection.tags"
            :key="item.title"
            class="interest-chip ma-2"
            color="primary"
            label
          >
            <v-icon start icon="mdi-label-outline" />
            {{ item.title }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.collection-card {
  &:hover {
    box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 24px 0px !important;
  }

  .card-top {
    cursor: zoom-in;
  }
}
</style>
