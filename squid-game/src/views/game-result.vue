<template>
  <div>
    <div class="flexCenter columnFlex">
      <h1>{{ this.game }} Game</h1>
      <div class="currentScoreContainer">
        <span class="scoreText">score</span>
        <span class="currentScoreText">{{ this.userCurrentScore }}</span>
      </div>
    </div>
    <div v-if="getUserAuthStatus" class="rankingBox">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div class="rankingContent">
        <div v-if="loading" class="flexCenter columnFlex">
          <v-progress-circular
            indeterminate
            color="white"
          ></v-progress-circular>
        </div>
        <div v-else>
          <div v-for="item in this.ranking" :key="item.email">
            <div class="topText">
              Top <span>{{ item.rank }}</span>
            </div>
            <div class="nameText">{{ item.name }}</div>
            <div class="topScoreText">{{ item.score }}</div>
          </div>
          <div class="userRankContainer">
            Your record is Top <strong>{{ this.userRank.rank }}</strong> Score
            <strong>{{ this.userRank.score }}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="flexCenter columnFlex buttonContainer">
      <button @click="$router.back()" class="btn squidGreen">
        <v-icon color="white" class="mr-1">mdi-restart</v-icon>Restart
      </button>
      <button @click="$router.push('/gameList')" class="btn squidWhite">
        <v-icon color="black" class="mr-1">mdi-menu</v-icon>Game List
      </button>
    </div>
  </div>
</template>
<script>
import { getUserAuthStatus } from "../mixins/authMixin";
import { getRanking } from "../mixins/rankingMixin";

export default {
  data() {
    return {
      loading: true,
      game: "",
      userCurrentScore: 0,
      ranking: [],
      userRank: {},
    };
  },
  created() {
    this.game = this.$route.query.game;
    this.userCurrentScore = this.$route.query.score;
    if (this.getUserAuthStatus) {
      // created는 async await을 직접 사용할 수 없기 때문에
      // methods에서 생성해서 호출해야 함
      this.init();
    }
  },
  methods: {
    async init() {
      const { gameRankingArr, userRank } = await this.getRanking(this.game);
      this.ranking = gameRankingArr.splice(0, 10);
      this.userRank = userRank;
      this.loading = false;
    },
  },
  mixins: [getUserAuthStatus, getRanking],
};
</script>
<style src="../assets/css/ranking.css"></style>
<style src="../assets/css/button.css"></style>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

@keyframes textAnimation {
  0% {
    color: #fe4063;
  }
  33% {
    color: #e6ebce;
  }
  66% {
    color: #008080;
  }
  100% {
    color: #fe4063;
  }
}

h1,
.currentScoreContainer {
  font-family: "Oswald", sans-serif;
}

h1 {
  margin-top: 30px;
  animation-name: textAnimation;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.scoreText {
  margin-right: 20px;
  color: #585858;
}

.currentScoreText {
  color: #e6ebce;
}

@media (max-width: 767px) {
  .rankingBox {
    width: 300px;
    height: 300px;
  }
}
@media (min-width: 768px) {
  .rankingBox {
    width: 400px;
    height: 400px;
    margin-top: -50px;
  }
}

@media (min-width: 1240px) {
  .rankingBox {
    margin-top: 50px;
  }
}

.topText,
.nameText,
.topScoreText {
  display: inline-block;
}
.topText {
  width: 25%;
}

.topText > span {
  font-weight: bold;
}

.nameText {
  width: 60%;
  color: black;
}

.topScoreText {
  width: 15%;
  text-align: right;
}

.userRankContainer {
  width: 100%;
  text-align: center;
}

strong {
  color: rgb(253, 255, 148);
}

.buttonContainer {
  margin-top: 50vh;
}

@media (max-width: 767px) {
  h1,
  .scoreText {
    font-size: 3rem;
  }

  .currentScoreText {
    font-size: 4rem;
  }

  .rankingContent {
    font-size: 13px;
  }

  .userRankContainer {
    margin-top: 20px;
  }
}
@media (min-width: 768px) {
  h1,
  .scoreText {
    font-size: 55px;
  }

  .currentScoreText {
    font-size: 65px;
  }

  .rankingContent {
    font-size: 18px;
  }

  .userRankContainer {
    margin-top: 30px;
  }
}
</style>
