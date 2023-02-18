import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/search",
      name: "unsplash-search",
      component: () =>
        import(
          /* webpackChunkName: "unsplash-photos" */ "@/views/SearchPage.vue"
        ),
    },
    {
      path: "/user/:username",
      name: "unsplash-user",
      component: () =>
        import(/* webpackChunkName: "unsplash-user" */ "@/views/UserPage.vue"),
    },
    {
      path: "/collection/:id",
      name: "unsplash-collection",
      component: () =>
        import(
          /* webpackChunkName: "unsplash-collection" */ "@/views/CollectionPage.vue"
        ),
    },
    {
      path: "/topic/:slug",
      name: "unsplash-topic",
      component: () =>
        import(
          /* webpackChunkName: "unsplash-topic" */ "@/views/TopicPage.vue"
        ),
    },
    {
      path: "/my-page",
      name: "unsplash-my-page",
      component: () =>
        import(/* webpackChunkName: "unsplash-my-page" */ "@/views/MyPage.vue"),
    },
    {
      path: "/home",
      name: "unsplash",
      component: () =>
        import(
          /* webpackChunkName: "app-unsplash" */ "@/views/UnsplashApp.vue"
        ),
    },

    {
      path: "/textToSpeech",
      name: "textToSpeech",
      component: () =>
        import(
          /* webpackChunkName: "unsplash-textToSpeech" */ "@/views/TextToSpeech.vue"
        ),
    },
  ],
});

export default router;
