// src/store/modules/user.js
export default {
  namespaced: true,
  state: {
    userInfo: null,
    healthProfile: null,
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    CLEAR_USER(state) {
      state.userInfo = null;
      state.healthProfile = null;
    },
    SET_HEALTH_PROFILE(state, profile) {
      state.healthProfile = profile;
    },
  },
  actions: {
    fetchUserInfo({ commit }) {
      return new Promise((resolve) => {
        // 실제 프로젝트에서는 API 호출
        // 개발 단계에서는 더미 데이터로 시뮬레이션
        setTimeout(() => {
          // 더미 사용자 정보
          const userInfo = {
            id: 1,
            name: "김시니어",
            email: "senior@example.com",
            age: 65,
            gender: "남성",
            region: "서울시 강남구",
            phone: "010-1234-5678",
            registeredAt: "2023-01-15",
          };

          commit("SET_USER_INFO", userInfo);

          // 건강 프로필 로드
          setTimeout(() => {
            const healthProfile = {
              height: 170,
              weight: 68,
              chronicDiseases: ["고혈압", "당뇨"],
              allergies: ["땅콩"],
              medications: ["고혈압약"],
            };

            commit("SET_HEALTH_PROFILE", healthProfile);

            resolve();
          }, 500);
        }, 1000);
      });
    },

    initUserInfo({ commit }, userData) {
      // 새 사용자 초기 정보 설정
      const userInfo = {
        id: Math.floor(Math.random() * 1000) + 1, // 더미 ID
        name: userData.name || "새 회원",
        email: userData.email,
        age: userData.age || null,
        gender: userData.gender || null,
        region: userData.region || null,
        phone: userData.phone || null,
        registeredAt: new Date().toISOString().split("T")[0],
      };

      commit("SET_USER_INFO", userInfo);
    },

    updateUserInfo({ commit, state }, updatedInfo) {
      return new Promise((resolve) => {
        // 실제 프로젝트에서는 API 호출
        // 개발 단계에서는 더미 데이터로 시뮬레이션
        setTimeout(() => {
          // 기존 정보와 업데이트 정보 병합
          const userInfo = {
            ...state.userInfo,
            ...updatedInfo,
          };

          commit("SET_USER_INFO", userInfo);

          resolve({ success: true });
        }, 1000);
      });
    },

    updateHealthProfile({ commit, state }, updatedProfile) {
      return new Promise((resolve) => {
        // 실제 프로젝트에서는 API 호출
        // 개발 단계에서는 더미 데이터로 시뮬레이션
        setTimeout(() => {
          // 기존 정보와 업데이트 정보 병합
          const healthProfile = {
            ...state.healthProfile,
            ...updatedProfile,
          };

          commit("SET_HEALTH_PROFILE", healthProfile);

          resolve({ success: true });
        }, 1000);
      });
    },
  },
  getters: {
    userInfo: (state) => state.userInfo,
    healthProfile: (state) => state.healthProfile,
  },
};
