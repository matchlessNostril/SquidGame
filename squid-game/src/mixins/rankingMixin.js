import { squidGameDB } from "../plugins/firebase";
import { ref, get, set } from "firebase/database";

// 1. 점수 기록
export const recordScore = {
  methods: {
    async recordScore(game, score) {
      try {
        // 온라인, 오프라인 구별하기 위해
        const userInfo = this.$store.getters.getUserInfo;

        // 로그인 하지 않은 사용자 → 오프라인 버전
        // DB 업데이트 X
        if (!userInfo) return;

        // 로그인 한 사용자 → 온라인 버전
        // DB 참조
        const userRecordRef = ref(squidGameDB, `${game}/${userInfo.id}`);
        const snapshot = await get(userRecordRef);

        // 이전 기록이 없는 경우 또는 신기록이면 저장
        if (!snapshot.exists() || score > snapshot.val().score) {
          await set(userRecordRef, {
            email: userInfo.email,
            name: userInfo.name,
            score: score,
          });
          return;
        }
      } catch (err) {
        console.log("recordScore에서 err 발생 :", err);
      } finally {
        this.$router.push({
          path: "/gameResult",
          query: { game, score },
        });
      }
    },
  },
};

// 2. 랭킹 불러오기
export const getRanking = {
  methods: {
    async getRanking(game) {
      try {
        const gameRecordRef = ref(squidGameDB, `${game}`);
        const snapshot = await get(gameRecordRef);

        // json 데이터를 배열로 변환 (정렬하기 위해)
        if (!snapshot.val()) return;
        const gameRecordArr = Object.values(snapshot.val());

        // puzzle 게임은 오름차순, updown, mukchipa는 내림차순
        if (game === "Puzzle") {
          gameRecordArr.sort((a, b) => a.score - b.score);
        } else {
          gameRecordArr.sort((a, b) => b.score - a.score);
        }

        // 랭킹 매기기
        const gameRankingArr = gameRecordArr;
        // 시작 순위 (1위)
        let rank = 1;
        // 동일 순위자 수
        let numOfSameRank = 0;
        // index 0인 사용자는 동점 비교 대상 없이 1위
        gameRankingArr[0].rank = 1;
        for (let i = 1; i < gameRankingArr.length; i++) {
          // index 1인 사용자부터 이전 사용자와 동점인지 비교
          // 점수가 같은 경우 → 동일 순위

          if (gameRankingArr[i].score === gameRankingArr[i - 1].score) {
            // 순위 key와 값 추가
            gameRankingArr[i].rank = rank;
            numOfSameRank++;
            continue;
          }
          // 다른 경우 → 동일 순위자 수 + 1 만큼 순위 증가시켜 key와 값 추가
          rank = rank + numOfSameRank + 1;
          gameRankingArr[i].rank = rank;

          // 동일 순위자 수 초기화
          numOfSameRank = 0;
        }

        // 로그인된 사용자의 이메일 불러오기
        const userEmail = this.$store.getters.getUserInfo.email;
        const userRank = gameRankingArr.find(
          (record) => record.email === userEmail
        );

        return { gameRankingArr, userRank };
      } catch (err) {
        console.log("getRanking에서 err 발생 :", err);
      }
    },
  },
};
