// src/store/index.js
import { createStore } from "vuex";

// 모듈 불러오기
import auth from "./modules/auth";
import user from "./modules/user";
// import education from "./modules/education";
// import kiosk from "./modules/kiosk";
// import diet from "./modules/diet";
// import game from "./modules/game";
// import policy from "./modules/policy";

export default createStore({
  state: {
    appVersion: "1.0.0",
    isLoading: false,
    globalError: null,
    globalSuccess: null,
    fontSizeLevel: 1, // 글꼴 크기 레벨 (1: 기본, 2: 크게, 3: 매우 크게)
    highContrastMode: false,
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.globalError = error;
    },
    SET_SUCCESS(state, message) {
      state.globalSuccess = message;
    },
    CLEAR_MESSAGES(state) {
      state.globalError = null;
      state.globalSuccess = null;
    },
    SET_FONT_SIZE(state, level) {
      state.fontSizeLevel = level;
      // 현재 폰트 크기 레벨을 localStorage에 저장
      localStorage.setItem("font-size-level", level);
    },
    SET_HIGH_CONTRAST(state, enabled) {
      state.highContrastMode = enabled;
      // 고대비 모드 설정을 localStorage에 저장
      localStorage.setItem("high-contrast-mode", enabled);
    },
  },
  actions: {
    showLoading({ commit }) {
      commit("SET_LOADING", true);
    },
    hideLoading({ commit }) {
      commit("SET_LOADING", false);
    },
    showError({ commit }, error) {
      commit("SET_ERROR", error);
      // 5초 후 메시지 자동 제거
      setTimeout(() => {
        commit("CLEAR_MESSAGES");
      }, 5000);
    },
    showSuccess({ commit }, message) {
      commit("SET_SUCCESS", message);
      // 5초 후 메시지 자동 제거
      setTimeout(() => {
        commit("CLEAR_MESSAGES");
      }, 5000);
    },
    clearMessages({ commit }) {
      commit("CLEAR_MESSAGES");
    },
    setFontSize({ commit }, level) {
      commit("SET_FONT_SIZE", level);

      // 폰트 크기 적용
      const rootFontSize = level === 1 ? "16px" : level === 2 ? "18px" : "20px";
      document.documentElement.style.setProperty(
        "--font-size-base",
        rootFontSize
      );
    },
    setHighContrast({ commit }, enabled) {
      commit("SET_HIGH_CONTRAST", enabled);

      // 고대비 모드 적용
      if (enabled) {
        document.body.classList.add("high-contrast");
      } else {
        document.body.classList.remove("high-contrast");
      }
    },
    loadUserPreferences({ dispatch }) {
      // localStorage에서 사용자 설정 불러오기
      const fontSizeLevel = localStorage.getItem("font-size-level");
      const highContrastMode = localStorage.getItem("high-contrast-mode");

      if (fontSizeLevel) {
        dispatch("setFontSize", parseInt(fontSizeLevel));
      }

      if (highContrastMode === "true") {
        dispatch("setHighContrast", true);
      }
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    globalError: (state) => state.globalError,
    globalSuccess: (state) => state.globalSuccess,
    fontSizeLevel: (state) => state.fontSizeLevel,
    highContrastMode: (state) => state.highContrastMode,
  },
  modules: {
    auth,
    user,
    // education,
    // kiosk,
    // diet,
    // game,
    // policy,
  },
});
