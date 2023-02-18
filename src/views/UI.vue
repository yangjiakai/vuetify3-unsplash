<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
// import SearchPanel from "@/components/SearchPanel.vue";
import SearchInput from "@/components/SearchInput.vue";

const baseUrl = ref("https://m6.imhentai.xxx/022/xfwsbm783o/");
const total = ref(587);

const urls = computed(() => {
  let urls = [];

  for (let i = 1; i < total.value; i++) {
    let fullUrl = baseUrl.value + i + ".jpg";
    urls.push(fullUrl);
  }

  return urls;
});

const cgList = ref([
  {
    id: 1,
    name: "姬骑士",
    baseUrl: "https://m5.imhentai.xxx/017/mcey6ilztw/",
    total: "709",
  },
  {
    id: 2,
    name: "[Waffle] 人間不信",
    baseUrl: "https://m6.imhentai.xxx/021/0xgi5b86z9/",
    total: "669",
  },
  {
    id: 3,
    name: "Wifu",
    baseUrl: "https://m6.imhentai.xxx/022/xfwsbm783o/",
    total: "587",
  },
  {
    id: 4,
    name: "ようこそ! スケベエルフの森へ",
    baseUrl: "https://m2.imhentai.xxx/009/3u6zts41ag/",
    total: "2000",
  },
  {
    id: 5,
    name: "学园MC",
    baseUrl: "https://m2.imhentai.xxx/007/q7ijh1slcv/",
    total: "1716",
  },
  {
    id: 6,
    name: "学园MC",
    baseUrl: "https://m2.imhentai.xxx/007/q7ijh1slcv/",
    total: "1716",
  },
  {
    id: 7,
    name: "炎の孕ませおっぱい乳同級生",
    baseUrl: "https://m4.imhentai.xxx/014/jvlh3qewtn/",
    total: "773",
  },
  {
    id: 8,
    name: "黒獣外伝 ",
    baseUrl: "https://m7.imhentai.xxx/022/5viyqwg21e/",
    total: "1215",
  },
  {
    id: 8,
    name: "聖奴隷学園祭 ",
    baseUrl: "https://m4.imhentai.xxx/015/angtu3smev/",
    total: "1491",
  },
  {
    id: 9,
    name: "聖奴隷学園祭2 ",
    baseUrl: "https://m5.imhentai.xxx/017/o98vnpi0gd/",
    total: "1450",
  },
]);

const changeCg = (cg: any) => {
  baseUrl.value = cg.baseUrl;
  total.value = cg.total;
};

const clearCg = () => {
  baseUrl.value = "";
  total.value = 0;
};
</script>

<template>
  <div class="">
    <div class="pa-5">
      <v-btn class="mr-5" @click="clearCg()">Clear</v-btn>
      <v-btn
        class="mr-5"
        v-for="cg in cgList"
        :key="cg.id"
        @click="changeCg(cg)"
        >{{ cg.name }}</v-btn
      >
    </div>

    <!-- <v-sheet class="d-flex pa-5" height="400" elevation="1">
            <v-card class="mr-5" width="300" height="300" v-for="i in 10 " :elevation="i">

            </v-card>
        </v-sheet>
        <v-sheet class="d-flex pa-5" height="300" elevation="1">
            <v-card class="shadow-md mr-5" width="200" height="200">

            </v-card>
            <v-card class="shadow-lg mr-5" width="200" height="200">

            </v-card>
            <v-card class="shadow-xl mr-5" width="200" height="200">

            </v-card>
            <v-card class="shadow-inner mr-5" width="200" height="200">

            </v-card>

        </v-sheet> -->

    <v-sheet class="pa-5">
      <v-row>
        <v-col cols="6 " v-for="url in urls" :key="url">
          <v-card elevation="1">
            <v-img :src="url"></v-img>
            <!-- <v-img :src="url" :lazy-src="url"></v-img> -->
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet class="pa-5" height="500" elevation="1">
      <v-toolbar color="primary">
        <SearchInput />
      </v-toolbar>
    </v-sheet>
  </div>
</template>

<style scoped lang="scss"></style>
