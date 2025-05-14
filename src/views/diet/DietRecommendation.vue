<template>
    <div class="diet-recommendation">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-accent text-white py-12 px-4">
            <div class="container mx-auto">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">맞춤 식단</h1>
                <p class="text-xl max-w-3xl">
                    개인 건강 상태에 따른 맞춤형 식단을 추천해 드립니다.
                    각종 질환별 권장 식품과 제한 식품 정보를 확인하세요.
                </p>
            </div>
        </div>

        <!-- 건강 정보 입력 섹션 -->
        <div v-if="!healthProfileCompleted" class="health-profile-section py-12 px-4 bg-light">
            <div class="container mx-auto max-w-2xl">
                <div class="bg-white rounded-xl shadow-md p-8">
                    <h2 class="text-2xl font-bold mb-6">건강 정보 입력</h2>
                    <p class="text-lg mb-6">맞춤 식단 추천을 위해 기본 건강 정보를 입력해주세요.</p>

                    <form @submit.prevent="saveHealthProfile" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="form-group">
                                <label for="height" class="block text-lg mb-2">키 (cm)</label>
                                <input type="number" id="height" v-model="healthProfile.height" class="input-field"
                                    placeholder="키를 입력하세요" min="100" max="220" required>
                            </div>

                            <div class="form-group">
                                <label for="weight" class="block text-lg mb-2">몸무게 (kg)</label>
                                <input type="number" id="weight" v-model="healthProfile.weight" class="input-field"
                                    placeholder="몸무게를 입력하세요" min="30" max="200" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="block text-lg mb-2">성별</label>
                            <div class="flex space-x-4">
                                <label class="flex items-center">
                                    <input type="radio" v-model="healthProfile.gender" value="male"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">남성</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" v-model="healthProfile.gender" value="female"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">여성</span>
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="age" class="block text-lg mb-2">나이</label>
                            <input type="number" id="age" v-model="healthProfile.age" class="input-field"
                                placeholder="나이를 입력하세요" min="1" max="120" required>
                        </div>

                        <div class="form-group">
                            <label class="block text-lg mb-2">만성 질환 (해당되는 항목 모두 선택)</label>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.chronicDiseases" value="hypertension"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">고혈압</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.chronicDiseases" value="diabetes"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">당뇨</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.chronicDiseases"
                                        value="hyperlipidemia" class="h-5 w-5 text-accent">
                                    <span class="ml-2">고지혈증</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.chronicDiseases" value="heartDisease"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">심장질환</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.chronicDiseases" value="kidneyDisease"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">신장질환</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.chronicDiseases" value="none"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">해당 없음</span>
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="block text-lg mb-2">알레르기 (있는 경우 선택)</label>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.allergies" value="eggs"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">계란</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.allergies" value="milk"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">우유</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.allergies" value="wheat"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">밀가루</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.allergies" value="nuts"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">견과류</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.allergies" value="seafood"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">해산물</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="healthProfile.allergies" value="none"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">해당 없음</span>
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="block text-lg mb-2">활동량</label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="radio" v-model="healthProfile.activityLevel" value="low"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">낮음 (거의 운동하지 않음)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" v-model="healthProfile.activityLevel" value="moderate"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">보통 (주 1-3회 운동)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" v-model="healthProfile.activityLevel" value="high"
                                        class="h-5 w-5 text-accent">
                                    <span class="ml-2">높음 (주 4회 이상 운동)</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" class="w-full py-3 bg-accent text-white rounded-lg text-lg font-bold"
                            :disabled="loading">
                            {{ loading ? '저장 중...' : '정보 저장 및 식단 추천 보기' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- 맞춤 식단 추천 섹션 -->
        <div v-else class="diet-recommendations-section py-12 px-4">
            <div class="container mx-auto">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h2 class="text-2xl font-bold mb-4 md:mb-0">맞춤 식단 추천</h2>
                    <button @click="healthProfileCompleted = false"
                        class="inline-flex items-center text-accent hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        건강 정보 수정하기
                    </button>
                </div>

                <!-- 건강 상태 요약 -->
                <div class="health-summary bg-white rounded-xl shadow-md p-6 mb-8">
                    <h3 class="text-xl font-bold mb-4">건강 상태 요약</h3>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p class="text-gray-600 mb-1">BMI 지수</p>
                            <p class="text-2xl font-bold">{{ calculateBMI() }} ({{ getBMIStatus() }})</p>
                        </div>

                        <div>
                            <p class="text-gray-600 mb-1">일일 권장 칼로리</p>
                            <p class="text-2xl font-bold">{{ calculateCalories() }} kcal</p>
                        </div>

                        <div>
                            <p class="text-gray-600 mb-1">주의 사항</p>
                            <p class="text-lg">
                                <span
                                    v-if="healthProfile.chronicDiseases && healthProfile.chronicDiseases.length > 0 && !healthProfile.chronicDiseases.includes('none')">
                                    {{healthProfile.chronicDiseases.map(disease => getDiseaseName(disease)).join(', ')
                                    }} 관리 필요
                                </span>
                                <span v-else>특별한 주의사항 없음</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 식단 추천 -->
                <div class="diet-plans">
                    <div class="mb-8">
                        <h3 class="text-xl font-bold mb-4">일일 식단 제안</h3>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div v-for="(meal, index) in dietPlans.dailyMeals" :key="`meal-${index}`"
                                class="meal-card bg-white rounded-xl shadow-md overflow-hidden">
                                <div class="meal-header p-4" :class="getMealHeaderClass(index)">
                                    <h4 class="text-lg font-bold text-white">{{ meal.type }}</h4>
                                </div>
                                <div class="meal-content p-6">
                                    <div v-for="(food, foodIndex) in meal.foods" :key="`food-${foodIndex}`"
                                        class="mb-3 last:mb-0">
                                        <p class="font-medium">{{ food.name }}</p>
                                        <p class="text-sm text-gray-600">{{ food.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 권장 식품 및 제한 식품 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="recommended-foods bg-white rounded-xl shadow-md p-6">
                            <h3 class="text-xl font-bold mb-4 text-success">권장 식품</h3>

                            <ul class="space-y-2">
                                <li v-for="(food, index) in dietPlans.recommendedFoods" :key="`rec-${index}`"
                                    class="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-success mr-2 mt-0.5"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div>
                                        <p class="font-medium">{{ food.name }}</p>
                                        <p class="text-sm text-gray-600">{{ food.reason }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="restricted-foods bg-white rounded-xl shadow-md p-6">
                            <h3 class="text-xl font-bold mb-4 text-error">제한 식품</h3>

                            <ul class="space-y-2">
                                <li v-for="(food, index) in dietPlans.restrictedFoods" :key="`rest-${index}`"
                                    class="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-error mr-2 mt-0.5"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <div>
                                        <p class="font-medium">{{ food.name }}</p>
                                        <p class="text-sm text-gray-600">{{ food.reason }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DietRecommendation',
    data() {
        return {
            healthProfileCompleted: false,
            loading: false,
            healthProfile: {
                height: null,
                weight: null,
                gender: 'male',
                age: null,
                chronicDiseases: [],
                allergies: [],
                activityLevel: 'moderate'
            },
            dietPlans: {
                dailyMeals: [],
                recommendedFoods: [],
                restrictedFoods: []
            }
        }
    },
    created() {
        // 저장된 건강 프로필 정보가 있는지 확인
        const savedProfile = localStorage.getItem('healthProfile');
        if (savedProfile) {
            this.healthProfile = JSON.parse(savedProfile);
            this.healthProfileCompleted = true;
            this.generateDietPlans();
        }
    },
    methods: {
        saveHealthProfile() {
            this.loading = true;

            // 실제로는 API 호출이나 Vuex 액션 사용
            setTimeout(() => {
                // 로컬 스토리지에 건강 정보 저장
                localStorage.setItem('healthProfile', JSON.stringify(this.healthProfile));

                // 식단 추천 생성
                this.generateDietPlans();

                this.healthProfileCompleted = true;
                this.loading = false;
            }, 1500);
        },
        calculateBMI() {
            const height = this.healthProfile.height / 100; // cm를 m로 변환
            const weight = this.healthProfile.weight;

            if (!height || !weight) return 0;

            const bmi = weight / (height * height);
            return bmi.toFixed(1);
        },
        getBMIStatus() {
            const bmi = this.calculateBMI();

            if (bmi < 18.5) return '저체중';
            if (bmi < 23) return '정상';
            if (bmi < 25) return '과체중';
            if (bmi < 30) return '비만';
            return '고도비만';
        },
        calculateCalories() {
            const weight = this.healthProfile.weight;
            const height = this.healthProfile.height;
            const age = this.healthProfile.age;
            const gender = this.healthProfile.gender;
            const activity = this.healthProfile.activityLevel;

            if (!weight || !height || !age) return 0;

            // 해리스-베네딕트 공식 사용
            let bmr = 0;
            if (gender === 'male') {
                bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
            } else {
                bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
            }

            // 활동량에 따른 조정
            const activityFactors = {
                low: 1.2,
                moderate: 1.55,
                high: 1.9
            };

            return Math.round(bmr * activityFactors[activity]);
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
        getMealHeaderClass(index) {
            const classes = [
                'bg-accent',
                'bg-primary',
                'bg-secondary'
            ];

            return classes[index % classes.length];
        },
        generateDietPlans() {
            // 실제로는 API 호출이나 Vuex 액션 사용
            // 여기서는 더미 데이터 생성

            // 질환에 따른 식단 조정
            let diseaseSpecificFoods = {
                recommendedFoods: [],
                restrictedFoods: []
            };

            if (this.healthProfile.chronicDiseases.includes('hypertension')) {
                diseaseSpecificFoods.recommendedFoods.push(
                    { name: '저염식품', reason: '나트륨 섭취 감소' },
                    { name: '칼륨이 풍부한 식품', reason: '혈압 조절에 도움' }
                );
                diseaseSpecificFoods.restrictedFoods.push(
                    { name: '고염식품', reason: '나트륨 함량이 높음' },
                    { name: '가공식품', reason: '숨겨진 나트륨 함량이 높음' }
                );
            }

            if (this.healthProfile.chronicDiseases.includes('diabetes')) {
                diseaseSpecificFoods.recommendedFoods.push(
                    { name: '저GI 식품', reason: '혈당 조절에 도움' },
                    { name: '섬유질이 풍부한 식품', reason: '포만감 유지와 혈당 안정' }
                );
                diseaseSpecificFoods.restrictedFoods.push(
                    { name: '고당분 식품', reason: '혈당 급상승 위험' },
                    { name: '정제된 탄수화물', reason: '혈당 영향이 큼' }
                );
            }

            // 알레르기에 따른 추가 제한 식품
            let allergyRestrictedFoods = [];

            if (this.healthProfile.allergies.includes('eggs')) {
                allergyRestrictedFoods.push({ name: '계란 및 계란 함유 식품', reason: '알레르기 유발' });
            }

            if (this.healthProfile.allergies.includes('milk')) {
                allergyRestrictedFoods.push({ name: '우유 및 유제품', reason: '알레르기 유발' });
            }

            // 기본 식단
            this.dietPlans = {
                dailyMeals: [
                    {
                        type: '아침',
                        foods: [
                            { name: '현미밥', description: '1/3공기' },
                            { name: '된장국', description: '1그릇' },
                            { name: '두부조림', description: '1접시' },
                            { name: '시금치 나물', description: '1접시' },
                            { name: '김구이', description: '1장' }
                        ]
                    },
                    {
                        type: '점심',
                        foods: [
                            { name: '잡곡밥', description: '2/3공기' },
                            { name: '콩나물국', description: '1그릇' },
                            { name: '닭가슴살 구이', description: '100g' },
                            { name: '브로콜리 볶음', description: '1접시' },
                            { name: '배추김치', description: '적당량' }
                        ]
                    },
                    {
                        type: '저녁',
                        foods: [
                            { name: '현미밥', description: '1/2공기' },
                            { name: '미역국', description: '1그릇' },
                            { name: '생선구이', description: '1토막' },
                            { name: '다양한 나물', description: '1접시' },
                            { name: '배추김치', description: '적당량' }
                        ]
                    }
                ],
                recommendedFoods: [
                    { name: '신선한 채소와 과일', reason: '비타민과 미네랄 함량이 높음' },
                    { name: '통곡물', reason: '소화가 천천히 되어 혈당 안정에 도움' },
                    { name: '저지방 단백질', reason: '근육 유지와 포만감' },
                    { name: '견과류', reason: '건강한 지방과 단백질 함유' },
                    ...diseaseSpecificFoods.recommendedFoods
                ],
                restrictedFoods: [
                    { name: '과도한 소금', reason: '혈압 상승 위험' },
                    { name: '가공육', reason: '나트륨과 불포화지방 함량 높음' },
                    { name: '과도한 알코올', reason: '혈압과 혈당에 부정적 영향' },
                    { name: '과도한 카페인', reason: '혈압 상승 가능성' },
                    ...diseaseSpecificFoods.restrictedFoods,
                    ...allergyRestrictedFoods
                ]
            };

            // BMI에 따른 조정
            const bmi = this.calculateBMI();
            if (bmi > 25) {
                // 비만인 경우 칼로리 감소
                this.dietPlans.dailyMeals[0].foods[0].description = '1/4공기';
                this.dietPlans.dailyMeals[1].foods[0].description = '1/2공기';
                this.dietPlans.dailyMeals[2].foods[0].description = '1/3공기';

                this.dietPlans.recommendedFoods.push(
                    { name: '저칼로리 식품', reason: '체중 관리에 도움' }
                );
                this.dietPlans.restrictedFoods.push(
                    { name: '고칼로리 식품', reason: '체중 증가 위험' }
                );
            } else if (bmi < 18.5) {
                // 저체중인 경우 칼로리 증가
                this.dietPlans.dailyMeals[0].foods[0].description = '2/3공기';
                this.dietPlans.dailyMeals[1].foods[0].description = '1공기';
                this.dietPlans.dailyMeals[2].foods[0].description = '2/3공기';

                this.dietPlans.recommendedFoods.push(
                    { name: '건강한 고칼로리 식품', reason: '체중 증가에 도움' }
                );
            }
        }
    }
}
</script>

<style scoped>
.page-header {
    background-image: linear-gradient(to right, var(--color-accent, #009966), #007755);
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
    border-color: var(--color-accent, #009966);
    outline: none;
}
</style>