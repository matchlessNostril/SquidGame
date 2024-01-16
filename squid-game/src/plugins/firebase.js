import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const squidGameApp = initializeApp({
  apiKey: "Your API Key",
  authDomain: "Your Auth Domain",
});

// 인증 객체 생성, export
export const squidGameAuth = getAuth(squidGameApp);
