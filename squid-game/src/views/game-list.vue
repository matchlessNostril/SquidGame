<template>
  <div class="flexCenter columnFlex">
    <div v-for="item in games" v-bind:key="item.name" class="flexCenter">
      <div>
        <span class="gameName">{{ item.name }}</span>
        <!-- 줄넘김을 위해 v-html 디렉티브 사용 -->
        <p class="gameDescription" v-html="item.description"></p>
      </div>
      <v-btn fab color="#fe4063" dark class="gameButton" :to="`/${item.name}`">
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      games: [
        {
          name: "Puzzle",
          description:
            "A user who plays this game have to complete the whole picture by moving the pieces of the picture in a right order.<br />A puzzle pieces can only be moved in four directions.",
          icon: "mdi-circle-outline",
        },
        {
          name: "UpDown",
          description:
            "This is a game that the user guesses the random number.<br />When the user enters the estimated value, it tells whether it is greater or less than the answer.",
          icon: "mdi-triangle-outline",
        },
        {
          name: "MukChiPa",
          description:
            "A user starts with a regular rock scissor paper game.<br />Then the winner from the previous round becomes the attacker.<br /> The attacker tries to win the game by throwing the same hand as the opponent.",
          icon: "mdi-square-outline",
        },
      ],
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Righteous&family=Titan+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap");

@media (max-width: 767px) {
  .gameName {
    font-size: 25px;
  }
  .gameDescription {
    font-size: 13px;
  }
}
@media (min-width: 768px) {
  .gameName {
    font-size: 40px;
  }
  .gameDescription {
    font-size: 25px;
  }
}

.gameName {
  color: #fe4063;
  font-family: "Titan One", cursive;
  margin-left: 20px;
}

.gameDescription {
  width: 80vw;
  color: rgb(255, 255, 255);
  margin-left: 20px;
  margin-top: 20px;
  font-family: "Roboto Condensed", sans-serif;
}

.gameButton {
  margin-top: 150px;
  margin-right: 20px;
}
</style>
