import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// 앱 등록
const squidGameApp = initializeApp({
  apiKey: "Your API Key",
  authDomain: "Your Auth Domain",
  databaseURL: "Your Database URL",
});

// 인증 객체 생성, export
export const squidGameAuth = getAuth(squidGameApp);

// DB 객체 생성, export
export const squidGameDB = getDatabase(squidGameApp);
