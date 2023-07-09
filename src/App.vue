<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { useUnsplashStore } from "@/stores/unsplashStore";
import Sidebar from "@/components/Sidebar.vue";
const unsplashStore = useUnsplashStore();
</script>

<template>
  <v-app id="app">
    <!-- ---------------------------------------------- -->
    <!---Appbar -->
    <!-- ---------------------------------------------- -->
    <AppBar />

    <!-- ---------------------------------------------- -->
    <!---Snackbar -->
    <!-- ---------------------------------------------- -->
    <v-snackbar
      v-model="unsplashStore.snackbar.isShow"
      :timeout="unsplashStore.snackbar.timeout"
    >
      {{ unsplashStore.snackbar.text }}
      <template #actions>
        <v-btn
          color="blue"
          variant="text"
          @click="unsplashStore.snackbar.isShow = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- ---------------------------------------------- -->
    <!---Main -->
    <!-- ---------------------------------------------- -->
    <v-main>
      <router-view v-slot="{ Component }">
        <!-- <transition name="fade">
          <component :is="Component" />
        </transition> -->
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <!-- ---------------------------------------------- -->
    <!---Sidebar -->
    <!-- ---------------------------------------------- -->
    <Sidebar />
  </v-app>
</template>

<style scoped></style>
