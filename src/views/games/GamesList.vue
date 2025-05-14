<template>
    <div class="games-list">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-secondary text-white py-12 px-4">
            <div class="container mx-auto">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">인지력 향상 게임</h1>
                <p class="text-xl max-w-3xl">
                    기억력, 집중력, 추론능력 향상을 위한 다양한 게임을 즐겨보세요.
                    재미있게 두뇌를 단련하고 인지 건강을 관리하세요.
                </p>
            </div>
        </div>

        <!-- 게임 카테고리 필터 -->
        <div class="filter-section py-6 px-4 bg-light border-b border-light-gray">
            <div class="container mx-auto">
                <div class="flex flex-wrap items-center">
                    <!-- 카테고리 필터 -->
                    <div class="filter-buttons mr-auto mb-4 md:mb-0">
                        <button v-for="category in gameCategories" :key="category.id"
                            @click="selectedCategory = category.id" class="btn py-2 px-4 mr-2 mb-2 rounded-full"
                            :class="selectedCategory === category.id ? 'bg-secondary text-white' : 'bg-white text-dark border border-gray-300'">
                            {{ category.name }}
                        </button>
                    </div>

                    <!-- 난이도 선택 -->
                    <div class="difficulty-filter">
                        <label class="mr-2">난이도:</label>
                        <select v-model="selectedDifficulty" class="p-2 border border-gray-300 rounded-lg">
                            <option value="all">전체</option>
                            <option value="easy">쉬움</option>
                            <option value="medium">보통</option>
                            <option value="hard">어려움</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- 게임 목록 -->
        <div class="games-grid py-12 px-4">
            <div class="container mx-auto">
                <div v-if="loading" class="text-center py-16">
                    <div
                        class="spinner-border inline-block w-12 h-12 border-4 border-t-secondary rounded-full animate-spin">
                    </div>
                    <p class="text-xl mt-4">게임 목록을 불러오는 중입니다...</p>
                </div>

                <div v-else-if="filteredGames.length === 0" class="text-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 class="text-2xl font-bold mb-2">게임을 찾을 수 없습니다</h2>
                    <p class="text-xl text-gray-600 mb-6">다른 카테고리나 난이도를 선택해 보세요.</p>
                    <button @click="resetFilters" class="py-3 px-6 bg-secondary text-white rounded-lg">
                        필터 초기화
                    </button>
                </div>

                <div v-else>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div v-for="game in filteredGames" :key="game.id"
                            class="game-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div class="relative">
                                <img :src="game.thumbnail" :alt="game.title" class="w-full h-48 object-cover">
                                <div
                                    class="absolute top-4 left-4 bg-secondary text-white py-1 px-3 rounded-full text-sm">
                                    {{ getCategoryName(game.categoryId) }}
                                </div>
                                <div
                                    class="absolute top-4 right-4 bg-white text-secondary py-1 px-3 rounded-full text-sm font-bold">
                                    {{ getDifficultyLabel(game.difficulty) }}
                                </div>
                            </div>

                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-2">{{ game.title }}</h3>
                                <p class="text-gray-600 mb-4">{{ game.description }}</p>

                                <div class="flex items-center justify-between">
                                    <div class="stats flex items-center">
                                        <span class="flex items-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-1"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {{ game.playTime }}
                                        </span>
                                        <span class="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400 mr-1"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                                            </svg>
                                            {{ game.difficulty === 'easy' ? '쉬움' : game.difficulty === 'medium' ? '보통' :
                                            '어려움' }}
                                        </span>
                                    </div>

                                    <router-link :to="`/games/${game.id}`"
                                        class="py-2 px-4 bg-secondary text-white rounded-lg hover:bg-opacity-90">
                                        게임 시작
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 인지력 향상 팁 섹션 -->
        <div class="tips-section py-12 px-4 bg-light">
            <div class="container mx-auto">
                <h2 class="text-2xl font-bold mb-8">인지력 향상을 위한 팁</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="tip-card bg-white rounded-xl shadow-md p-6">
                        <div
                            class="icon-circle mx-auto bg-secondary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-center">규칙적인 두뇌 활동</h3>
                        <p class="text-gray-600">
                            매일 15-30분씩 두뇌를 자극하는 활동을 하세요.
                            퍼즐, 독서, 암산 등 다양한 활동이 도움이 됩니다.
                        </p>
                    </div>

                    <div class="tip-card bg-white rounded-xl shadow-md p-6">
                        <div
                            class="icon-circle mx-auto bg-secondary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-center">건강한 식습관</h3>
                        <p class="text-gray-600">
                            오메가-3 지방산, 항산화물질, 비타민이 풍부한 식품을 섭취하세요.
                            뇌 건강을 위한 영양소가 인지 기능을 향상시킵니다.
                        </p>
                    </div>

                    <div class="tip-card bg-white rounded-xl shadow-md p-6">
                        <div
                            class="icon-circle mx-auto bg-secondary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-center">사회적 활동</h3>
                        <p class="text-gray-600">
                            친구나 가족과의 대화, 모임 활동 등 사회적 관계를 유지하세요.
                            사회적 상호작용은 인지 기능을 자극합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GamesList',
    data() {
        return {
            loading: true,
            games: [],
            selectedCategory: 'all',
            selectedDifficulty: 'all',
            gameCategories: [
                { id: 'all', name: '전체' },
                { id: 'memory', name: '기억력' },
                { id: 'attention', name: '집중력' },
                { id: 'reasoning', name: '추론능력' },
                { id: 'reaction', name: '반응속도' }
            ]
        }
    },
    computed: {
        filteredGames() {
            let result = this.games;

            // 카테고리 필터링
            if (this.selectedCategory !== 'all') {
                result = result.filter(game => game.categoryId === this.selectedCategory);
            }

            // 난이도 필터링
            if (this.selectedDifficulty !== 'all') {
                result = result.filter(game => game.difficulty === this.selectedDifficulty);
            }

            return result;
        }
    },
    created() {
        this.fetchGames();
    },
    methods: {
        fetchGames() {
            this.loading = true;

            // 실제 구현에서는 API 호출이나 Vuex 액션 사용
            setTimeout(() => {
                // 더미 데이터
                this.games = [
                    {
                        id: 1,
                        title: '기억력 카드 매칭',
                        description: '짝을 이루는 카드를 찾아 기억력을 향상시키는 게임입니다.',
                        categoryId: 'memory',
                        difficulty: 'easy',
                        playTime: '약 5분',
                        // thumbnail: require('@/assets/images/game-memory-cards.jpg')
                    },
                    {
                        id: 2,
                        title: '숫자 순서 기억하기',
                        description: '화면에 나타난 숫자를 순서대로 기억하여 입력하는 게임입니다.',
                        categoryId: 'memory',
                        difficulty: 'medium',
                        playTime: '약 7분',
                        // thumbnail: require('@/assets/images/game-number-memory.jpg')
                    },
                    {
                        id: 3,
                        title: '색상 단어 테스트',
                        description: '색상 이름과 실제 색상이 다를 때 실제 색상을 맞추는 집중력 게임입니다.',
                        categoryId: 'attention',
                        difficulty: 'hard',
                        playTime: '약 10분',
                        // thumbnail: require('@/assets/images/game-stroop-test.jpg')
                    },
                    {
                        id: 4,
                        title: '패턴 찾기',
                        description: '화면에 나타난 패턴의 규칙을 찾아 다음 패턴을 예측하는 추론 게임입니다.',
                        categoryId: 'reasoning',
                        difficulty: 'medium',
                        playTime: '약 8분',
                        // thumbnail: require('@/assets/images/game-pattern-finding.jpg')
                    },
                    {
                        id: 5,
                        title: '빠른 반응',
                        description: '화면에 나타나는 신호에 빠르게 반응하는 게임입니다.',
                        categoryId: 'reaction',
                        difficulty: 'easy',
                        playTime: '약 5분',
                        // thumbnail: require('@/assets/images/game-reaction.jpg')
                    },
                    {
                        id: 6,
                        title: '단어 연상 게임',
                        description: '주어진 단어와 관련된 다른 단어를 연상하는 기억력 및 창의력 게임입니다.',
                        categoryId: 'memory',
                        difficulty: 'medium',
                        playTime: '약 6분',
                        // thumbnail: require('@/assets/images/game-word-association.jpg')
                    },
                    {
                        id: 7,
                        title: '수학 퍼즐',
                        description: '다양한 수학 문제를 풀어 논리적 사고력을 향상시키는 게임입니다.',
                        categoryId: 'reasoning',
                        difficulty: 'hard',
                        playTime: '약 12분',
                        // thumbnail: require('@/assets/images/game-math-puzzle.jpg')
                    },
                    {
                        id: 8,
                        title: '다중 작업 훈련',
                        description: '여러 작업을 동시에 수행하여 집중력과 작업 전환 능력을 향상시키는 게임입니다.',
                        categoryId: 'attention',
                        difficulty: 'hard',
                        playTime: '약 10분',
                        // thumbnail: require('@/assets/images/game-multitasking.jpg')
                    },
                    {
                        id: 9,
                        title: '소리 기억하기',
                        description: '들려주는 소리 패턴을 기억하여 재현하는 청각 기억력 게임입니다.',
                        categoryId: 'memory',
                        difficulty: 'medium',
                        playTime: '약 7분',
                        // thumbnail: require('@/assets/images/game-sound-memory.jpg')
                    }
                ];

                this.loading = false;
            }, 1000);
        },
        getCategoryName(categoryId) {
            const category = this.gameCategories.find(cat => cat.id === categoryId);
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
        },
        resetFilters() {
            this.selectedCategory = 'all';
            this.selectedDifficulty = 'all';
        }
    }
}
</script>

<style scoped>
.page-header {
    background-image: linear-gradient(to right, var(--color-secondary, #FF6600), #FF8033);
}

.spinner-border {
    border-color: rgba(0, 0, 0, 0.1);
    border-top-color: var(--color-secondary, #FF6600);
    animation: spinner 1s linear infinite;
}

@keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}

/* 이미지 플레이스홀더 스타일 */
[src*='game-'] {
    background-color: #f0f0f0;
    position: relative;
}

[src*='game-']::after {
    content: '이미지 준비 중';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #757575;
}
</style>