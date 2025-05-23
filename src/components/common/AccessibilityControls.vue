<template>
    <div class="accessibility-controls fixed right-4 bottom-20 z-40 bg-white rounded-xl shadow-lg p-2">
        <h2 class="sr-only">접근성 도구</h2>
        <div class="control-buttons flex flex-col">
            <button @click="increaseFontSize" class="control-button p-2 rounded-full hover:bg-light-gray mb-2"
                aria-label="글자 크게" title="글자 크게">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span class="sr-only">글자 크게</span>
            </button>

            <button @click="decreaseFontSize" class="control-button p-2 rounded-full hover:bg-light-gray mb-2"
                aria-label="글자 작게" title="글자 작게">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>
                <span class="sr-only">글자 작게</span>
            </button>

            <button @click="toggleHighContrast" class="control-button p-2 rounded-full hover:bg-light-gray"
                :class="{ 'bg-primary text-white': highContrastMode }" aria-label="고대비 모드"
                :aria-pressed="highContrastMode ? 'true' : 'false'" title="고대비 모드">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span class="sr-only">고대비 모드 {{ highContrastMode ? '사용중' : '사용 안함' }}</span>
            </button>
        </div>

        <!-- 접근성 상태 정보 (스크린 리더용) -->
        <div class="sr-only" aria-live="polite">
            {{ statusMessage }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccessibilityControls',
    data() {
        return {
            currentFontSize: 16, // 기본 폰트 사이즈 (px)
            minFontSize: 14,
            maxFontSize: 24,
            fontSizeStep: 2,
            highContrastMode: false,
            statusMessage: '' // 스크린 리더를 위한 상태 메시지
        }
    },
    methods: {
        increaseFontSize() {
            if (this.currentFontSize < this.maxFontSize) {
                this.currentFontSize += this.fontSizeStep;
                this.updateFontSize();
                this.statusMessage = `글자 크기가 ${this.currentFontSize}px로 증가했습니다.`;
            } else {
                this.statusMessage = '이미 최대 글자 크기입니다.';
            }
        },
        decreaseFontSize() {
            if (this.currentFontSize > this.minFontSize) {
                this.currentFontSize -= this.fontSizeStep;
                this.updateFontSize();
                this.statusMessage = `글자 크기가 ${this.currentFontSize}px로 감소했습니다.`;
            } else {
                this.statusMessage = '이미 최소 글자 크기입니다.';
            }
        },
        updateFontSize() {
            document.documentElement.style.setProperty('--font-size-base', `${this.currentFontSize}px`);
            // localStorage에 설정 저장
            localStorage.setItem('app-font-size', this.currentFontSize);

            // Vuex 스토어가 있다면 설정 업데이트
            if (this.$store) {
                const fontSizeLevel = this.currentFontSize <= 16 ? 1 :
                    this.currentFontSize <= 20 ? 2 : 3;
                this.$store.dispatch('setFontSize', fontSizeLevel);
            }
        },
        toggleHighContrast() {
            this.highContrastMode = !this.highContrastMode;
            document.body.classList.toggle('high-contrast', this.highContrastMode);

            // 상태 메시지 업데이트
            this.statusMessage = this.highContrastMode ?
                '고대비 모드가 활성화되었습니다.' :
                '고대비 모드가 비활성화되었습니다.';

            // localStorage에 설정 저장
            localStorage.setItem('app-high-contrast', this.highContrastMode);

            // Vuex 스토어가 있다면 설정 업데이트
            if (this.$store) {
                this.$store.dispatch('setHighContrast', this.highContrastMode);
            }
        },
        loadUserPreferences() {
            // localStorage에서 사용자 설정 불러오기
            const savedFontSize = localStorage.getItem('app-font-size');
            const savedHighContrast = localStorage.getItem('app-high-contrast');

            if (savedFontSize) {
                this.currentFontSize = parseInt(savedFontSize);
                this.updateFontSize();
            }

            if (savedHighContrast === 'true') {
                this.highContrastMode = true;
                document.body.classList.add('high-contrast');
                this.statusMessage = '고대비 모드가 활성화되어 있습니다.';
            }
        }
    },
    mounted() {
        this.loadUserPreferences();

        // 키보드 단축키 추가
        window.addEventListener('keydown', (e) => {
            // Alt + Shift + C: 고대비 모드 토글
            if (e.altKey && e.shiftKey && e.code === 'KeyC') {
                this.toggleHighContrast();
            }

            // Alt + Shift + Plus: 글자 크기 증가
            if (e.altKey && e.shiftKey && e.code === 'Equal') {
                this.increaseFontSize();
            }

            // Alt + Shift + Minus: 글자 크기 감소
            if (e.altKey && e.shiftKey && e.code === 'Minus') {
                this.decreaseFontSize();
            }
        });
    },
    beforeDestroy() {
        // 키보드 이벤트 리스너 정리
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}
</script>

<style>
.high-contrast {
    /* 좀 더 부드러운 고대비 모드 색상 */
    --color-primary: #007ACC; /* 진한 파란색 - 눈에 잘 띄지만 덜 자극적 */
    --color-secondary: #F08C00; /* 주황색 - 파란색과 좋은 대비를 이룸 */
    --color-background: #121212; /* 매우 어두운 회색 (완전한 검은색보다 부드러움) */
    --color-text: #EEEEEE; /* 약간 부드러운 흰색 */
    --color-border: #888888; /* 회색 테두리 */
    --color-link: #4DACFF; /* 밝은 파란색 링크 */
    --color-error: #FF6B6B; /* 부드러운 빨간색 */
    --color-success: #4CAF50; /* 부드러운 녹색 */

    /* 기본 배경과 텍스트 색상 설정 */
    background-color: var(--color-background) !important;
    color: var(--color-text) !important;
}

/* 카드, 섹션 등 컨테이너 요소 */
.high-contrast .card,
.high-contrast .bg-white {
    background-color: #1E1E1E !important; /* 배경보다 약간 밝은 색상 */
    border: 1px solid #555 !important;
    color: var(--color-text) !important;
}

.high-contrast .bg-light,
.high-contrast .bg-gray-50,
.high-contrast .bg-gray-100 {
    background-color: #1E1E1E !important;
}

/* 헤더 영역 */
.high-contrast .page-header {
    background: linear-gradient(to right, #00508C, #0077CC) !important;
    color: white !important;
}

/* 버튼 스타일 */
.high-contrast button:not(.btn-primary),
.high-contrast .btn:not(.btn-primary) {
    background-color: #2A2A2A !important;
    color: var(--color-text) !important;
    border: 1px solid #6E6E6E !important;
}

.high-contrast .btn-primary,
.high-contrast .bg-primary {
    background-color: var(--color-primary) !important;
    color: white !important;
    border: none !important;
}

/* 텍스트 색상 */
.high-contrast .text-primary {
    color: #4DACFF !important; /* 더 밝은 파란색 - 어두운 배경에서 잘 보임 */
}

.high-contrast .text-secondary {
    color: #FFB74D !important; /* 밝은 주황색 */
}

.high-contrast .text-gray-600,
.high-contrast .text-gray-500,
.high-contrast .text-gray-400 {
    color: #BBB !important; /* 밝은 회색 */
}

/* 링크 스타일 */
.high-contrast a {
    color: var(--color-link) !important;
    text-decoration: underline !important;
}

/* 입력 필드 스타일 */
.high-contrast input,
.high-contrast select,
.high-contrast textarea {
    background-color: #1E1E1E !important;
    color: var(--color-text) !important;
    border: 1px solid #555 !important;
}

/* 포커스 스타일 */
.high-contrast button:focus,
.high-contrast a:focus,
.high-contrast input:focus,
.high-contrast select:focus,
.high-contrast textarea:focus {
    outline: 2px solid #4DACFF !important;
    outline-offset: 2px !important;
}

/* 다양한 배경색 요소들 */
.high-contrast .bg-primary {
    background-color: var(--color-primary) !important;
}

.high-contrast .bg-secondary {
    background-color: var(--color-secondary) !important;
}

.high-contrast .bg-success {
    background-color: var(--color-success) !important;
}

.high-contrast .bg-error {
    background-color: var(--color-error) !important;
}

/* 버튼 호버 상태 */
.high-contrast button:hover:not(:disabled),
.high-contrast .btn:hover:not(:disabled) {
    filter: brightness(1.2) !important;
}

/* 비활성화 요소 */
.high-contrast button:disabled,
.high-contrast .btn:disabled,
.high-contrast input:disabled {
    opacity: 0.6 !important;
}

/* 그림자 효과 약화 */
.high-contrast .shadow,
.high-contrast .shadow-sm,
.high-contrast .shadow-md,
.high-contrast .shadow-lg,
.high-contrast .shadow-xl {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
}

.high-contrast .highBlack {
    color: black;
}
</style>