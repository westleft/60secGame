<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

// type-based
const emit = defineEmits<{
  (e: "changePage", page: string): void;
  (e: "changePoint", point: number): void;
}>();

const changePage = () => emit("changePage", "EndPage");

const userAnswer = ref<number | null>();

class Game {
  time: Ref<number>;
  formula: Ref<string>;
  result: Ref<number>;
  point: Ref<number>;

  constructor() {
    this.time = ref(60);
    this.formula = ref("");
    this.result = ref(0);
    this.point = ref(0);
  }

  // 開始計時
  start() {
    const timer = setInterval(() => {
      this.time.value--;

      if (this.time.value === 0) {
        clearInterval(timer);
        emit("changePoint", this.point.value);
        changePage();
      }
    }, 1000);
  }

  // 建立題目
  creatQuiz() {
    const operation = this.creatRandomOperation();
    if ((this.time.value >= 40)) {
      this.formula.value = `
        ${this.generateRandomInt(1, 9).toString()} 
        ${operation} 
        ${this.generateRandomInt(1, 9).toString()}
      `;
    } else if (this.time.value <= 20) {
      this.formula.value = `
        ${this.generateRandomInt(101, 999).toString()} 
        ${operation} 
        ${this.generateRandomInt(101, 999).toString()}
      `;
    } else {
      this.formula.value = `
        ${this.generateRandomInt(10, 99).toString()} 
        ${operation} 
        ${this.generateRandomInt(10, 99).toString()}
      `;
    }
    this.result.value = eval(this.formula.value);
  }

  // 產生隨機數
  generateRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // 產生隨機運算符號
  creatRandomOperation(): string {
    const number: number = this.generateRandomInt(1, 4);
    if (number === 1) return "+";
    else if (number === 2) return "-";
    else if (number === 3) return "*";
    else return "/";
  }

  // 檢查答案
  checkAnswer(answer: number) {
    userAnswer.value = null;
    if (answer === this.result.value) {
      this.addPoint();
    }
    this.creatQuiz();
  }

  addPoint() {
    if (this.time.value >= 40) this.point.value += 1;
    else if (this.time.value <= 20) this.point.value += 5;
    else this.point.value += 3;
  }
}

const game = new Game();
game.start();
game.creatQuiz();
</script>

<template>
  <div class="playGame">
    <div class="topContainer">
      <div class="slogan">
        <p class="sloganText">60 SECOND CHALLENGE</p>
        <div class="socreBox">
          <p class="score">SCORE</p>
          <p class="scoreText">
            <span v-show="game.point.value < 10">0</span>
            <span v-show="game.point.value < 100">0</span>
            {{ game.point }}
          </p>
        </div>
      </div>
      <p class="time" v-if="game.time.value === 60">01 : 00</p>
      <p class="time" v-else>
        00 : <span v-if="game.time.value < 10">0</span>{{ game.time }}
      </p>
    </div>
    <div class="question">
      <p class="number1">{{ game.formula.value.replace("*", "×") }}</p>
      <p class="equal">=</p>
      <input
        type="number"
        v-model="userAnswer"
        step="none"
        @keypress.enter="game.checkAnswer(userAnswer)"
      />
      <p class="text"><i>press enter to answer</i></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playGame {
  @include flexCenter();
  flex-direction: column;
  .topContainer {
    @include flexCenter();
    .slogan {
      margin-right: 114px;
      .socreBox {
        display: flex;
      }
      .sloganText {
        color: #fff;
        font-size: 30px;
        border: solid 5px #fff;
        padding: 8px 16px;
      }
      .score {
        background-color: #fff;
        color: #ff9d00;
        font-size: 30px;
        padding: 12px 16px;
        font-weight: 600;
      }
      .scoreText {
        @include flexCenter();
        font-size: 44px;
        font-weight: 800;
        margin-left: 8px;
      }
    }
    .time {
      color: #fff;
      font-size: 96px;
    }
  }
  .question {
    @include flexCenter(center, space-around);
    margin-top: 110px;
    position: relative;
    p,
    input {
      font-size: 112px;
      font-weight: 600;
      margin: 20px;
    }
    input {
      @include flexCenter();
      @include size(131px, 225px);
      border: none;
      text-align: center;
    }
    input:focus {
      outline: none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .text {
      position: absolute;
      font-size: 24px;
      font-weight: 100;
      right: 12px;
      bottom: -32px;
      color: #fff;
    }
  }
}
</style>
