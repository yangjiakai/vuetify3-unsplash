<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useFocusWithin } from "@vueuse/core";
import { useUnsplashStore } from "../stores/unsplashStore";
import SearchPanel from "../components/SearchPanel.vue";
import { searchAllApi } from "@/api/unsplashApi";
import { Icon } from "@iconify/vue";
const unsplashStore = useUnsplashStore();
const router = useRouter();
const route = useRouter();
const loading = ref(false);
const searchPanelShow = ref(false);
const select = ref();
const searchKey = ref("");
const selectList = ref<string[]>([]);

const states = ref([
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]);

// 监听检索关键词变化，为空时相似关键词列表清空，且显示检索面板，否则显示关键词列表
watch(
  () => unsplashStore.searchKey,
  (val) => {
    if (val) {
      searchPanelShow.value = false;
      if (val !== select.value) {
        querySelections(val);
      } else {
        setTimeout(() => {
          selectList.value = [];
        }, 300);
      }
    } else {
      setTimeout(() => {
        selectList.value = [];
      }, 300);
      setTimeout(() => {
        searchPanelShow.value = true;
      }, 500);
    }
  }
);

// 根据检索关键词过滤查询类似关键词列表
const querySelections = (key: string) => {
  loading.value = true;
  setTimeout(() => {
    selectList.value = states.value.filter(
      (item) => item.toLowerCase().indexOf(key) > -1
    );
  }, 300);
  loading.value = false;
};

// 检索面板显示条件：1.当前焦点在检索框或者检索面板上 2.检索框为空
// const refSearchInput = ref();
// const refSearchPanel = ref();
// const searchInputFocus = useFocusWithin(refSearchInput);
// const searchPanelFocus = useFocusWithin(refSearchPanel);

// watch(
//   [searchInputFocus.focused, searchPanelFocus.focused],
//   ([searchInputFocued, searchPanelFocused]) => {
//     console.log(searchInputFocued, searchPanelFocused);

//     if ((searchInputFocued || searchPanelFocused) && !unsplashStore.searchKey) {
//       searchPanelShow.value = true;
//     } else {
//       searchPanelShow.value = false;
//     }
//   }
// );

const refSearchInput = ref();

const search = async () => {
  const params = {
    query: unsplashStore.searchKey,
    per_page: 30,
    page: 1,
  };
  // if unsplashStore.searchKey is empty，return
  if (!unsplashStore.searchKey) {
    return;
  } else {
    unsplashStore.addToRecentSearchList();
  }

  const topicsResponse = await searchAllApi(params);
  unsplashStore.searchResult = topicsResponse.data;

  if (route.currentRoute.value.name !== "unsplash-search") {
    router.push({
      name: "unsplash-search",
    });
  }
};
</script>

<template>
  <v-card width="1000" class="search-container">
    <!-- filled" | "outlined" | "plain" | "underlined" | "solo" -->
    <v-autocomplete
      tabindex="0"
      variant="solo"
      color="info"
      elevation="1"
      ref="refSearchInput"
      class="main-search"
      v-model="select"
      v-model:search="unsplashStore.searchKey"
      :items="selectList"
      :loading="loading"
      density="comfortable"
      hide-details
      prepend-inner-icon="mdi-magnify"
      @keyup.enter="search"
      placeholder="Search Images"
      :menu-props="{ closeOnContentClick: true }"
    >
      <template v-slot:no-data>
        <SearchPanel v-if="unsplashStore.searchKey === ''" />
        <div class="d-flex align-center justify-center" v-else>
          <v-img
            src="https://unsplash-assets.imgix.net/empty-states/photos.png"
            height="290"
          ></v-img>
        </div>
      </template>
    </v-autocomplete>
    <div ref="refSearchPanel" v-show="searchPanelShow" class="panel"></div>
  </v-card>
</template>

<style scoped lang="scss"></style>
