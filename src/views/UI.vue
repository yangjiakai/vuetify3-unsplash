<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import MainSidebar from "@/components/MainSidebar.vue";
import SubSidebar from "@/components/SubSidebar.vue";
import AppBar from "@/components/AppBar.vue";
import CustomizationMenu from "@/components/CustomizationMenu.vue";
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!---Main Sidebar -->
  <!-- ---------------------------------------------- -->
  <MainSidebar />
  <!-- ---------------------------------------------- -->
  <!---Sub Sidebar -->
  <!-- ---------------------------------------------- -->
  <SubSidebar />
  <!-- ---------------------------------------------- -->
  <!---AppBar -->
  <!-- ---------------------------------------------- -->
  <AppBar />
  <!-- ---------------------------------------------- -->
  <!---Main -->
  <!-- ---------------------------------------------- -->
  <v-main>
    <RouterView />
  </v-main>
  <!-- ---------------------------------------------- -->
  <!---CustomizationMenu -->
  <!-- ---------------------------------------------- -->
  <CustomizationMenu />
</template>

<style scoped lang="scss">
.scrollnav {
  height: calc(100vh - 60px);
}
</style>
