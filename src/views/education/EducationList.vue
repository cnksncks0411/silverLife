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
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 text-primary absolute left-4 top-1/2 transform -translate-y-1/2 z-10" 
          fill="none"
          viewBox="0 0 24 24" 
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          id="search-input"
          v-model="searchQuery" 
          type="text" 
          placeholder="찾으시는 콘텐츠를 입력하세요" 
          class="input-field pl-14 w-full text-lg py-4"
          aria-label="콘텐츠 검색"
        >
      </div>
    </div>
    
    <!-- 카테고리 선택 - 드롭다운 방식으로 변경 -->
    <div class="category-selection mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-4 md:mb-0">
          <label for="category-select" class="block text-lg font-bold mb-2">카테고리 선택</label>
          <select 
            id="category-select"
            v-model="selectedCategory" 
            class="form-select text-lg py-3 px-4 pr-10 w-full md:w-64 border-2 border-gray-300 rounded-lg focus:border-primary"
            aria-label="카테고리 선택"
          >
            <option 
              v-for="category in categories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        
        <!-- 콘텐츠 작성 버튼 (creator 계정으로 로그인한 경우에만 표시) -->
        <button 
          v-if="isCreator"
          @click="openContentCreator" 
          class="btn btn-primary text-lg py-3 px-6 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          콘텐츠 작성
        </button>
      </div>
    </div>
    
    <!-- 선택된 카테고리 표시 및 다른 방식으로 카테고리 선택 가능 -->
    <div class="selected-category mb-4">
      <p class="text-lg mb-2">
        <strong>선택된 카테고리:</strong> {{ getCategoryName(selectedCategory) }}
      </p>
      <p class="text-gray-600">다른 카테고리를 선택하세요:</p>
    </div>
    
    <!-- 큰 버튼 형태의 카테고리 - 격자 형태로 배치 -->
    <div class="category-buttons grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <button 
        v-for="category in categories" 
        :key="category.id" 
        @click="selectCategory(category.id)"
        class="category-btn p-4 text-center rounded-lg border-2 text-lg"
        :class="selectedCategory === category.id 
          ? 'border-primary bg-primary bg-opacity-10 text-primary font-bold' 
          : 'border-gray-300 bg-white hover:border-primary hover:bg-light'"
        :aria-selected="selectedCategory === category.id"
      >
        {{ category.name }}
      </button>
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

    <!-- 콘텐츠 작성 모달 -->
    <div v-if="showContentCreator"
        class="content-creator-modal fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50" @click="showContentCreator = false"></div>
        <div class="modal-content bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="modal-header bg-primary text-white p-4 flex justify-between items-center">
                <h3 class="text-xl font-bold">교육 콘텐츠 작성</h3>
                <button @click="showContentCreator = false" class="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="modal-body p-6">
                <form @submit.prevent="submitContent" class="space-y-6">
                    <div class="form-group">
                        <label for="title" class="block text-lg mb-2">제목</label>
                        <input type="text" id="title" v-model="newContent.title" class="modal-input-field w-full"
                            placeholder="콘텐츠 제목을 입력하세요" required>
                    </div>

                    <div class="form-group">
                        <label for="description" class="block text-lg mb-2">설명</label>
                        <textarea id="description" v-model="newContent.description"
                            class="modal-input-field w-full h-24 resize-none" placeholder="콘텐츠에 대한 간략한 설명을 입력하세요"
                            required></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="form-group">
                            <label for="category" class="block text-lg mb-2">카테고리</label>
                            <select id="category" v-model="newContent.categoryId" class="modal-input-field w-full" required>
                                <option value="" disabled selected>카테고리 선택</option>
                                <option v-for="category in categories.filter(c => c.id !== 'all')" :key="category.id"
                                    :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="level" class="block text-lg mb-2">난이도</label>
                            <select id="level" v-model="newContent.level" class="modal-input-field w-full" required>
                                <option value="" disabled selected>난이도 선택</option>
                                <option value="beginner">초급</option>
                                <option value="intermediate">중급</option>
                                <option value="advanced">고급</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="form-group">
                            <label for="duration" class="block text-lg mb-2">예상 소요 시간</label>
                            <input type="text" id="duration" v-model="newContent.duration" class="modal-input-field w-full"
                                placeholder="예: 약 30분" required>
                        </div>

                        <div class="form-group">
                            <label for="thumbnail" class="block text-lg mb-2">썸네일 이미지</label>
                            <div class="flex">
                                <input type="file" id="thumbnail" @change="handleThumbnailUpload" class="hidden"
                                    accept="image/*">
                                <label for="thumbnail"
                                    class="cursor-pointer px-4 py-2 bg-light border border-gray-300 rounded-lg mr-2 flex-grow">
                                    {{ thumbnailName || '이미지 선택...' }}
                                </label>
                                <button type="button" @click="clearThumbnail"
                                    class="px-3 py-2 bg-light border border-gray-300 rounded-lg"
                                    :disabled="!thumbnailName">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <p class="text-sm text-gray-600 mt-1">권장 크기: 800x450px, 최대 2MB</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="content" class="block text-lg mb-2">교육 내용</label>
                        <div class="border border-gray-300 rounded-lg p-2">
                            <!-- 여기에 리치 텍스트 에디터를 통합할 수 있습니다 -->
                            <textarea id="content" v-model="newContent.contentBody"
                                class="modal-input-field w-full h-48 resize-none"
                                placeholder="교육 내용을 작성하세요 (마크다운 또는 HTML 형식 지원)" required></textarea>
                        </div>
                    </div>

                    <div class="button-group flex justify-end space-x-4">
                        <button type="button" @click="showContentCreator = false"
                            class="py-3 px-6 border border-gray-300 rounded-lg">
                            취소
                        </button>
                        <button type="submit" class="py-3 px-6 bg-primary text-white rounded-lg"
                            :disabled="contentSubmitting">
                            {{ contentSubmitting ? '저장 중...' : '콘텐츠 저장' }}
                        </button>
                    </div>
                </form>
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

            // 콘텐츠 작성 관련 데이터
            isCreator: false, // creator 권한 체크
            showContentCreator: false,
            contentSubmitting: false,
            thumbnailName: '',
            thumbnailFile: null,
            newContent: {
                title: '',
                description: '',
                categoryId: '',
                level: '',
                duration: '',
                contentBody: ''
            }
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
        },
        created() {
            // URL 쿼리 파라미터에서 카테고리 가져오기
            const categoryFromQuery = this.$route.query.category;
            if (categoryFromQuery && this.categories.some(cat => cat.id === categoryFromQuery)) {
                this.selectedCategory = categoryFromQuery;
            }

            this.loadContent();
            this.checkUserRole();
        },
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
        },
        // 사용자 역할 확인
        checkUserRole() {
            // 실제 구현에서는 Vuex 상태나 API 호출을 통해 사용자 역할 확인
            // 임시 예제에서는 로컬 스토리지 사용
            const userRole = localStorage.getItem('user-role');
            this.isCreator = userRole === 'creator' || userRole === 'admin';
        },

        // 콘텐츠 작성 모달 열기
        openContentCreator() {
            this.showContentCreator = true;
            // 폼 초기화
            this.newContent = {
                title: '',
                description: '',
                categoryId: '',
                level: '',
                duration: '',
                contentBody: ''
            };
            this.thumbnailName = '';
            this.thumbnailFile = null;
        },

        // 썸네일 이미지 업로드 처리
        handleThumbnailUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // 파일 크기 체크 (2MB 제한)
                if (file.size > 2 * 1024 * 1024) {
                    alert('이미지 크기가 2MB를 초과합니다.');
                    event.target.value = '';
                    return;
                }

                this.thumbnailFile = file;
                this.thumbnailName = file.name;
            }
        },

        // 썸네일 선택 취소
        clearThumbnail() {
            this.thumbnailFile = null;
            this.thumbnailName = '';
            // 파일 입력 필드 초기화
            document.getElementById('thumbnail').value = '';
        },

        // 콘텐츠 저장
        async submitContent() {
            this.contentSubmitting = true;

            try {
                // FormData 생성 (실제 API 요청에 사용)
                const formData = new FormData();
                formData.append('title', this.newContent.title);
                formData.append('description', this.newContent.description);
                formData.append('categoryId', this.newContent.categoryId);
                formData.append('level', this.newContent.level);
                formData.append('duration', this.newContent.duration);
                formData.append('contentBody', this.newContent.contentBody);

                if (this.thumbnailFile) {
                    formData.append('thumbnail', this.thumbnailFile);
                }

                // 실제 구현에서는 API 호출
                // await axios.post('/api/education', formData);

                // 임시 구현: 데이터 처리 시뮬레이션
                await new Promise(resolve => setTimeout(resolve, 1500));

                // 새 콘텐츠 ID 생성 (실제로는 서버에서 생성)
                const newId = this.content.length > 0 ? Math.max(...this.content.map(c => c.id)) + 1 : 1;

                // 새 콘텐츠 객체 생성
                const newContentItem = {
                    id: newId,
                    title: this.newContent.title,
                    description: this.newContent.description,
                    categoryId: this.newContent.categoryId,
                    level: this.newContent.level,
                    duration: this.newContent.duration,
                    // 실제로는 서버에서 처리된 URL이 반환됨
                    thumbnail: this.thumbnailFile ? URL.createObjectURL(this.thumbnailFile) : null
                };

                // 콘텐츠 목록에 추가
                this.content.unshift(newContentItem);

                // 성공 메시지 표시
                alert('콘텐츠가 성공적으로 등록되었습니다.');

                // 모달 닫기
                this.showContentCreator = false;
            } catch (error) {
                console.error('콘텐츠 저장 중 오류 발생:', error);
                alert('콘텐츠 저장 중 오류가 발생했습니다.');
            } finally {
                this.contentSubmitting = false;
            }
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

/* 시니어 친화적인 스타일 */
/* 검색 입력 필드 스타일 */
.input-field {
  font-size: 1.125rem; /* 18px */
  padding: 1rem 1.25rem;
  padding-left: 4rem; /* 아이콘을 위한 충분한 여백 */
  border-width: 2px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.search-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem; /* 아이콘 영역에 고정 너비 설정 */
  height: 3rem;
  pointer-events: none; /* 아이콘이 입력 필드 상호작용을 방해하지 않도록 */
}

.input-field:focus {
  border-color: var(--color-primary, #0066CC);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
  outline: none;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.5rem;
  padding-right: 2.5rem;
}

.category-btn {
  transition: all 0.2s ease;
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-btn:hover {
  transform: translateY(-2px);
}

.category-btn:active {
  transform: translateY(0);
}

/* 고대비 모드를 위한 선택 카테고리 강조 스타일 */
.category-btn[aria-selected="true"] {
  font-weight: bold;
  border-width: 3px;
  position: relative;
}

.category-btn[aria-selected="true"]::after {
  content: "✓";
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1rem;
  color: var(--color-primary, #0066CC);
}

@media (max-width: 640px) {
  .category-buttons {
    grid-template-columns: 1fr 1fr; /* 모바일에서는 2열로 */
  }
  
  .category-btn {
    padding: 1rem 0.5rem;
    font-size: 1rem;
  }
}

/* 모달 애니메이션 */
.modal-backdrop {
    transition: opacity 0.3s ease;
}

.modal-content {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

/* 리치 텍스트 에디터 스타일 */
.ql-editor {
    min-height: 200px;
}

.modal-input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1.125rem;
    transition: border-color 0.2s;
}

.modal-input-field:focus {
    border-color: var(--color-primary, #0066CC);
    outline: none;
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