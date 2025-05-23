<template>
    <div class="education-detail">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-primary text-white py-12 px-4">
            <div class="container mx-auto">
                <div class="flex items-center mb-4">
                    <router-link to="/education" class="flex items-center text-white hover:underline mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        목록으로
                    </router-link>
                    <div v-if="education.categoryId" class="bg-white text-primary py-1 px-3 rounded-full text-sm">
                        {{ getCategoryName(education.categoryId) }}
                    </div>
                    <!-- 학습 완료 표시 -->
                    <div v-if="isCompleted" class="bg-green-500 text-white py-1 px-3 rounded-full text-sm ml-2">
                        ✓ 학습 완료
                    </div>
                </div>
                <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ education.title }}</h1>
                <div class="flex flex-wrap items-center text-lg">
                    <div class="mr-6 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ education.duration }}
                    </div>
                    <div v-if="education.level" class="mr-6 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {{ getLevelLabel(education.level) }}
                    </div>
                    <div class="mr-6 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        좋아요 {{ education.likeCount || 0 }}개
                    </div>
                    <div class="mb-2">
                        <button @click="shareContent" class="flex items-center text-white hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            공유하기
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 메인 콘텐츠 -->
        <div class="content-section py-12 px-4">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <!-- 교육 콘텐츠 (좌측 2/3) -->
                    <div class="lg:col-span-2">
                        <div class="thumbnail mb-8">
                            <img :src="education.thumbnail" :alt="education.title" class="w-full rounded-xl shadow-md">
                        </div>

                        <div class="content-description bg-white rounded-xl shadow-md p-8 mb-8">
                            <h2 class="text-2xl font-bold mb-6">교육 내용</h2>
                            <div class="text-lg leading-relaxed space-y-4" v-html="education.description"></div>
                        </div>

                        <div class="content-steps bg-white rounded-xl shadow-md p-8">
                            <h2 class="text-2xl font-bold mb-6">학습 단계</h2>

                            <div class="steps space-y-6">
                                <div v-for="(step, index) in education.steps" :key="index"
                                    class="step p-6 border border-gray-200 rounded-lg">
                                    <div class="step-header flex items-center mb-4">
                                        <div
                                            class="step-number bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                                            {{ index + 1 }}
                                        </div>
                                        <h3 class="text-xl font-bold">{{ step.title }}</h3>
                                    </div>
                                    <div class="step-content">
                                        <p class="text-lg mb-4">{{ step.description }}</p>
                                        <div v-if="step.imageUrl" class="step-image mb-4">
                                            <img :src="step.imageUrl" :alt="`단계 ${index + 1} 이미지`"
                                                class="w-full rounded-lg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 사이드바 (우측 1/3) -->
                    <div class="sidebar">
                        <div class="action-card bg-white rounded-xl shadow-md p-6 mb-8 sticky eduRun">
                            <h3 class="text-xl font-bold mb-4">학습하기</h3>

                            <button @click="startLearning"
                                class="w-full py-3 bg-primary text-white rounded-lg text-lg font-bold mb-4">
                                {{ isCompleted ? '다시 학습하기' : '학습 시작하기' }}
                            </button>

                            <div class="flex items-center justify-between text-sm text-gray-600">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    소요시간: {{ education.duration }}
                                </div>
                                <button @click="toggleLike" class="flex items-center hover:text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        :class="['h-4 w-4 mr-1', isLiked ? 'fill-red-500 text-red-500' : '']"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    좋아요
                                </button>
                            </div>
                        </div>

                        <div class="related-card bg-white rounded-xl shadow-md p-6">
                            <h3 class="text-xl font-bold mb-4">관련 교육</h3>

                            <div class="related-list space-y-4">
                                <div v-for="item in relatedEducation" :key="item.id"
                                    class="related-item flex items-center p-3 border border-gray-200 rounded-lg hover:bg-light hover:border-primary cursor-pointer"
                                    @click="goToEducation(item.id)">
                                    <img :src="item.thumbnail" :alt="item.title"
                                        class="w-16 h-16 object-cover rounded-lg mr-4">
                                    <div>
                                        <h4 class="font-bold mb-1">{{ item.title }}</h4>
                                        <p class="text-sm text-gray-600">{{ item.duration }}</p>
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
    name: 'EducationDetail',
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            education: {},
            isCompleted: false,
            isLiked: false,
            loading: true,
            error: null,
            relatedEducation: []
        }
    },
    created() {
        this.fetchEducationData();
    },
    methods: {
        fetchEducationData() {
            this.loading = true;

            // 실제 구현에서는 API 호출이나 Vuex 상태 활용
            setTimeout(() => {
                // 더미 데이터
                this.education = {
                    id: Number(this.id),
                    title: '스마트폰 기본 사용법',
                    description: `<p>스마트폰은 이제 일상생활에서 필수품이 되었습니다. 이 강좌에서는 스마트폰의 기본적인 사용법부터 유용한 기능까지 차근차근 배워봅니다.</p>
          <p>전화 걸기, 문자 보내기, 사진 찍기 등 가장 기본적인 기능부터 시작해 점차 다양한 앱 활용법까지 배울 수 있습니다.</p>
          <p>실생활에서 바로 활용할 수 있는 내용으로 구성되어 있어 처음 스마트폰을 사용하는 분들도 쉽게 따라할 수 있습니다.</p>`,
                    categoryId: 'basics',
                    level: 'beginner',
                    duration: '약 30분',
                    // thumbnail: require('@/assets/images/smartphone-basics.jpg'),
                    likeCount: 256,
                    steps: [
                        {
                            title: '스마트폰 기본 사용법 이해하기',
                            description: '스마트폰의 기본 구성요소와 조작 방법을 배웁니다.',
                            // imageUrl: require('@/assets/images/smartphone-basics-1.jpg')
                        },
                        {
                            title: '전화 걸고 받기',
                            description: '전화 앱을 사용하여 전화를 걸고 받는 방법을 배웁니다.',
                            // imageUrl: require('@/assets/images/smartphone-basics-2.jpg')
                        },
                        {
                            title: '문자 메시지 보내기',
                            description: '문자 메시지를 작성하고 보내는 방법을 배웁니다.',
                            // imageUrl: require('@/assets/images/smartphone-basics-3.jpg')
                        },
                        {
                            title: '사진 찍고 관리하기',
                            description: '카메라 앱으로 사진을 찍고 갤러리에서 관리하는 방법을 배웁니다.',
                            // imageUrl: require('@/assets/images/smartphone-basics-4.jpg')
                        }
                    ]
                };

                this.relatedEducation = [
                    {
                        id: 2,
                        title: '카카오톡 사용하기',
                        duration: '약 40분',
                        // thumbnail: require('@/assets/images/kakaotalk-usage.jpg')
                    },
                    {
                        id: 3,
                        title: '유튜브로 영상 즐기기',
                        duration: '약 25분',
                        // thumbnail: require('@/assets/images/youtube-guide.jpg')
                    },
                    {
                        id: 5,
                        title: '사진 촬영과 관리',
                        duration: '약 30분',
                        // thumbnail: require('@/assets/images/photo-management.jpg')
                    }
                ];

                // 학습 완료 상태 확인 (로컬 스토리지에서 가져오거나 더미 데이터 사용)
                this.isCompleted = localStorage.getItem(`education_completed_${this.id}`) === 'true';
                this.isLiked = localStorage.getItem(`education_liked_${this.id}`) === 'true';

                this.loading = false;
            }, 1000);
        },
        getCategoryName(categoryId) {
            const categories = {
                'basics': '디지털 기초',
                'smartphone': '스마트폰 활용',
                'messenger': '메신저/SNS',
                'internet': '인터넷 활용',
                'security': '보안/개인정보'
            };

            return categories[categoryId] || '기타';
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
        startLearning() {
            // 학습 시작 로직
            if (this.isCompleted) {
                alert('학습을 다시 시작합니다.');
            } else {
                alert('학습을 시작합니다.');
            }
            this.$router.push(`/education/${this.id}/learn`);
        },
        toggleLike() {
            this.isLiked = !this.isLiked;
            localStorage.setItem(`education_liked_${this.id}`, this.isLiked);

            // 좋아요 수 업데이트 (실제로는 API 호출)
            if (this.isLiked) {
                this.education.likeCount++;
            } else {
                this.education.likeCount--;
            }
        },
        shareContent() {
            // 공유하기 기능
            if (navigator.share) {
                navigator.share({
                    title: this.education.title,
                    text: '시니어를 위한 교육 콘텐츠를 공유합니다.',
                    url: window.location.href
                });
            } else {
                // 브라우저가 Web Share API를 지원하지 않는 경우
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {
                    alert('링크가 클립보드에 복사되었습니다.');
                }).catch(() => {
                    alert('링크 복사에 실패했습니다.');
                });
            }
        },
        goToEducation(id) {
            this.$router.push(`/education/${id}`);
        }
    }
}
</script>

<style scoped>
.page-header {
    background-image: linear-gradient(to right, var(--color-primary, #0066CC), #004999);
}

.eduRun {
    top: 4.5rem;
}

/* 이미지 플레이스홀더 스타일 */
[src*='smartphone-basics'],
[src*='kakaotalk-usage'],
[src*='youtube-guide'],
[src*='photo-management'] {
    background-color: #f0f0f0;
    min-height: 200px;
    position: relative;
}

[src*='smartphone-basics']::after,
[src*='kakaotalk-usage']::after,
[src*='youtube-guide']::after,
[src*='photo-management']::after {
    content: '이미지 준비 중';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #757575;
}
</style>