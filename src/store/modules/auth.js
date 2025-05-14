// src/store/modules/auth.js
import axios from "axios";
import router from "@/router";

const BASE_URL = process.env.VUE_APP_API_URL || "http://localhost:8080/api";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("user-token") || "",
    status: "",
    error: null,
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = "loading";
      state.error = null;
    },
    AUTH_SUCCESS(state, token) {
      state.status = "success";
      state.token = token;
      state.error = null;
    },
    AUTH_ERROR(state, error) {
      state.status = "error";
      state.error = error;
    },
    LOGOUT(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    login({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");

        // 실제 프로젝트에서는 API 호출
        // 개발 단계에서는 더미 데이터로 시뮬레이션
        setTimeout(() => {
          // 더미 로그인 로직 (실제 프로젝트에서는 API 호출로 대체)
          if (
            user.email === "senior@example.com" &&
            user.password === "password123"
          ) {
            const token = "dummy-token-12345";

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("user-token", token);

            // axios 요청에 기본 헤더 설정
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            commit("AUTH_SUCCESS", token);

            // 사용자 정보 로드
            dispatch("user/fetchUserInfo", null, { root: true });

            resolve({ success: true });
          } else {
            const error = "이메일 또는 비밀번호가 올바르지 않습니다.";
            commit("AUTH_ERROR", error);

            // 로컬 스토리지에서 토큰 제거
            localStorage.removeItem("user-token");

            reject(new Error(error));
          }
        }, 1000); // 1초 지연으로 API 호출 시뮬레이션
      });
    },

    register({ commit, dispatch }, userData) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");

        // 실제 프로젝트에서는 API 호출
        // 개발 단계에서는 더미 데이터로 시뮬레이션
        setTimeout(() => {
          // 더미 회원가입 로직 (실제 프로젝트에서는 API 호출로 대체)
          if (userData.email && userData.password) {
            const token = "dummy-token-new-user";

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("user-token", token);

            // axios 요청에 기본 헤더 설정
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            commit("AUTH_SUCCESS", token);

            // 사용자 정보 초기화
            dispatch("user/initUserInfo", userData, { root: true });

            resolve({ success: true });
          } else {
            const error = "모든 필수 항목을 입력해주세요.";
            commit("AUTH_ERROR", error);
            reject(new Error(error));
          }
        }, 1000); // 1초 지연으로 API 호출 시뮬레이션
      });
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem("user-token");

        // axios 기본 헤더에서 인증 정보 제거
        delete axios.defaults.headers.common["Authorization"];

        commit("LOGOUT");
        commit("user/CLEAR_USER", null, { root: true });

        // 홈 페이지로 리다이렉트
        router.push("/");

        resolve();
      });
    },

    checkAuth({ commit, dispatch }) {
      const token = localStorage.getItem("user-token");

      if (token) {
        // axios 요청에 기본 헤더 설정
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        commit("AUTH_SUCCESS", token);

        // 사용자 정보 로드
        dispatch("user/fetchUserInfo", null, { root: true });
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
    authError: (state) => state.error,
  },
};
