<!-- src/components/common/AccessibilityControls.vue -->
<template>
    <div class="accessibility-controls fixed right-4 bottom-20 z-40 bg-white rounded-full shadow-lg p-2">
        <button @click="increaseFontSize" class="control-button p-2 rounded-full hover:bg-light-gray"
            aria-label="글자 크게">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </button>

        <button @click="decreaseFontSize" class="control-button p-2 rounded-full hover:bg-light-gray"
            aria-label="글자 작게">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
            </svg>
        </button>

        <button @click="toggleHighContrast" class="control-button p-2 rounded-full hover:bg-light-gray"
            aria-label="고대비 모드">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        </button>
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
            highContrastMode: false
        }
    },
    methods: {
        increaseFontSize() {
            if (this.currentFontSize < this.maxFontSize) {
                this.currentFontSize += this.fontSizeStep;
                this.updateFontSize();
            }
        },
        decreaseFontSize() {
            if (this.currentFontSize > this.minFontSize) {
                this.currentFontSize -= this.fontSizeStep;
                this.updateFontSize();
            }
        },
        updateFontSize() {
            document.documentElement.style.setProperty('--font-size-base', `${this.currentFontSize}px`);
            // localStorage에 설정 저장
            localStorage.setItem('app-font-size', this.currentFontSize);
        },
        toggleHighContrast() {
            this.highContrastMode = !this.highContrastMode;
            document.body.classList.toggle('high-contrast', this.highContrastMode);
            // localStorage에 설정 저장
            localStorage.setItem('app-high-contrast', this.highContrastMode);
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
            }
        }
    },
    mounted() {
        this.loadUserPreferences();
    }
}
</script>

<style>
.high-contrast {
    --color-primary: #0078D7;
    --color-secondary: #FF8C00;
    --color-dark: #000000;
    --color-light: #FFFFFF;

    background-color: #000 !important;
    color: #FFF !important;
}

.high-contrast .card {
    background-color: #222 !important;
    border: 2px solid #FFF !important;
}

.high-contrast button {
    border: 2px solid #FFF !important;
}

.high-contrast a {
    color: #FFFF00 !important;
}
</style>