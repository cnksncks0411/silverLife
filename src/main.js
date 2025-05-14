// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// 기본 API URL 설정
axios.defaults.baseURL =
  process.env.VUE_APP_API_URL || "http://localhost:8080/api";

// 인증 토큰이 있는 경우 axios 기본 헤더 설정
const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// 전역 axios 에러 핸들러
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 서버 응답이 있는 경우
      switch (error.response.status) {
        case 401:
          // 인증 오류 (로그인 필요)
          store.dispatch("auth/logout");
          router.push("/login");
          break;
        case 403:
          // 권한 없음
          store.dispatch("showError", "이 작업을 수행할 권한이 없습니다.");
          break;
        case 500:
          // 서버 오류
          store.dispatch(
            "showError",
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
          break;
        default:
          // 기타 오류
          if (error.response.data && error.response.data.message) {
            store.dispatch("showError", error.response.data.message);
          } else {
            store.dispatch(
              "showError",
              "오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
          }
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      store.dispatch(
        "showError",
        "서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요."
      );
    } else {
      // 요청 자체에 문제가 있는 경우
      store.dispatch("showError", error.message);
    }
    return Promise.reject(error);
  }
);

const app = createApp(App);

app.use(router);
app.use(store);

// Vue 앱 마운트
app.mount("#app");
