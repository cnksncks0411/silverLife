<!-- src/App.vue -->
<template>
  <div id="app" class="app-wrapper">
    <app-header />

    <!-- 로딩 인디케이터 -->
    <div v-if="isLoading"
      class="global-loading fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80">
      <div class="spinner-border inline-block w-12 h-12 border-4 border-t-primary rounded-full animate-spin"></div>
    </div>

    <!-- 전역 알림 -->
    <div v-if="globalError || globalSuccess"
      class="global-notification fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <div v-if="globalError"
        class="error-message bg-error text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
        <span>{{ globalError }}</span>
        <button @click="clearMessages" class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div v-if="globalSuccess"
        class="success-message bg-success text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
        <span>{{ globalSuccess }}</span>
        <button @click="clearMessages" class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 메인 콘텐츠 -->
    <main class="min-h-[calc(100vh-300px)]">
      <router-view />
    </main>

    <app-footer />

    <!-- 접근성 컨트롤 -->
    <accessibility-controls />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import AccessibilityControls from '@/components/common/AccessibilityControls.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AccessibilityControls
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'globalError',
      'globalSuccess'
    ])
  },
  methods: {
    ...mapActions([
      'clearMessages',
      'checkAuth',
      'loadUserPreferences'
    ])
  },
  created() {
    // 사용자 인증 상태 확인
    this.checkAuth();

    // 사용자 환경 설정 불러오기
    this.loadUserPreferences();
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}

.global-notification {
  max-width: 90%;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>