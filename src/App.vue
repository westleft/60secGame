<script setup lang="ts">
import { provide, ref } from "vue";
import StartPage from "@/components/StartPage.vue";
import PlayPage from "@/components/PlayPage.vue";
import EndPage from "@/components/EndPage.vue";

const currentPage = ref<string>("StartPage");
provide("currentPage", currentPage);

const changePage = (page: string) => {
  currentPage.value = page;
};

const userPoint = ref<number>(0);
provide("userPoint", userPoint);

const changePoint = (point: number) => {
  userPoint.value = point;
};
</script>

<template>
  <div id="main">
    <StartPage v-if="currentPage === 'StartPage'" @changePage="changePage" />
    <PlayPage
      v-if="currentPage === 'PlayPage'"
      @changePage="changePage"
      @changePoint="changePoint"
    />
    <EndPage v-if="currentPage === 'EndPage'" @changePage="changePage" />
  </div>
</template>

<style lang="scss" scoped>
#main {
  @include flexCenter();
  @include size(100vh, 100vw);
  background-color: $color_orange;
}
</style>
