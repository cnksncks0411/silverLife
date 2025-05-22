<!-- src/views/education/EducationList.vue -->
<template>
    <div class="education-list">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-primary text-white py-12 px-4">
            <div class="container mx-auto">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">디지털 교육</h1>
                <p class="text-xl max-w-3xl">
                    낯선 디지털 환경이 더 이상 두렵지 않게! 온라인 사기 예방법, 최신 트렌드 이해하기, 손주와의 소통 팁까지 - 지혜로운 시니어의 디지털 라이프를 지원합니다.
                </p>
            </div>
        </div>

        <!-- 교육 콘텐츠 필터 및 검색 -->
        <div class="filter-section py-6 px-4 bg-light border-b border-light-gray">
            <div class="container mx-auto">
                <!-- 검색 폼 - 상단에 크게 배치 -->
                <div class="search-form mb-6">
                    <label for="search-input" class="block text-lg font-bold mb-2">콘텐츠 검색</label>
                    <div class="search-input-wrapper relative">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="search-icon h-5 w-5 text-primary absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input id="search-input" v-model="searchQuery" type="text" placeholder="찾으시는 콘텐츠를 입력하세요"
                            class="search-input pl-10 pr-12 py-4 w-full text-lg border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                            aria-label="콘텐츠 검색" @keyup.enter="performSearch">
                        <!-- 검색어 클리어 버튼 -->
                        <button v-if="searchQuery.trim() !== ''" @click="clearSearch"
                            class="clear-btn absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label="검색어 지우기">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- 카테고리 선택 및 결과 정보 -->
                <div class="category-selection mb-6">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div class="flex-1">
                            <label for="category-select" class="block text-lg font-bold mb-2">카테고리 선택</label>
                            <select id="category-select" v-model="selectedCategory"
                                class="form-select text-lg py-3 px-4 pr-10 w-full lg:w-64 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                                aria-label="카테고리 선택">
                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>

                        <!-- 검색 결과 정보 -->
                        <div class="search-result-info text-lg">
                            <span class="text-gray-600">
                                총 <strong class="text-primary">{{ filteredContent.length }}개</strong>의 콘텐츠
                                <span v-if="searchQuery.trim() !== '' || selectedCategory !== 'all'">
                                    (필터 적용됨)
                                </span>
                            </span>
                        </div>

                        <!-- 콘텐츠 작성 버튼 (creator 계정으로 로그인한 경우에만 표시) -->
                        <router-link v-if="isCreator" to="/education/creator"
                            class="btn btn-primary text-lg py-3 px-6 flex items-center justify-center whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            콘텐츠 작성
                        </router-link>
                    </div>
                </div>



                <!-- 큰 버튼 형태의 카테고리 - 격자 형태로 배치 -->
                <div class="category-buttons grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)"
                        class="category-btn p-3 text-center rounded-lg border-2 text-base font-medium transition-all duration-200 hover:transform hover:scale-105"
                        :class="selectedCategory === category.id
                            ? 'border-primary bg-primary bg-opacity-10 text-primary font-bold shadow-md'
                            : 'border-gray-300 bg-white hover:border-primary hover:bg-light hover:shadow-sm'"
                        :aria-selected="selectedCategory === category.id">
                        <div class="flex flex-col items-center">
                            <span>{{ category.name }}</span>
                            <span class="text-xs text-gray-500 mt-1">({{ getCategoryCount(category.id) }})</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <!-- 교육 콘텐츠 목록 -->
        <div class="content-list py-12 px-4">
            <div class="container mx-auto">
                <!-- 로딩 상태 -->
                <div v-if="loading" class="text-center py-16">
                    <div
                        class="spinner-border inline-block w-12 h-12 border-4 border-t-primary rounded-full animate-spin">
                    </div>
                    <p class="text-xl mt-4">콘텐츠를 불러오는 중입니다...</p>
                </div>

                <!-- 콘텐츠 없음 -->
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

                <!-- 콘텐츠 목록 -->
                <div v-else>
                    <!-- 정렬 옵션 -->
                    <div class="sort-options flex justify-between items-center mb-6">
                        <div class="text-lg text-gray-600">
                            <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage
                                * itemsPerPage, filteredContent.length) }}</span>
                            / {{ filteredContent.length }}개 콘텐츠
                        </div>
                        <div class="flex items-center gap-2">
                            <label for="sort-select" class="text-sm text-gray-600">정렬:</label>
                            <select id="sort-select" v-model="sortOption"
                                class="form-select text-sm py-2 px-3 border border-gray-300 rounded focus:border-primary focus:outline-none">
                                <option value="newest">최신순</option>
                                <option value="oldest">오래된순</option>
                                <option value="title">제목순</option>
                                <option value="popular">인기순 (좋아요)</option>
                            </select>
                        </div>
                    </div>

                    <!-- 콘텐츠 카드 목록 -->
                    <div class="content-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div v-for="content in sortedPaginatedContent" :key="content.id"
                            class="content-card card hover:shadow-lg transition-all duration-300 hover:transform hover:scale-102">
                            <div class="relative">
                                <img :src="content.thumbnail" :alt="content.title"
                                    class="w-full h-48 object-cover rounded-t-xl">
                                <div
                                    class="absolute top-4 left-4 bg-primary text-white py-1 px-3 rounded-full text-sm font-medium">
                                    {{ getCategoryName(content.categoryId) }}
                                </div>
                                <div v-if="content.level"
                                    class="absolute top-4 right-4 bg-secondary text-white py-1 px-3 rounded-full text-sm font-medium">
                                    {{ getLevelLabel(content.level) }}
                                </div>
                                <!-- 인기 콘텐츠 배지 -->
                                <div v-if="content.isPopular"
                                    class="absolute bottom-4 left-4 bg-yellow-500 text-white py-1 px-3 rounded-full text-xs font-bold flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    인기
                                </div>
                                <!-- 학습 완료 표시 -->
                                <div v-if="content.isCompleted" class="absolute bottom-4 right-4 bg-green-500 text-white py-1 px-3 rounded-full text-sm ml-2">
                                    ✓ 학습 완료
                                </div>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-3 line-clamp-2">{{ content.title }}</h3>
                                <p class="text-gray text-base mb-4 line-clamp-3">{{ content.description }}</p>
                                <div class="flex justify-between items-center mb-4">
                                    <div class="flex items-center text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 mr-1"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{{ content.duration }}</span>
                                    </div>
                                    <div class="flex items-center text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 mr-1"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span>{{ content.likes || 0 }}개</span>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center">
                                    <router-link :to="`/education/${content.id}`"
                                        class="btn btn-primary text-base py-2 px-6 flex-1 text-center mr-2">
                                        학습하기
                                    </router-link>
                                    <button class="btn-outline p-2 border border-gray-300 rounded hover:bg-gray-50"
                                        @click="toggleBookmark(content.id)"
                                        :class="content.isBookmarked ? 'text-red-500 border-red-300' : 'text-gray-400'"
                                        :aria-label="content.isBookmarked ? '북마크 해제' : '북마크 추가'">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                            :fill="content.isBookmarked ? 'currentColor' : 'none'" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                                <!-- 관리자/작성자만 볼 수 있는 수정 버튼 -->
                                <div v-if="isCreator" class="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                                    <router-link :to="`/education/${content.id}/edit`"
                                        class="text-primary hover:underline flex items-center text-sm font-medium">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        수정하기
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 향상된 페이지네이션 -->
                    <div v-if="totalPages > 1" class="pagination-wrapper mt-12">
                        <nav aria-label="콘텐츠 페이지 네비게이션" class="flex flex-col items-center">
                            <!-- 페이지 정보 -->
                            <div class="page-info text-sm text-gray-600 mb-4">
                                {{ currentPage }} / {{ totalPages }} 페이지
                            </div>

                            <!-- 페이지네이션 버튼 -->
                            <div class="pagination-buttons flex items-center space-x-1">
                                <!-- 첫 페이지 -->
                                <button @click="goToPage(1)" :disabled="currentPage === 1"
                                    class="pagination-btn px-3 py-2 text-sm rounded"
                                    :class="currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-light'">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                    </svg>
                                </button>

                                <!-- 이전 페이지 -->
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class="pagination-btn px-3 py-2 text-sm rounded flex items-center"
                                    :class="currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-light'">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7" />
                                    </svg>
                                    이전
                                </button>

                                <!-- 페이지 번호들 -->
                                <div class="page-numbers flex items-center space-x-1">
                                    <button v-for="page in displayedPages" :key="page" @click="goToPage(page)"
                                        class="pagination-btn w-10 h-10 text-sm rounded flex items-center justify-center font-medium"
                                        :class="currentPage === page
                                            ? 'bg-primary text-blue shadow-md'
                                            : 'text-gray-700 hover:bg-light hover:text-primary'">
                                        {{ page }}
                                    </button>
                                </div>

                                <!-- 다음 페이지 -->
                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class="pagination-btn px-3 py-2 text-sm rounded flex items-center"
                                    :class="currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-light'">
                                    다음
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <!-- 마지막 페이지 -->
                                <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages"
                                    class="pagination-btn px-3 py-2 text-sm rounded"
                                    :class="currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-light'">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <!-- 페이지 직접 이동 -->
                            <div class="page-jump mt-4 flex items-center space-x-2 text-sm">
                                <label for="page-input" class="text-gray-600">페이지 이동:</label>
                                <input id="page-input" type="number" v-model.number="jumpToPage" :min="1"
                                    :max="totalPages"
                                    class="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:border-primary focus:outline-none"
                                    @keyup.enter="goToPage(jumpToPage)">
                                <button @click="goToPage(jumpToPage)" class="btn btn-primary text-xs px-3 py-1">
                                    이동
                                </button>
                            </div>
                        </nav>
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
                { id: 'security', name: '보안/개인정보' },
            ],
            selectedCategory: 'all',
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 9,
            jumpToPage: 1,
            sortOption: 'newest',

            // 콘텐츠 작성 관련 데이터
            isCreator: true, // creator 권한 체크 (실제 구현에서는 권한 확인 필요)
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
        sortedFilteredContent() {
            const result = [...this.filteredContent];

            switch (this.sortOption) {
                case 'newest':
                    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                case 'oldest':
                    return result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                case 'title':
                    return result.sort((a, b) => a.title.localeCompare(b.title));
                case 'popular':
                    return result.sort((a, b) => (b.views || 0) - (a.views || 0));
                default:
                    return result;
            }
        },
        totalPages() {
            return Math.ceil(this.sortedFilteredContent.length / this.itemsPerPage);
        },
        sortedPaginatedContent() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.sortedFilteredContent.slice(startIndex, endIndex);
        },
        displayedPages() {
            const range = 2;
            let start = Math.max(1, this.currentPage - range);
            let end = Math.min(this.totalPages, this.currentPage + range);

            if (end - start < range * 2) {
                if (start === 1) {
                    end = Math.min(start + range * 2, this.totalPages);
                } else if (end === this.totalPages) {
                    start = Math.max(end - range * 2, 1);
                }
            }

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

            setTimeout(() => {
                this.content = [
                    {
                        id: 1,
                        title: '스마트폰 기본 사용법',
                        description: '전화걸기, 문자보내기, 카메라 사용 등 스마트폰의 기본 기능을 배워봅니다.',
                        categoryId: 'basics',
                        level: 'beginner',
                        duration: '약 30분',
                        views: 1250,
                        likes: 89,
                        thumbnail: 'https://via.placeholder.com/800x450?text=스마트폰+기본+사용법',
                        createdAt: '2024-01-15',
                        isPopular: true,
                        isBookmarked: false,
                        isCompleted: true,
                    },
                    {
                        id: 2,
                        title: '카카오톡 사용하기',
                        description: '가족, 친구들과 소통하는 카카오톡 메신저 앱 사용법을 알아봅니다.',
                        categoryId: 'messenger',
                        level: 'beginner',
                        duration: '약 40분',
                        views: 980,
                        likes: 67,
                        thumbnail: 'https://via.placeholder.com/800x450?text=카카오톡+사용하기',
                        createdAt: '2024-01-20',
                        isPopular: false,
                        isBookmarked: true,
                        isCompleted: false,
                    },
                    {
                        id: 3,
                        title: '유튜브로 영상 즐기기',
                        description: '유튜브 앱을 통해 다양한 영상 콘텐츠를 검색하고 시청하는 방법을 배웁니다.',
                        categoryId: 'smartphone',
                        level: 'beginner',
                        duration: '약 25분',
                        views: 1430,
                        likes: 124,
                        thumbnail: 'https://via.placeholder.com/800x450?text=유튜브로+영상+즐기기',
                        createdAt: '2024-01-25',
                        isPopular: true,
                        isBookmarked: false,
                        isCompleted: false,
                    },
                    {
                        id: 4,
                        title: '인터넷 검색 활용하기',
                        description: '네이버, 구글 등 검색 서비스를 활용하여 필요한 정보를 찾는 방법을 배웁니다.',
                        categoryId: 'internet',
                        level: 'beginner',
                        duration: '약 35분',
                        views: 750,
                        likes: 43,
                        thumbnail: 'https://via.placeholder.com/800x450?text=인터넷+검색+활용하기',
                        createdAt: '2024-01-30',
                        isPopular: false,
                        isBookmarked: false,
                        isCompleted: false,
                    },
                    {
                        id: 5,
                        title: '사진 촬영과 관리',
                        description: '스마트폰으로 사진 촬영하고 앨범에서 관리하는 방법을 배웁니다.',
                        categoryId: 'smartphone',
                        level: 'beginner',
                        duration: '약 30분',
                        views: 650,
                        likes: 38,
                        thumbnail: 'https://via.placeholder.com/800x450?text=사진+촬영과+관리',
                        createdAt: '2024-02-05',
                        isPopular: false,
                        isBookmarked: true,
                        isCompleted: false,
                    },
                    {
                        id: 6,
                        title: '개인정보 보호하기',
                        description: '온라인에서 개인정보를 안전하게 보호하는 방법과 주의사항을 알아봅니다.',
                        categoryId: 'security',
                        level: 'intermediate',
                        duration: '약 45분',
                        views: 890,
                        likes: 76,
                        thumbnail: 'https://via.placeholder.com/800x450?text=개인정보+보호하기',
                        createdAt: '2024-02-10',
                        isPopular: false,
                        isBookmarked: false,
                        isCompleted: false,
                    },
                    {
                        id: 7,
                        title: '온라인 쇼핑 안전하게 하기',
                        description: '인터넷 쇼핑몰에서 안전하게 물건을 구매하는 방법을 배워봅니다.',
                        categoryId: 'internet',
                        level: 'intermediate',
                        duration: '약 50분',
                        views: 1100,
                        likes: 95,
                        thumbnail: 'https://via.placeholder.com/800x450?text=온라인+쇼핑+안전하게+하기',
                        createdAt: '2024-02-15',
                        isPopular: true,
                        isBookmarked: false,
                        isCompleted: false,
                    },
                    {
                        id: 8,
                        title: '휴대폰 설정 완전정복',
                        description: '스마트폰의 다양한 설정 메뉴를 이해하고 나에게 맞게 조정하는 방법을 배웁니다.',
                        categoryId: 'basics',
                        level: 'intermediate',
                        duration: '약 55분',
                        views: 720,
                        likes: 52,
                        thumbnail: 'https://via.placeholder.com/800x450?text=휴대폰+설정+완전정복',
                        createdAt: '2024-02-20',
                        isPopular: false,
                        isBookmarked: false,
                        isCompleted: false,
                    },
                    {
                        id: 9,
                        title: '보이스피싱 예방법',
                        description: '전화나 문자를 통한 사기를 예방하고 대처하는 방법을 자세히 알아봅니다.',
                        categoryId: 'security',
                        level: 'beginner',
                        duration: '약 35분',
                        views: 1580,
                        likes: 156,
                        thumbnail: 'https://via.placeholder.com/800x450?text=보이스피싱+예방법',
                        createdAt: '2024-02-25',
                        isPopular: true,
                        isBookmarked: true,
                        isCompleted: false,
                    },
                    {
                        id: 10,
                        title: '네이버 지도 활용하기',
                        description: '네이버 지도 앱을 사용해서 길찾기와 주변 정보를 검색하는 방법을 배웁니다.',
                        categoryId: 'smartphone',
                        level: 'beginner',
                        duration: '약 40분',
                        views: 820,
                        likes: 61,
                        thumbnail: 'https://via.placeholder.com/800x450?text=네이버+지도+활용하기',
                        createdAt: '2024-03-01',
                        isPopular: false,
                        isBookmarked: false,
                        isCompleted: false,
                    },
                    {
                        id: 11,
                        title: '페이스북 시작하기',
                        description: '페이스북 계정을 만들고 친구들과 소통하는 기본적인 방법을 배웁니다.',
                        categoryId: 'messenger',
                        level: 'beginner',
                        duration: '약 45분',
                        views: 620,
                        likes: 34,
                        thumbnail: 'https://via.placeholder.com/800x450?text=페이스북+시작하기',
                        createdAt: '2024-03-05',
                        isPopular: false,
                        isBookmarked: false,
                        isCompleted: false,
                    },
                    {
                        id: 12,
                        title: '스마트폰 관리와 최적화',
                        description: '스마트폰을 깨끗하게 관리하고 성능을 최적화하는 방법을 알아봅니다.',
                        categoryId: 'basics',
                        level: 'advanced',
                        duration: '약 60분',
                        views: 450,
                        likes: 28,
                        thumbnail: 'https://via.placeholder.com/800x450?text=스마트폰+관리와+최적화',
                        createdAt: '2024-03-10',
                        isPopular: false,
                        isBookmarked: false,
                        isCompleted: false,
                    }
                ];

                this.loading = false;
            }, 800);
        },

        selectCategory(categoryId) {
            this.selectedCategory = categoryId;
            this.currentPage = 1;
        },

        resetFilters() {
            this.selectedCategory = 'all';
            this.searchQuery = '';
            this.currentPage = 1;
            this.sortOption = 'newest';
        },

        clearSearch() {
            this.searchQuery = '';
            this.currentPage = 1;
        },

        performSearch() {
            // 엔터키로 검색 실행 시 추가 로직 (필요한 경우)
            this.currentPage = 1;
        },

        getCategoryName(categoryId) {
            const category = this.categories.find(cat => cat.id === categoryId);
            return category ? category.name : '';
        },

        getCategoryCount(categoryId) {
            if (categoryId === 'all') {
                return this.content.length;
            }
            return this.content.filter(item => item.categoryId === categoryId).length;
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

        toggleBookmark(contentId) {
            const content = this.content.find(item => item.id === contentId);
            if (content) {
                content.isBookmarked = !content.isBookmarked;
                // 실제 구현에서는 API 호출로 북마크 상태 업데이트
                console.log(`콘텐츠 ${contentId} 북마크 상태: ${content.isBookmarked}`);
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.scrollToTop();
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.scrollToTop();
            }
        },

        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.jumpToPage = page;
                this.scrollToTop();
            }
        },

        scrollToTop() {
            // 부드러운 스크롤 효과
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },

        // 사용자 역할 확인
        checkUserRole() {
            // 실제 구현에서는 Vuex 상태나 API 호출을 통해 사용자 역할 확인
            const user = this.$store?.state?.user || {};
            // this.isCreator = user.role === 'creator' || user.role === 'admin';
        }
    },

    watch: {
        searchQuery() {
            this.currentPage = 1;
        },

        selectedCategory() {
            this.currentPage = 1;
        },

        sortOption() {
            this.currentPage = 1;
        },

        currentPage(newPage) {
            this.jumpToPage = newPage;
        }
    },

    created() {
        this.loadContent();
        this.checkUserRole();
    },

    mounted() {
        // 페이지 로드 시 URL 파라미터에서 검색어나 카테고리 정보 읽기
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const search = urlParams.get('search');

        if (category && this.categories.some(cat => cat.id === category)) {
            this.selectedCategory = category;
        }

        if (search) {
            this.searchQuery = search;
        }
    }
}
</script>
<style scoped>
/* 페이지 헤더 */
.page-header {
    background-image: linear-gradient(to right, var(--color-primary, #0066CC), #004999);
}

/* 검색 입력 필드 관련 */
.search-input-wrapper {
    position: relative;
    max-width: 100%;
}

.search-icon {
    z-index: 10;
    pointer-events: none;
}

.search-input {
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1), 0 2px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
}

.clear-btn {
    transition: all 0.2s ease;
    z-index: 10;
}

.clear-btn:hover {
    transform: scale(1.1);
}

/* 폼 셀렉트 */
.form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1.5rem;
    padding-right: 2.5rem;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-select:focus {
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1), 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 필터 태그 */
.filter-tag {
    transition: all 0.2s ease;
    animation: fadeIn 0.3s ease;
}

.filter-tag button {
    transition: all 0.2s ease;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 카테고리 버튼 */
.category-btn {
    transition: all 0.3s ease;
    min-height: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
}

.category-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-btn:active {
    transform: translateY(0);
}

.category-btn[aria-selected="true"] {
    font-weight: bold;
    border-width: 2px;
    animation: pulse 0.3s ease;
}

/* 카드 스타일 */
.card {
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: white;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
}

.content-card .card-image {
    position: relative;
    overflow: hidden;
}

.content-card img {
    transition: transform 0.3s ease;
}

.content-card:hover img {
    transform: scale(1.05);
}

/* 버튼 스타일 */
.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.2s ease;
    border: none;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.btn-primary {
    background-color: var(--color-primary, #0066CC);
    color: white;
    box-shadow: 0 2px 4px rgba(0, 102, 204, 0.2);
}

.btn-primary:hover {
    background-color: #0055b3;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 102, 204, 0.3);
}

.btn-primary:active {
    transform: translateY(0);
}

.btn-outline {
    background-color: white;
    border: 1px solid #e5e7eb;
    color: #6b7280;
    transition: all 0.2s ease;
}

.btn-outline:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
    transform: translateY(-1px);
}

/* 페이지네이션 스타일 */
.pagination-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination-btn {
    transition: all 0.2s ease;
    font-weight: 500;
    min-width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
    background-color: white;
    cursor: pointer;
}

.pagination-btn:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: var(--color-primary, #0066CC);
    transform: translateY(-1px);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-btn.active {
    background-color: var(--color-primary, #0066CC);
    color: #0066CC;
    border-color: var(--color-primary, #0066CC);
}

.page-numbers {
    gap: 0.25rem;
}

.page-jump input {
    transition: all 0.2s ease;
}

.page-jump input:focus {
    border-color: var(--color-primary, #0066CC);
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

/* 텍스트 클램핑 */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 로딩 스피너 */
.spinner-border {
    border-color: rgba(0, 0, 0, 0.1);
    border-top-color: var(--color-primary, #0066CC);
    animation: spinner 1s linear infinite;
}

/* 반응형 스타일 */
@media (max-width: 768px) {
    .search-input {
        font-size: 1rem;
        padding: 0.875rem 3rem 0.875rem 2.5rem;
    }

    .search-icon {
        left: 0.5rem;
        width: 1rem;
        height: 1rem;
    }

    .clear-btn {
        right: 0.5rem;
    }

    .clear-btn {
        right: 0.75rem;
    }

    .category-buttons {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
    }

    .category-btn {
        padding: 0.75rem 0.5rem;
        font-size: 0.875rem;
        min-height: 3rem;
    }

    .content-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .pagination-buttons {
        flex-wrap: wrap;
        gap: 0.25rem;
    }

    .page-jump {
        margin-top: 1rem;
    }
}

@media (max-width: 640px) {
    .page-header {
        padding: 2rem 1rem;
    }

    .page-header h1 {
        font-size: 1.875rem;
    }

    .page-header p {
        font-size: 1rem;
    }

    .filter-section {
        padding: 1rem;
    }

    .content-list {
        padding: 2rem 1rem;
    }

    .sort-options {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
    }

    .sort-options>div:first-child {
        text-align: center;
    }

    .pagination-buttons {
        justify-content: center;
    }

    .page-numbers {
        order: -1;
        margin-bottom: 0.5rem;
    }
}

/* 애니메이션 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.02);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}

/* 접근성 */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* 포커스 스타일 */
.btn:focus,
.category-btn:focus,
.pagination-btn:focus {
    outline: 2px solid var(--color-primary, #0066CC);
    outline-offset: 2px;
}

/* 다크 모드 지원 (옵션) */
@media (prefers-color-scheme: dark) {
    .card {
        background-color: #1f2937;
        border-color: #374151;
        color: #f9fafb;
    }

    .btn-outline {
        background-color: #1f2937;
        border-color: #374151;
        color: #d1d5db;
    }

    .btn-outline:hover {
        background-color: #374151;
    }
}

/* 스크롤 동작 */
html {
    scroll-behavior: smooth;
}

/* 기타 유틸리티 */
.hover\:scale-102:hover {
    transform: scale(1.02);
}

.transition-all {
    transition: all 0.2s ease;
}

.duration-300 {
    transition-duration: 300ms;
}
</style>