<!-- src/views/kiosk/KioskList.vue -->
<template>
    <div class="kiosk-list">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-secondary text-white py-12 px-4">
            <div class="container mx-auto">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">키오스크 실습</h1>
                <p class="text-xl max-w-3xl">
                    음식점, 병원, 공공기관 등 다양한 환경의 키오스크를 실습해보세요.
                    단계별 가이드와 함께 안내해드립니다.
                </p>
            </div>
        </div>

        <!-- 키오스크 유형 선택 -->
        <div class="kiosk-selection py-12 px-4">
            <div class="container mx-auto">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h2 class="text-2xl font-bold mb-4 md:mb-0">키오스크 유형 선택</h2>
                    <div class="filter-buttons">
                        <button v-for="category in kioskCategories" :key="category.id"
                            @click="selectedCategory = category.id" class="btn py-2 px-4 mr-2 mb-2 rounded-full"
                            :class="selectedCategory === category.id ? 'bg-secondary text-white' : 'bg-white text-dark border border-gray-300'">
                            {{ category.name }}
                        </button>
                    </div>
                </div>

                <div v-if="loading" class="text-center py-16">
                    <div
                        class="spinner-border inline-block w-12 h-12 border-4 border-t-secondary rounded-full animate-spin">
                    </div>
                    <p class="text-xl mt-4">키오스크 목록을 불러오는 중입니다...</p>
                </div>

                <div v-else>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div v-for="kiosk in filteredKiosks" :key="kiosk.id"
                            class="kiosk-card card hover:shadow-lg transition-shadow">
                            <div class="relative">
                                <img :src="kiosk.thumbnail" :alt="kiosk.name"
                                    class="w-full h-48 object-cover rounded-t-xl">
                                <div
                                    class="absolute top-4 left-4 bg-secondary text-white py-1 px-3 rounded-full text-sm">
                                    {{ getCategoryName(kiosk.categoryId) }}
                                </div>
                                <div v-if="kiosk.difficulty"
                                    class="absolute top-4 right-4 bg-primary text-white py-1 px-3 rounded-full text-sm">
                                    {{ getDifficultyLabel(kiosk.difficulty) }}
                                </div>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-3">{{ kiosk.name }}</h3>
                                <p class="text-gray text-lg mb-6">{{ kiosk.description }}</p>
                                <router-link :to="`/kiosk/${kiosk.id}`" class="btn btn-secondary w-full text-center">
                                    실습하기
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 안내 섹션 -->
        <div class="info-section py-12 px-4 bg-light">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="info-text">
                        <h2 class="text-2xl font-bold mb-6">키오스크 실습이란?</h2>
                        <p class="text-lg mb-4">
                            키오스크는 무인 정보 단말기로, 음식점, 영화관, 병원 등 다양한 곳에서 주문이나 접수를 위해 사용됩니다.
                        </p>
                        <p class="text-lg mb-4">
                            "삶은" 앱의 키오스크 실습을 통해 실제 상황과 유사한 환경에서 키오스크 사용법을 미리 익혀볼 수 있습니다.
                        </p>
                        <p class="text-lg mb-4">
                            단계별 안내와 함께 진행되므로 처음 사용하시는 분들도 쉽게 따라하실 수 있습니다.
                        </p>
                        <div class="tips mt-8">
                            <h3 class="text-xl font-bold mb-4">실습 팁</h3>
                            <ul class="list-disc pl-6 space-y-2 text-lg">
                                <li>원하는 키오스크 유형을 선택해서 시작해보세요.</li>
                                <li>화면의 안내에 따라 차근차근 진행하시면 됩니다.</li>
                                <li>언제든지 '도움말' 버튼을 눌러 상세 안내를 받을 수 있습니다.</li>
                                <li>실수해도 괜찮아요! 다시 시도할 수 있습니다.</li>
                            </ul>
                        </div>
                    </div>
                    <!-- <div class="info-image">
                        <img src="@/assets/images/kiosk-usage-guide.jpg" alt="키오스크 사용법 안내"
                            class="w-full rounded-xl shadow-lg">
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KioskList',
    data() {
        return {
            loading: true,
            kiosks: [], // 모든 키오스크 목록
            kioskCategories: [
                { id: 'all', name: '전체' },
                { id: 'restaurant', name: '음식점' },
                { id: 'hospital', name: '병원/의료' },
                { id: 'public', name: '공공기관' },
                { id: 'transportation', name: '교통' },
                { id: 'shopping', name: '쇼핑' }
            ],
            selectedCategory: 'all'
        }
    },
    computed: {
        filteredKiosks() {
            if (this.selectedCategory === 'all') {
                return this.kiosks;
            } else {
                return this.kiosks.filter(kiosk => kiosk.categoryId === this.selectedCategory);
            }
        }
    },
    methods: {
        // 더미 데이터 로드 (실제 프로젝트에서는 API 호출로 대체)
        loadKiosks() {
            this.loading = true;

            // 실제 프로젝트에서는 API 호출
            setTimeout(() => {
                this.kiosks = [
                    {
                        id: 1,
                        name: '패스트푸드점 키오스크',
                        description: '햄버거, 사이드 메뉴, 음료를 주문하는 패스트푸드점 키오스크입니다.',
                        categoryId: 'restaurant',
                        difficulty: 'easy',
                        // thumbnail: require('@/assets/images/kiosk-fastfood.jpg')
                    },
                    {
                        id: 2,
                        name: '병원 접수 키오스크',
                        description: '병원 방문 접수와 진료과 선택, 증상 입력 등을 실습할 수 있습니다.',
                        categoryId: 'hospital',
                        difficulty: 'medium',
                        // thumbnail: require('@/assets/images/kiosk-hospital.jpg')
                    },
                    {
                        id: 3,
                        name: '카페 주문 키오스크',
                        description: '커피, 음료, 디저트 등을 주문하는 카페 키오스크입니다.',
                        categoryId: 'restaurant',
                        difficulty: 'easy',
                        // thumbnail: require('@/assets/images/kiosk-cafe.jpg')
                    },
                    {
                        id: 4,
                        name: '영화관 티켓 발권',
                        description: '영화 선택, 좌석 예약, 티켓 발권까지 영화관 키오스크를 실습합니다.',
                        categoryId: 'shopping',
                        difficulty: 'medium',
                        // thumbnail: require('@/assets/images/kiosk-movie.jpg')
                    },
                    {
                        id: 5,
                        name: '주민센터 증명서 발급',
                        description: '주민등록등본 등 각종 증명서 발급 키오스크 사용법을 배웁니다.',
                        categoryId: 'public',
                        difficulty: 'hard',
                        // thumbnail: require('@/assets/images/kiosk-government.jpg')
                    },
                    {
                        id: 6,
                        name: '지하철 승차권 구매',
                        description: '지하철 승차권을 구매하는 키오스크 사용법을 실습합니다.',
                        categoryId: 'transportation',
                        difficulty: 'easy',
                        // thumbnail: require('@/assets/images/kiosk-subway.jpg')
                    },
                    {
                        id: 7,
                        name: '푸드코트 주문',
                        description: '다양한 메뉴를 제공하는 푸드코트 키오스크 주문 방법을 배웁니다.',
                        categoryId: 'restaurant',
                        difficulty: 'medium',
                        // thumbnail: require('@/assets/images/kiosk-foodcourt.jpg')
                    },
                    {
                        id: 8,
                        name: '은행 ATM',
                        description: '현금 입출금 및 송금 등 은행 ATM 사용법을 실습합니다.',
                        categoryId: 'public',
                        difficulty: 'hard',
                        // thumbnail: require('@/assets/images/kiosk-atm.jpg')
                    },
                    {
                        id: 9,
                        name: '공항 체크인',
                        description: '공항에서 셀프 체크인 키오스크를 이용하는 방법을 배웁니다.',
                        categoryId: 'transportation',
                        difficulty: 'hard',
                        // thumbnail: require('@/assets/images/kiosk-airport.jpg')
                    }
                ];

                this.loading = false;
            }, 1000); // 1초 지연 (로딩 효과 시뮬레이션)
        },
        getCategoryName(categoryId) {
            const category = this.kioskCategories.find(cat => cat.id === categoryId);
            return category ? category.name : '';
        },
        getDifficultyLabel(difficulty) {
            switch (difficulty) {
                case 'easy':
                    return '쉬움';
                case 'medium':
                    return '보통';
                case 'hard':
                    return '어려움';
                default:
                    return '';
            }
        }
    },
    created() {
        this.loadKiosks();
    }
}
</script>

<style lang="scss" scoped>
.page-header {
    background-image: linear-gradient(to right, var(--color-secondary), darken(#FF6600, 15%));
}

.spinner-border {
    border-color: rgba(0, 0, 0, 0.1);
    border-top-color: var(--color-secondary);
    animation: spinner 1s linear infinite;
}

@keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}

// 에셋 이미지가 없는 경우를 대비한 플레이스홀더 스타일
[src*='kiosk-fastfood.jpg'],
[src*='kiosk-hospital.jpg'],
[src*='kiosk-cafe.jpg'],
[src*='kiosk-movie.jpg'],
[src*='kiosk-government.jpg'],
[src*='kiosk-subway.jpg'],
[src*='kiosk-foodcourt.jpg'],
[src*='kiosk-atm.jpg'],
[src*='kiosk-airport.jpg'],
[src*='kiosk-usage-guide.jpg'] {
    background-color: #f0f0f0;
    position: relative;

    &::after {
        content: '이미지 준비 중';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--color-gray);
    }
}
</style>