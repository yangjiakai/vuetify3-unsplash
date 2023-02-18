<!--
* @Component:
* @Maintainer: J.K. Yang
* @Description:
-->
<script setup lang="ts">
import VChart from "vue-echarts";
import { getPhotoStatisticsApi } from "@/api/unsplashApi";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import type { ChartData, Photo } from "../types/unsplashTypes";

const props = defineProps<{
  photo: Photo;
}>();

use([
  GridComponent,
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const isLoading = ref(false);
const photoStatistics = ref(null);
const downloadsData = ref([]);
const downloadsTotal = ref<number | string>("");
const likesData = ref([]);
const viewsData = ref([]);
const viewsTotal = ref<number | string>("");
const themeColors = ["#ee8a6a", "#0cb9c5", "#fec90f", "#05b187", "#fc4b6c"];
const chartDataName = ref("Views");
const chartData = ref([]);
const chartTitle = ref("");
const currentChart = ref("view");
const xAxis = ref([]);
const chartOptions = computed(() => {
  return {
    title: {
      text: chartTitle.value,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {},
    grid: {
      left: "2%",
      right: "2%",
      bottom: "2%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxis.value,
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        interval: 1,
      },
    },
    series: [
      {
        name: chartDataName.value,
        type: "bar",
        data: chartData.value,
        itemStyle: {
          color: "#46A3F3",
        },
      },
    ],
  };
});

const initData = async () => {
  isLoading.value = true;
  const photoStatisticsResponse = await getPhotoStatisticsApi(props.photo.id);
  photoStatistics.value = photoStatisticsResponse.data;

  xAxis.value = photoStatisticsResponse.data.downloads.historical.values.map(
    (value: ChartData) => value.date
  );

  downloadsData.value =
    photoStatisticsResponse.data.downloads.historical.values.map(
      (value: ChartData) => value.value
    );

  //   likesData.value = photoStatistics.value.likes.historical.values.map(
  //     (value) => value.value
  //   );

  viewsData.value = photoStatisticsResponse.data.views.historical.values.map(
    (value: ChartData) => value.value
  );

  chartData.value = viewsData.value;
  chartTitle.value = `Photo Info (Total Views: ${photoStatisticsResponse.data.views.total})`;
  viewsTotal.value = photoStatisticsResponse.data.views.total;
  downloadsTotal.value = photoStatisticsResponse.data.downloads.total;
};

const changeChart = (type: string) => {
  currentChart.value = type;
  if (type === "view") {
    chartDataName.value = "Views";
    chartData.value = viewsData.value;
    if (photoStatistics.value)
      chartTitle.value = `Photo Info (Total Views: ${viewsTotal.value})`;
  } else {
    chartDataName.value = "Downloads";
    chartData.value = downloadsData.value;
    chartTitle.value = `Photo Info (Total Downloads: ${downloadsTotal.value})`;
  }
};

initData();
</script>

<template>
  <div class="">
    <v-card class="shadow-1" min-height="400">
      <v-card-text style="height: 300px">
        <VChart :option="chartOptions" autoresize />
      </v-card-text>
      <v-divider />
      <div class="flex mx-5 my-3 bg-grey-lighten-3 pa-2">
        <v-btn
          :variant="currentChart === 'view' ? 'flat' : 'text'"
          color="primary"
          class="flex-1 mr-3"
          @click="changeChart('view')"
        >
          Views
        </v-btn>
        <v-btn
          :variant="currentChart === 'download' ? 'flat' : 'text'"
          color="primary"
          class="flex-1"
          @click="changeChart('download')"
        >
          Download
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<style scoped lang="scss"></style>
