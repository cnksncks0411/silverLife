<template>
    <div class="game-play">
        <!-- 게임 헤더 -->
        <div class="game-header bg-secondary text-white py-8 px-4">
            <div class="container mx-auto">
                <div class="flex items-center mb-4">
                    <router-link to="/games" class="flex items-center text-white hover:underline mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        목록으로
                    </router-link>
                    <div class="bg-white text-secondary py-1 px-3 rounded-full text-sm">
                        {{ game.categoryName }}
                    </div>
                </div>
                <h1 class="text-3xl md:text-4xl font-bold">{{ game.title }}</h1>
            </div>
        </div>

        <!-- 게임 콘텐츠 -->
        <div class="game-content py-8 px-4">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- 게임 영역 (좌측 2/3) -->
                    <div class="game-area lg:col-span-2">
                        <div class="game-card bg-white rounded-xl shadow-lg p-6 mb-8">
                            <div v-if="loading" class="text-center py-16">
                                <div
                                    class="spinner-border inline-block w-12 h-12 border-4 border-t-secondary rounded-full animate-spin">
                                </div>
                                <p class="text-xl mt-4">게임을 불러오는 중입니다...</p>
                            </div>

                            <div v-else>
                                <!-- 게임 시작 화면 -->
                                <div v-if="gameState === 'start'" class="game-start text-center py-8">
                                    <img :src="game.thumbnail" :alt="game.title"
                                        class="mx-auto mb-6 rounded-lg max-w-sm">
                                    <h2 class="text-2xl font-bold mb-4">{{ game.title }}</h2>
                                    <p class="text-lg mb-6 max-w-xl mx-auto">{{ game.description }}</p>
                                    <button @click="startGame"
                                        class="py-3 px-8 bg-secondary text-white rounded-lg text-lg font-bold">
                                        게임 시작하기
                                    </button>
                                </div>

                                <!-- 기억력 카드 매칭 게임 -->
                                <div v-else-if="game.id === 1 && gameState === 'playing'" class="memory-card-game">
                                    <div class="game-stats flex justify-between items-center mb-6">
                                        <div class="attempts text-lg">
                                            시도: <span class="font-bold">{{ attempts }}</span>
                                        </div>
                                        <div class="timer text-lg">
                                            시간: <span class="font-bold">{{ formatTime(timer) }}</span>
                                        </div>
                                        <div class="matches text-lg">
                                            매칭: <span class="font-bold">{{ matches }}/{{ totalPairs }}</span>
                                        </div>
                                    </div>

                                    <div class="cards-grid grid grid-cols-4 gap-4">
                                        <div v-for="(card, index) in cards" :key="index" @click="flipCard(index)"
                                            class="card-wrapper aspect-w-1 aspect-h-1">
                                            <div class="card relative rounded-lg cursor-pointer transition-transform duration-500"
                                                :class="{ 'flipped': card.flipped || card.matched }">
                                                <div
                                                    class="card-back absolute inset-0 bg-secondary rounded-lg flex items-center justify-center text-white text-4xl transform rotate-y-180">
                                                    {{ card.value }}
                                                </div>
                                                <div
                                                    class="card-front absolute inset-0 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        class="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 게임 완료 화면 -->
                                <div v-else-if="gameState === 'completed'" class="game-completed text-center py-8">
                                    <div class="success-icon mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-success"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>

                                    <h2 class="text-2xl font-bold mb-4">축하합니다!</h2>
                                    <p class="text-lg mb-2">시간: <span class="font-bold">{{ formatTime(completionTime)
                                            }}</span></p>
                                    <p class="text-lg mb-6">시도 횟수: <span class="font-bold">{{ attempts }}</span></p>

                                    <div class="flex flex-wrap justify-center gap-4">
                                        <button @click="resetGame"
                                            class="py-3 px-6 bg-secondary text-white rounded-lg text-lg">
                                            다시 하기
                                        </button>
                                        <router-link to="/games"
                                            class="py-3 px-6 border-2 border-secondary text-secondary rounded-lg text-lg">
                                            다른 게임 선택
                                        </router-link>
                                    </div>
                                </div>

                                <!-- 다른 게임들 (추후 확장) -->
                                <div v-else class="text-center py-8">
                                    <p class="text-xl text-gray-600">
                                        이 게임은 아직 개발 중입니다. 다른 게임을 선택해 주세요.
                                    </p>
                                    <router-link to="/games"
                                        class="mt-6 py-3 px-6 bg-secondary text-white rounded-lg inline-block">
                                        다른 게임 선택
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <!-- 게임 설명 -->
                        <div class="game-description bg-white rounded-xl shadow-md p-6">
                            <h2 class="text-xl font-bold mb-4">게임 설명</h2>
                            <p class="text-lg mb-4">{{ game.description }}</p>

                            <!-- 카드 매칭 게임 설명 -->
                            <div v-if="game.id === 1" class="game-instructions">
                                <h3 class="text-lg font-bold mb-2">게임 방법</h3>
                                <ol class="list-decimal pl-6 space-y-2">
                                    <li>카드를 클릭하여 뒷면을 확인합니다.</li>
                                    <li>같은 숫자 또는 기호를 가진 두 카드를 찾습니다.</li>
                                    <li>두 카드가 일치하면 짝이 맞춰진 상태로 유지됩니다.</li>
                                    <li>일치하지 않으면 다시 뒤집어집니다.</li>
                                    <li>모든 카드 쌍을 찾으면 게임이 완료됩니다.</li>
                                </ol>
                                <h3 class="text-lg font-bold mt-4 mb-2">인지 효과</h3>
                                <p>이 게임은 다음과 같은 인지 기능을 향상시키는 데 도움이 됩니다:</p>
                                <ul class="list-disc pl-6 space-y-1 mt-2">
                                    <li>시각적 기억력</li>
                                    <li>공간 인지 능력</li>
                                    <li>집중력</li>
                                    <li>패턴 인식 능력</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- 사이드바 (우측 1/3) -->
                    <div class="sidebar">
                        <!-- 게임 기록 -->
                        <div class="game-stats bg-white rounded-xl shadow-md p-6 mb-8">
                            <h3 class="text-xl font-bold mb-4">내 기록</h3>

                            <div v-if="gameHistory.length > 0">
                                <div class="stats-grid grid grid-cols-2 gap-4 mb-6">
                                    <div class="stat-card p-4 bg-light rounded-lg">
                                        <p class="text-gray-600 mb-1">최고 점수</p>
                                        <p class="text-2xl font-bold">{{ getBestScore() }}</p>
                                    </div>
                                    <div class="stat-card p-4 bg-light rounded-lg">
                                        <p class="text-gray-600 mb-1">최단 시간</p>
                                        <p class="text-2xl font-bold">{{ formatTime(getBestTime()) }}</p>
                                    </div>
                                </div>

                                <h4 class="font-bold mb-2">최근 기록</h4>
                                <div class="history-list space-y-2">
                                    <div v-for="(record, index) in gameHistory.slice(0, 5)" :key="index"
                                        class="history-item flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0">
                                        <span>{{ formatDate(record.date) }}</span>
                                        <span class="font-medium">{{ formatTime(record.time) }}</span>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="text-center py-4">
                                <p class="text-gray-600">아직 게임 기록이 없습니다.</p>
                            </div>
                        </div>

                        <!-- 추천 게임 -->
                        <div class="recommended-games bg-white rounded-xl shadow-md p-6">
                            <h3 class="text-xl font-bold mb-4">추천 게임</h3>

                            <div class="recommended-list space-y-4">
                                <div v-for="recommendedGame in recommendedGames" :key="recommendedGame.id"
                                    class="recommended-item flex items-center p-3 border border-gray-200 rounded-lg hover:bg-light hover:border-secondary cursor-pointer"
                                    @click="goToGame(recommendedGame.id)">
                                    <img :src="recommendedGame.thumbnail" :alt="recommendedGame.title"
                                        class="w-16 h-16 object-cover rounded-lg mr-4">
                                    <div>
                                        <h4 class="font-bold mb-1">{{ recommendedGame.title }}</h4>
                                        <p class="text-sm text-gray-600">{{ recommendedGame.categoryName }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GamePlay',
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            loading: true,
            game: {},
            gameState: 'start', // 'start', 'playing', 'completed'
            timer: 0,
            timerInterval: null,
            attempts: 0,
            matches: 0,
            totalPairs: 8,
            completionTime: 0,
            cards: [],
            flippedCards: [],
            gameHistory: [],
            recommendedGames: []
        }
    },
    created() {
        this.fetchGameData();
        // 게임 기록 불러오기
        const savedHistory = localStorage.getItem(`game_history_${this.id}`);
        if (savedHistory) {
            this.gameHistory = JSON.parse(savedHistory);
        }
    },
    beforeUnmount() {
        this.stopTimer();
    },
    methods: {
        fetchGameData() {
            this.loading = true;

            // 실제 구현에서는 API 호출이나 Vuex 액션 사용
            setTimeout(() => {
                // 게임 세부 정보
                const gameCategories = {
                    'memory': '기억력',
                    'attention': '집중력',
                    'reasoning': '추론능력',
                    'reaction': '반응속도'
                };

                // 모든 게임 데이터
                const allGames = [
                    {
                        id: 1,
                        title: '기억력 카드 매칭',
                        description: '짝을 이루는 카드를 찾아 기억력을 향상시키는 게임입니다. 같은 숫자나 기호를 가진 카드 쌍을 기억하고 찾아내는 과정에서 시각적 기억력과 집중력이 향상됩니다.',
                        categoryId: 'memory',
                        categoryName: '기억력',
                        difficulty: 'easy',
                        playTime: '약 5분',
                        // thumbnail: require('@/assets/images/game-memory-cards.jpg')
                    },
                    {
                        id: 2,
                        title: '숫자 순서 기억하기',
                        description: '화면에 나타난 숫자를 순서대로 기억하여 입력하는 게임입니다.',
                        categoryId: 'memory',
                        categoryName: '기억력',
                        difficulty: 'medium',
                        playTime: '약 7분',
                        // thumbnail: require('@/assets/images/game-number-memory.jpg')
                    },
                    {
                        id: 3,
                        title: '색상 단어 테스트',
                        description: '색상 이름과 실제 색상이 다를 때 실제 색상을 맞추는 집중력 게임입니다.',
                        categoryId: 'attention',
                        categoryName: '집중력',
                        difficulty: 'hard',
                        playTime: '약 10분',
                        // thumbnail: require('@/assets/images/game-stroop-test.jpg')
                    },
                    {
                        id: 4,
                        title: '패턴 찾기',
                        description: '화면에 나타난 패턴의 규칙을 찾아 다음 패턴을 예측하는 추론 게임입니다.',
                        categoryId: 'reasoning',
                        categoryName: '추론능력',
                        difficulty: 'medium',
                        playTime: '약 8분',
                        // thumbnail: require('@/assets/images/game-pattern-finding.jpg')
                    },
                    {
                        id: 5,
                        title: '빠른 반응',
                        description: '화면에 나타나는 신호에 빠르게 반응하는 게임입니다.',
                        categoryId: 'reaction',
                        categoryName: '반응속도',
                        difficulty: 'easy',
                        playTime: '약 5분',
                        // thumbnail: require('@/assets/images/game-reaction.jpg')
                    }
                ];

                // 현재 게임 찾기
                this.game = allGames.find(g => g.id === Number(this.id)) || {};

                // 추천 게임 (같은 카테고리의 다른 게임들)
                this.recommendedGames = allGames
                    .filter(g => g.id !== Number(this.id) && g.categoryId === this.game.categoryId)
                    .slice(0, 3);

                // 추천 게임이 부족한 경우 다른 카테고리에서 추가
                if (this.recommendedGames.length < 3) {
                    const additionalGames = allGames
                        .filter(g => g.id !== Number(this.id) && g.categoryId !== this.game.categoryId)
                        .slice(0, 3 - this.recommendedGames.length);

                    this.recommendedGames = [...this.recommendedGames, ...additionalGames];
                }

                this.loading = false;
            }, 1000);
        },
        startGame() {
            this.gameState = 'playing';
            this.attempts = 0;
            this.matches = 0;
            this.flippedCards = [];
            this.timer = 0;

            // 게임 ID에 따라 다른 초기화 로직
            if (this.game.id === 1) {
                // 기억력 카드 매칭 게임 초기화
                this.initMemoryCardGame();
            }

            // 타이머 시작
            this.startTimer();
        },
        initMemoryCardGame() {
            // 카드 쌍 생성 (8쌍 = 16장)
            const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            let cards = [];

            // 각 값을 2번씩 넣어 쌍 만들기
            values.forEach(value => {
                cards.push({ value, flipped: false, matched: false });
                cards.push({ value, flipped: false, matched: false });
            });

            // 카드 섞기 (Fisher-Yates 셔플 알고리즘)
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }

            this.cards = cards;
            this.totalPairs = values.length;
        },
        flipCard(index) {
            // 이미 뒤집힌 카드거나 매치된 카드면 무시
            if (this.cards[index].flipped || this.cards[index].matched || this.flippedCards.length >= 2) {
                return;
            }

            // 카드 뒤집기
            this.cards[index].flipped = true;
            this.flippedCards.push(index);

            // 두 장이 뒤집혔을 때
            if (this.flippedCards.length === 2) {
                this.attempts++;
                const [firstIndex, secondIndex] = this.flippedCards;

                // 두 카드가 일치하는지 확인
                if (this.cards[firstIndex].value === this.cards[secondIndex].value) {
                    // 일치하면 matched 상태로 변경
                    this.cards[firstIndex].matched = true;
                    this.cards[secondIndex].matched = true;
                    this.matches++;
                    this.flippedCards = [];

                    // 모든 쌍을 찾았는지 확인
                    if (this.matches === this.totalPairs) {
                        this.completeGame();
                    }
                } else {
                    // 일치하지 않으면 잠시 후 다시 뒤집기
                    setTimeout(() => {
                        this.cards[firstIndex].flipped = false;
                        this.cards[secondIndex].flipped = false;
                        this.flippedCards = [];
                    }, 1000);
                }
            }
        },
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.timer++;
            }, 1000);
        },
        stopTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
        },
        completeGame() {
            this.stopTimer();
            this.completionTime = this.timer;
            this.gameState = 'completed';

            // 게임 기록 저장
            this.saveGameResult();
        },
        resetGame() {
            this.gameState = 'start';
        },
        saveGameResult() {
            // 현재 게임 결과 저장
            const result = {
                date: new Date(),
                time: this.completionTime,
                attempts: this.attempts,
                score: this.calculateScore()
            };

            // 기존 기록에 추가
            this.gameHistory.unshift(result);

            // 최대 20개까지만 저장
            if (this.gameHistory.length > 20) {
                this.gameHistory = this.gameHistory.slice(0, 20);
            }

            // 로컬 스토리지에 저장
            localStorage.setItem(`game_history_${this.id}`, JSON.stringify(this.gameHistory));
        },
        calculateScore() {
            // 시간과 시도 횟수를 기반으로 점수 계산
            // 기본 점수 1000점에서 시간과 시도 횟수에 따라 감점
            const baseScore = 1000;
            const timeDeduction = Math.floor(this.completionTime / 2); // 2초당 1점 감점
            const attemptsDeduction = (this.attempts - this.totalPairs) * 10; // 최소 시도 횟수(총 쌍 수)를 뺀 나머지 시도 횟수당 10점 감점

            let score = baseScore - timeDeduction - attemptsDeduction;
            return Math.max(0, score); // 0점 미만이 되지 않도록
        },
        getBestScore() {
            if (this.gameHistory.length === 0) return '없음';

            const bestScore = Math.max(...this.gameHistory.map(record => record.score || 0));
            return bestScore;
        },
        getBestTime() {
            if (this.gameHistory.length === 0) return 0;

            const bestTime = Math.min(...this.gameHistory.map(record => record.time));
            return bestTime;
        },
        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        },
        formatDate(date) {
            if (!date) return '';

            const d = new Date(date);
            const year = d.getFullYear();
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const day = d.getDate().toString().padStart(2, '0');

            return `${year}-${month}-${day}`;
        },
        goToGame(gameId) {
            this.$router.push(`/games/${gameId}`);
        }
    }
}
</script>

<style scoped>
.game-header {
    background-image: linear-gradient(to right, var(--color-secondary, #FF6600), #FF8033);
}

.cards-grid {
    perspective: 1000px;
}

.card {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.card.flipped {
    transform: rotateY(180deg);
}

.card-front,
.card-back {
    backface-visibility: hidden;
}

.card-back {
    transform: rotateY(180deg);
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