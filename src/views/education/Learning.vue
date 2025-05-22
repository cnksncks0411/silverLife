<template>
    <div class="learning-view">
        <!-- 상단 내비게이션 바 -->
        <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
            <div class="container mx-auto px-4 py-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <button @click="confirmExit" class="text-gray-700 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div class="truncate max-w-md">
                            <h1 class="text-xl font-bold">{{ educationTitle }}</h1>
                            <p class="text-sm text-gray-500">{{ currentStep ? currentStep.title : '' }}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-4 px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                            {{ currentStepIndex + 1 }} / {{ steps.length }}
                        </span>
                        <button @click="toggleFullscreen" class="text-gray-700">
                            <svg v-if="isFullscreen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- 학습 진행 상태 바 -->
        <div class="fixed top-16 left-0 right-0 z-10">
            <div class="progress-bar w-full h-2 bg-gray-200">
                <div class="h-2 bg-primary transition-all duration-300 ease-out"
                    :style="{ width: `${progressPercentage}%` }"></div>
            </div>
            <div class="progress-steps flex justify-between px-8 bg-white text-xs py-1 border-b border-gray-200">
                <button v-for="(step, index) in steps" :key="index" @click="goToStep(index)" :class="[
                    'step flex flex-col items-center transition-all duration-200',
                    currentStepIndex === index ? 'text-primary font-bold transform scale-110' :
                        currentStepIndex > index ? 'text-gray-500' : 'text-gray-400',
                    !canGoToStep(index) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                ]" :disabled="!canGoToStep(index)" :style="{ width: `${100 / steps.length}%` }">
                    <div class="step-dot w-4 h-4 rounded-full mb-1" :class="[
                        index < currentStepIndex ? 'bg-primary' :
                            index === currentStepIndex ? 'bg-primary border-4 border-primary-light' : 'bg-gray-300'
                    ]"></div>
                    <span class="step-number">{{ index + 1 }}</span>
                </button>
            </div>
        </div>

        <!-- 메인 학습 콘텐츠 영역 -->
        <main class="pt-28 pb-28 px-4">
            <div class="container mx-auto max-w-4xl">
                <div class="learning-container">
                    <!-- 현재 단계가 없거나 로딩 중인 경우 -->
                    <div v-if="loading" class="loading-state bg-white rounded-xl shadow-md p-8 text-center">
                        <div
                            class="spinner mx-auto mb-4 w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin">
                        </div>
                        <p class="text-lg text-gray-700">학습 콘텐츠를 불러오는 중입니다...</p>
                    </div>

                    <!-- 현재 단계가 있는 경우 -->
                    <div v-else-if="currentStep" class="step-content">
                        <!-- 단계 소개 -->
                        <div class="step-intro bg-white rounded-xl shadow-md p-6 mb-6">
                            <h2 class="text-2xl font-bold mb-4">{{ currentStep.title }}</h2>
                            <p class="text-lg text-gray-700 mb-4">{{ currentStep.description }}</p>

                            <div v-if="currentStep.imageUrl" class="step-image mb-4">
                                <img :src="currentStep.imageUrl" :alt="currentStep.title" class="w-full rounded-lg">
                            </div>

                            <div class="step-time flex items-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>예상 소요 시간: {{ currentStep.durationMinutes || 5 }}분</span>
                            </div>
                        </div>

                        <!-- 학습 내용 (콘텐츠가 있는 경우) -->
                        <div v-if="currentStep.content"
                            class="step-learning-content bg-white rounded-xl shadow-md p-6 mb-6">
                            <h3 class="text-xl font-bold mb-4">학습 내용</h3>
                            <div class="content text-lg space-y-4" v-html="currentStep.content"></div>
                        </div>

                        <!-- 이해도 체크 퀴즈 (있는 경우) -->
                        <div v-if="currentStep.quiz" class="step-quiz bg-white rounded-xl shadow-md p-6 mb-6">
                            <h3 class="text-xl font-bold mb-4">이해도 확인하기</h3>

                            <div class="quiz-container">
                                <div class="quiz-question text-lg font-medium mb-4">
                                    {{ currentStep.quiz.question }}
                                </div>

                                <div class="quiz-options space-y-3 mb-6">
                                    <button v-for="(option, idx) in currentStep.quiz.options" :key="idx"
                                        @click="selectAnswer(idx)" :disabled="answerSelected !== null" :class="[
                                            'w-full p-4 text-left rounded-lg border-2 transition-all duration-200',
                                            answerSelected === null ? 'border-gray-300 hover:border-primary' :
                                                answerSelected === idx && idx === currentStep.quiz.correctAnswer ? 'border-green-500 bg-green-50' :
                                                    answerSelected === idx ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        ]">
                                        <div class="flex items-start">
                                            <div class="option-indicator w-6 h-6 rounded-full mr-3 flex-shrink-0 flex items-center justify-center border-2 mt-0.5"
                                                :class="[
                                                    answerSelected === null ? 'border-gray-400' :
                                                        answerSelected === idx && idx === currentStep.quiz.correctAnswer ? 'border-green-500 bg-green-500 text-white' :
                                                            answerSelected === idx ? 'border-red-500 bg-red-500 text-white' :
                                                                idx === currentStep.quiz.correctAnswer && answerSelected !== null ? 'border-green-500 bg-green-500 text-white' : 'border-gray-400'
                                                ]">
                                                <span
                                                    v-if="answerSelected !== null && idx === currentStep.quiz.correctAnswer"
                                                    class="text-white text-sm">✓</span>
                                                <span
                                                    v-else-if="answerSelected === idx && idx !== currentStep.quiz.correctAnswer"
                                                    class="text-white text-sm">✗</span>
                                            </div>
                                            <span class="text-lg">{{ option }}</span>
                                        </div>
                                    </button>
                                </div>

                                <div v-if="answerSelected !== null" :class="[
                                    'answer-feedback p-4 rounded-lg mb-4',
                                    answerSelected === currentStep.quiz.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                                ]">
                                    <div class="flex items-start">
                                        <div class="feedback-icon flex-shrink-0 mr-3">
                                            <svg v-if="answerSelected === currentStep.quiz.correctAnswer"
                                                xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="font-medium mb-1">
                                                {{ answerSelected === currentStep.quiz.correctAnswer ? '정답입니다!' :
                                                    '틀렸습니다.' }}
                                            </p>
                                            <p v-if="currentStep.quiz.explanation" class="text-sm">
                                                {{ currentStep.quiz.explanation }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 하단 내비게이션 -->
        <footer class="fixed bottom-0 left-0 right-0 bg-white shadow-md-up border-t border-gray-200 py-4 px-4 z-10">
            <div class="container mx-auto flex justify-between items-center">
                <button @click="prevStep" :disabled="currentStepIndex === 0" :class="[
                    'flex items-center py-3 px-6 rounded-lg text-lg font-medium',
                    currentStepIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    이전
                </button>

                <div class="flex-grow text-center hidden md:block">
                    <span class="text-gray-500">{{ currentStepIndex + 1 }} / {{ steps.length }}</span>
                </div>

                <button @click="nextStep" :disabled="!canContinue" :class="[
                    'flex items-center py-3 px-6 rounded-lg text-lg font-medium',
                    !canContinue ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'
                ]">
                    {{ isLastStep ? '학습 완료' : '다음' }}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </footer>

        <!-- 학습 완료 모달 -->
        <div v-if="showCompletionModal" class="completion-modal fixed inset-0 z-50 flex items-center justify-center">
            <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50" @click="showCompletionModal = false">
            </div>
            <div class="modal-content bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 relative z-10">
                <div class="p-6 text-center">
                    <div
                        class="completion-icon w-24 h-24 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 class="text-2xl font-bold mb-3">축하합니다!</h2>
                    <p class="text-lg text-gray-700 mb-6">{{ educationTitle }} 학습을 성공적으로 완료하셨습니다!</p>

                    <div class="stats-container grid grid-cols-3 gap-4 mb-8">
                        <div class="stat p-3 bg-gray-50 rounded-lg">
                            <div class="value text-2xl font-bold text-primary">{{ steps.length }}</div>
                            <div class="label text-sm text-gray-500">학습 단계</div>
                        </div>
                        <div class="stat p-3 bg-gray-50 rounded-lg">
                            <div class="value text-2xl font-bold text-primary">{{ correctAnswers }}</div>
                            <div class="label text-sm text-gray-500">맞힌 퀴즈</div>
                        </div>
                        <div class="stat p-3 bg-gray-50 rounded-lg">
                            <div class="value text-2xl font-bold text-primary">{{ formatTime(timeSpent) }}</div>
                            <div class="label text-sm text-gray-500">소요 시간</div>
                        </div>
                    </div>

                    <div class="buttons space-y-3">
                        <button @click="shareCompletion"
                            class="w-full py-3 bg-green-500 text-white rounded-lg font-medium flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            학습 완료 공유하기
                        </button>
                        <button @click="goToRecommendedCourse"
                            class="w-full py-3 bg-primary text-white rounded-lg font-medium">
                            다음 추천 강좌 시작하기
                        </button>
                        <button @click="goBackToDetail"
                            class="w-full py-3 border border-primary text-primary rounded-lg font-medium">
                            교육 상세 페이지로 돌아가기
                        </button>
                        <button @click="showCompletionModal = false" class="w-full py-3 text-gray-500 font-medium">
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 나가기 확인 모달 -->
        <div v-if="showExitConfirmModal" class="exit-confirm-modal fixed inset-0 z-50 flex items-center justify-center">
            <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50" @click="showExitConfirmModal = false">
            </div>
            <div class="modal-content bg-white rounded-xl shadow-xl w-full max-w-md mx-4 relative z-10">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-3">학습을 종료하시겠습니까?</h3>
                    <p class="text-gray-700 mb-6">지금 나가면 현재까지의 진행 상황은 저장됩니다. 나중에 이어서 학습할 수 있습니다.</p>

                    <div class="flex justify-end space-x-3">
                        <button @click="showExitConfirmModal = false"
                            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg">
                            취소
                        </button>
                        <button @click="exitLearning" class="px-4 py-2 bg-primary text-white rounded-lg">
                            나가기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Learning',
    props: {
        educationId: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            loading: true,
            educationTitle: '',
            steps: [],
            currentStepIndex: 0,
            furthestStep: 0, // 사용자가 도달한 가장 먼 단계
            answerSelected: null,
            timeSpent: 0, // 초 단위
            timerInterval: null,
            correctAnswers: 0,
            totalQuizzes: 0,
            showCompletionModal: false,
            showExitConfirmModal: false,
            isFullscreen: false,
            recommendedCourses: [] // 추천 강좌 목록
        }
    },
    computed: {
        currentStep() {
            return this.steps[this.currentStepIndex] || null;
        },
        progressPercentage() {
            return this.steps.length > 0 ? Math.round((this.currentStepIndex / (this.steps.length - 1)) * 100) : 0;
        },
        isLastStep() {
            return this.currentStepIndex === this.steps.length - 1;
        },
        canContinue() {
            // 퀴즈가 있는 경우, 정답을 선택했을 때만 다음으로 넘어갈 수 있음
            if (this.currentStep && this.currentStep.quiz && this.answerSelected === null) {
                return false;
            }
            return true;
        }
    },
    created() {
        this.fetchEducationData();

        // 학습 시간 측정을 위한 타이머 시작
        this.timerInterval = setInterval(() => {
            this.timeSpent++;
        }, 1000);

        // 페이지 이탈 시 경고
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeDestroy() {
        // 타이머 정리
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // 이벤트 리스너 제거
        window.removeEventListener('beforeunload', this.handleBeforeUnload);

        // 전체 화면 모드 해제
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    },
    methods: {
        fetchEducationData() {
            this.loading = true;

            // 실제 구현에서는 API 호출
            setTimeout(() => {
                // 더미 데이터
                this.educationTitle = '스마트폰 기본 사용법';
                this.steps = [
                    {
                        title: '스마트폰 켜고 끄기',
                        description: '스마트폰의 전원 버튼 위치와 전원을 켜고 끄는 방법을 배웁니다.',
                        durationMinutes: 5,
                        imageUrl: '',
                        content: `<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">전원 버튼 찾기</h4>
  <p>대부분의 스마트폰은 오른쪽 측면이나 상단에 전원 버튼이 있습니다. 길쭉한 직사각형 모양의 버튼입니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">전원 켜기</h4>
  <p>전원 버튼을 2~3초간 길게 누르면 화면에 로고가 나타나며 전원이 켜집니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">전원 끄기</h4>
  <p>1. 전원 버튼을 2~3초간 길게 누릅니다.</p>
  <p>2. 화면에 '전원 끄기' 옵션이 나타납니다.</p>
  <p>3. '전원 끄기'를 터치하면 스마트폰이 꺼집니다.</p>
</div>`,
                        quiz: {
                            question: '스마트폰을 켜려면 전원 버튼을 어떻게 눌러야 할까요?',
                            options: [
                                '빠르게 여러 번 누른다',
                                '2~3초간 길게 누른다',
                                '두 번 연속 누른다',
                                '볼륨 버튼과 함께 누른다'
                            ],
                            correctAnswer: 1,
                            explanation: '스마트폰을 켜려면 전원 버튼을 2~3초간 길게 눌러야 합니다.'
                        }
                    },
                    {
                        title: '화면 잠금 해제하기',
                        description: '스마트폰 화면 잠금을 해제하는 다양한 방법을 배웁니다.',
                        durationMinutes: 8,
                        imageUrl: '',
                        content: `<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">화면 깨우기</h4>
  <p>전원 버튼을 짧게 누르면 화면이 켜집니다. 일부 스마트폰은 화면을 두 번 탭하면 켜지기도 합니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">잠금 해제 방법</h4>
  <p><strong>패턴:</strong> 미리 설정한 패턴대로 점들을 연결합니다.</p>
  <p><strong>PIN:</strong> 숫자 비밀번호를 입력합니다.</p>
  <p><strong>지문:</strong> 지문 인식 센서에 등록된 손가락을 올립니다.</p>
  <p><strong>얼굴 인식:</strong> 전면 카메라가 얼굴을 인식할 수 있도록 합니다.</p>
</div>`,
                        quiz: {
                            question: '화면 잠금을 해제하는 방법이 아닌 것은?',
                            options: [
                                '패턴 그리기',
                                'PIN 번호 입력',
                                '지문 인식',
                                '음성 명령'
                            ],
                            correctAnswer: 3,
                            explanation: '일반적으로 화면 잠금 해제는 패턴, PIN, 지문, 얼굴 인식 등을 사용합니다. 음성 명령은 일반적인 잠금 해제 방법이 아닙니다.'
                        }
                    },
                    {
                        title: '홈 화면 이해하기',
                        description: '스마트폰 홈 화면의 구성 요소와 기본적인 조작 방법을 배웁니다.',
                        durationMinutes: 10,
                        imageUrl: '',
                        content: `<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">홈 화면 구성요소</h4>
  <p><strong>상태 표시줄:</strong> 화면 상단에 배터리, 시간, Wi-Fi 등 정보가 표시됩니다.</p>
  <p><strong>앱 아이콘:</strong> 설치된 앱들이 아이콘으로 표시됩니다.</p>
  <p><strong>위젯:</strong> 날씨, 시계 등 정보를 표시하는 작은 프로그램입니다.</p>
  <p><strong>독(Dock):</strong> 화면 하단에 자주 사용하는 앱을 고정해 둘 수 있습니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">기본 제스처</h4>
  <p><strong>탭(짧게 터치):</strong> 앱 실행, 항목 선택</p>
  <p><strong>길게 터치:</strong> 추가 옵션 메뉴 표시</p>
  <p><strong>스와이프(밀기):</strong> 화면 전환, 알림창 열기</p>
  <p><strong>핀치(두 손가락으로 확대/축소):</strong> 사진, 웹페이지 확대/축소</p>
</div>`,
                        quiz: {
                            question: '스마트폰에서 앱을 실행하기 위해 사용하는 가장 기본적인 제스처는?',
                            options: [
                                '길게 터치하기',
                                '짧게 탭하기',
                                '스와이프하기',
                                '두 번 탭하기'
                            ],
                            correctAnswer: 1,
                            explanation: '앱을 실행하기 위해서는 일반적으로 앱 아이콘을 짧게 탭(터치)합니다.'
                        }
                    },
                    {
                        title: '전화 걸고 받기',
                        description: '스마트폰으로 전화를 걸고 받는 방법을 배웁니다.',
                        durationMinutes: 12,
                        imageUrl: '',
                        content: `<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">전화 앱 실행하기</h4>
  <p>홈 화면이나 앱 서랍에서 전화 아이콘(보통 수화기 모양)을 탭합니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">전화 걸기</h4>
  <p><strong>키패드로 전화걸기:</strong></p>
  <p>1. 전화 앱에서 키패드 탭을 선택합니다.</p>
  <p>2. 전화번호를 입력합니다.</p>
  <p>3. 녹색 전화기 버튼을 탭하여 전화를 겁니다.</p>
  <p><strong>연락처로 전화걸기:</strong></p>
  <p>1. 전화 앱에서 연락처 탭을 선택합니다.</p>
  <p>2. 원하는 연락처를 찾아 탭합니다.</p>
  <p>3. 전화기 아이콘을 탭하여 전화를 겁니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">전화 받기</h4>
  <p>전화가 오면 화면에 수신 화면이 표시됩니다.</p>
  <p>1. 녹색 전화기 아이콘을 오른쪽으로 스와이프하여 전화를 받습니다.</p>
  <p>2. 빨간색 전화기 아이콘을 왼쪽으로 스와이프하여 전화를 거절합니다.</p>
</div>`,
                        quiz: {
                            question: '전화를 받기 위해 해야 하는 행동은?',
                            options: [
                                '빨간색 전화기 아이콘을 탭한다',
                                '녹색 전화기 아이콘을 오른쪽으로 스와이프한다',
                                '전화 앱을 실행한다',
                                '볼륨 버튼을 누른다'
                            ],
                            correctAnswer: 1,
                            explanation: '전화가 오면 녹색 전화기 아이콘을 오른쪽으로 스와이프하여 전화를 받을 수 있습니다.'
                        }
                    },
                    {
                        title: '문자 메시지 보내기',
                        description: '스마트폰으로 문자 메시지를 작성하고 보내는 방법을 배웁니다.',
                        durationMinutes: 10,
                        imageUrl: '',
                        content: `<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">메시지 앱 실행하기</h4>
  <p>홈 화면이나 앱 서랍에서 메시지 앱 아이콘을 탭합니다.</p>
  <p>아이폰에서는 '메시지', 안드로이드에서는 'SMS', '메시지' 등의 이름을 가진 앱입니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">새 메시지 작성하기</h4>
  <p>1. 메시지 앱 화면에서 우측 하단의 + 버튼이나 새 메시지 아이콘을 탭합니다.</p>
  <p>2. 수신자 입력란에 전화번호를 직접 입력하거나, 연락처에서 선택합니다.</p>
  <p>3. 메시지 입력란에 보낼 내용을 입력합니다.</p>
  <p>4. 전송 버튼(보통 화살표나 종이비행기 모양)을 탭하여 메시지를 보냅니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">이모티콘 사용하기</h4>
  <p>1. 메시지 입력 중에 키보드의 이모티콘 버튼(웃는 얼굴 모양)을 탭합니다.</p>
  <p>2. 원하는 이모티콘을 선택합니다.</p>
  <p>3. 메시지에 이모티콘이 추가됩니다.</p>
</div>`,
                        quiz: {
                            question: '새 메시지를 보내기 위해 가장 먼저 해야 할 일은?',
                            options: [
                                '전화 앱을 실행한다',
                                '메시지 앱을 실행한다',
                                '연락처 앱을 실행한다',
                                '설정 앱을 실행한다'
                            ],
                            correctAnswer: 1,
                            explanation: '문자 메시지를 보내려면 먼저 메시지 앱을 실행해야 합니다.'
                        }
                    }
                ];

                // 추천 강좌 더미 데이터
                this.recommendedCourses = [
                    {
                        id: 2,
                        title: '카카오톡 사용하기'
                    },
                    {
                        id: 3,
                        title: '사진 촬영 및 관리하기'
                    }
                ];

                // 퀴즈 개수 계산
                this.totalQuizzes = this.steps.filter(step => step.quiz).length;

                // 저장된 진행 상황 불러오기
                this.loadProgress();

                this.loading = false;
            }, 800);
        },

        loadProgress() {
            // 로컬 스토리지나 API에서 저장된 진행 상황 불러오기
            const savedProgress = localStorage.getItem(`learning_progress_${this.educationId}`);

            if (savedProgress) {
                try {
                    const progress = JSON.parse(savedProgress);
                    this.currentStepIndex = progress.currentStepIndex || 0;
                    this.furthestStep = progress.furthestStep || 0;
                    this.correctAnswers = progress.correctAnswers || 0;

                    // 이미 완료한 퀴즈는 답변 상태로 표시하지 않고 넘어갈 수 있게 함
                    if (progress.completedQuizzes && progress.completedQuizzes[this.currentStepIndex]) {
                        this.answerSelected = progress.completedQuizzes[this.currentStepIndex];
                    }
                } catch (e) {
                    console.error('학습 진행 상황을 불러오는 중 오류 발생:', e);
                }
            }
        },

        saveProgress() {
            // 진행 상황 저장 (로컬 스토리지 사용)
            const completedQuizzes = {};

            // 현재 단계의 퀴즈 정답 상태 저장
            if (this.currentStep && this.currentStep.quiz && this.answerSelected !== null) {
                completedQuizzes[this.currentStepIndex] = this.answerSelected;
            }

            const progress = {
                educationId: this.educationId,
                currentStepIndex: this.currentStepIndex,
                furthestStep: Math.max(this.furthestStep, this.currentStepIndex),
                correctAnswers: this.correctAnswers,
                timeSpent: this.timeSpent,
                completedQuizzes,
                lastUpdated: new Date().toISOString()
            };

            localStorage.setItem(`learning_progress_${this.educationId}`, JSON.stringify(progress));

            // 교육 상세 페이지에서 사용할 진행률도 업데이트
            const progressPercentage = Math.round((this.currentStepIndex / (this.steps.length - 1)) * 100);
            localStorage.setItem(`education_progress_${this.educationId}`, progressPercentage);
        },

        prevStep() {
            if (this.currentStepIndex > 0) {
                this.currentStepIndex--;
                this.resetStepState();
                this.saveProgress();
            }
        },

        nextStep() {
            if (!this.canContinue) return;

            if (this.currentStepIndex < this.steps.length - 1) {
                this.currentStepIndex++;
                this.furthestStep = Math.max(this.furthestStep, this.currentStepIndex);
                this.resetStepState();
                this.saveProgress();
            } else {
                // 마지막 단계에서 다음 버튼을 누르면 학습 완료 처리
                this.completeEducation();
            }
        },

        resetStepState() {
            // 단계 이동 시 상태 초기화
            this.answerSelected = null;

            // 저장된 답변이 있으면 불러오기
            const savedProgress = localStorage.getItem(`learning_progress_${this.educationId}`);
            if (savedProgress) {
                try {
                    const progress = JSON.parse(savedProgress);

                    // 이미 완료한 퀴즈는 답변 상태 복원
                    if (progress.completedQuizzes && progress.completedQuizzes[this.currentStepIndex] !== undefined) {
                        this.answerSelected = progress.completedQuizzes[this.currentStepIndex];
                    }
                } catch (e) {
                    console.error('저장된 상태를 불러오는 중 오류 발생:', e);
                }
            }
        },

        canGoToStep(index) {
            // 현재 단계거나 이미 도달한 단계인지 확인
            if (index <= this.furthestStep) {
                return true;
            }

            // 바로 다음 단계인 경우, 현재 단계의 조건을 만족했는지 확인
            if (index === this.currentStepIndex + 1 && index <= this.furthestStep + 1) {
                return this.canContinue;
            }

            return false;
        },

        goToStep(index) {
            // 이동 가능한 단계인지 확인
            if (this.canGoToStep(index)) {
                this.currentStepIndex = index;
                this.resetStepState();
                this.saveProgress();
            }
        },

        selectAnswer(index) {
            if (this.answerSelected !== null) return; // 이미 답변을 선택한 경우

            this.answerSelected = index;

            // 정답인 경우 정답 카운트 증가
            if (this.currentStep.quiz && index === this.currentStep.quiz.correctAnswer) {
                this.correctAnswers++;
            }

            // 진행 상황 저장
            this.saveProgress();
        },

        completeEducation() {
            // 학습 완료 처리
            this.saveProgress();

            // 학습 완료 상태 저장
            localStorage.setItem(`education_completed_${this.educationId}`, 'true');

            // 분석 데이터 저장 (실제 구현에서는 API 호출)
            const completionData = {
                educationId: this.educationId,
                timeSpent: this.timeSpent,
                correctAnswers: this.correctAnswers,
                totalQuizzes: this.totalQuizzes,
                completedAt: new Date().toISOString()
            };

            console.log('학습 완료 데이터:', completionData);

            // 완료 모달 표시
            this.showCompletionModal = true;
        },

        shareCompletion() {
            // 학습 완료 공유하기
            const shareText = `${this.educationTitle} 학습을 완료했습니다! 총 ${this.steps.length}개 단계를 ${this.formatTime(this.timeSpent)}만에 완주했어요. 💪`;
            const shareUrl = `${window.location.origin}/education/${this.educationId}`;

            if (navigator.share) {
                navigator.share({
                    title: '학습 완료!',
                    text: shareText,
                    url: shareUrl
                }).catch(console.error);
            } else {
                // Web Share API를 지원하지 않는 경우 클립보드에 복사
                const textToCopy = `${shareText}\n${shareUrl}`;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert('학습 완료 소식이 클립보드에 복사되었습니다!');
                }).catch(() => {
                    alert('공유 링크 복사에 실패했습니다.');
                });
            }
        },

        goToRecommendedCourse() {
            if (this.recommendedCourses.length > 0) {
                const recommendedCourse = this.recommendedCourses[0];
                this.$router.push(`/education/${recommendedCourse.id}`);
            } else {
                this.$router.push('/education');
            }
        },

        goBackToDetail() {
            this.$router.push(`/education/${this.educationId}`);
        },

        confirmExit() {
            this.showExitConfirmModal = true;
        },

        exitLearning() {
            this.saveProgress();
            this.$router.push(`/education/${this.educationId}`);
        },

        toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(e => {
                    console.error(`전체 화면 전환 에러: ${e.message}`);
                });
                this.isFullscreen = true;
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                    this.isFullscreen = false;
                }
            }
        },

        handleBeforeUnload(e) {
            // 페이지 이탈 시 경고
            e.preventDefault();
            e.returnValue = '';
        },

        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            if (hours > 0) {
                return `${hours}시간 ${minutes % 60}분`;
            } else {
                return `${minutes}분`;
            }
        }
    }
};
</script>

<style scoped>
.shadow-md-up {
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

.progress-bar .bg-primary {
    transition: width 0.3s ease-out;
}

.step-dot {
    transition: background-color 0.2s ease;
}

.border-primary-light {
    border-color: rgba(0, 102, 204, 0.3);
}

.option-indicator {
    transition: all 0.2s ease;
}

.completion-modal,
.exit-confirm-modal {
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.spinner {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>