<template>
    <div class="policy-detail">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-primary text-white py-12 px-4">
            <div class="container mx-auto">
                <div class="flex items-center mb-4">
                    <router-link to="/policy" class="flex items-center text-white hover:underline mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        목록으로
                    </router-link>
                    <div v-if="policy.category" class="bg-white text-primary py-1 px-3 rounded-full text-sm">
                        {{ getCategoryName(policy.category) }}
                    </div>
                </div>
                <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ policy.title }}</h1>
                <div class="flex flex-wrap items-center text-lg">
                    <div class="mr-6 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {{ policy.region === '' ? '전국' : policy.region }}
                    </div>
                    <div class="mr-6 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {{ policy.deadline ? `마감일: ${policy.deadline}` : '상시' }}
                    </div>
                    <div class="mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        조회수: {{ policy.viewCount || 0 }}
                    </div>
                </div>
            </div>
        </div>

        <!-- 정책 콘텐츠 -->
        <div class="policy-content py-12 px-4">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- 정책 상세 정보 (좌측 2/3) -->
                    <div class="main-content lg:col-span-2">
                        <div v-if="loading" class="text-center py-16">
                            <div
                                class="spinner-border inline-block w-12 h-12 border-4 border-t-primary rounded-full animate-spin">
                            </div>
                            <p class="text-xl mt-4">정책 정보를 불러오는 중입니다...</p>
                        </div>

                        <div v-else>
                            <!-- 대표 이미지 -->
                            <div class="feature-image mb-8">
                                <img :src="policy.thumbnail" :alt="policy.title" class="w-full rounded-xl">
                            </div>

                            <!-- 정책 개요 -->
                            <div class="policy-overview bg-white rounded-xl shadow-md p-8 mb-8">
                                <h2 class="text-2xl font-bold mb-4">정책 개요</h2>
                                <p class="text-lg mb-6">{{ policy.description }}</p>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 class="text-lg font-bold mb-2">지원 대상</h3>
                                        <ul class="list-disc pl-6 space-y-1">
                                            <li v-for="(item, index) in policy.eligibility" :key="index">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-bold mb-2">지원 내용</h3>
                                        <ul class="list-disc pl-6 space-y-1">
                                            <li v-for="(item, index) in policy.benefits" :key="index">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- 신청 방법 -->
                            <div class="application-guide bg-white rounded-xl shadow-md p-8 mb-8">
                                <h2 class="text-2xl font-bold mb-4">신청 방법</h2>

                                <div class="steps space-y-6">
                                    <div v-for="(step, index) in policy.applicationSteps" :key="index"
                                        class="step p-4 border border-gray-200 rounded-lg">
                                        <div class="step-header flex items-center mb-2">
                                            <div
                                                class="step-number bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                                                {{ index + 1 }}
                                            </div>
                                            <h3 class="text-lg font-bold">{{ step.title }}</h3>
                                        </div>
                                        <p>{{ step.description }}</p>
                                    </div>
                                </div>

                                <div class="required-documents mt-8">
                                    <h3 class="text-lg font-bold mb-2">필요 서류</h3>
                                    <ul class="list-disc pl-6 space-y-1">
                                        <li v-for="(item, index) in policy.requiredDocuments" :key="index">
                                            {{ item }}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- 문의처 정보 -->
                            <div class="contact-info bg-white rounded-xl shadow-md p-8">
                                <h2 class="text-2xl font-bold mb-4">문의처</h2>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="contact-item">
                                        <h3 class="text-lg font-bold mb-2">담당 기관</h3>
                                        <p>{{ policy.contactInfo?.organization || '정보 없음' }}</p>
                                    </div>
                                    <div class="contact-item">
                                        <h3 class="text-lg font-bold mb-2">전화번호</h3>
                                        <p>{{ policy.contactInfo?.phone || '정보 없음' }}</p>
                                    </div>
                                    <div class="contact-item">
                                        <h3 class="text-lg font-bold mb-2">웹사이트</h3>
                                        <p>
                                            <a v-if="policy.contactInfo?.website" :href="policy.contactInfo.website"
                                                target="_blank" class="text-primary hover:underline">
                                                {{ policy.contactInfo.website }}
                                            </a>
                                            <span v-else>정보 없음</span>
                                        </p>
                                    </div>
                                    <div class="contact-item">
                                        <h3 class="text-lg font-bold mb-2">이메일</h3>
                                        <p>
                                            <a v-if="policy.contactInfo?.email"
                                                :href="`mailto:${policy.contactInfo.email}`"
                                                class="text-primary hover:underline">
                                                {{ policy.contactInfo.email }}
                                            </a>
                                            <span v-else>정보 없음</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 사이드바 (우측 1/3) -->
                    <div class="sidebar">
                        <!-- 신청 버튼 -->
                        <div class="application-card bg-white rounded-xl shadow-md p-6 mb-8 sticky top-6">
                            <h3 class="text-xl font-bold mb-4">정책 신청</h3>

                            <div v-if="policy.deadline" class="deadline-info mb-4">
                                <p class="text-lg">
                                    신청 마감일:
                                    <span :class="{ 'text-error font-bold': isDeadlineApproaching(policy.deadline) }">
                                        {{ policy.deadline }}
                                    </span>
                                </p>
                                <p v-if="isDeadlineApproaching(policy.deadline)" class="text-error">
                                    마감이 {{ getDaysUntilDeadline(policy.deadline) }}일 남았습니다!
                                </p>
                            </div>

                            <a :href="policy.applicationUrl || '#'" target="_blank"
                                class="w-full py-3 bg-primary text-white rounded-lg text-lg font-bold block text-center mb-4">
                                온라인 신청하기
                            </a>

                            <div class="text-center text-gray-600">
                                <p>또는</p>
                                <p>가까운 {{ policy.contactInfo?.organization || '담당 기관' }}을 방문하세요</p>
                            </div>
                        </div>

                        <!-- 관련 정책 -->
                        <div class="related-policies bg-white rounded-xl shadow-md p-6">
                            <h3 class="text-xl font-bold mb-4">관련 정책</h3>

                            <div class="related-list space-y-4">
                                <div v-for="relatedPolicy in relatedPolicies" :key="relatedPolicy.id"
                                    class="related-item flex items-center p-3 border border-gray-200 rounded-lg hover:bg-light hover:border-primary cursor-pointer"
                                    @click="goToPolicy(relatedPolicy.id)">
                                    <img :src="relatedPolicy.thumbnail" :alt="relatedPolicy.title"
                                        class="w-16 h-16 object-cover rounded-lg mr-4">
                                    <div>
                                        <h4 class="font-bold mb-1">{{ relatedPolicy.title }}</h4>
                                        <p class="text-sm text-gray-600">{{ getCategoryName(relatedPolicy.category) }}
                                        </p>
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
    name: 'PolicyDetail',
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            loading: true,
            policy: {},
            relatedPolicies: []
        }
    },
    created() {
        this.fetchPolicyData();
    },
    methods: {
        fetchPolicyData() {
            this.loading = true;

            // 실제 구현에서는 API 호출이나 Vuex 액션 사용
            setTimeout(() => {
                // 모든 정책 데이터 (가정)
                const allPolicies = [
                    {
                        id: 1,
                        title: '노인 일자리 지원사업',
                        description: '만 65세 이상 노인을 대상으로 다양한 일자리와 사회활동을 지원하는 사업입니다. 노인의 소득 창출과 사회 참여 기회를 제공하여 활기찬 노후 생활을 돕습니다.',
                        category: 'employment',
                        region: '',
                        ageGroup: '65+',
                        deadline: '2025-06-30',
                        viewCount: 12500,
                        // thumbnail: require('@/assets/images/policy-employment.jpg'),
                        eligibility: [
                            '만 65세 이상 노인',
                            '근로 능력이 있는 자',
                            '소득 및 재산이 선정기준 이하인 자'
                        ],
                        benefits: [
                            '일자리 제공 및 활동비 지급',
                            '월 급여 27만원~60만원 (유형별 상이)',
                            '주 3일, 월 30시간 이상 근무'
                        ],
                        applicationSteps: [
                            {
                                title: '신청서 작성',
                                description: '읍/면/동 주민센터 또는 가까운 노인일자리센터 방문하여 신청서 작성'
                            },
                            {
                                title: '서류 제출',
                                description: '신청서와 함께 필요 서류 제출'
                            },
                            {
                                title: '심사 및 선발',
                                description: '자격 요건 심사 및 대상자 선정'
                            },
                            {
                                title: '일자리 배치',
                                description: '적합한 일자리 배치 및 활동 시작'
                            }
                        ],
                        requiredDocuments: [
                            '신분증',
                            '주민등록등본',
                            '건강보험증 사본',
                            '건강보험료 납부확인서'
                        ],
                        contactInfo: {
                            organization: '보건복지부 노인일자리과',
                            phone: '044-123-4567',
                            website: 'https://www.mohw.go.kr',
                            email: 'senior@korea.kr'
                        },
                        applicationUrl: 'https://www.bokjiro.go.kr'
                    },
                    {
                        id: 2,
                        title: '노인 건강검진 지원',
                        description: '만 65세 이상 어르신을 대상으로 건강검진 비용을 지원하는 사업입니다.',
                        category: 'health',
                        region: '',
                        ageGroup: '65+',
                        deadline: '',
                        viewCount: 9800,
                        // thumbnail: require('@/assets/images/policy-health.jpg')
                    },
                    {
                        id: 3,
                        title: '서울시 어르신 교통비 지원',
                        description: '서울시에 거주하는 만 65세 이상 어르신의 대중교통 이용을 위한 교통비를 지원합니다.',
                        category: 'living',
                        region: '서울',
                        ageGroup: '65+',
                        deadline: '',
                        viewCount: 8500,
                        // thumbnail: require('@/assets/images/policy-transportation.jpg')
                    },
                    {
                        id: 4,
                        title: '경기도 노인 주거개선 사업',
                        description: '경기도 내 저소득 노인가구의 주거환경 개선을 위한 지원 사업입니다.',
                        category: 'housing',
                        region: '경기',
                        ageGroup: '65+',
                        deadline: '2025-05-31',
                        viewCount: 7200,
                        // thumbnail: require('@/assets/images/policy-housing.jpg')
                    },
                    {
                        id: 5,
                        title: '노인 문화활동 바우처',
                        description: '만 65세 이상 어르신의 문화생활을 위한 바우처 지원 사업입니다.',
                        category: 'leisure',
                        region: '',
                        ageGroup: '65+',
                        deadline: '2025-12-31',
                        viewCount: 6300,
                        // thumbnail: require('@/assets/images/policy-culture.jpg')
                    }
                ];

                // 현재 정책 찾기
                this.policy = allPolicies.find(p => p.id === Number(this.id)) || {};

                // 관련 정책 (같은 카테고리의 다른 정책들)
                this.relatedPolicies = allPolicies
                    .filter(p => p.id !== Number(this.id) && p.category === this.policy.category)
                    .slice(0, 3);

                // 관련 정책이 부족한 경우 다른 카테고리에서 추가
                if (this.relatedPolicies.length < 3) {
                    const additionalPolicies = allPolicies
                        .filter(p => p.id !== Number(this.id) && p.category !== this.policy.category)
                        .slice(0, 3 - this.relatedPolicies.length);

                    this.relatedPolicies = [...this.relatedPolicies, ...additionalPolicies];
                }

                this.loading = false;
            }, 1000);
        },
        getCategoryName(categoryId) {
            const categories = {
                'health': '건강/의료',
                'living': '생활지원',
                'housing': '주거',
                'employment': '일자리',
                'leisure': '여가/문화',
                'education': '교육',
                'care': '돌봄'
            };

            return categories[categoryId] || categoryId;
        },
        isDeadlineApproaching(deadline) {
            if (!deadline) return false;

            const today = new Date();
            const deadlineDate = new Date(deadline);
            const diffTime = deadlineDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays > 0 && diffDays <= 30; // 마감일이 30일 이내인 경우
        },
        getDaysUntilDeadline(deadline) {
            if (!deadline) return 0;

            const today = new Date();
            const deadlineDate = new Date(deadline);
            const diffTime = deadlineDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays > 0 ? diffDays : 0;
        },
        goToPolicy(policyId) {
            this.$router.push(`/policy/${policyId}`);
        }
    }
}
</script>

<style scoped>
.page-header {
    background-image: linear-gradient(to right, var(--color-primary, #0066CC), #004999);
}

.spinner-border {
    border-color: rgba(0, 0, 0, 0.1);
    border-top-color: var(--color-primary, #0066CC);
    animation: spinner 1s linear infinite;
}

@keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}

/* 이미지 플레이스홀더 스타일 */
[src*='policy-'] {
    background-color: #f0f0f0;
    position: relative;
}

[src*='policy-']::after {
    content: '이미지 준비 중';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #757575;
}
</style>