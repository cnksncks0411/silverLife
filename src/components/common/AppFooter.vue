<!-- src/components/common/AppFooter.vue -->
<template>
    <footer class="app-footer bg-dark text-white py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="footer-section">
                    <div class="logo-area mb-4">
                        <!-- <img src="@/assets/images/logo-white.svg" alt="삶은(SilverLife) 로고" class="h-10"> -->
                        <p class="text-xl mt-3">"시니어의 디지털 나침반, 삶은(SilverLife)"</p>
                    </div>
                    <p class="text-gray-300 mt-4">
                        시니어층이 디지털 환경에 쉽게 적응하고, 건강하고 풍요로운 노후 생활을 영위할 수 있도록 지원하는 플랫폼입니다.
                    </p>
                </div>

                <div class="footer-section">
                    <h3 class="text-xl font-bold mb-4">메인 메뉴</h3>
                    <ul class="space-y-3">
                        <li v-for="item in menuItems" :key="item.path">
                            <router-link :to="item.path" class="text-gray-300 hover:text-white text-lg">
                                {{ item.label }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3 class="text-xl font-bold mb-4">고객 지원</h3>
                    <ul class="space-y-3">
                        <li>
                            <router-link to="/about" class="text-gray-300 hover:text-white text-lg">
                                서비스 소개
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/privacy" class="text-gray-300 hover:text-white text-lg">
                                개인정보처리방침
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/terms" class="text-gray-300 hover:text-white text-lg">
                                이용약관
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/contact" class="text-gray-300 hover:text-white text-lg">
                                고객센터
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-600 text-center text-gray-400">
                <p class="text-lg">&copy; {{ currentYear }} 삶은(SilverLife). All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            menuItems: [
                { label: '디지털 교육', path: '/education' },
                { label: '키오스크 실습', path: '/kiosk' },
                { label: '맞춤 식단', path: '/diet' },
                { label: '인지력 게임', path: '/games' },
                { label: '정책 정보', path: '/policy' }
            ]
        }
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    }
}
</script>