<template>
  <v-app>
    <!-- 
      * app : 앱의 핵심 구성 요소로 간주하고 적절한 스타일을 적용
     -->
    <v-navigation-drawer
      clipped
      v-model="drawer"
      app
      src="./assets/images/navbg.png"
    >
      <v-layout fill-height column justify-space-between>
        <div>
          <v-list-item class="mb-7">
            <v-list-item-title class="mt-5 drawerTitle"
              >S<b>Q</b>UID G<b>A</b>M<b>E</b></v-list-item-title
            >
          </v-list-item>
          <v-list v-if="getUserAuthStatus">
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  v-if="getUserInfo.photoURL"
                  :src="getUserInfo.photoURL"
                ></v-img>
                <v-img v-else src="./assets/images/user.png"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  <span class="name">{{ getUserInfo.name }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  getUserInfo.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list v-if="getUserAuthStatus">
            <v-list-item
              v-if="this.$route.path !== '/main'"
              @click="$router.push('/main')"
            >
              <v-list-item-action>
                <v-icon>mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-title style="line-height: 1.5"
                >Main</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-title style="line-height: 1.5"
                >Sign Out</v-list-item-title
              >
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item
              v-if="this.$route.path !== '/'"
              @click="$router.push('/')"
            >
              <v-list-item-action>
                <v-icon>mdi-set-left-right</v-icon>
              </v-list-item-action>
              <v-list-item-title style="line-height: 1.5"
                >Select Mode</v-list-item-title
              >
            </v-list-item>
            <v-list-item
              v-if="this.$route.path !== '/signInUp'"
              @click="$router.push('/signInUp')"
            >
              <v-list-item-action>
                <v-icon>mdi-login</v-icon>
              </v-list-item-action>
              <v-list-item-title style="line-height: 1.5"
                >Sign In</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </div>
        <v-list>
          <v-list-item>
            <v-img justify-end src="./assets/images/gaurdian.png"></v-img>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
    <!-- 
      * clipped-left : drawer가 열렸을 때 app bar가 밀리지 않도록 
      * dark : 테마를 어둡게 하여 아이콘, 글자 색을 흰색으로 바꿈
     -->
    <v-app-bar clipped-left app color="rgb(25, 25, 25)" dark>
      <!-- 
        * icon : 이 버튼이 icon만을 표시하는 버튼임을 나타냄, 아이콘만을 강조하게 스타일이 조정됨
        - 버튼을 누르면, drawer 변수 값이 토글되며 navigation-drawer가 열림
       -->
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>S<b>Q</b>UID G<b>A</b>M<b>E</b></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="appBarRightBtn.showBtn"
        icon
        @click="$router.push(`${appBarRightBtn.to}`)"
      >
        <v-icon>{{ appBarRightBtn.icon }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="bgColor">
      <!-- 화면 전환 애니메이션 설정 -->
      <v-fade-transition>
        <!-- name 값이 없는 경우 default components가 렌더링 됨 -->
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>
<script>
import { getUserAuthStatus, getUserInfo, logout } from "./mixins/authMixin";

export default {
  data() {
    return {
      drawer: false,
      authStatus: false,
      appBarRightBtn: {
        showBtn: true,
        icon: "",
        to: "",
      },
    };
  },
  watch: {
    $route(to, from) {
      this.changeRightBtn();
    },
  },
  mounted() {
    // created : 컴포넌트가 생성될 때
    // mounted : 컴포넌트가 DOM에 추가될 때
    this.changeRightBtn();
  },
  methods: {
    setRightBtnProps(icon, to) {
      this.appBarRightBtn.showBtn = true;
      this.appBarRightBtn.icon = icon;
      this.appBarRightBtn.to = to;
    },
    changeRightBtn() {
      this.authStatus = this.getUserAuthStatus;
      const currentPath = this.$route.path;

      if (["/", "/main"].includes(currentPath)) {
        this.appBarRightBtn.showBtn = false;
      } else if (currentPath === "/signInUp") {
        this.setRightBtnProps("mdi-chevron-left", "/");
      } else if (["/emailSignIn", "/emailSignUp"].includes(currentPath)) {
        this.setRightBtnProps("mdi-chevron-left", "/signInUp");
      } else if (currentPath === "/gameList") {
        this.setRightBtnProps(
          this.authStatus ? "mdi-home" : "mdi-chevron-left",
          this.authStatus ? "/main" : "/"
        );
      } else if (["/Puzzle", "/UpDown", "/MukChiPa"].includes(currentPath)) {
        this.setRightBtnProps("mdi-chevron-left", "/gameList");
      } else if (["/gameResult"].includes(currentPath)) {
        if (this.authStatus) {
          this.setRightBtnProps("mdi-home", "/main");
        } else {
          this.appBarRightBtn.showBtn = false;
        }
      }
    },
  },
  mixins: [getUserAuthStatus, getUserInfo, logout],
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");

.bgColor {
  background-color: rgb(34, 34, 34);
}

.name {
  font-weight: bolder;
}

.drawerTitle {
  font-family: "Oswald", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: black;
}

b {
  color: #fe4063;
}
</style>
