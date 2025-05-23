<template>
    <div class="profile-page">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-primary text-white py-12 px-4">
            <div class="container mx-auto">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">내 정보</h1>
                <p class="text-xl max-w-3xl">
                    개인 정보를 관리하고 서비스 이용 현황을 확인하세요.
                </p>
            </div>
        </div>

        <!-- 프로필 콘텐츠 -->
        <div class="profile-content py-12 px-4">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- 주요 콘텐츠 (좌측 2/3) -->
                    <div class="main-content lg:col-span-2">
                        <!-- 개인 정보 섹션 -->
                        <div class="personal-info bg-white rounded-xl shadow-md p-8 mb-8">
                            <div class="section-header flex justify-between items-center mb-6">
                                <h2 class="text-2xl font-bold">기본 정보</h2>
                                <button @click="editMode = !editMode"
                                    class="flex items-center text-primary hover:underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    {{ editMode ? '취소' : '수정' }}
                                </button>
                            </div>

                            <form v-if="editMode" @submit.prevent="saveProfile" class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="form-group">
                                        <label for="name" class="block text-lg mb-2">이름</label>
                                        <input type="text" id="name" v-model="form.name" class="input-field" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="email" class="block text-lg mb-2">이메일</label>
                                        <input type="email" id="email" v-model="form.email" class="input-field" required
                                            disabled>
                                        <p class="text-sm text-gray-600 mt-1">이메일은 변경할 수 없습니다.</p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div class="form-group">
                                        <label for="age" class="block text-lg mb-2">나이</label>
                                        <input type="number" id="age" v-model="form.age" class="input-field" min="1"
                                            max="120">
                                    </div>

                                    <div class="form-group">
                                        <label class="block text-lg mb-2">성별</label>
                                        <div class="flex space-x-4">
                                            <label class="flex items-center">
                                                <input type="radio" v-model="form.gender" value="male"
                                                    class="h-5 w-5 text-primary">
                                                <span class="ml-2">남성</span>
                                            </label>
                                            <label class="flex items-center">
                                                <input type="radio" v-model="form.gender" value="female"
                                                    class="h-5 w-5 text-primary">
                                                <span class="ml-2">여성</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="phone" class="block text-lg mb-2">전화번호</label>
                                        <input type="tel" id="phone" v-model="form.phone" class="input-field"
                                            placeholder="010-1234-5678">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="region" class="block text-lg mb-2">지역</label>
                                    <select id="region" v-model="form.region" class="input-field">
                                        <option value="">선택하세요</option>
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

                                <div class="button-group flex justify-end space-x-4">
                                    <button type="button" @click="editMode = false"
                                        class="py-3 px-6 border border-gray-300 rounded-lg">
                                        취소
                                    </button>
                                    <button type="submit" class="py-3 px-6 bg-primary text-white rounded-lg"
                                        :disabled="loading">
                                        {{ loading ? '저장 중...' : '저장하기' }}
                                    </button>
                                </div>
                            </form>

                            <div v-else class="profile-display">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="info-group">
                                        <p class="text-gray-600 mb-1">이름</p>
                                        <p class="text-xl font-medium">{{ userInfo.name }}</p>
                                    </div>

                                    <div class="info-group">
                                        <p class="text-gray-600 mb-1">이메일</p>
                                        <p class="text-xl font-medium">{{ userInfo.email }}</p>
                                    </div>

                                    <div class="info-group">
                                        <p class="text-gray-600 mb-1">나이</p>
                                        <p class="text-xl font-medium">{{ userInfo.age || '정보 없음' }}</p>
                                    </div>

                                    <div class="info-group">
                                        <p class="text-gray-600 mb-1">성별</p>
                                        <p class="text-xl font-medium">{{ getGenderLabel(userInfo.gender) }}</p>
                                    </div>

                                    <div class="info-group">
                                        <p class="text-gray-600 mb-1">전화번호</p>
                                        <p class="text-xl font-medium">{{ userInfo.phone || '정보 없음' }}</p>
                                    </div>

                                    <div class="info-group">
                                        <p class="text-gray-600 mb-1">지역</p>
                                        <p class="text-xl font-medium">{{ userInfo.region || '정보 없음' }}</p>
                                    </div>
                                </div>

                                <div class="info-group mt-8">
                                    <p class="text-gray-600 mb-1">가입일</p>
                                    <p class="text-xl font-medium">{{ userInfo.registeredAt }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- 건강 정보 섹션 -->
                        <div class="health-info bg-white rounded-xl shadow-md p-8 mb-8">
                            <div class="section-header flex justify-between items-center mb-6">
                                <h2 class="text-2xl font-bold">건강 정보</h2>
                                <router-link to="/diet" class="text-primary hover:underline">
                                    맞춤 식단 보기
                                </router-link>
                            </div>

                            <div v-if="healthProfile">
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div class="health-stat bg-light p-4 rounded-lg">
                                        <p class="text-gray-600 mb-1">키</p>
                                        <p class="text-2xl font-bold">{{ healthProfile.height }} cm</p>
                                    </div>

                                    <div class="health-stat bg-light p-4 rounded-lg">
                                        <p class="text-gray-600 mb-1">몸무게</p>
                                        <p class="text-2xl font-bold">{{ healthProfile.weight }} kg</p>
                                    </div>

                                    <div class="health-stat bg-light p-4 rounded-lg">
                                        <p class="text-gray-600 mb-1">BMI</p>
                                        <p class="text-2xl font-bold">{{ calculateBMI().toFixed(1) }}</p>
                                        <p class="text-sm">{{ getBMIStatus() }}</p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="health-condition">
                                        <h3 class="text-lg font-bold mb-2">만성 질환</h3>
                                        <div
                                            v-if="healthProfile.chronicDiseases && healthProfile.chronicDiseases.length > 0 && !healthProfile.chronicDiseases.includes('none')">
                                            <ul class="list-disc pl-5 space-y-1">
                                                <li v-for="(disease, index) in healthProfile.chronicDiseases"
                                                    :key="index">
                                                    {{ getDiseaseName(disease) }}
                                                </li>
                                            </ul>
                                        </div>
                                        <p v-else class="text-gray-600">없음</p>
                                    </div>

                                    <div class="health-condition">
                                        <h3 class="text-lg font-bold mb-2">알레르기</h3>
                                        <div
                                            v-if="healthProfile.allergies && healthProfile.allergies.length > 0 && !healthProfile.allergies.includes('none')">
                                            <ul class="list-disc pl-5 space-y-1">
                                                <li v-for="(allergy, index) in healthProfile.allergies" :key="index">
                                                    {{ getAllergyName(allergy) }}
                                                </li>
                                            </ul>
                                        </div>
                                        <p v-else class="text-gray-600">없음</p>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="text-center py-6">
                                <p class="text-gray-600 mb-4">아직 건강 정보가 없습니다.</p>
                                <router-link to="/diet" class="py-2 px-4 bg-primary text-white rounded-lg inline-block">
                                    건강 정보 입력하기
                                </router-link>
                            </div>
                        </div>

                        <!-- 활동 내역 섹션 -->
                        <div class="activity-history bg-white rounded-xl shadow-md p-8">
                            <h2 class="text-2xl font-bold mb-6">최근 활동</h2>

                            <div v-if="activities.length === 0" class="text-center py-6">
                                <p class="text-gray-600">아직 활동 내역이 없습니다.</p>
                            </div>

                            <div v-else class="timeline space-y-6">
                                <div v-for="(activity, index) in activities" :key="index" class="activity-item flex">
                                    <div class="activity-icon mr-4">
                                        <div
                                            class="icon-circle bg-primary bg-opacity-10 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                                            <svg v-if="activity.type === 'education'" xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path
                                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                            </svg>
                                            <svg v-else-if="activity.type === 'game'" xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <svg v-else-if="activity.type === 'policy'"
                                                xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="activity-content flex-1">
                                        <div class="flex justify-between items-start">
                                            <h3 class="text-lg font-bold">{{ activity.title }}</h3>
                                            <span class="text-sm text-gray-600">{{ formatDate(activity.date) }}</span>
                                        </div>
                                        <p class="text-gray-600">{{ activity.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 사이드바 (우측 1/3) -->
                    <div class="sidebar">
                        <!-- 프로필 카드 -->
                        <div class="profile-card bg-white rounded-xl shadow-md p-6 mb-8 text-center">
                            <div class="avatar mb-4">
                                <!-- <img src="@/assets/images/default-avatar.png" alt="프로필 이미지"
                                    class="w-32 h-32 rounded-full mx-auto"> -->
                            </div>
                            <h3 class="text-xl font-bold mb-1">{{ userInfo.name }}</h3>
                            <p class="text-gray-600 mb-4">{{ userInfo.email }}</p>

                            <hr class="my-4">

                            <div class="stats grid grid-cols-2 gap-4 mb-6">
                                <div class="stat-item">
                                    <p class="text-gray-600 text-sm">학습 완료</p>
                                    <p class="text-2xl font-bold">{{ stats.completedLessons }}</p>
                                </div>
                                <div class="stat-item">
                                    <p class="text-gray-600 text-sm">게임 점수</p>
                                    <p class="text-2xl font-bold">{{ stats.totalGameScore }}</p>
                                </div>
                            </div>

                            <button @click="$router.push('/settings')"
                                class="w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                                계정 설정
                            </button>
                        </div>

                        <!-- 빠른 링크 -->
                        <div class="quick-links bg-white rounded-xl shadow-md p-6 mb-8">
                            <h3 class="text-xl font-bold mb-4">빠른 링크</h3>

                            <div class="links-grid grid grid-cols-1 gap-3">
                                <router-link to="/education"
                                    class="link-item flex items-center p-3 border border-gray-200 rounded-lg hover:bg-light hover:border-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary mr-3"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                    교육
                                </router-link>

                                <router-link to="/kiosk"
                                    class="link-item flex items-center p-3 border border-gray-200 rounded-lg hover:bg-light hover:border-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary mr-3"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    키오스크 실습
                                </router-link>

                                <router-link to="/games"
                                    class="link-item flex items-center p-3 border border-gray-200 rounded-lg hover:bg-light hover:border-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary mr-3"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    인지력 게임
                                </router-link>

                                <router-link to="/diet"
                                    class="link-item flex items-center p-3 border border-gray-200 rounded-lg hover:bg-light hover:border-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary mr-3"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                    맞춤 식단
                                </router-link>

                                <router-link to="/policy"
                                    class="link-item flex items-center p-3 border border-gray-200 rounded-lg hover:bg-light hover:border-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary mr-3"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    정책 정보
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
    name: 'Profile',
    data() {
        return {
            loading: false,
            editMode: false,
            userInfo: {
                name: '김시니어',
                email: 'senior@example.com',
                age: 65,
                gender: 'male',
                region: '서울특별시',
                phone: '010-1234-5678',
                registeredAt: '2023-01-15'
            },
            form: {
                name: '',
                email: '',
                age: null,
                gender: '',
                region: '',
                phone: ''
            },
            healthProfile: {
                height: 170,
                weight: 68,
                chronicDiseases: ['hypertension', 'diabetes'],
                allergies: ['eggs', 'nuts']
            },
            activities: [
                {
                    type: 'education',
                    title: '스마트폰 기본 사용법 완료',
                    description: '교육 과정을 성공적으로 완료했습니다.',
                    date: '2025-05-10T14:30:00'
                },
                {
                    type: 'game',
                    title: '기억력 카드 매칭 게임',
                    description: '최고 점수 850점을 달성했습니다.',
                    date: '2025-05-08T10:15:00'
                },
                {
                    type: 'policy',
                    title: '노인 일자리 지원사업 조회',
                    description: '정책 상세 정보를 확인했습니다.',
                    date: '2025-05-05T16:45:00'
                }
            ],
            stats: {
                completedLessons: 3,
                totalGameScore: 1250
            }
        }
    },
    created() {
        // 폼 초기화
        this.initForm();
    },
    methods: {
        initForm() {
            // 현재 사용자 정보로 폼 초기화
            this.form = { ...this.userInfo };
        },
        async saveProfile() {
            this.loading = true;

            try {
                // 실제 구현에서는 API 호출이나 Vuex 액션 사용
                await new Promise(resolve => setTimeout(resolve, 1000));

                // 사용자 정보 업데이트
                this.userInfo = { ...this.form };

                // 편집 모드 종료
                this.editMode = false;

                // 성공 메시지 (실제 구현에서는 Vuex 액션 등 사용)
                alert('프로필이 성공적으로 업데이트되었습니다.');
            } catch (error) {
                console.error('프로필 업데이트 중 오류 발생:', error);
                alert('프로필 업데이트 중 오류가 발생했습니다.');
            } finally {
                this.loading = false;
            }
        },
        calculateBMI() {
            if (!this.healthProfile || !this.healthProfile.height || !this.healthProfile.weight) {
                return 0;
            }

            const height = this.healthProfile.height / 100; // cm를 m로 변환
            const weight = this.healthProfile.weight;

            return weight / (height * height);
        },
        getBMIStatus() {
            const bmi = this.calculateBMI();

            if (bmi < 18.5) return '저체중';
            if (bmi < 23) return '정상';
            if (bmi < 25) return '과체중';
            if (bmi < 30) return '비만';
            return '고도비만';
        },
        getGenderLabel(gender) {
            return gender === 'male' ? '남성' : gender === 'female' ? '여성' : '정보 없음';
        },
        getDiseaseName(diseaseCode) {
            const diseases = {
                hypertension: '고혈압',
                diabetes: '당뇨',
                hyperlipidemia: '고지혈증',
                heartDisease: '심장질환',
                kidneyDisease: '신장질환',
                none: '없음'
            };

            return diseases[diseaseCode] || diseaseCode;
        },
        getAllergyName(allergyCode) {
            const allergies = {
                eggs: '계란',
                milk: '우유',
                wheat: '밀가루',
                nuts: '견과류',
                seafood: '해산물',
                none: '없음'
            };

            return allergies[allergyCode] || allergyCode;
        },
        formatDate(dateStr) {
            if (!dateStr) return '';

            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            };

            return new Date(dateStr).toLocaleString('ko-KR', options);
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

.input-field:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
}

/* 이미지 플레이스홀더 스타일 */
[src*='default-avatar.png'] {
    background-color: #f0f0f0;
    position: relative;
}

[src*='default-avatar.png']::after {
    content: '이미지 준비 중';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #757575;
    font-size: 14px;
}
</style>