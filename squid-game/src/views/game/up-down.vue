<template>
  <div class="background">
    <v-container>
      <img :src="logo" class="ForLogo" />
      <div class="row">
        <div class="small-6 columns text-center">
          <div style="max-width: 350px">
            <img
              v-for="l in life"
              v-bind:key="l.id"
              :src="imgurl"
              style="width: 20%"
            />
          </div>
        </div>
      </div>
      <button @click="stopTimer" class="times">Time stop</button>
      <button @click="startTimer" class="start">Game start</button>
      <button @click="resetTimer" class="times">Game reset</button>
      <h2 class="bomb">{{ totalTime }}</h2>
      <h4 id="state">{{ gameState }}</h4>
      <h1>{{ result }}</h1>
      <form v-on:submit="onSubmitForm">
        <input
          ref="answer"
          type="text"
          id="enter"
          maxlength="4"
          v-model="value"
        />
        <button type="submit" id="btn" style="color: white">Type</button>
      </form>
      <h3 style="margin-top: 20px; color: white">Tries</h3>
      <div id="try" style="color: white">{{ tries.length }}</div>
      <ul>
        <li v-for="t in tries" v-bind:key="t.id">
          <div id="bold">{{ t.try }}</div>
          <div>{{ t.result }}</div>
        </li>
      </ul>
    </v-container>
  </div>
</template>
<script>
import { recordScore } from "../../mixins/rankingMixin";

export default {
  data() {
    return {
      answer: Math.floor(Math.random() * 100), // 0~100 range random number is generated
      tries: [],
      value: "",
      result: "",
      id: "",
      life: 5, // initial chances
      score: 100, // initial score is 100
      timer: null,
      totalTime: 60,
      resetButton: false,
      gameState: "Click Game start button to play", //initial state before starting game
      imgurl: require("../../assets/images/game/up-down/life.jpg"),
      logo: require("../../assets/images/game/up-down/logo.jpg"),
    };
  },
  methods: {
    startTimer: function () {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
      this.gameState = `Game started. Type your forecast value`;
    },
    stopTimer: function () {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.gameState = "Game stopped. Click Game start button to resume it";
    },
    resetTimer: function () {
      this.answer = Math.floor(Math.random() * 100);
      this.score = 100;
      this.life = 5;
      this.tries = [];
      this.value = "";
      this.id = 0;
      this.totalTime = 1 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
      this.gameState = `Game reset. Click Game start button to play new game.`;
      this.$refs.answer.focus();
    },

    countdown: function () {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        alert(`time over!`);
        clearInterval(this.timer);
        // ranking
        this.recordScore("UpDown", temp);

        this.answer = Math.floor(Math.random() * 100);
        this.score = 100;
        this.life = 5;
        this.tries = [];
        this.value = "";
        this.id = 0;
        this.totalTime = 60;
        this.timer = null;
        this.resetButton = false;
        this.gameState = `Game over. Click Game start button to replay`;
        this.$refs.answer.focus();
      }
    },

    onSubmitForm(e) {
      e.preventDefault();
      console.log(this.answer);
      let temp = 0;

      if (this.life == 0) {
        // game end, User lose
        alert(`Game over! your score is 0, the answer was ${this.answer}`);
        clearInterval(this.timer);
        // ranking
        this.recordScore("UpDown", temp);

        this.answer = Math.floor(Math.random() * 100);
        this.score = 100;
        this.life = 5;
        this.tries = [];
        this.value = "";
        this.id = 0;
        this.totalTime = 60;
        this.timer = null;
        this.resetButton = false;
        this.gameState = `Game over. If you want replay, click Game start button`;
        this.$refs.answer.focus();
      }
      if (this.value == this.answer) {
        //Correct answer, User win
        temp = this.score + this.totalTime;
        this.tries.push({
          try: this.value,
          result: `You win! your score is ${temp}`,
          id: this.id++,
        });
        //this.result = "You win!";
        alert(
          `You win! Bonus score is ${this.totalTime}. Final score is ${temp}`
        );
        clearInterval(this.timer);
        // ranking
        this.recordScore("UpDown", temp);

        this.answer = Math.floor(Math.random() * 100);
        this.score = 100;
        this.life = 5;
        this.tries = [];
        this.value = "";
        this.id = 0;
        this.totalTime = 60;
        this.timer = null;
        this.resetButton = false;
        this.gameState = `You win. If you want replay, click Game start button`;
        this.$refs.answer.focus();
      }
      if (this.value == "") {
        // No input. error message
        this.tries.push({
          try: this.value,
          result: `No input! Type any number. Current score is ${this.score}`,
          id: this.id++,
        });
      } else {
        // input is a number at least 0
        if (this.value < this.answer) {
          //prediction is incorrect
          this.score -= 20;
          this.life--;
          temp = this.score;
          this.tries.push({
            try: this.value,
            result: `${this.value} is too small! your score is ${temp}`,
            id: this.id++,
          });
          this.value = "";
          this.$refs.answer.focus();
        }
        if (this.value > this.answer) {
          // prediction is incorrect
          this.score -= 20;
          this.life--;
          temp = this.score;
          this.tries.push({
            try: this.value,
            result: `${this.value} is too big! your score is ${temp}`,
            id: this.id++,
          });
          this.value = "";
          this.$refs.answer.focus();
        }
      }
    },
  },
  mixins: [recordScore],
};
</script>

<style scoped src="../../assets/css/game/up-down.css"></style>
