<!-- src/components/common/AppHeader.vue -->
<template>
    <header class="app-header">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <div class="logo-area">
                    <router-link to="/" class="flex items-center">
                        <!-- <img src="@/assets/images/logo.svg" alt="삶은(SilverLife) 로고" class="h-12"> -->
                        <span class="text-2xl font-bold ml-3 text-primary">삶은(SilverLife)</span>
                    </router-link>
                </div>

                <div class="flex items-center">
                    <!-- 메뉴 버튼 (모바일) -->
                    <button class="menu-button md:hidden p-2" @click="toggleMenu" aria-label="메뉴 열기">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <!-- 네비게이션 (데스크톱) -->
                    <nav class="hidden md:flex space-x-6">
                        <router-link v-for="item in menuItems" :key="item.path" :to="item.path"
                            class="text-xl py-2 px-4 rounded-lg hover:bg-light-gray transition-colors">
                            {{ item.label }}
                        </router-link>
                    </nav>

                    <!-- 로그인/프로필 버튼 -->
                    <!-- <div class="login-area ml-6">
                        <router-link v-if="!isLoggedIn" to="/login" class="btn btn-primary">
                            로그인
                        </router-link>
                        <div v-else class="relative">
                            <button class="profile-button flex items-center" @click="toggleProfileMenu"
                                aria-label="프로필 메뉴">
                                <img src="@/assets/images/default-avatar.png" alt="프로필 이미지"
                                    class="h-12 w-12 rounded-full border-2 border-primary">
                                <span class="ml-2 text-lg">{{ userName }}</span>
                            </button>

                            프로필 드롭다운 메뉴
                            <div v-if="showProfileMenu"
                                class="profile-dropdown absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10">
                                <router-link to="/profile" class="block px-4 py-3 text-lg hover:bg-light">
                                    내 정보
                                </router-link>
                                <router-link to="/settings" class="block px-4 py-3 text-lg hover:bg-light">
                                    설정
                                </router-link>
                                <button @click="logout"
                                    class="block w-full text-left px-4 py-3 text-lg text-error hover:bg-light">
                                    로그아웃
                                </button>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <!-- 모바일 메뉴 -->
        <div v-if="showMenu" class="mobile-menu md:hidden bg-white shadow-lg py-4 px-2">
            <router-link v-for="item in menuItems" :key="item.path" :to="item.path"
                class="block py-3 px-4 text-xl border-b border-light-gray last:border-b-0" @click="showMenu = false">
                {{ item.label }}
            </router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            showMenu: false,
            showProfileMenu: false,
            isLoggedIn: false, // 실제로는 Vuex store에서 가져올 값
            userName: '김시니어', // 실제로는 Vuex store에서 가져올 값
            menuItems: [
                { label: '디지털 교육', path: '/education' },
                // { label: '키오스크 실습', path: '/kiosk' },
                { label: '맞춤 식단', path: '/diet' },
                { label: '인지력 게임', path: '/games' },
                { label: '정책 정보', path: '/policy' }
            ]
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
            if (this.showMenu) {
                this.showProfileMenu = false;
            }
        },
        toggleProfileMenu() {
            this.showProfileMenu = !this.showProfileMenu;
            if (this.showProfileMenu) {
                this.showMenu = false;
            }
        },
        logout() {
            // 로그아웃 로직 구현 (실제로는 Vuex action 호출)
            this.isLoggedIn = false;
            this.showProfileMenu = false;
            this.$router.push('/');
        }
    },
    created() {
        // 클릭 외부 감지로 메뉴 닫기
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) {
                this.showProfileMenu = false;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.app-header {
    @apply bg-white shadow-md sticky top-0 z-50;
}
</style>