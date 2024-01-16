<template>
  <div class="flexCenter columnFlex">
    <div class="flexCenter">
      <img class="logo" src="../assets/images/logo.png" />
    </div>
    <div class="flexCenter columnFlex">
      <button @click="googleAuth_Popup" class="btn squidRed">
        <!-- left : 왼쪽에 위치 (오른쪽에 자동 여백) -->
        <v-icon left color="white">mdi-google</v-icon>Google Sign In
      </button>
      <button @click="$router.push('/emailSignIn')" class="btn squidGreen">
        <v-icon left color="white">mdi-email</v-icon>Email Sign In
      </button>
      <hr color="#e6ebce" />
      <span class="text">Didn't you sign up yet?</span>
      <button @click="$router.push('/emailSignUp')" class="btn squidWhite">
        <v-icon left color="black">mdi-pencil</v-icon>Email Sign Up
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    googleAuth_Popup() {
      this.$store.dispatch("googleAuth_Popup");
    },
  },
};
</script>
<style src="../assets/css/button.css"></style>
<style scoped>
@keyframes logoAnimation {
  from {
    opacity: 1;
    width: 86.4vmin;
  }
  to {
    opacity: 0.5;
    width: 79.2vmin;
  }
}

.logo {
  animation-name: logoAnimation;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

hr {
  width: 350px;
  margin-top: 40px;
  opacity: 0.5;
}

.text {
  font-size: 15px;
  color: #e6ebce;
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
