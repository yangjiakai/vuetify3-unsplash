<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useUnsplashStore } from "../stores/unsplashStore";
import { getTopicsApi } from "@/api/unsplashApi";
import type { Topic } from "@/types/unsplashTypes";
const unsplashStore = useUnsplashStore();

// Recent Searches
// 长度最多为5,不允许重复元素，最新元素进入以后，最旧元素删除

// Trending Searches
const trendingSearches = ref(["car", "book", "popular", "omega"]);

// Trending Topics
const trendingTopics = ref(["Film", "WallPapers", "Health", "Spirit"]);

const topics = ref<Topic[]>([]);

const initData = async () => {
  const topicsResponse = await getTopicsApi();
  topics.value = topicsResponse.data.splice(0, 5);
};

initData();
</script>

<template>
  <v-sheet class="pl-4 pb-4">
    <div v-if="unsplashStore.recentSearchList.length > 0">
      <p class="py-2">
        <span class="text-overline text-grey"> Recent Searches</span>
        <!-- <v-btn
          size="small"
          class="ml-2"
          variant="text"
          color="primary"
          @click="unsplashStore.clearRecentSearchList()"
          >Clear</v-btn
        > -->
      </p>
      <p>
        <v-chip
          class="mr-3"
          pill
          link
          variant="outlined"
          v-for="item in unsplashStore.recentSearchList"
        >
          <v-icon start icon="mdi-magnify"></v-icon>
          {{ item }}
        </v-chip>

        <!-- <v-btn
          size="small"
          class="mr-5"
          v-for="item in unsplashStore.recentSearchList"
          variant="outlined"
          >{{ item }}</v-btn
        > -->
      </p>
    </div>
    <div>
      <p class="my-3 text-overline text-grey">Trending Searches</p>
      <p>
        <v-chip
          class="mr-3"
          pill
          link
          v-for="item in trendingSearches"
          variant="outlined"
        >
          <v-icon start icon="mdi-trending-up"></v-icon>
          {{ item }}
        </v-chip>
      </p>
    </div>
    <div>
      <p class="my-3 text-overline text-grey">Trending Topics</p>
      <p>
        <template v-for="topic in topics" :key="topic.id">
          <v-hover v-slot="{ isHovering, props }">
            <v-chip
              v-bind="props"
              :elevation="isHovering ? 10 : 1"
              class="mr-5"
              pill
              link
              :to="`topic/${topic.slug}`"
            >
              <v-avatar start>
                <v-img cover :src="topic.cover_photo.urls.thumb"></v-img>
              </v-avatar>
              {{ topic.title }}
            </v-chip>
          </v-hover>
        </template>
      </p>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
