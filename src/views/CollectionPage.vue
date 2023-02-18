<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import {
  getCollectionApi,
  getCollectionPhotosApi,
  getCollectionRelatedApi,
} from "@/api/unsplashApi";
import PhotoCard from "@/components/PhotoCard.vue";
import CollectionCard from "@/components/CollectionCard.vue";

import type { Photo, Collection } from "@/types/unsplashTypes";
const route = useRoute();
const isLoading = ref(false);
const collectionData = ref<Collection>();
const collectionPhotosData = ref<Photo[]>([]);
const collectionRelatedData = ref<Collection[]>([]);

const initData = async () => {
  isLoading.value = true;
  const collectionResponse = await getCollectionApi(route.params.id);
  const collectionPhotosResponse = await getCollectionPhotosApi(
    route.params.id
  );
  const collectionSimilarResponse = await getCollectionRelatedApi(
    route.params.id
  );

  collectionData.value = collectionResponse.data;
  collectionPhotosData.value = collectionPhotosResponse.data;
  collectionRelatedData.value = collectionSimilarResponse.data;
  isLoading.value = false;
};

initData();
</script>

<template>
  <div class="">
    <v-parallax
      v-if="collectionData"
      height="600"
      :src="collectionData.cover_photo.urls.full"
      class=""
    >
      <v-sheet
        color="rgba(0,0,0,.3)"
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <v-card
          class="text-center"
          width="800"
          elevation="0"
          color="transparent"
        >
          <h1 class="text-h2 font-weight-black mb-4">
            {{ collectionData.title }}
          </h1>
          <h4 class="subheading">
            {{ collectionData.description }}
          </h4>
        </v-card>
      </v-sheet>
    </v-parallax>
    <v-sheet
      class="mx-auto my-5 pa-5"
      max-width="1600"
      v-if="collectionPhotosData.length > 0"
      min-height="80vh"
    >
      <h2 class="text-h6 mb-5" v-if="collectionData">
        {{ collectionData.total_photos }} Photos
      </h2>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="photo in collectionPhotosData"
          :key="photo.id"
        >
          <PhotoCard :photo="photo"></PhotoCard>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet class="mx-auto pa-5" max-width="1600" elevation="0">
      <h1 class="mb-5 text-h6">You might also like</h1>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          lg="4"
          v-for="collection in collectionRelatedData"
          :key="collection.id"
        >
          <CollectionCard :collection="collection"></CollectionCard>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<style scoped lang="scss"></style>
