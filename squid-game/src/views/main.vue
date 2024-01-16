<template>
  <div>
    <div class="flexCenter mt-5">
      <div class="welcomeText">Welcome to S<b>Q</b>UID G<b>A</b>M<b>E</b></div>
    </div>
    <div class="rankingBox">
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
        <div v-else class="flexCenter columnFlex">
          <div
            v-for="item in userRecord"
            :key="item.game"
            class="flexCenter columnFlex"
          >
            <div class="gameText">{{ item.game }} Game</div>
            <div v-if="item.record">
              <div class="rankText">
                Top
                <strong style="color: rgb(253, 255, 148)">{{
                  item.record.rank
                }}</strong>
              </div>
              <div class="scoreText">
                Score
                <strong style="color: black">{{ item.record.score }}</strong>
              </div>
            </div>
            <div v-else>No Record</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flexCenter columnFlex buttonContainer">
      <button @click="$router.push('/gameList')" class="btn squidGreen">
        <v-icon left color="white">mdi-gamepad-variant</v-icon>Game List
      </button>
      <button @click="logout" class="btn squidWhite">
        <v-icon left color="black">mdi-logout</v-icon>Sign Out
      </button>
    </div>
  </div>
</template>
<script>
import { getRanking } from "../mixins/rankingMixin";
import { logout } from "../mixins/authMixin";

export default {
  data() {
    return {
      loading: true,
      userRecord: [
        { game: "Puzzle", record: {} },
        { game: "UpDown", record: {} },
        { game: "MukChiPa", record: {} },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.userRecord[0].record = (await this.getRanking("Puzzle"))?.userRank;
      this.userRecord[1].record = (await this.getRanking("UpDown"))?.userRank;
      this.userRecord[2].record = (await this.getRanking("MukChiPa"))?.userRank;
      this.loading = false;
    },
  },
  mixins: [getRanking, logout],
};
</script>
<style src="../assets/css/ranking.css"></style>
<style src="../assets/css/button.css"></style>
<style scoped>
.welcomeText {
  font-family: "Oswald", sans-serif;
  font-size: 9vmin;
  font-weight: bold;
  color: #e6ebce;
}

@media (max-width: 767px) {
  .rankingBox {
    width: 300px;
    height: 300px;
    margin-top: -50px;
  }

  .rankingContent {
    font-size: 1rem;
  }
}
@media (min-width: 768px) {
  .rankingBox {
    width: 400px;
    height: 400px;
    margin-top: -50px;
  }

  .rankingContent {
    font-size: 1.5rem;
  }
}

@media (min-width: 1240px) {
  .rankingBox {
    margin-top: 10px;
  }
}

.gameText {
  font-weight: bold;
}

.rankText {
  margin-right: 15px;
}

.rankText,
.scoreText {
  display: inline-block;
}

strong {
  color: "black";
}

.buttonContainer {
  margin-top: 57vh;
}
</style>
