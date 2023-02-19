<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { getTopicsApi } from "@/api/unsplashApi";
import type { Topic } from "@/types/unsplashTypes";
const topics = ref<Topic[]>([]);

const initData = async () => {
  const topicsResponse = await getTopicsApi();
  topics.value = topicsResponse.data;
};

initData();
</script>

<template>
  <v-sheet class="pa-3">
    <template v-for="topic in topics" :key="topic.id">
      <v-hover v-slot="{ isHovering, props }">
        <v-chip
          v-bind="props"
          :elevation="isHovering ? 10 : 1"
          class="mr-2"
          pill
          link
          :to="`/topic/${topic.id}`"
        >
          <v-avatar start>
            <v-img cover :src="topic.cover_photo.urls.thumb"></v-img>
          </v-avatar>

          {{ topic.title }}
        </v-chip>
      </v-hover>
    </template>

    <RouterLink
      :to="{
        name: 'unsplash-topic',
        params: { id: topic.id },
      }"
      v-for="topic in topics"
      :key="topic.id"
      >{{ topic.title }}
    </RouterLink>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
