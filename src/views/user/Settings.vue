<template>
    <div class="settings-page">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-primary text-white py-12 px-4">
            <div class="container mx-auto">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">설정</h1>
                <p class="text-xl max-w-3xl">
                    계정 설정과 애플리케이션 환경을 관리하세요.
                </p>
            </div>
        </div>

        <!-- 설정 콘텐츠 -->
        <div class="settings-content py-12 px-4">
            <div class="container mx-auto max-w-4xl">
                <!-- 계정 설정 섹션 -->
                <div class="account-settings bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 class="text-2xl font-bold mb-6">계정 설정</h2>

                    <!-- 비밀번호 변경 -->
                    <div class="password-change mb-8 pb-8 border-b border-gray-200">
                        <h3 class="text-xl font-bold mb-4">비밀번호 변경</h3>
                        <form @submit.prevent="changePassword" class="max-w-md">
                            <div class="form-group mb-4">
                                <label for="currentPassword" class="block text-lg mb-2">현재 비밀번호</label>
                                <input type="password" id="currentPassword" v-model="passwordForm.currentPassword"
                                    class="input-field" required>
                            </div>

                            <div class="form-group mb-4">
                                <label for="newPassword" class="block text-lg mb-2">새 비밀번호</label>
                                <input type="password" id="newPassword" v-model="passwordForm.newPassword"
                                    class="input-field" required minlength="8">
                                <p class="text-sm text-gray-600 mt-1">비밀번호는 8자 이상이어야 합니다.</p>
                            </div>

                            <div class="form-group mb-6">
                                <label for="confirmPassword" class="block text-lg mb-2">새 비밀번호 확인</label>
                                <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword"
                                    class="input-field" required>
                                <p v-if="passwordMismatch" class="text-error text-sm mt-1">
                                    비밀번호가 일치하지 않습니다.
                                </p>
                            </div>

                            <button type="submit" class="py-3 px-6 bg-primary text-white rounded-lg"
                                :disabled="passwordMismatch || passwordChangeLoading">
                                {{ passwordChangeLoading ? '변경 중...' : '비밀번호 변경' }}
                            </button>
                        </form>
                    </div>

                    <!-- 연결된 계정 -->
                    <div class="connected-accounts mb-8 pb-8 border-b border-gray-200">
                        <h3 class="text-xl font-bold mb-4">연결된 계정</h3>

                        <div class="connected-list space-y-4">
                            <div
                                class="account-item flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                <div class="flex items-center">
                                    <div class="account-icon bg-blue-100 p-2 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600"
                                            fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold">페이스북</h4>
                                        <p class="text-sm text-gray-600">연결되지 않음</p>
                                    </div>
                                </div>
                                <button class="py-2 px-4 border border-gray-300 rounded-lg hover:bg-light">
                                    연결하기
                                </button>
                            </div>

                            <div
                                class="account-item flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                <div class="flex items-center">
                                    <div class="account-icon bg-green-100 p-2 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600"
                                            viewBox="0 0 448 512" fill="currentColor">
                                            <path
                                                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold">카카오톡</h4>
                                        <p class="text-sm text-gray-600">연결됨</p>
                                    </div>
                                </div>
                                <button class="py-2 px-4 border border-gray-300 rounded-lg hover:bg-light">
                                    연결 해제
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 계정 삭제 -->
                    <div class="account-deletion">
                        <h3 class="text-xl font-bold mb-4">계정 삭제</h3>
                        <p class="text-gray-600 mb-4">
                            계정을 삭제하면 모든 정보가 영구적으로 제거됩니다. 이 작업은 되돌릴 수 없습니다.
                        </p>
                        <button @click="showDeleteConfirmation = true" class="py-3 px-6 bg-error text-white rounded-lg">
                            계정 삭제
                        </button>

                        <!-- 계정 삭제 확인 모달 -->
                        <div v-if="showDeleteConfirmation"
                            class="delete-account-modal fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50"
                                @click="showDeleteConfirmation = false"></div>
                            <div class="modal-content bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                                <h4 class="text-xl font-bold mb-4">정말 계정을 삭제하시겠습니까?</h4>
                                <p class="text-gray-600 mb-6">
                                    이 작업은 되돌릴 수 없으며, 모든 정보가 영구적으로 삭제됩니다.
                                </p>
                                <div class="form-group mb-6">
                                    <label for="confirmDelete" class="block text-lg mb-2">확인을 위해 "삭제"를 입력하세요</label>
                                    <input type="text" id="confirmDelete" v-model="deleteConfirmText"
                                        class="input-field" placeholder="삭제">
                                </div>
                                <div class="flex justify-end space-x-4">
                                    <button @click="showDeleteConfirmation = false"
                                        class="py-2 px-4 border border-gray-300 rounded-lg">
                                        취소
                                    </button>
                                    <button @click="deleteAccount" class="py-2 px-4 bg-error text-white rounded-lg"
                                        :disabled="deleteConfirmText !== '삭제' || accountDeletionLoading">
                                        {{ accountDeletionLoading ? '처리 중...' : '계정 삭제' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 애플리케이션 설정 섹션 -->
                <div class="app-settings bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 class="text-2xl font-bold mb-6">애플리케이션 설정</h2>

                    <!-- 접근성 설정 -->
                    <div class="accessibility-settings mb-8 pb-8 border-b border-gray-200">
                        <h3 class="text-xl font-bold mb-4">접근성 설정</h3>

                        <div class="setting-item mb-6">
                            <div class="flex justify-between items-center mb-2">
                                <label for="fontSize" class="text-lg font-medium">글자 크기</label>
                                <span class="text-primary">{{ fontSizeLabels[settings.fontSize] }}</span>
                            </div>
                            <input type="range" id="fontSize" v-model="settings.fontSize" min="1" max="3" step="1"
                                class="w-full">
                        </div>

                        <div class="setting-item mb-6">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" v-model="settings.highContrast" class="h-5 w-5 text-primary">
                                <span class="ml-2 text-lg">고대비 모드</span>
                            </label>
                            <p class="text-sm text-gray-600 mt-1 ml-7">
                                텍스트와 배경 간의 대비를 높여 가독성을 향상시킵니다.
                            </p>
                        </div>

                        <div class="setting-item">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" v-model="settings.autoPlay" class="h-5 w-5 text-primary">
                                <span class="ml-2 text-lg">자동 재생 비디오 비활성화</span>
                            </label>
                            <p class="text-sm text-gray-600 mt-1 ml-7">
                                교육 콘텐츠에서 비디오가 자동으로 재생되지 않도록 합니다.
                            </p>
                        </div>
                    </div>

                    <!-- 알림 설정 -->
                    <div class="notification-settings mb-8 pb-8 border-b border-gray-200">
                        <h3 class="text-xl font-bold mb-4">알림 설정</h3>

                        <div class="setting-item mb-4">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" v-model="settings.notifications.email"
                                    class="h-5 w-5 text-primary">
                                <span class="ml-2 text-lg">이메일 알림</span>
                            </label>
                        </div>

                        <div class="setting-item mb-4">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" v-model="settings.notifications.push"
                                    class="h-5 w-5 text-primary">
                                <span class="ml-2 text-lg">푸시 알림</span>
                            </label>
                        </div>

                        <div class="setting-item">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" v-model="settings.notifications.policy"
                                    class="h-5 w-5 text-primary">
                                <span class="ml-2 text-lg">새로운 정책 정보 알림</span>
                            </label>
                        </div>
                    </div>

                    <!-- 개인정보 보호 설정 -->
                    <div class="privacy-settings">
                        <h3 class="text-xl font-bold mb-4">개인정보 보호</h3>

                        <div class="setting-item mb-4">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" v-model="settings.privacy.shareUsageData"
                                    class="h-5 w-5 text-primary">
                                <span class="ml-2 text-lg">사용 데이터 공유</span>
                            </label>
                            <p class="text-sm text-gray-600 mt-1 ml-7">
                                서비스 개선을 위해 익명화된 사용 데이터를 공유합니다.
                            </p>
                        </div>

                        <div class="setting-item">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" v-model="settings.privacy.saveHistory"
                                    class="h-5 w-5 text-primary">
                                <span class="ml-2 text-lg">활동 내역 저장</span>
                            </label>
                            <p class="text-sm text-gray-600 mt-1 ml-7">
                                학습 진도와 게임 기록 등의 활동 내역을 저장합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 저장 버튼 -->
                <div class="save-button text-center">
                    <button @click="saveSettings" class="py-3 px-8 bg-primary text-white rounded-lg text-lg font-bold"
                        :disabled="settingsSaveLoading">
                        {{ settingsSaveLoading ? '저장 중...' : '설정 저장' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    data() {
        return {
            passwordForm: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            passwordChangeLoading: false,
            showDeleteConfirmation: false,
            deleteConfirmText: '',
            accountDeletionLoading: false,
            settingsSaveLoading: false,
            fontSizeLabels: {
                1: '기본',
                2: '크게',
                3: '매우 크게'
            },
            settings: {
                fontSize: 1,
                highContrast: false,
                autoPlay: true,
                notifications: {
                    email: true,
                    push: true,
                    policy: true
                },
                privacy: {
                    shareUsageData: true,
                    saveHistory: true
                }
            }
        }
    },
    computed: {
        passwordMismatch() {
            return this.passwordForm.newPassword &&
                this.passwordForm.confirmPassword &&
                this.passwordForm.newPassword !== this.passwordForm.confirmPassword;
        }
    },
    created() {
        // 설정 로드 (실제 구현에서는 API 호출이나 Vuex 액션 사용)
        this.loadSettings();
    },
    methods: {
        loadSettings() {
            // 실제 구현에서는 API 호출이나 Vuex 액션 사용
            // 여기서는 로컬 스토리지에서 가져오거나 기본값 사용
            const savedSettings = localStorage.getItem('app-settings');
            if (savedSettings) {
                this.settings = JSON.parse(savedSettings);
            }
        },
        async changePassword() {
            if (this.passwordMismatch) {
                return;
            }

            this.passwordChangeLoading = true;

            try {
                // 실제 구현에서는 API 호출이나 Vuex 액션 사용
                await new Promise(resolve => setTimeout(resolve, 1500));

                // 비밀번호 변경 성공
                alert('비밀번호가 성공적으로 변경되었습니다.');

                // 폼 초기화
                this.passwordForm = {
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                };
            } catch (error) {
                console.error('비밀번호 변경 중 오류 발생:', error);
                alert('비밀번호 변경 중 오류가 발생했습니다.');
            } finally {
                this.passwordChangeLoading = false;
            }
        },
        async deleteAccount() {
            if (this.deleteConfirmText !== '삭제') {
                return;
            }

            this.accountDeletionLoading = true;

            try {
                // 실제 구현에서는 API 호출이나 Vuex 액션 사용
                await new Promise(resolve => setTimeout(resolve, 2000));

                // 계정 삭제 성공 - 로그아웃 처리 및 홈으로 리디렉션
                localStorage.removeItem('user-token');

                // 성공 메시지
                alert('계정이 성공적으로 삭제되었습니다.');

                // 홈 페이지로 리디렉션 (실제 구현에서는 로그아웃 처리 후)
                this.$router.push('/');
            } catch (error) {
                console.error('계정 삭제 중 오류 발생:', error);
                alert('계정 삭제 중 오류가 발생했습니다.');

                // 모달 닫기
                this.showDeleteConfirmation = false;
                this.deleteConfirmText = '';
            } finally {
                this.accountDeletionLoading = false;
            }
        },
        async saveSettings() {
            this.settingsSaveLoading = true;

            try {
                // 실제 구현에서는 API 호출이나 Vuex 액션 사용
                await new Promise(resolve => setTimeout(resolve, 1000));

                // 설정 저장 (로컬 스토리지)
                localStorage.setItem('app-settings', JSON.stringify(this.settings));

                // 설정 적용
                this.applySettings();

                // 성공 메시지
                alert('설정이 성공적으로 저장되었습니다.');
            } catch (error) {
                console.error('설정 저장 중 오류 발생:', error);
                alert('설정 저장 중 오류가 발생했습니다.');
            } finally {
                this.settingsSaveLoading = false;
            }
        },
        applySettings() {
            // 글자 크기 설정 적용
            const fontSizes = {
                1: '16px',
                2: '18px',
                3: '20px'
            };
            document.documentElement.style.setProperty('--font-size-base', fontSizes[this.settings.fontSize]);

            // 고대비 모드 설정 적용
            if (this.settings.highContrast) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }

            // 실제 구현에서는 기타 설정도 적용
        }
    }
}
</script>

<style scoped>
.page-header {
    background-image: linear-gradient(to right, var(--color-primary, #0066CC), #004999);
}

.input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1.125rem;
    transition: border-color 0.2s;
}

.input-field:focus {
    border-color: var(--color-primary, #0066CC);
    outline: none;
}

input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 5px;
    background: #e2e8f0;
    outline: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary, #0066CC);
    cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary, #0066CC);
    cursor: pointer;
}
</style>