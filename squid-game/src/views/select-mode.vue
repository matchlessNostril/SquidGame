<template>
  <!-- 
    fluid : 가로 100% 차지
    fill-height : 세로 100% 차지
   -->
  <div class="bgColor flexCenter">
    <div class="flexCenter logoContainer">
      <!-- 모바일 로고 -->
      <div class="gif">
        <img width="100%" height="auto" src="../assets/images/squid.gif" />
      </div>
      <!-- PC, 태블릿 애니메이션 로고 -->
      <div class="canvas">
        <!-- 상원 -->
        <svg class="c01">
          <circle cx="70" cy="70" r="57.5" />
        </svg>
        <!-- 상원라인 -->
        <div class="c01_line01"></div>
        <div class="c01_line02"></div>
        <div class="c01_line03"></div>
        <div class="c01_line04"></div>

        <!-- 삼각형 -->
        <svg class="tri">
          <polygon points="145,25 268,238 22,238" />
        </svg>
        <div class="black"></div>
        <svg class="tri02">
          <polygon points="145,25 268,238 22,238" />
        </svg>

        <!-- 사각형 -->
        <div class="rect">
          <span class="line01"></span>
          <span class="line02"></span>
          <span class="line03"></span>
          <span class="line03_1"></span>
          <span class="line04"></span>
        </div>

        <!-- 하원 -->
        <svg class="c02">
          <circle cx="70" cy="70" r="57.5" />
        </svg>
        <!-- 하원라인 -->
        <div class="c02_line01"></div>
        <div class="c02_line02"></div>
        <div class="c02_line03"></div>
        <div class="c02_line04"></div>

        <!-- ㅇ -->
        <svg class="c03">
          <circle cx="55" cy="55" r="40" />
        </svg>
        <!-- 다른색 -->
        <svg class="c04">
          <circle cx="55" cy="55" r="40" />
        </svg>
        <!-- ㅗ -->
        <div class="first_letter">
          <span class="line01"></span>
          <span class="line02"></span>
        </div>

        <!-- ㅈ -->
        <div class="second_letter01"></div>
        <!-- l -->
        <div class="second_letter02"></div>
        <!-- ㅇ -->
        <svg class="c05">
          <circle cx="42.5" cy="42.5" r="30" />
        </svg>

        <!-- ㅇ -->
        <svg class="c06">
          <circle cx="42.5" cy="42.5" r="30" />
        </svg>
        <!-- - -->
        <div class="third_letter01"></div>
        <!-- l -->
        <div class="third_letter02"></div>

        <!-- - -->
        <div class="fourth_letter01"></div>
        <!-- / -->
        <div class="fourth_letter02_wrap">
          <div class="fourth_letter02"></div>
        </div>
        <!-- - -->
        <div class="fourth_letter03"></div>
        <!-- | -->
        <div class="fourth_letter04"></div>
        <!-- | -->
        <div class="fourth_letter05"></div>

        <!-- ㅇ -->
        <svg class="c07">
          <circle cx="42.5" cy="42.5" r="30" />
        </svg>
        <!-- l -->
        <div class="fifth_letter01"></div>
        <!-- ㅁ -->
        <div class="fifth_letter02"></div>
        <div class="fifth_letter04"></div>
        <div class="fifth_letter05"></div>
      </div>
    </div>
    <div class="buttonContainer">
      <div class="button">
        <!-- --text : 폰트에 적용 -->
        <h1 class="white--text">Press to start<br />(Online)</h1>
        <!-- fab : 작은 원 버튼 -->
        <v-btn fab class="mt-5" color="#e6ebce" dark to="/signInUp"></v-btn>
      </div>
      <div class="button">
        <h1 class="white--text">Press to start<br />(Offline)</h1>
        <v-btn
          fab
          class="mt-5"
          color="#fe4063"
          @click="$router.push('/gameList')"
        ></v-btn>
      </div>
    </div>
  </div>
</template>
<style scoped src="../assets/css/logo-animation.css"></style>
<style scoped>
/* 이 페이지에서만 로고 애니메이션을 위해 App.vue의 style에 적용된 배경색이 아닌 black을 적용 */
.bgColor {
  background-color: black;
}
.gif {
  width: 100%;
  margin-bottom: 35%;
}

.buttonContainer {
  position: fixed;
  bottom: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.button {
  text-align: center;
  font-family: "Aldrich", sans-serif;
}

@media (max-width: 767px) {
  .gif {
    display: block;
  }
  .canvas {
    display: none;
  }
  .button {
    font-size: 8px;
  }
}
@media (min-width: 768px) {
  .logoContainer {
    height: 70%;
  }
  .gif {
    display: none;
  }
  .button {
    font-size: 14px;
  }
}
</style>
