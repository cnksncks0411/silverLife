<template>
    <div class="policy-list">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-primary text-white py-12 px-4">
            <div class="container mx-auto">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">맞춤형 정책 정보</h1>
                <p class="text-xl max-w-3xl">
                    연령, 지역, 상황별 맞춤형 복지 정책 정보를 제공합니다.
                    자신에게 맞는 정책과 복지 혜택을 쉽게 찾아보세요.
                </p>
            </div>
        </div>

        <!-- 정책 검색 및 필터 -->
        <div class="filter-section py-6 px-4 bg-light border-b border-light-gray">
            <div class="container mx-auto">
                <div class="search-box bg-white rounded-xl shadow-md p-6">
                    <form @submit.prevent="searchPolicies" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="form-group">
                            <label for="region" class="block text-lg mb-2">지역</label>
                            <select id="region" v-model="searchParams.region" class="input-field">
                                <option value="">전국</option>
                                <option value="서울">서울특별시</option>
                                <option value="부산">부산광역시</option>
                                <option value="대구">대구광역시</option>
                                <option value="인천">인천광역시</option>
                                <option value="광주">광주광역시</option>
                                <option value="대전">대전광역시</option>
                                <option value="울산">울산광역시</option>
                                <option value="세종">세종특별자치시</option>
                                <option value="경기">경기도</option>
                                <option value="강원">강원도</option>
                                <option value="충북">충청북도</option>
                                <option value="충남">충청남도</option>
                                <option value="전북">전라북도</option>
                                <option value="전남">전라남도</option>
                                <option value="경북">경상북도</option>
                                <option value="경남">경상남도</option>
                                <option value="제주">제주특별자치도</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="category" class="block text-lg mb-2">분야</label>
                            <select id="category" v-model="searchParams.category" class="input-field">
                                <option value="">전체</option>
                                <option value="health">건강/의료</option>
                                <option value="living">생활지원</option>
                                <option value="housing">주거</option>
                                <option value="employment">일자리</option>
                                <option value="leisure">여가/문화</option>
                                <option value="education">교육</option>
                                <option value="care">돌봄</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="ageGroup" class="block text-lg mb-2">연령대</label>
                            <select id="ageGroup" v-model="searchParams.ageGroup" class="input-field">
                                <option value="">전체</option>
                                <option value="60-64">60~64세</option>
                                <option value="65-69">65~69세</option>
                                <option value="70-74">70~74세</option>
                                <option value="75-79">75~79세</option>
                                <option value="80+">80세 이상</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="keyword" class="block text-lg mb-2">검색어</label>
                            <input type="text" id="keyword" v-model="searchParams.keyword" class="input-field"
                                placeholder="검색어를 입력하세요">
                        </div>

                        <div class="form-group md:col-span-4 mt-4">
                            <button type="submit"
                                class="w-full py-3 bg-primary text-white rounded-lg text-lg font-bold">
                                정책 찾기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- 정책 목록 -->
        <div class="policy-section py-12 px-4">
            <div class="container mx-auto">
                <div class="section-header flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                        <h2 class="text-2xl font-bold mb-2">맞춤형 정책 정보</h2>
                        <p class="text-gray-600">
                            <span v-if="filteredPolicies.length > 0">검색 결과: {{ filteredPolicies.length }}건의 정책이
                                있습니다.</span>
                            <span v-else>검색 결과가 없습니다.</span>
                        </p>
                    </div>

                    <div class="sort-options mt-4 md:mt-0">
                        <select v-model="sortOption" class="p-2 border border-gray-300 rounded-lg"
                            @change="sortPolicies">
                            <option value="recent">최신순</option>
                            <option value="popular">인기순</option>
                            <option value="deadline">마감 임박순</option>
                        </select>
                    </div>
                </div>

                <div v-if="loading" class="text-center py-16">
                    <div
                        class="spinner-border inline-block w-12 h-12 border-4 border-t-primary rounded-full animate-spin">
                    </div>
                    <p class="text-xl mt-4">정책 정보를 불러오는 중입니다...</p>
                </div>

                <div v-else-if="filteredPolicies.length === 0" class="text-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 class="text-2xl font-bold mb-2">검색 결과가 없습니다</h2>
                    <p class="text-xl text-gray-600 mb-6">다른 검색 조건을 선택해 보세요.</p>
                    <button @click="resetFilters" class="py-3 px-6 bg-primary text-white rounded-lg">
                        필터 초기화
                    </button>
                </div>

                <div v-else>
                    <div class="policy-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        <div v-for="policy in filteredPolicies" :key="policy.id"
                            class="policy-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div class="relative">
                                <img :src="policy.thumbnail" :alt="policy.title" class="w-full h-48 object-cover">
                                <div class="absolute top-4 left-4 bg-primary text-white py-1 px-3 rounded-full text-sm">
                                    {{ getCategoryName(policy.category) }}
                                </div>
                                <div v-if="isDeadlineApproaching(policy.deadline)"
                                    class="absolute top-4 right-4 bg-error text-white py-1 px-3 rounded-full text-sm">
                                    마감 임박
                                </div>
                            </div>

                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-2">{{ policy.title }}</h3>
                                <p class="text-gray-600 mb-4 line-clamp-2">{{ policy.description }}</p>

                                <div class="policy-details space-y-2 mb-4">
                                    <div class="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{{ policy.region === '' ? '전국' : policy.region }}</span>
                                    </div>
                                    <div class="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{{ policy.deadline ? `마감일: ${policy.deadline}` : '상시' }}</span>
                                    </div>
                                </div>

                                <router-link :to="`/policy/${policy.id}`"
                                    class="w-full py-2 px-4 bg-primary text-white rounded-lg text-center inline-block hover:bg-opacity-90">
                                    자세히 보기
                                </router-link>
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
    name: 'PolicyList',
    data() {
        return {
            loading: true,
            policies: [], // 전체 정책 목록
            filteredPolicies: [], // 필터링된 정책 목록
            searchParams: {
                region: '',
                category: '',
                ageGroup: '',
                keyword: ''
            },
            sortOption: 'recent'
        }
    },
    created() {
        this.fetchPolicies();
    },
    methods: {
        fetchPolicies() {
            this.loading = true;

            // 실제 구현에서는 API 호출이나 Vuex 액션 사용
            setTimeout(() => {
                // 더미 데이터
                this.policies = [
                    {
                        id: 1,
                        title: '노인 일자리 지원사업',
                        description: '만 65세 이상 노인을 대상으로 다양한 일자리와 사회활동을 지원하는 사업입니다.',
                        category: 'employment',
                        region: '',
                        ageGroup: '65+',
                        deadline: '2025-06-30',
                        viewCount: 12500,
                        // thumbnail: require('@/assets/images/policy-employment.jpg')
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
                    },
                    {
                        id: 6,
                        title: '부산시 노인 돌봄 서비스',
                        description: '부산시 거주 만 65세 이상 어르신을 위한 맞춤형 돌봄 서비스를 제공합니다.',
                        category: 'care',
                        region: '부산',
                        ageGroup: '65+',
                        deadline: '',
                        viewCount: 5900,
                        // thumbnail: require('@/assets/images/policy-care.jpg')
                    },
                    {
                        id: 7,
                        title: '시니어 디지털 교육 지원',
                        description: '디지털 기기 활용 능력 향상을 위한 교육 프로그램 지원 사업입니다.',
                        category: 'education',
                        region: '',
                        ageGroup: '60+',
                        deadline: '2025-08-31',
                        viewCount: 7800,
                        // thumbnail: require('@/assets/images/policy-digital.jpg')
                    },
                    {
                        id: 8,
                        title: '노인 치매 검진 지원',
                        description: '만 60세 이상 어르신을 대상으로 치매 조기 검진을 무료로 지원하는 사업입니다.',
                        category: 'health',
                        region: '',
                        ageGroup: '60+',
                        deadline: '',
                        viewCount: 11200,
                        // thumbnail: require('@/assets/images/policy-dementia.jpg')
                    },
                    {
                        id: 9,
                        title: '광주시 독거노인 지원',
                        description: '광주시 거주 독거노인을 위한 생활 지원 및 안전 확인 서비스입니다.',
                        category: 'living',
                        region: '광주',
                        ageGroup: '65+',
                        deadline: '',
                        viewCount: 4200,
                        // thumbnail: require('@/assets/images/policy-elderly.jpg')
                    }
                ];

                // 초기 필터링 및 정렬
                this.filteredPolicies = [...this.policies];
                this.sortPolicies();

                this.loading = false;
            }, 1000);
        },
        searchPolicies() {
            this.loading = true;

            // 실제 구현에서는 API 호출이나 Vuex 액션 사용
            setTimeout(() => {
                // 클라이언트 측 필터링
                this.filteredPolicies = this.policies.filter(policy => {
                    // 지역 필터
                    if (this.searchParams.region && policy.region !== this.searchParams.region) {
                        return false;
                    }

                    // 분야 필터
                    if (this.searchParams.category && policy.category !== this.searchParams.category) {
                        return false;
                    }

                    // 연령대 필터 (간단한 구현)
                    if (this.searchParams.ageGroup) {
                        if (this.searchParams.ageGroup === '60-64' && policy.ageGroup !== '60+') {
                            return false;
                        }
                        if (this.searchParams.ageGroup !== '60-64' && policy.ageGroup !== '65+') {
                            return false;
                        }
                    }

                    // 키워드 필터
                    if (this.searchParams.keyword) {
                        const keyword = this.searchParams.keyword.toLowerCase();
                        return policy.title.toLowerCase().includes(keyword) ||
                            policy.description.toLowerCase().includes(keyword);
                    }

                    return true;
                });

                // 정렬 적용
                this.sortPolicies();

                this.loading = false;
            }, 500);
        },
        sortPolicies() {
            switch (this.sortOption) {
                case 'recent':
                    // ID 기준 내림차순 (임시, 실제로는 등록일 기준)
                    this.filteredPolicies.sort((a, b) => b.id - a.id);
                    break;
                case 'popular':
                    // 조회수 기준 내림차순
                    this.filteredPolicies.sort((a, b) => b.viewCount - a.viewCount);
                    break;
                case 'deadline':
                    // 마감일 기준 (마감일이 있는 것 우선, 마감일 빠른 순)
                    this.filteredPolicies.sort((a, b) => {
                        if (!a.deadline && !b.deadline) return 0;
                        if (!a.deadline) return 1;
                        if (!b.deadline) return -1;
                        return new Date(a.deadline) - new Date(b.deadline);
                    });
                    break;
            }
        },
        resetFilters() {
            this.searchParams = {
                region: '',
                category: '',
                ageGroup: '',
                keyword: ''
            };
            this.searchPolicies();
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

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>