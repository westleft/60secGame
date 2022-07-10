<script setup lang="ts">
import { inject } from "vue";

// 取的分數
const userPoint = inject("userPoint")

// type-based
const emit = defineEmits<{
  (e: "changePage", page: string): void;
}>();

const changePage = () => emit("changePage", "PlayPage");
</script>

<template>
  <div class="endGame">
    <p class="sloganText">60 SECOND CHALLENGE</p>
    <h2 class="endText">YOUR FINAL SCORE</h2>
    <p class="finalScore">{{ userPoint }}</p>
    <button class="tryBtn" @click="changePage">TRY AGAIN</button>
  </div>
</template>

<style lang="scss" scoped>
.endGame {
  @include flexCenter();
  flex-direction: column;
  .sloganText {
    color: #fff;
    font-size: 30px;
    border: solid 5px #fff;
    padding: 4px 16px;
  }
  .endText {
    font-size: 56px;
    margin-top: 12px;
  }
  .endText::after,
  .endText::before {
    content: "";
    display: inline-block;
    height: 0;
    width: 40px;
    border-bottom: solid 8px #fff;
    margin: 16px;
  }

  .finalScore {
    font-size: 112px;
    font-weight: 700;
  }
  .tryBtn {
    @include size(58px, 350px);
    background-color: #000;
    color: #ff9d00;
    font-size: 36px;
    border: none;
    margin-top: 104px;
  }
}
</style>