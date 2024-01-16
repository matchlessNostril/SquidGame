import { squidGameAuth } from "../../plugins/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import router from "../../router/router";

export default {
  state: {
    // 사용자 객체
    userInfo: null,
  },

  mutations: {
    // 사용자 객체를 저장
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },

  getters: {
    // 사용자 객체를 불러오기
    getUserInfo(state) {
      return state.userInfo;
    },

    // 사용자 객체를 검사해 로그인 여부 확인
    getUserAuthStatus(state) {
      return state.userInfo != null;
    },
  },

  actions: {
    // payload : actions에서 commit을 제외한 나머지 매개 변수

    // 1. 이메일 회원 가입
    async signUp({ commit }, payload) {
      // 파이어베이스에 이메일 회원 생성 및 저장
      try {
        // 전달 받은 이메일, 비밀번호로 회원가입
        await createUserWithEmailAndPassword(
          squidGameAuth,
          payload.pEmail,
          payload.pPassword
        );

        // 회원가입에 성공하면, 이름도 등록
        await updateProfile(squidGameAuth.currentUser, {
          displayName: payload.pName,
        });

        // createUserWithEmailAndPassword는 회원가입과 동시에 로그인 처리하기 때문에
        // setUserInfo도 해야 함
        commit("setUserInfo", {
          id: squidGameAuth.currentUser.uid,
          name: squidGameAuth.currentUser.displayName,
          email: squidGameAuth.currentUser.email,
          photoURL: squidGameAuth.currentUser.photoURL,
        });

        // 화면 이동
        router.back();
      } catch (err) {
        console.log("signUp에서 err 발생 :", err.message);
      }
    },

    // 2. 이메일 로그인
    async signIn({ commit }, payload) {
      // mutations의 함수를 호출할 때 'commit' 사용
      try {
        // 전달 받은 이메일, 비밀번호로 로그인
        const signInRes = await signInWithEmailAndPassword(
          squidGameAuth,
          payload.pEmail,
          payload.pPassword
        );

        // 로그인에 성공하면, 스토어에 사용자 정보 저장
        commit("setUserInfo", {
          id: signInRes.user.uid,
          name: signInRes.user.displayName,
          email: signInRes.user.email,
          photoURL: signInRes.user.photoURL,
        });

        // 화면 이동
        router.push("/main");
      } catch (err) {
        console.log("signIn에서 err 발생 :", err);
      }
    },

    // 3. 구글 회원가입/로그인
    async googleAuth_Popup({ commit }) {
      // 파이어베이스의 구글 계정 Authentiation 클래스 사용
      // 인스턴스 생성
      const gProvider = new GoogleAuthProvider();

      // 정보 제공 범위 설정, profile, email 정보도 요청
      gProvider.addScope("profile");
      gProvider.addScope("email");

      try {
        // 구글 Auth 팝업이 뜨며 회원가입/로그인 처리
        const googleAuthRes = await signInWithPopup(squidGameAuth, gProvider);

        // 회원가입/로그인에 성공하면, 스토어에 사용자 정보 저장
        commit("setUserInfo", {
          id: googleAuthRes.user.uid,
          name: googleAuthRes.user.displayName,
          email: googleAuthRes.user.email,
          photoURL: googleAuthRes.user.photoURL,
        });

        // 화면 이동
        router.push("/main");
      } catch (err) {
        console.log("signIn에서 err 발생 :", err);
      }
    },

    // 4. 자동 로그인
    autoSignIn({ commit }, payload) {
      // 스토어에 사용자 정보 저장
      commit("setUserInfo", {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoURL: payload.photoURL,
      });
    },

    // 5. 로그아웃
    logout({ commit }) {
      signOut(squidGameAuth);
      // 스토어에 사용자 정보 초기화
      commit("setUserInfo", null);
    },
  },
};
