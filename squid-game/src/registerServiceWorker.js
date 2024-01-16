// @ts-ignore
/* eslint-disable no-console */

// 서비스 워커 라이브러리
// 기본적으로 register-service-worker는 앱의 정적 자원들을 자동으로 캐시
import { register } from "register-service-worker";

// 'production' 환경에서만 서비스워커 등록 = 개발 환경에서는 등록 X
if (process.env.NODE_ENV === "production") {
  // register 함수를 호출하여 서비스 워커 등록
  // process.env.BASE_URL은  실제 배포된 앱의 기본 URL이 할당됨
  // 따라서 배포 대상 디렉토리인 dist 아래에 service-worker.js 파일을 생성해줘야 함
  register(`${process.env.BASE_URL}/service-worker.js`, {
    // 서비스 워커의 여러 상태에 대한 콜백 함수들
    ready() {
      // ready : 서비스 워커가 준비되면 호출, 캐시에서 콘텐츠를 불러와 제공
      console.log(
        "앱이 캐시된 데이터로 서비스 워커에 의해 제공되고 있습니다.\n" +
          "자세한 내용은 https://goo.gl/AFskqB 를 참조하세요."
      );
    },
    registered() {
      // registered : 서비스 워커가 등록되면 호출
      console.log("서비스 워커가 등록되었습니다.");
    },
    cached() {
      // cached : 콘텐츠가 오프라인 사용을 위해 캐시될 때 호출
      console.log("콘텐츠가 오프라인 사용을 위해 캐시되었습니다.");
    },
    updatefound() {
      // updatefound : 새로운 콘텐츠가 다운로드 중일 때 호출
      console.log("새로운 콘텐츠를 다운로드 중입니다.");
    },
    updated() {
      // updated : 새로운 콘텐츠가 다운로드 되면 호출
      console.log("새로운 콘텐츠가 사용 가능합니다. 새로고침해주세요.");
    },
    offline() {
      // offline : 인터넷 연결이 없을 때 호출
      console.log(
        "인터넷 연결이 없습니다. 앱은 오프라인 모드에서 실행 중입니다."
      );
    },
    error(error) {
      // error : 서비스 워커 등록 중 오류 발생 시 호출
      console.error("서비스 워커 등록 중 오류가 발생했습니다:", error);
    },
  });
}
