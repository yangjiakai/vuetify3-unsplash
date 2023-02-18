<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
// 允许跨域
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
const speechApi = axios.create({
  baseURL: "https://texttospeech.googleapis.com",
  headers: {
    apiKey: "APIKEY",
  },
});

const getSpeech = () => {
  return speechApi.post("/v1beta1/speech:synthesize", {
    audioConfig: {
      audioEncoding: "LINEAR16",
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: 0,
      speakingRate: 1.15,
    },
    input: {
      text: "借助以自定义语音为后盾的最新研究成果打造的预构建语音，实现国际化的语音体验。",
    },
    voice: {
      languageCode: "cmn-CN",
      name: "cmn-CN-Wavenet-B",
    },
  });
};

const speech = async () => {
  const response = await getSpeech();
  console.log(response.data);
};
</script>

<template>
  <div class=""><v-btn color="success" @click="speech">GetSpeech</v-btn></div>
</template>

<style scoped lang="scss"></style>
