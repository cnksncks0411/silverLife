<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <!-- 히어로 섹션 -->
    <section class="hero bg-primary text-white py-16 px-4">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">시니어의 디지털 나침반, 삶은(SilverLife)</h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          시니어들의 디지털 라이프스타일을 위한 특별한 공간, 삶은(SilverLife)입니다.
          디지털 교육부터 건강 관리, 맞춤 콘텐츠까지
          <!-- 디지털 교육부터 건강 관리, 맞춤 콘텐츠, 소셜 네트워킹, 쇼핑까지 -->
          시니어만을 위한 온라인 커뮤니티에서 새로운 가능성을 발견하세요.
          함께 배우고, 나누고, 즐기는 시니어 전용 디지털 세상이 여러분을 기다립니다.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link to="/register" class="btn bg-white text-primary hover:bg-gray-100">
            회원가입
          </router-link>
          <router-link to="/education" class="btn bg-secondary text-white hover:bg-opacity-90">
            시작하기
          </router-link>
        </div>
      </div>
    </section>

    <!-- 주요 기능 소개 -->
    <section class="features py-16 px-4 bg-light">
      <div class="container mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">주요 기능</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="feature-card card transform hover:scale-105 transition-transform duration-300">
            <div class="text-center mb-6">
              <div class="icon-circle mx-auto bg-primary bg-opacity-10 p-6 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-center mb-4">디지털 교육</h3>
            <p class="text-lg text-gray mb-6">
              스마트폰 사용법부터 인터넷 활용까지, 시니어를 위한 맞춤형 디지털 교육 콘텐츠를 제공합니다.
            </p>
            <div class="text-center">
              <router-link to="/education" class="btn btn-outline">자세히 보기</router-link>
            </div>
          </div>

          <div class="feature-card card transform hover:scale-105 transition-transform duration-300">
            <div class="text-center mb-6">
              <div class="icon-circle mx-auto bg-secondary bg-opacity-10 p-6 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-center mb-4">키오스크 실습</h3>
            <p class="text-lg text-gray mb-6">
              음식점, 병원, 공공기관 등 다양한 환경의 키오스크 사용법을 실습할 수 있습니다.
            </p>
            <div class="text-center">
              <router-link to="/kiosk" class="btn btn-outline">자세히 보기</router-link>
            </div>
          </div>

          <div class="feature-card card transform hover:scale-105 transition-transform duration-300">
            <div class="text-center mb-6">
              <div class="icon-circle mx-auto bg-accent bg-opacity-10 p-6 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-accent" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-center mb-4">인지력 게임</h3>
            <p class="text-lg text-gray mb-6">
              기억력, 집중력, 추론능력 향상을 위한 다양한 게임으로 인지 건강을 관리하세요.
            </p>
            <div class="text-center">
              <router-link to="/games" class="btn btn-outline">자세히 보기</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 추천 교육 콘텐츠 -->
    <section class="education-content py-16 px-4">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold">추천 교육 콘텐츠</h2>
          <router-link to="/education" class="text-lg text-primary font-medium">
            전체보기
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(content, index) in recommendedContent" :key="index"
            class="card hover:shadow-lg transition-shadow">
            <div class="relative">
              <img :src="content.thumbnail" :alt="content.title" class="w-full h-48 object-cover rounded-t-xl">
              <div class="category-badge absolute top-4 left-4 bg-primary text-white py-1 px-3 rounded-full text-sm">
                {{ content.category }}
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3">{{ content.title }}</h3>
              <p class="text-gray text-lg mb-4">{{ content.description }}</p>
              <router-link :to="`/education/${content.id}`" class="text-primary font-medium flex items-center">
                자세히 보기
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 앱 다운로드 배너 -->
    <section class="app-download bg-secondary text-white py-12 px-4">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="mb-8 md:mb-0 md:mr-8">
            <h2 class="text-3xl font-bold mb-4">어디서나 편리하게 이용하세요</h2>
            <p class="text-xl mb-6">
              삶은(SilverLife) 모바일 앱으로 언제 어디서나 서비스를 이용해보세요.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="#"
                class="flex items-center bg-white text-secondary rounded-lg px-4 py-2 hover:bg-opacity-90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.9,19.9l-5.4,2.9c-0.4,0.2-0.8,0.3-1.2,0.3c-0.4,0-0.8-0.1-1.2-0.3l-5.4-2.9C3.6,19.1,3,18.1,3,16.9V7.1 c0-1.2,0.6-2.2,1.7-2.9l5.4-2.9c0.8-0.4,1.6-0.4,2.4,0l5.4,2.9c1.1,0.6,1.7,1.7,1.7,2.9v9.8C19.5,18.1,18.9,19.1,17.9,19.9z M12,2.1 c-0.2,0-0.5,0.1-0.7,0.2L5.9,5.2C5.3,5.5,5,6.1,5,6.7v10.6c0,0.6,0.3,1.2,0.9,1.5l5.4,2.9c0.2,0.1,0.5,0.2,0.7,0.2s0.5-0.1,0.7-0.2 l5.4-2.9c0.6-0.3,0.9-0.9,0.9-1.5V6.7c0-0.6-0.3-1.2-0.9-1.5l-5.4-2.9C12.5,2.2,12.2,2.1,12,2.1z M12,17c-2.8,0-5-2.2-5-5 s2.2-5,5-5s5,2.2,5,5S14.8,17,12,17z M12,9c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S13.7,9,12,9z" />
                </svg>
                Play 스토어
              </a>
              <a href="#"
                class="flex items-center bg-white text-secondary rounded-lg px-4 py-2 hover:bg-opacity-90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.05,20.28c-0.98,0.95-2.05,0.8-3.08,0.35c-1.09-0.46-2.09-0.48-3.24,0c-1.44,0.62-2.2,0.44-3.06-0.38 C2.79,15.37,3.51,7.01,8.92,6.64c1.36-0.11,2.31,0.47,3.19,0.53c1.25,0.08,2.06-0.52,3.18-0.53c1.93-0.02,3.31,1.01,4.24,2.62 c-3.44,2.16-2.92,6.84,0.54,8.37C19.49,18.43,18.43,19.57,17.05,20.28z M12.03,6.3c-0.17-2.21,1.6-3.95,3.53-4.3 C15.99,4.25,13.77,6.5,12.03,6.3z" />
                </svg>
                App Store
              </a>
            </div>
          </div>
          <div class="relative">
            <!-- <img src="@/assets/images/app-preview.png" alt="앱 미리보기" class="max-w-xs md:max-w-sm rounded-xl shadow-2xl"> -->
            <div
              class="absolute -top-6 -right-6 bg-accent text-white text-lg font-bold py-2 px-4 rounded-full transform rotate-12">
              무료!
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 사용자 후기 -->
    <section class="testimonials py-16 px-4 bg-light">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">사용자 후기</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(review, index) in userReviews" :key="index" class="card">
            <div class="flex items-center mb-4">
              <img :src="review.avatar" :alt="`${review.name}님의 프로필`" class="w-16 h-16 rounded-full mr-4">
              <div>
                <h3 class="text-xl font-bold">{{ review.name }}</h3>
                <div class="flex">
                  <span v-for="i in 5" :key="i" class="text-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                      :class="{ 'text-gray-300': i > review.rating }" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <p class="text-lg text-gray">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      recommendedContent: [
        {
          id: 1,
          title: '스마트폰 기본 사용법',
          description: '전화걸기, 문자보내기, 카메라 사용 등 스마트폰의 기본 기능을 배워봅니다.',
          category: '디지털 기초',
          // thumbnail: require('@/assets/images/smartphone-basics.jpg')
        },
        {
          id: 2,
          title: '카카오톡 사용하기',
          description: '가족, 친구들과 소통하는 카카오톡 메신저 앱 사용법을 알아봅니다.',
          category: '메신저 활용',
          // thumbnail: require('@/assets/images/kakaotalk-usage.jpg')
        },
        {
          id: 3,
          title: '유튜브로 영상 즐기기',
          description: '유튜브 앱을 통해 다양한 영상 콘텐츠를 검색하고 시청하는 방법을 배웁니다.',
          category: '앱 활용',
          // thumbnail: require('@/assets/images/youtube-guide.jpg')
        }
      ],
      userReviews: [
        {
          name: '김영자',
          age: 68,
          rating: 5,
          comment: '키오스크 실습 기능이 정말 유용해요. 이제 패스트푸드점에서 주문할 때 당황하지 않아요!',
          // avatar: require('@/assets/images/review-avatar-1.jpg')
        },
        {
          name: '박정수',
          age: 72,
          rating: 4,
          comment: '스마트폰 사용법 교육 콘텐츠가 매우 친절하게 설명되어 있어서 이해하기 쉬웠습니다. 덕분에 손자와 영상통화도 할 수 있게 되었어요.',
          // avatar: require('@/assets/images/review-avatar-2.jpg')
        },
        {
          name: '이미옥',
          age: 65,
          rating: 5,
          comment: '인지력 향상 게임을 매일 조금씩 하고 있는데, 재밌기도 하고 머리도 맑아지는 것 같아요. 앱 디자인도 보기 좋고 글씨가 커서 편해요.',
          // avatar: require('@/assets/images/review-avatar-3.jpg')
        }
      ]
    }
  },
  created() {
    // 페이지 로드 시 스크롤 상단으로
    window.scrollTo(0, 0);
  }
}
</script>

<style lang="scss" scoped>
.hero {
  background-image: linear-gradient(to right, var(--color-primary), darken(#0066CC, 15%));
}

.icon-circle {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-download {
  background-image: linear-gradient(135deg, var(--color-secondary), darken(#FF6600, 15%));
}

// 에셋 이미지가 없는 경우를 대비한 플레이스홀더 스타일
[src*='smartphone-basics.jpg'],
[src*='kakaotalk-usage.jpg'],
[src*='youtube-guide.jpg'],
[src*='app-preview.png'],
[src*='review-avatar'] {
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