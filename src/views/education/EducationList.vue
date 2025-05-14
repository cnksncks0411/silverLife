<!-- src/views/education/EducationList.vue -->
<template>
    <div class="education-list">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-primary text-white py-12 px-4">
            <div class="container mx-auto">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">디지털 교육</h1>
                <p class="text-xl max-w-3xl">
                    스마트폰 사용법부터 인터넷 활용, 메신저 앱 사용법까지 시니어층을 위한 맞춤형 디지털 교육 콘텐츠를 제공합니다.
                </p>
            </div>
        </div>

        <!-- 교육 콘텐츠 필터 및 검색 -->
        <div class="filter-section py-6 px-4 bg-light border-b border-light-gray">
            <div class="container mx-auto">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <!-- 카테고리 필터 -->
                    <div class="filter-buttons mb-4 md:mb-0">
                        <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)"
                            class="btn py-2 px-4 mr-2 mb-2 rounded-full"
                            :class="selectedCategory === category.id ? 'bg-primary text-white' : 'bg-white text-dark border border-gray-300'">
                            {{ category.name }}
                        </button>
                    </div>

                    <!-- 검색 폼 -->
                    <div class="search-form">
                        <div class="relative">
                            <input v-model="searchQuery" type="text" placeholder="교육 콘텐츠 검색" class="input-field pl-12">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 text-gray absolute left-4 top-1/2 transform -translate-y-1/2" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 교육 콘텐츠 목록 -->
        <div class="content-list py-12 px-4">
            <div class="container mx-auto">
                <div v-if="loading" class="text-center py-16">
                    <div
                        class="spinner-border inline-block w-12 h-12 border-4 border-t-primary rounded-full animate-spin">
                    </div>
                    <p class="text-xl mt-4">콘텐츠를 불러오는 중입니다...</p>
                </div>

                <div v-else-if="filteredContent.length === 0" class="text-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 class="text-2xl font-bold mb-2">콘텐츠를 찾을 수 없습니다</h2>
                    <p class="text-xl text-gray mb-6">검색어를 변경하거나 다른 카테고리를 선택해 보세요.</p>
                    <button @click="resetFilters" class="btn btn-primary">필터 초기화</button>
                </div>

                <div v-else>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div v-for="content in paginatedContent" :key="content.id"
                            class="content-card card hover:shadow-lg transition-shadow">
                            <div class="relative">
                                <img :src="content.thumbnail" :alt="content.title"
                                    class="w-full h-48 object-cover rounded-t-xl">
                                <div class="absolute top-4 left-4 bg-primary text-white py-1 px-3 rounded-full text-sm">
                                    {{ getCategoryName(content.categoryId) }}
                                </div>
                                <div v-if="content.level"
                                    class="absolute top-4 right-4 bg-secondary text-white py-1 px-3 rounded-full text-sm">
                                    {{ getLevelLabel(content.level) }}
                                </div>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-3">{{ content.title }}</h3>
                                <p class="text-gray text-lg mb-4">{{ content.description }}</p>
                                <div class="flex justify-between items-center">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-1"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span class="text-gray-600">{{ content.duration }}</span>
                                    </div>
                                    <router-link :to="`/education/${content.id}`" class="btn btn-primary">
                                        학습하기
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 페이지네이션 -->
                    <div v-if="totalPages > 1" class="pagination flex justify-center mt-12">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="pagination-btn rounded-l-lg border border-gray-300 px-4 py-2"
                            :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-primary hover:bg-light'">
                            이전
                        </button>
                        <button v-for="page in displayedPages" :key="page" @click="goToPage(page)"
                            class="pagination-btn border-t border-b border-gray-300 px-4 py-2"
                            :class="currentPage === page ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-light'">
                            {{ page }}
                        </button>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="pagination-btn rounded-r-lg border border-gray-300 px-4 py-2"
                            :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-primary hover:bg-light'">
                            다음
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EducationList',
    data() {
        return {
            loading: true,
            content: [], // 모든 교육 콘텐츠
            categories: [
                { id: 'all', name: '전체' },
                { id: 'basics', name: '디지털 기초' },
                { id: 'smartphone', name: '스마트폰 활용' },
                { id: 'messenger', name: '메신저/SNS' },
                { id: 'internet', name: '인터넷 활용' },
                { id: 'security', name: '보안/개인정보' }
            ],
            selectedCategory: 'all',
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 9
        }
    },
    computed: {
        filteredContent() {
            let result = this.content;

            // 카테고리 필터링
            if (this.selectedCategory !== 'all') {
                result = result.filter(item => item.categoryId === this.selectedCategory);
            }

            // 검색어 필터링
            if (this.searchQuery.trim() !== '') {
                const query = this.searchQuery.trim().toLowerCase();
                result = result.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query)
                );
            }

            return result;
        },
        totalPages() {
            return Math.ceil(this.filteredContent.length / this.itemsPerPage);
        },
        paginatedContent() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredContent.slice(startIndex, endIndex);
        },
        displayedPages() {
            // 페이지네이션에 표시할 페이지 번호 계산
            const range = 2; // 현재 페이지 기준 양쪽에 표시할 페이지 수
            let start = Math.max(1, this.currentPage - range);
            let end = Math.min(this.totalPages, this.currentPage + range);

            // 범위 조정
            if (end - start < range * 2) {
                if (start === 1) {
                    end = Math.min(start + range * 2, this.totalPages);
                } else if (end === this.totalPages) {
                    start = Math.max(end - range * 2, 1);
                }
            }

            // 페이지 번호 배열 생성
            const pages = [];
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            return pages;
        }
    },
    methods: {
        // 더미 데이터 로드 (실제 프로젝트에서는 API 호출로 대체)
        loadContent() {
            this.loading = true;

            // 실제 프로젝트에서는 API 호출
            setTimeout(() => {
                this.content = [
                    {
                        id: 1,
                        title: '스마트폰 기본 사용법',
                        description: '전화걸기, 문자보내기, 카메라 사용 등 스마트폰의 기본 기능을 배워봅니다.',
                        categoryId: 'basics',
                        level: 'beginner',
                        duration: '약 30분',
                        // thumbnail: require('@/assets/images/smartphone-basics.jpg')
                    },
                    {
                        id: 2,
                        title: '카카오톡 사용하기',
                        description: '가족, 친구들과 소통하는 카카오톡 메신저 앱 사용법을 알아봅니다.',
                        categoryId: 'messenger',
                        level: 'beginner',
                        duration: '약 40분',
                        // thumbnail: require('@/assets/images/kakaotalk-usage.jpg')
                    },
                    {
                        id: 3,
                        title: '유튜브로 영상 즐기기',
                        description: '유튜브 앱을 통해 다양한 영상 콘텐츠를 검색하고 시청하는 방법을 배웁니다.',
                        categoryId: 'smartphone',
                        level: 'beginner',
                        duration: '약 25분',
                        // thumbnail: require('@/assets/images/youtube-guide.jpg')
                    },
                    {
                        id: 4,
                        title: '인터넷 검색 활용하기',
                        description: '네이버, 구글 등 검색 서비스를 활용하여 필요한 정보를 찾는 방법을 배웁니다.',
                        categoryId: 'internet',
                        level: 'beginner',
                        duration: '약 35분',
                        // thumbnail: require('@/assets/images/internet-search.jpg')
                    },
                    {
                        id: 5,
                        title: '사진 촬영과 관리',
                        description: '스마트폰으로 사진 촬영하고 앨범에서 관리하는 방법을 배웁니다.',
                        categoryId: 'smartphone',
                        level: 'beginner',
                        duration: '약 30분',
                        // thumbnail: require('@/assets/images/photo-management.jpg')
                    },
                    {
                        id: 6,
                        title: '개인정보 보호하기',
                        description: '온라인에서 개인정보를 안전하게 보호하는 방법과 주의사항을 알아봅니다.',
                        categoryId: 'security',
                        level: 'intermediate',
                        duration: '약 45분',
                        // thumbnail: require('@/assets/images/privacy-protection.jpg')
                    },
                    {
                        id: 7,
                        title: '네이버 지도 활용하기',
                        description: '네이버 지도 앱으로 길찾기, 대중교통 정보 확인하는 방법을 배웁니다.',
                        categoryId: 'smartphone',
                        level: 'intermediate',
                        duration: '약 40분',
                        // thumbnail: require('@/assets/images/naver-map.jpg')
                    },
                    {
                        id: 8,
                        title: '인터넷 뱅킹 시작하기',
                        description: '모바일 뱅킹 앱 설치부터 기본적인 계좌 조회, 이체까지 배워봅니다.',
                        categoryId: 'internet',
                        level: 'intermediate',
                        duration: '약 50분',
                        // thumbnail: require('@/assets/images/mobile-banking.jpg')
                    },
                    {
                        id: 9,
                        title: '온라인 쇼핑몰 이용하기',
                        description: '쿠팡, 11번가 등 온라인 쇼핑몰에서 상품 검색하고 구매하는 방법을 배웁니다.',
                        categoryId: 'internet',
                        level: 'intermediate',
                        duration: '약 45분',
                        // thumbnail: require('@/assets/images/online-shopping.jpg')
                    },
                    {
                        id: 10,
                        title: '보이스피싱 예방하기',
                        description: '각종 금융사기 수법과 예방법, 대처 방법에 대해 알아봅니다.',
                        categoryId: 'security',
                        level: 'beginner',
                        duration: '약 30분',
                        // thumbnail: require('@/assets/images/voice-phishing.jpg')
                    },
                    {
                        id: 11,
                        title: '줌(Zoom) 화상회의 참여하기',
                        description: '화상회의 앱 줌(Zoom)을 설치하고 회의에 참여하는 방법을 배웁니다.',
                        categoryId: 'messenger',
                        level: 'intermediate',
                        duration: '약 40분',
                        // thumbnail: require('@/assets/images/zoom-meeting.jpg')
                    },
                    {
                        id: 12,
                        title: '구글 포토로 사진 백업하기',
                        description: '구글 포토 앱을 활용하여 소중한 사진을 클라우드에 백업하는 방법을 배웁니다.',
                        categoryId: 'smartphone',
                        level: 'intermediate',
                        duration: '약 35분',
                        // thumbnail: require('@/assets/images/google-photos.jpg')
                    }
                ];

                this.loading = false;
            }, 1000); // 1초 지연 (로딩 효과 시뮬레이션)
        },
        selectCategory(categoryId) {
            this.selectedCategory = categoryId;
            this.currentPage = 1; // 카테고리 변경 시 첫 페이지로 이동
        },
        resetFilters() {
            this.selectedCategory = 'all';
            this.searchQuery = '';
            this.currentPage = 1;
        },
        getCategoryName(categoryId) {
            const category = this.categories.find(cat => cat.id === categoryId);
            return category ? category.name : '';
        },
        getLevelLabel(level) {
            switch (level) {
                case 'beginner':
                    return '초급';
                case 'intermediate':
                    return '중급';
                case 'advanced':
                    return '고급';
                default:
                    return '';
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                window.scrollTo(0, 0);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                window.scrollTo(0, 0);
            }
        },
        goToPage(page) {
            this.currentPage = page;
            window.scrollTo(0, 0);
        }
    },
    watch: {
        searchQuery() {
            this.currentPage = 1; // 검색어 변경 시 첫 페이지로 이동
        }
    },
    created() {
        this.loadContent();
    }
}
</script>

<style lang="scss" scoped>
.page-header {
    background-image: linear-gradient(to right, var(--color-primary), darken(#0066CC, 15%));
}

.spinner-border {
    border-color: rgba(0, 0, 0, 0.1);
    border-top-color: var(--color-primary);
    animation: spinner 1s linear infinite;
}

@keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}

// 에셋 이미지가 없는 경우를 대비한 플레이스홀더 스타일
[src*='smartphone-basics.jpg'],
[src*='kakaotalk-usage.jpg'],
[src*='youtube-guide.jpg'],
[src*='internet-search.jpg'],
[src*='photo-management.jpg'],
[src*='privacy-protection.jpg'],
[src*='naver-map.jpg'],
[src*='mobile-banking.jpg'],
[src*='online-shopping.jpg'],
[src*='voice-phishing.jpg'],
[src*='zoom-meeting.jpg'],
[src*='google-photos.jpg'] {
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