<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: Topic Page 
-->
<script setup lang="ts">
import {
  getTopicsApi,
  getTopicApi,
  getTopicPhotosApi,
} from "@/api/unsplashApi";
import type { Topic, Photo } from "@/types/unsplashTypes";
import PhotoCard from "@/components/PhotoCard.vue";
import TopicsBar from "@/components/TopicsBar.vue";

const route = useRoute();

const topics = ref<Topic[]>([]);
const banner = ref<Topic>();
const topicPhotos = ref<Photo[]>([]);
const slug = ref<string | string[]>(route.params.slug);

const initData = async () => {
  const topicsResponse = await getTopicsApi();
  topics.value = topicsResponse.data;

  const photosResponse = await getTopicPhotosApi(slug.value);
  topicPhotos.value = photosResponse.data;

  const bannerResponse = await getTopicApi(slug.value);
  banner.value = bannerResponse.data;

  console.log(banner.value);
};

initData();
</script>

<template>
  <div class="">
    <TopicsBar />
    <v-parallax
      v-if="banner"
      height="800"
      :src="banner.cover_photo.urls.full"
      class=""
    >
      <v-sheet
        color="rgba(0,0,0,.3)"
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <v-card width="800" elevation="0" color="transparent">
          <h1 class="text-h2 font-weight-black mb-4">{{ banner.title }}</h1>
          <h4 class="subheading">
            {{ banner.description }}
          </h4>
        </v-card>
      </v-sheet>
    </v-parallax>
    <v-sheet
      class="mx-auto my-5 pa-5"
      max-width="1600"
      v-if="topicPhotos.length > 0"
      min-height="80vh"
    >
      <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="photo in topicPhotos"
          :key="photo.id"
        >
          <PhotoCard :photo="photo"></PhotoCard>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<style scoped lang="scss"></style>
