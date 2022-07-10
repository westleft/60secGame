<script setup lang="ts">
import { ref } from "vue";

// type-based
const emit = defineEmits<{
  (e: "changePage", page: string): void;
}>();

const changePage = () => emit("changePage", "PlayPage");
</script>

<template>
  <div class="startGame">
    <div class="textContent">
      <p class="sec60">60</p>
      <div class="challenge">
        SECOND<br />CHALLENGE
        <p>+−×÷</p>
      </div>
    </div>
    <button class="startButton" @click="changePage">START!</button>
    <p class="try"><i>try to answer more as you can</i></p>
  </div>
</template>

<style lang="scss" scoped>
.startGame {
  @include flexCenter();
  flex-direction: column;
  // display: none;
  .textContent {
    @include flexCenter();
    position: relative;
    .challenge {
      font-size: 96px;
      margin-left: 24px;
      font-weight: 800;
      p {
        position: absolute;
        font-size: 40px;
        right: 0;
        top: 60px;
        color: #ffffff;
        border-bottom: 4px solid #fff;
        text-decoration: underline;
        transition: 0.2s;
      }
      p:hover {
        transform: rotate(30deg);
      }
    }
    .sec60 {
      color: #fff;
      text-shadow: 12px 0px 0px #000;
      font-size: 240px;
      animation: textMove 0.8s infinite alternate-reverse ease-out;
    }
  }
  .startButton {
    @include size(58px, 350px);
    background-color: #000000;
    color: #ff9d00;
    margin-top: 104px;
    font-size: 36px;
    border: none;
  }
  .try {
    color: #fff;
    font-size: 24px;
    font-style:italic;
  }
}
</style>
