<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: Imitate Nitori App
-->
<script setup lang="ts">
import FavoriteCard from "@/components/FavoriteCard.vue";
import PhotoDetail from "./PhotoDetailModal.vue";
import UserCard from "@/components/UserCard.vue";
import {
  searchAllApi,
  searchPhotosApi,
  searchCollectionsApi,
  searchUsersApi,
} from "@/api/unsplashApi";
import { Icon, listIcons } from "@iconify/vue";
import type { Photo, Collection, User } from "@/types/unsplashTypes";
import { useUnsplashStore } from "@/stores/unsplashStore";
const unsplashStore = useUnsplashStore();
const router = useRouter();

interface PhotoData {
  photos: Photo[];
  total: number;
  totalPages: number;
}

const photoData: PhotoData = reactive({
  photos: [],
  total: 0,
  totalPages: 0,
});

interface CollectionData {
  collections: Collection[];
  total: number;
  totalPages: number;
}

const collectionData: CollectionData = reactive({
  collections: [],
  total: 0,
  totalPages: 0,
});

interface UserData {
  users: User[];
  total: number;
  totalPages: number;
}

const userData: UserData = reactive({
  users: [],
  total: 0,
  totalPages: 0,
});

// 当前的检索关键词
const currentKeyword = ref("");
// 当前UserTab已加载页数
const currentUserPage = ref(1);
// 当前PhotoTab已加载页数
const currentPhotoPage = ref(1);
// 当前CollctionTab已加载页数
const currentCollectionPage = ref(1);
// 存放相关检索列表
const relatedSearches = ref<any[]>([]);
// 当前Tab
const tab = ref(null);

const updateView = (data: any) => {
  currentKeyword.value = data.meta.keyword;
  // Photos
  photoData.photos = data.photos.results;
  photoData.total = data.photos.total;
  photoData.totalPages = data.photos.total_pages;

  // Collections
  collectionData.collections = data.collections.results;
  collectionData.total = data.collections.total;
  collectionData.totalPages = data.collections.total_pages;

  // Users
  userData.users = data.users.results;
  userData.total = data.users.total;
  userData.totalPages = data.users.total_pages;

  // RelatedSearches
  relatedSearches.value = data.related_searches;
  updateLikesView();
};

// 初期显示可以显示上次的检索结果
onMounted(() => {
  updateView(unsplashStore.searchResult);
  // window.addEventListener("scroll", onReachBottom);
});

// 监听检索结果，并更新师徒
watch(
  () => unsplashStore.searchResult,
  (newVal) => {
    updateView(newVal);
  }
);

const updateLikesView = () => {
  photoData.photos.forEach((photo) => {
    photo.liked_by_user = unsplashStore.favoriteList.some(
      (item) => item.id === photo.id
    );
  });
};

// 触底加载更多图片
const onReachBottom = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop; // 页面滚动的高度
  const clientHeight = document.documentElement.clientHeight; // 可视区域高度
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight; // 可滚动内容的高度
  const bottomOfWindow = scrollTop + clientHeight >= scrollHeight - 82; // 是否触底
  if (bottomOfWindow) {
    console.log("kkk");

    // 只有在列表未在请求中，并且有剩余数据可请求，并且触底的情况下，才能发起请求
    if (
      tab.value === "photos" &&
      currentPhotoPage.value < photoData.totalPages
    ) {
      // 获取更多照片
      morePhotos();
    }
  }
};

/**
 * 在Photo的Tab页加载更多照片
 */
const morePhotos = async () => {
  currentPhotoPage.value++;
  const params = {
    query: currentKeyword.value,
    per_page: 10,
    page: currentPhotoPage.value,
  };
  const response = await searchPhotosApi(params);
  photoData.photos.push(...response.data.results);
};

/**
 * 在Collection的Tab页加载更多合集
 */
const moreCollections = async () => {
  currentCollectionPage.value++;
  const params = {
    query: currentKeyword.value,
    per_page: 30,
    page: currentCollectionPage.value,
  };
  const response = await searchCollectionsApi(params);
  collectionData.collections.push(...response.data.results);
};

/**
 * 在User的Tab页加载更多用户信息
 */
const moreUsers = async () => {
  currentUserPage.value++;
  const params = {
    query: currentKeyword.value,
    per_page: 30,
    page: currentUserPage.value,
  };
  const response = await searchUsersApi(params);
  userData.users.push(...response.data.results);
};

/**
 * 当点击页面的关系关键词时，进行检索
 * @param query 检索关键词
 */
const searchRelated = async (query: string) => {
  const params = {
    query: query,
    per_page: 30,
    page: 1,
  };
  const topicsResponse = await searchAllApi(params);
  unsplashStore.searchResult = topicsResponse.data;
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

// 照片详情页
const photoDialog = ref(false);
// 当前详情页照片ID
const photoId = ref("");
// 打开照片详情页
const openPhotoDialog = (id: string) => {
  photoId.value = id;
  photoDialog.value = true;
};
</script>

<template>
  <div class="photo-page">
    <!-- <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-text-field
        v-model="searchParams.query"
        hide-details
        prepend-inner-icon="mdi-magnify"
        single-line
        placeholder="Search photos"
        @keyup.enter="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="">Go</v-btn>
    </v-toolbar> -->
    <v-row class="pa-3">
      <v-col cols="12" xl="10">
        <v-card class="mt-2">
          <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="photos"
              ><v-icon class="mr-2">mdi-image-outline</v-icon> photos
              <span class="ml-2">({{ photoData.total }})</span></v-tab
            >
            <v-tab value="collections">
              collections<span class="ml-2"
                >({{ collectionData.total }})</span
              ></v-tab
            >
            <v-tab value="users"
              ><v-icon class="mr-2">mdi-account-multiple</v-icon> users<span
                class="ml-2"
                >({{ userData.total }})</span
              ></v-tab
            >
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <!-- Photos -->
              <v-window-item value="photos">
                <v-card
                  min-height="80vh"
                  class="pa-5 d-flex align-center justify-center"
                  v-if="photoData.total === 0"
                >
                  <v-img
                    src="https://unsplash-assets.imgix.net/empty-states/photos.png"
                    height="400"
                  ></v-img>
                </v-card>
                <v-card min-height="80vh" class="pa-5" v-else>
                  <v-row>
                    <v-slide-group show-arrows>
                      <v-slide-group-item
                        v-for="item in relatedSearches"
                        :key="item.title"
                        v-slot="{ isSelected }"
                      >
                        <v-btn
                          class="ma-2"
                          rounded
                          :color="isSelected ? 'primary' : undefined"
                          @click="searchRelated(item.title)"
                        >
                          {{ item.title }}
                        </v-btn>
                      </v-slide-group-item>
                    </v-slide-group>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      xl="2"
                      lg="3"
                      md="4"
                      sm="6"
                      v-for="item in photoData.photos"
                      :key="item.id"
                    >
                      <v-card
                        width="100%"
                        class="info-card photo-card d-flex flex-column"
                        height="480"
                      >
                        <div>
                          <v-img
                            class="align-end text-white"
                            :src="item.urls.small"
                            :lazy-src="item.urls.small"
                            height="300"
                            cover
                            @click="openPhotoDialog(item.id)"
                          >
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="grey-lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                            <v-card-title class="card-title">
                              <v-avatar size="avatarSize" class="mr-2">
                                <img
                                  :src="item.user.profile_image.small"
                                  alt="alt"
                                />
                              </v-avatar>
                              {{ item.user.username }}</v-card-title
                            >
                          </v-img>
                        </div>

                        <v-card-subtitle class="mt-5">
                          <div>
                            size: height:{{ item.height }} width:{{
                              item.width
                            }}
                          </div>
                        </v-card-subtitle>

                        <v-card-text>
                          {{ item.alt_description }}
                        </v-card-text>

                        <v-card-actions>
                          <v-btn @click="toggleLike(item)">
                            <v-icon
                              v-if="item.liked_by_user"
                              start
                              color="pink"
                              icon="mdi-heart"
                              class="heartBeat"
                            ></v-icon>
                            <v-icon
                              v-else
                              start
                              icon="mdi-heart-outline"
                            ></v-icon>
                            Like({{ item.likes }})
                            <v-tooltip
                              activator="parent"
                              location="bottom"
                              class=""
                              :text="item.liked_by_user ? 'Liked' : 'Like'"
                            ></v-tooltip>
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-tooltip location="bottom" text="Download">
                            <template v-slot:activator="{ props }">
                              <v-btn
                                v-bind="props"
                                icon="mdi-download"
                                @click="downloadPhoto(item)"
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
                    </v-col>
                  </v-row>
                  <v-btn
                    color=""
                    class="gradient info mt-5"
                    block
                    size="large"
                    @click="morePhotos"
                    >More Photos...</v-btn
                  >
                </v-card>
              </v-window-item>

              <!-- Collections -->
              <v-window-item value="collections">
                <v-card
                  min-height="80vh"
                  class="pa-5 d-flex align-center justify-center"
                  v-if="collectionData.total === 0"
                >
                  <v-img
                    src="https://unsplash-assets.imgix.net/empty-states/photos.png"
                    height="400"
                  ></v-img>
                </v-card>
                <v-card min-height="80vh" class="pa-5" v-else>
                  <v-row>
                    <v-slide-group show-arrows>
                      <v-slide-group-item
                        v-for="item in relatedSearches"
                        :key="item.title"
                        v-slot="{ isSelected }"
                      >
                        <v-btn
                          class="ma-2"
                          rounded
                          :color="isSelected ? 'primary' : undefined"
                          @click="searchRelated(item.title)"
                        >
                          {{ item.title }}
                        </v-btn>
                      </v-slide-group-item>
                    </v-slide-group>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      lg="6"
                      xl="4"
                      v-for="item in collectionData.collections"
                      :key="item.id"
                    >
                      <v-card
                        class="info-card collection-card d-flex mt-5"
                        color="secondary-lighten-1"
                      >
                        <v-img
                          max-width="200"
                          aspect-ratio="1"
                          cover
                          :src="item.cover_photo.urls.small"
                          :lazy-src="item.cover_photo.urls.small"
                          @click="
                            router.push({
                              name: 'unsplash-collection',
                              params: {
                                id: item.id,
                              },
                            })
                          "
                        >
                        </v-img>

                        <div class="pa-2 flex-1">
                          <v-card-title>
                            {{ item.title }}
                          </v-card-title>
                          <v-card-subtitle class="pt-4">
                            <v-avatar size="avatarSize">
                              <img
                                :src="item.user.profile_image.small"
                                alt="alt"
                              />
                            </v-avatar>
                            {{ item.user.username }}
                          </v-card-subtitle>
                          <v-card-text>
                            <div>{{ item.description }}</div>
                          </v-card-text>
                          <v-card-actions>
                            <span>{{ item.published_at }}</span>
                            <v-spacer></v-spacer>
                            <span class="text-accent">{{
                              item.total_photos
                            }}</span>
                          </v-card-actions>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-btn
                    color=""
                    class="gradient info mt-5"
                    block
                    size="large"
                    @click="moreCollections"
                    >More Collections...</v-btn
                  >
                </v-card>
              </v-window-item>

              <!-- Users -->
              <v-window-item value="users">
                <v-card
                  min-height="80vh"
                  class="pa-5 d-flex align-center justify-center"
                  v-if="userData.total === 0"
                >
                  <v-img
                    src="https://unsplash-assets.imgix.net/empty-states/photos.png"
                    height="400"
                  ></v-img>
                </v-card>
                <v-card min-height="80vh" class="pa-5" v-else>
                  <v-row>
                    <v-col
                      cols="12"
                      lg="4"
                      sm="6"
                      v-for="item in userData.users"
                      :key="item.id"
                    >
                      <UserCard :user="item" />
                    </v-col>
                  </v-row>
                  <v-btn
                    color=""
                    class="gradient info mt-5"
                    block
                    size="large"
                    @click="moreUsers"
                    >More Users...</v-btn
                  >
                </v-card>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="0" xl="2">
        <FavoriteCard />
      </v-col>
    </v-row>

    <!-- SnackBar -->
    <v-snackbar v-model="snackbar.isShow" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbar.isShow = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="photoDialog">
      <PhotoDetail :photoId="photoId" />
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.card-title {
  background-color: rgba(0, 0, 0, 0.3);
}

.info-card {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 24px 0px !important;
  }
}

.user-card {
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    font-size: 1rem;
  }
}
</style>
