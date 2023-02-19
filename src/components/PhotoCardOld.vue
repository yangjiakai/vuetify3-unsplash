<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import type { Photo } from "@/types/unsplashTypes";
import { useUnsplashStore } from "@/stores/unsplashStore";
const unsplashStore = useUnsplashStore();
const props = defineProps<{
  photo: Photo;
}>();

// 照片详情页
const photoDialog = ref(false);
// 当前详情页照片ID
const photoId = ref("");
// 打开照片详情页
const openPhotoDialog = (id: string) => {
  photoId.value = id;
  photoDialog.value = true;
};

const snackbar = reactive({
  isShow: false,
  timeout: 1000,
  text: "",
});

/**
 * 照片加入或者移出本地收藏
 * @param Photo 照片对象
 */
const toggleLike = (photo: Photo) => {
  if (!photo.liked_by_user) {
    snackbar.text = "Added to your favorite";
    snackbar.isShow = true;
    unsplashStore.addToFavorite(photo);
    photo.likes++;
  } else {
    snackbar.text = "Removed from your favorite";
    snackbar.isShow = true;
    unsplashStore.removeFromFavorite(photo);
    photo.likes--;
  }
  photo.liked_by_user = !photo.liked_by_user;
};

/**
 * 下载当前照片原图
 * @param Photo 照片对象
 */
const downloadPhoto = (photo: Photo) => {
  const a = document.createElement("a");
  a.href = photo.links.download + "&force=true";
  a.download = photo.id + ".jpg";
  a.click();
  snackbar.text = "Downloading now, please wait";
  snackbar.timeout = 2000;
  snackbar.isShow = true;
  snackbar.timeout = 1000;
};
</script>

<template>
  <v-card
    width="100%"
    class="info-card photo-card d-flex flex-column"
    height="480"
  >
    <div>
      <v-img
        class="align-end text-white"
        :src="photo.urls.small"
        :lazy-src="photo.urls.small"
        height="300"
        cover
        @click="openPhotoDialog(photo.id)"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <v-card-title class="card-title">
          <RouterLink class="text-white" :to="`/user/${photo.user.username}`">
            <v-avatar size="avatarSize" class="mr-2">
              <img :src="photo.user.profile_image.small" alt="alt" />
            </v-avatar>
            {{ photo.user.username }}
          </RouterLink>
        </v-card-title>
      </v-img>
    </div>

    <v-card-subtitle class="mt-5">
      <div>size: height:{{ photo.height }} width:{{ photo.width }}</div>
    </v-card-subtitle>

    <v-card-text>
      {{ photo.alt_description }}
    </v-card-text>

    <v-card-actions>
      <v-btn @click="toggleLike(photo)">
        <v-icon
          v-if="photo.liked_by_user"
          start
          color="pink"
          icon="mdi-heart"
          class="heartBeat"
        ></v-icon>
        <v-icon v-else start icon="mdi-heart-outline"></v-icon>
        Like({{ photo.likes }})
        <v-tooltip
          activator="parent"
          location="bottom"
          class=""
          :text="photo.liked_by_user ? 'Liked' : 'Like'"
        ></v-tooltip>
      </v-btn>
      <v-spacer></v-spacer>
      <v-tooltip location="bottom" text="Download">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-download"
            @click="downloadPhoto(photo)"
          >
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip location="bottom" text="Add To Collection">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-plus"> </v-btn>
        </template>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="scss"></style>
