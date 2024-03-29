<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import type { Photo } from "@/types/unsplashTypes";
import PhotoCard from "@/components/PhotoCard.vue";
import PhotoInfoChartCard from "@/components/PhotoInfoChartCard.vue";
import CollectionCard from "@/components/CollectionCard.vue";
import { getPhotoRelatedApi, getPhotoApi } from "@/api/unsplashApi";

// Props
const props = defineProps({
  photoId: {
    type: String,
    default: "",
    required: true,
  },
});

const photo = ref<Photo>();
const relatedPhotos = ref<Photo[]>([]);
const isLoading = ref(false);

const initData = async () => {
  isLoading.value = true;
  const photoResponse = await getPhotoApi(props.photoId);
  const relatedResponse = await getPhotoRelatedApi(props.photoId);
  photo.value = photoResponse.data;
  relatedPhotos.value = relatedResponse.data.results;
  isLoading.value = false;
};
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();

initData();

const snackbar = reactive({
  isShow: false,
  timeout: 1000,
  text: "",
});

const downloadPhoto = (photo: Photo, size: string = "regular") => {
  const sizes: { [key: string]: string } = {
    small: photo.urls.small,
    regular: photo.urls.regular,
    full: photo.urls.full,
    raw: photo.urls.raw,
  };

  const url = sizes[size] || sizes["regular"];

  const a = document.createElement("a");
  a.href = `${url}&force=true`;
  a.download = `${photo.id}.jpg`;
  a.click();

  snackbar.text = "Downloading now, please wait";
  snackbar.timeout = 2000;
  snackbar.isShow = true;
  snackbar.timeout = 1000;
};
</script>

<template>
  <v-card height="90vh" :width="mdAndUp ? '1200' : '100%'" class="mx-auto">
    <div
      v-if="isLoading"
      style="height: 90vh"
      class="d-flex align-center justify-center"
    >
      <v-progress-circular
        :size="50"
        :width="5"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <div v-if="photo">
        <v-card-title>
          <div class="d-flex align-center pa-3">
            <div class="flex-fill d-flex align-center">
              <div>
                <v-avatar class="mr-3" size="avatarSize" color="red">
                  <img :src="photo.user.profile_image.small" alt="alt" />
                </v-avatar>
              </div>

              <div>
                <p>{{ photo.user.name }}</p>
                <p v-if="photo.user.for_hire" class="text-info">
                  Available for hire
                  <v-icon size="16">mdi-check-circle</v-icon>
                </p>
              </div>
            </div>
            <div>
              <v-btn color="grey" variant="text" icon="mdi-heart"></v-btn>
              <v-btn color="grey" variant="text" icon="mdi-plus"></v-btn>

              <v-btn-toggle size="small" variant="outlined" divided>
                <v-btn size="small"> Download </v-btn>

                <v-menu transition="slide-x-transition" location="bottom end">
                  <template v-slot:activator="{ props }">
                    <v-btn size="small" v-bind="props">
                      <v-icon icon="mdi-chevron-down"></v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      value="small"
                      @click="downloadPhoto(photo, 'small')"
                    >
                      Small
                    </v-list-item>
                    <v-list-item
                      value="medium"
                      @click="downloadPhoto(photo, 'regular')"
                    >
                      Medium
                    </v-list-item>
                    <v-list-item
                      value="large"
                      @click="downloadPhoto(photo, 'full')"
                    >
                      Large
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item
                      value="row"
                      @click="downloadPhoto(photo, 'raw')"
                    >
                      Raw ({{ photo.width }} x {{ photo.height }})
                    </v-list-item>
                  </v-list>
                  <!-- <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list> -->
                </v-menu>
              </v-btn-toggle>
            </div>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="scrollbar-beautify">
          <v-img
            class="mx-auto"
            width="1080"
            contain
            :src="photo.urls.regular"
            :lazy-src="photo.urls.regular"
          ></v-img>

          <div class="related-photos pa-3">
            <v-sheet
              elevation="0"
              v-if="relatedPhotos.length > 0"
              min-height="80vh"
            >
              <div class="photos-info mt-5">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card class="shadow-1 h-100 pa-3">
                      <div class="my-3">
                        <v-icon class="mx-3">mdi-map</v-icon>
                        <span>{{ photo.location.country }}</span>
                        <span>{{ photo.location.city }}</span>
                        <span>{{ photo.location.name }}</span>
                      </div>
                      <div>
                        <v-icon class="mx-3">mdi-calendar</v-icon>
                        <span>{{ photo.created_at }}</span>
                      </div>
                      <div class="mt-3">
                        <v-icon class="mx-3">mdi-camera</v-icon>
                        <span>{{ photo.exif.make }}</span>
                        <span>{{ photo.exif.modal }}</span>
                      </div>
                      <div class="my-3">
                        <v-icon class="mx-3">mdi-shield</v-icon>
                        <span>Free to use under the Unsplash License</span>
                      </div>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <PhotoInfoChartCard :photo="photo"> </PhotoInfoChartCard>
                  </v-col>
                </v-row>
              </div>
              <h4 class="text-h6 font-weight-bold py-3">Related Photos</h4>
              <v-row>
                <v-col
                  col="12"
                  md="4"
                  lg="3"
                  v-for="relatedPhoto in relatedPhotos"
                  :key="relatedPhoto.id"
                >
                  <PhotoCard :photo="relatedPhoto"></PhotoCard>
                </v-col>
              </v-row>

              <h4 class="text-h6 font-weight-bold py-3">Related Collections</h4>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  v-for="collection in photo.related_collections.results"
                  :key="collection.id"
                >
                  <CollectionCard :collection="collection"></CollectionCard>
                </v-col>
              </v-row>
              <h4 class="text-h6 font-weight-bold py-3">Related tags</h4>
              <v-card class="shadow-1 mb-3">
                <v-chip
                  class="interest-chip ma-2"
                  color="primary"
                  label
                  v-for="tag in photo.tags"
                  :key="tag.title"
                >
                  <v-icon start icon="mdi-bookmark-outline"></v-icon>
                  {{ tag.title }}
                </v-chip>
              </v-card>
            </v-sheet>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions> </v-card-actions>
      </div>
    </div>
  </v-card>
  <!-- SnackBar -->
  <v-snackbar v-model="snackbar.isShow" :timeout="snackbar.timeout">
    {{ snackbar.text }}
    <template #actions>
      <v-btn color="blue" variant="text" @click="snackbar.isShow = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped lang="scss"></style>
