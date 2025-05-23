<template>
    <div class="diet-recommendation">
        <!-- 페이지 헤더 -->
        <div class="page-header bg-accent text-white py-12 px-4">
            <div class="container mx-auto">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">스마트 맞춤 식단</h1>
                <p class="text-xl max-w-3xl">
                    공공데이터 기반의 정확한 영양 정보와 개인 건강 상태를 고려한
                    과학적인 맞춤형 식단을 추천해 드립니다.
                </p>
            </div>
        </div>

        <!-- 건강 정보 입력 섹션 -->
        <div v-if="!healthProfileCompleted" class="health-profile-section py-12 px-4 bg-light">
            <div class="container mx-auto max-w-2xl">
                <div class="bg-white rounded-xl shadow-md p-8">
                    <h2 class="text-2xl font-bold mb-6">건강 정보 입력</h2>
                    <p class="text-lg mb-6">
                        과학적인 맞춤 식단 추천을 위해 상세한 건강 정보를 입력해주세요.
                        <span class="text-sm text-gray-600 block mt-2">
                            * 입력하신 정보는 안전하게 보호되며 식단 추천 목적으로만 사용됩니다.
                        </span>
                    </p>

                    <form @submit.prevent="saveHealthProfile" class="space-y-6">
                        <!-- 기본 신체 정보 -->
                        <div class="form-section">
                            <h3 class="text-xl font-semibold mb-4 text-accent">기본 신체 정보</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="form-group">
                                    <label for="height" class="block text-lg mb-2">키 (cm) <span
                                            class="text-red-500">*</span></label>
                                    <input type="number" id="height" v-model="healthProfile.height" class="input-field"
                                        placeholder="예: 165" min="100" max="220" step="0.1" required>
                                </div>

                                <div class="form-group">
                                    <label for="weight" class="block text-lg mb-2">몸무게 (kg) <span
                                            class="text-red-500">*</span></label>
                                    <input type="number" id="weight" v-model="healthProfile.weight" class="input-field"
                                        placeholder="예: 60" min="30" max="200" step="0.1" required>
                                </div>

                                <div class="form-group">
                                    <label class="block text-lg mb-2">성별 <span class="text-red-500">*</span></label>
                                    <div class="flex space-x-4">
                                        <label class="flex items-center">
                                            <input type="radio" v-model="healthProfile.gender" value="male"
                                                class="h-5 w-5 text-accent" required>
                                            <span class="ml-2">남성</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" v-model="healthProfile.gender" value="female"
                                                class="h-5 w-5 text-accent" required>
                                            <span class="ml-2">여성</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="age" class="block text-lg mb-2">나이 <span
                                            class="text-red-500">*</span></label>
                                    <input type="number" id="age" v-model="healthProfile.age" class="input-field"
                                        placeholder="예: 65" min="1" max="120" required>
                                </div>
                            </div>
                        </div>

                        <!-- 건강 상태 정보 -->
                        <div class="form-section">
                            <h3 class="text-xl font-semibold mb-4 text-accent">건강 상태</h3>

                            <div class="form-group mb-6">
                                <label class="block text-lg mb-2">만성 질환 (해당되는 항목 모두 선택)</label>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.chronicDiseases"
                                            value="hypertension" class="h-5 w-5 text-accent">
                                        <span class="ml-2">고혈압</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.chronicDiseases" value="diabetes"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">당뇨병</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.chronicDiseases"
                                            value="hyperlipidemia" class="h-5 w-5 text-accent">
                                        <span class="ml-2">고지혈증</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.chronicDiseases"
                                            value="heartDisease" class="h-5 w-5 text-accent">
                                        <span class="ml-2">심장질환</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.chronicDiseases"
                                            value="kidneyDisease" class="h-5 w-5 text-accent">
                                        <span class="ml-2">신장질환</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.chronicDiseases"
                                            value="osteoporosis" class="h-5 w-5 text-accent">
                                        <span class="ml-2">골다공증</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.chronicDiseases" value="arthritis"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">관절염</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.chronicDiseases" value="none"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">해당 없음</span>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group mb-6">
                                <label class="block text-lg mb-2">식품 알레르기 (있는 경우 선택)</label>
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
                                        <input type="checkbox" v-model="healthProfile.allergies" value="soy"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">콩</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.allergies" value="none"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">해당 없음</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- 라이프스타일 정보 -->
                        <div class="form-section">
                            <h3 class="text-xl font-semibold mb-4 text-accent">라이프스타일</h3>

                            <div class="form-group mb-6">
                                <label class="block text-lg mb-2">활동량</label>
                                <div class="space-y-3">
                                    <label class="flex items-start">
                                        <input type="radio" v-model="healthProfile.activityLevel" value="sedentary"
                                            class="h-5 w-5 text-accent mt-1">
                                        <div class="ml-3">
                                            <span class="font-medium">낮음 (좌식 생활)</span>
                                            <p class="text-sm text-gray-600">거의 운동하지 않음, 책상에 앉아서 일하는 시간이 많음</p>
                                        </div>
                                    </label>
                                    <label class="flex items-start">
                                        <input type="radio" v-model="healthProfile.activityLevel" value="light"
                                            class="h-5 w-5 text-accent mt-1">
                                        <div class="ml-3">
                                            <span class="font-medium">약간 활동적</span>
                                            <p class="text-sm text-gray-600">주 1-3회 가벼운 운동 (산책, 가벼운 체조 등)</p>
                                        </div>
                                    </label>
                                    <label class="flex items-start">
                                        <input type="radio" v-model="healthProfile.activityLevel" value="moderate"
                                            class="h-5 w-5 text-accent mt-1">
                                        <div class="ml-3">
                                            <span class="font-medium">보통 활동적</span>
                                            <p class="text-sm text-gray-600">주 3-5회 중간 강도 운동 (빠른 걷기, 수영 등)</p>
                                        </div>
                                    </label>
                                    <label class="flex items-start">
                                        <input type="radio" v-model="healthProfile.activityLevel" value="active"
                                            class="h-5 w-5 text-accent mt-1">
                                        <div class="ml-3">
                                            <span class="font-medium">매우 활동적</span>
                                            <p class="text-sm text-gray-600">주 6-7회 고강도 운동 또는 육체적으로 힘든 일</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group mb-6">
                                <label class="block text-lg mb-2">식단 목표</label>
                                <div class="space-y-2">
                                    <label class="flex items-center">
                                        <input type="radio" v-model="healthProfile.dietGoal" value="maintain"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">현재 체중 유지</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="radio" v-model="healthProfile.dietGoal" value="weightLoss"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">체중 감량</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="radio" v-model="healthProfile.dietGoal" value="weightGain"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">체중 증가</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="radio" v-model="healthProfile.dietGoal" value="healthImprovement"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">건강 개선</span>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="block text-lg mb-2">식사 패턴</label>
                                <div class="space-y-2">
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.mealPreferences"
                                            value="regularMeals" class="h-5 w-5 text-accent">
                                        <span class="ml-2">규칙적인 식사 시간 선호</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.mealPreferences"
                                            value="smallPortions" class="h-5 w-5 text-accent">
                                        <span class="ml-2">소량씩 자주 먹기</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.mealPreferences" value="lowSodium"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">저염식 선호</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="healthProfile.mealPreferences" value="softFoods"
                                            class="h-5 w-5 text-accent">
                                        <span class="ml-2">부드러운 음식 선호</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit"
                            class="w-full py-4 bg-accent text-white rounded-lg text-lg font-bold hover:bg-accent-dark transition-colors"
                            :disabled="loading">
                            <span v-if="loading" class="flex items-center justify-center">
                                <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" fill="none"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                분석 중...
                            </span>
                            <span v-else>🔬 과학적 식단 분석 시작하기</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- 맞춤 식단 추천 섹션 -->
        <div v-else class="diet-recommendations-section py-12 px-4">
            <div class="container mx-auto">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h2 class="text-2xl font-bold mb-2">🍽️ 맞춤 식단 추천</h2>
                        <p class="text-gray-600">국민건강영양조사 데이터 기반 과학적 추천</p>
                    </div>
                    <button @click="healthProfileCompleted = false"
                        class="inline-flex items-center px-4 py-2 text-accent border border-accent rounded-lg hover:bg-accent hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        건강 정보 수정
                    </button>
                </div>

                <!-- 건강 상태 대시보드 -->
                <div class="health-dashboard grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="stat-card bg-white rounded-xl shadow-md p-6 text-center">
                        <div class="text-3xl mb-2">⚖️</div>
                        <p class="text-gray-600 mb-1">BMI 지수</p>
                        <p class="text-2xl font-bold" :class="getBMIColorClass()">{{ calculateBMI() }}</p>
                        <p class="text-sm text-gray-500">({{ getBMIStatus() }})</p>
                    </div>

                    <div class="stat-card bg-white rounded-xl shadow-md p-6 text-center">
                        <div class="text-3xl mb-2">🔥</div>
                        <p class="text-gray-600 mb-1">일일 권장 칼로리</p>
                        <p class="text-2xl font-bold text-accent">{{ calculateCalories() }}</p>
                        <p class="text-sm text-gray-500">kcal</p>
                    </div>

                    <div class="stat-card bg-white rounded-xl shadow-md p-6 text-center">
                        <div class="text-3xl mb-2">💧</div>
                        <p class="text-gray-600 mb-1">일일 수분 섭취</p>
                        <p class="text-2xl font-bold text-blue-600">{{ calculateWaterIntake() }}</p>
                        <p class="text-sm text-gray-500">mL</p>
                    </div>

                    <div class="stat-card bg-white rounded-xl shadow-md p-6 text-center">
                        <div class="text-3xl mb-2">🏃‍♂️</div>
                        <p class="text-gray-600 mb-1">활동 수준</p>
                        <p class="text-lg font-bold text-purple-600">{{ getActivityLevelText() }}</p>
                        <p class="text-sm text-gray-500">{{ getActivityMultiplier() }}배</p>
                    </div>
                </div>

                <!-- 주의사항 및 건강 팁 -->
                <div v-if="getHealthWarnings().length > 0"
                    class="health-warnings bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                    <h3 class="text-lg font-bold text-yellow-800 mb-3">⚠️ 주의사항</h3>
                    <ul class="space-y-2">
                        <li v-for="(warning, index) in getHealthWarnings()" :key="`warning-${index}`"
                            class="flex items-start text-yellow-700">
                            <span class="text-yellow-500 mr-2">•</span>
                            {{ warning }}
                        </li>
                    </ul>
                </div>

                <!-- 오늘의 추천 식단 -->
                <div class="todays-meal mb-8">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold">📅 오늘의 추천 식단</h3>
                        <div class="flex space-x-2">
                            <button @click="generateNewMealPlan"
                                class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors">
                                🔄 새 식단 생성
                            </button>
                            <button @click="saveFavoriteMeal"
                                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                ⭐ 즐겨찾기
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div v-for="(meal, index) in dietPlans.dailyMeals" :key="`meal-${index}`"
                            class="meal-card bg-white rounded-xl shadow-md overflow-hidden">
                            <div class="meal-header p-4" :class="getMealHeaderClass(index)">
                                <h4 class="text-lg font-bold text-white flex items-center">
                                    <span class="text-2xl mr-2">{{ getMealIcon(meal.type) }}</span>
                                    {{ meal.type }}
                                </h4>
                                <p class="text-white/80 text-sm">{{ meal.calories }} kcal</p>
                            </div>
                            <div class="meal-content p-6">
                                <div v-for="(food, foodIndex) in meal.foods" :key="`food-${foodIndex}`"
                                    class="food-item mb-4 last:mb-0 p-3 bg-gray-50 rounded-lg">
                                    <div class="flex justify-between items-start mb-2">
                                        <p class="font-medium text-gray-800">{{ food.name }}</p>
                                        <span class="text-xs text-gray-500 bg-white px-2 py-1 rounded">{{ food.portion
                                            }}</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-2">{{ food.description }}</p>
                                    <div class="nutrition-info grid grid-cols-3 gap-2 text-xs">
                                        <span class="text-gray-500">칼로리: <strong>{{ food.calories }}kcal</strong></span>
                                        <span class="text-gray-500">단백질: <strong>{{ food.protein }}g</strong></span>
                                        <span class="text-gray-500">나트륨: <strong>{{ food.sodium }}mg</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 영양 성분 분석 -->
                <div class="nutrition-analysis mb-8">
                    <h3 class="text-xl font-bold mb-6">📊 일일 영양 성분 분석</h3>
                    <div class="bg-white rounded-xl shadow-md p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div v-for="(nutrient, index) in nutritionAnalysis" :key="`nutrient-${index}`"
                                class="nutrition-item text-center">
                                <div class="w-20 h-20 mx-auto mb-3 relative">
                                    <svg class="w-20 h-20 transform -rotate-90">
                                        <circle cx="40" cy="40" r="30" stroke="#e5e7eb" stroke-width="8"
                                            fill="transparent"></circle>
                                        <circle cx="40" cy="40" r="30" :stroke="nutrient.color" stroke-width="8"
                                            fill="transparent" :stroke-dasharray="188"
                                            :stroke-dashoffset="188 - (188 * nutrient.percentage / 100)"></circle>
                                    </svg>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <span class="text-sm font-bold">{{ nutrient.percentage }}%</span>
                                    </div>
                                </div>
                                <p class="font-medium">{{ nutrient.name }}</p>
                                <p class="text-sm text-gray-600">{{ nutrient.current }} / {{ nutrient.target }}{{
                                    nutrient.unit }}</p>
                                <p class="text-xs" :class="getNutrientStatusClass(nutrient.percentage)">
                                    {{ getNutrientStatus(nutrient.percentage) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 주간 식단 미리보기 -->
                <div class="weekly-preview mb-8">
                    <h3 class="text-xl font-bold mb-6">📅 이번 주 식단 미리보기</h3>
                    <div class="bg-white rounded-xl shadow-md p-6">
                        <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
                            <div v-for="(day, index) in weeklyMeals" :key="`day-${index}`"
                                class="day-preview text-center p-4 rounded-lg"
                                :class="index === 0 ? 'bg-accent text-white' : 'bg-gray-50'">
                                <p class="font-bold mb-2">{{ day.dayName }}</p>
                                <div class="space-y-1 text-sm">
                                    <p>🌅 {{ day.breakfast }}</p>
                                    <p>☀️ {{ day.lunch }}</p>
                                    <p>🌆 {{ day.dinner }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 권장 및 제한 식품 -->
                <div class="food-recommendations grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="recommended-foods bg-white rounded-xl shadow-md p-6">
                        <h3 class="text-xl font-bold mb-4 text-green-600 flex items-center">
                            <span class="text-2xl mr-2">✅</span>
                            권장 식품
                        </h3>
                        <div class="space-y-4">
                            <div v-for="(category, index) in dietPlans.recommendedFoods" :key="`rec-cat-${index}`">
                                <h4 class="font-semibold text-gray-800 mb-2">{{ category.category }}</h4>
                                <div class="grid grid-cols-2 gap-2">
                                    <div v-for="(food, foodIndex) in category.foods" :key="`rec-food-${foodIndex}`"
                                        class="flex items-center p-2 bg-green-50 rounded-lg">
                                        <span class="text-green-500 mr-2">•</span>
                                        <div>
                                            <p class="font-medium text-sm">{{ food.name }}</p>
                                            <p class="text-xs text-gray-600">{{ food.reason }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="restricted-foods bg-white rounded-xl shadow-md p-6">
                        <h3 class="text-xl font-bold mb-4 text-red-600 flex items-center">
                            <span class="text-2xl mr-2">❌</span>
                            제한 식품
                        </h3>
                        <div class="space-y-4">
                            <div v-for="(category, index) in dietPlans.restrictedFoods" :key="`rest-cat-${index}`">
                                <h4 class="font-semibold text-gray-800 mb-2">{{ category.category }}</h4>
                                <div class="grid grid-cols-1 gap-2">
                                    <div v-for="(food, foodIndex) in category.foods" :key="`rest-food-${foodIndex}`"
                                        class="flex items-center p-2 bg-red-50 rounded-lg">
                                        <span class="text-red-500 mr-2">×</span>
                                        <div>
                                            <p class="font-medium text-sm">{{ food.name }}</p>
                                            <p class="text-xs text-gray-600">{{ food.reason }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 건강 팁 및 추가 정보 -->
                <div class="health-tips mt-8">
                    <h3 class="text-xl font-bold mb-6">💡 맞춤 건강 팁</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-for="(tip, index) in healthTips" :key="`tip-${index}`"
                            class="tip-card bg-white rounded-xl shadow-md p-6">
                            <div class="flex items-start">
                                <span class="text-2xl mr-3">{{ tip.icon }}</span>
                                <div>
                                    <h4 class="font-bold text-lg mb-2">{{ tip.title }}</h4>
                                    <p class="text-gray-600">{{ tip.content }}</p>
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
import axios from 'axios'

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
                activityLevel: 'moderate',
                dietGoal: 'maintain',
                mealPreferences: []
            },
            dietPlans: {
                dailyMeals: [],
                recommendedFoods: [],
                restrictedFoods: []
            },
            nutritionAnalysis: [],
            weeklyMeals: [],
            healthTips: [],
            // 공공API 데이터 캐시
            foodNutritionData: {},
            nationalHealthData: {}
        }
    },
    created() {
        // 저장된 건강 프로필 정보가 있는지 확인
        const savedProfile = localStorage.getItem('healthProfile');
        if (savedProfile) {
            this.healthProfile = JSON.parse(savedProfile);
            this.healthProfileCompleted = true;
            this.loadNutritionData().then(() => {
                this.generateComprehensiveDietPlan();
            });
        }

        // 공공데이터 미리 로드
        this.loadPublicData();
    },
    methods: {
        async loadPublicData() {
            try {
                // 식품영양성분 DB API 호출 (실제 구현 시 API 키 필요)
                // await this.loadFoodNutritionAPI();

                // 국민건강영양조사 데이터 로드 (실제 구현 시 파일 또는 API)
                await this.loadNationalHealthData();

            } catch (error) {
                console.error('공공데이터 로드 실패:', error);
                // 백업 데이터 사용
                this.loadBackupNutritionData();
            }
        },

        async loadFoodNutritionAPI() {
            // 식품의약품안전처 식품영양성분 DB API
            const API_KEY = process.env.VUE_APP_FOOD_API_KEY;
            const baseURL = 'http://openapi.foodsafetykorea.go.kr/api';

            try {
                const response = await axios.get(`${baseURL}/${API_KEY}/I2790/json/1/100`);
                this.foodNutritionData = response.data;
            } catch (error) {
                console.error('식품영양성분 API 호출 실패:', error);
            }
        },

        async loadNationalHealthData() {
            // 국민건강영양조사 데이터 시뮬레이션
            this.nationalHealthData = {
                averageCaloriesByAge: {
                    '60-69': { male: 2000, female: 1600 },
                    '70-79': { male: 1800, female: 1400 },
                    '80+': { male: 1600, female: 1200 }
                },
                chronicDiseasePrevalence: {
                    hypertension: 0.65,
                    diabetes: 0.23,
                    hyperlipidemia: 0.34
                },
                recommendedNutrients: {
                    protein: { min: 1.0, optimal: 1.2 }, // g/kg 체중
                    calcium: 800, // mg
                    vitaminD: 20, // μg
                    fiber: 25 // g
                }
            };
        },

        loadBackupNutritionData() {
            // 백업용 영양성분 데이터
            this.foodNutritionData = {
                rice: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, sodium: 1 },
                chicken: { calories: 165, protein: 31, carbs: 0, fat: 3.6, sodium: 74 },
                vegetables: { calories: 25, protein: 2, carbs: 5, fat: 0.2, sodium: 10 },
                fish: { calories: 206, protein: 22, carbs: 0, fat: 12, sodium: 59 },
                tofu: { calories: 76, protein: 8, carbs: 1.9, fat: 4.8, sodium: 7 }
            };
        },

        async loadNutritionData() {
            await this.loadPublicData();
        },

        saveHealthProfile() {
            this.loading = true;

            // 실제로는 API 호출
            setTimeout(async () => {
                // 로컬 스토리지에 건강 정보 저장
                localStorage.setItem('healthProfile', JSON.stringify(this.healthProfile));

                // 공공데이터 기반 맞춤 식단 생성
                await this.generateComprehensiveDietPlan();

                this.healthProfileCompleted = true;
                this.loading = false;

                // 성공 메시지
                this.$toast?.success('건강 정보가 저장되었습니다!');
            }, 2000);
        },

        async generateComprehensiveDietPlan() {
            // 1. 기초대사율 및 칼로리 계산
            const bmr = this.calculateBMR();
            const dailyCalories = this.calculateCalories();

            // 2. 질환별 영양 제한사항 적용
            const nutritionConstraints = this.getDiseaseNutritionConstraints();

            // 3. 알레르기 제외 식품 목록
            const excludedFoods = this.getAllergyExcludedFoods();

            // 4. 공공데이터 기반 식단 생성
            this.dietPlans = await this.generateScientificMealPlan(
                dailyCalories,
                nutritionConstraints,
                excludedFoods
            );

            // 5. 영양 성분 분석
            this.nutritionAnalysis = this.analyzeNutrition();

            // 6. 주간 식단 미리보기
            this.weeklyMeals = this.generateWeeklyPreview();

            // 7. 맞춤 건강 팁
            this.healthTips = this.generateHealthTips();
        },

        calculateBMR() {
            const weight = this.healthProfile.weight;
            const height = this.healthProfile.height;
            const age = this.healthProfile.age;
            const gender = this.healthProfile.gender;

            // Mifflin-St Jeor 공식 (더 정확한 기초대사율 계산)
            if (gender === 'male') {
                return (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                return (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
        },

        calculateCalories() {
            const bmr = this.calculateBMR();
            const activityFactors = {
                sedentary: 1.2,
                light: 1.375,
                moderate: 1.55,
                active: 1.725
            };

            let calories = bmr * activityFactors[this.healthProfile.activityLevel];

            // 목표에 따른 칼로리 조정
            switch (this.healthProfile.dietGoal) {
                case 'weightLoss':
                    calories -= 500; // 주당 0.5kg 감량
                    break;
                case 'weightGain':
                    calories += 300; // 주당 0.3kg 증가
                    break;
            }

            return Math.round(calories);
        },

        calculateBMI() {
            const height = this.healthProfile.height / 100;
            const weight = this.healthProfile.weight;

            if (!height || !weight) return 0;

            const bmi = weight / (height * height);
            return bmi.toFixed(1);
        },

        getBMIStatus() {
            const bmi = parseFloat(this.calculateBMI());

            if (bmi < 18.5) return '저체중';
            if (bmi < 23) return '정상';
            if (bmi < 25) return '과체중';
            if (bmi < 30) return '비만';
            return '고도비만';
        },

        getBMIColorClass() {
            const bmi = parseFloat(this.calculateBMI());

            if (bmi < 18.5) return 'text-blue-600';
            if (bmi < 23) return 'text-green-600';
            if (bmi < 25) return 'text-yellow-600';
            if (bmi < 30) return 'text-orange-600';
            return 'text-red-600';
        },

        calculateWaterIntake() {
            // 체중 기반 수분 섭취량 계산 (ml)
            const baseWater = this.healthProfile.weight * 35;
            const activityAdjustment = this.healthProfile.activityLevel === 'active' ? 500 :
                this.healthProfile.activityLevel === 'moderate' ? 300 : 0;

            return Math.round(baseWater + activityAdjustment);
        },

        getActivityLevelText() {
            const levels = {
                sedentary: '낮음',
                light: '가벼움',
                moderate: '보통',
                active: '높음'
            };
            return levels[this.healthProfile.activityLevel] || '보통';
        },

        getActivityMultiplier() {
            const multipliers = {
                sedentary: 1.2,
                light: 1.4,
                moderate: 1.6,
                active: 1.8
            };
            return multipliers[this.healthProfile.activityLevel] || 1.6;
        },

        getDiseaseNutritionConstraints() {
            const constraints = {
                sodium: 2300, // mg 기본값
                sugar: 25, // g 기본값
                saturatedFat: 20, // g 기본값
                cholesterol: 300 // mg 기본값
            };

            // 질환별 제한사항 적용
            if (this.healthProfile.chronicDiseases.includes('hypertension')) {
                constraints.sodium = 1500; // 고혈압: 나트륨 제한
            }

            if (this.healthProfile.chronicDiseases.includes('diabetes')) {
                constraints.sugar = 15; // 당뇨: 당분 제한
            }

            if (this.healthProfile.chronicDiseases.includes('hyperlipidemia')) {
                constraints.saturatedFat = 15; // 고지혈증: 포화지방 제한
                constraints.cholesterol = 200;
            }

            return constraints;
        },

        getAllergyExcludedFoods() {
            const allergyFoodMap = {
                eggs: ['계란', '달걀', '마요네즈', '케이크'],
                milk: ['우유', '치즈', '요구르트', '버터', '크림'],
                wheat: ['밀가루', '빵', '국수', '파스타', '만두피'],
                nuts: ['땅콩', '아몬드', '호두', '잣', '견과류'],
                seafood: ['생선', '새우', '게', '조개', '오징어'],
                soy: ['두부', '콩나물', '된장', '간장', '두유']
            };

            let excludedFoods = [];
            this.healthProfile.allergies.forEach(allergy => {
                if (allergyFoodMap[allergy]) {
                    excludedFoods = [...excludedFoods, ...allergyFoodMap[allergy]];
                }
            });

            return excludedFoods;
        },

        async generateScientificMealPlan(dailyCalories, constraints, excludedFoods) {
            // 칼로리 배분 (아침 25%, 점심 35%, 저녁 30%, 간식 10%)
            const calorieDistribution = {
                breakfast: Math.round(dailyCalories * 0.25),
                lunch: Math.round(dailyCalories * 0.35),
                dinner: Math.round(dailyCalories * 0.30),
                snack: Math.round(dailyCalories * 0.10)
            };

            const meals = [
                {
                    type: '아침',
                    calories: calorieDistribution.breakfast,
                    foods: await this.generateMealFoods('breakfast', calorieDistribution.breakfast, excludedFoods)
                },
                {
                    type: '점심',
                    calories: calorieDistribution.lunch,
                    foods: await this.generateMealFoods('lunch', calorieDistribution.lunch, excludedFoods)
                },
                {
                    type: '저녁',
                    calories: calorieDistribution.dinner,
                    foods: await this.generateMealFoods('dinner', calorieDistribution.dinner, excludedFoods)
                },
                {
                    type: '간식',
                    calories: calorieDistribution.snack,
                    foods: await this.generateMealFoods('snack', calorieDistribution.snack, excludedFoods)
                }
            ];

            // 권장 및 제한 식품 카테고리별 생성
            const recommendedFoods = this.generateRecommendedFoods();
            const restrictedFoods = this.generateRestrictedFoods();

            return {
                dailyMeals: meals,
                recommendedFoods,
                restrictedFoods
            };
        },

        async generateMealFoods(mealType, targetCalories, excludedFoods) {
            // 식사 유형별 기본 구성
            const mealTemplates = {
                breakfast: [
                    { name: '현미밥', portion: '1/2공기', calories: 100, protein: 2, sodium: 0 },
                    { name: '된장국', portion: '1그릇', calories: 35, protein: 2, sodium: 400 },
                    { name: '계란찜', portion: '1접시', calories: 80, protein: 6, sodium: 150 },
                    { name: '김치', portion: '적당량', calories: 15, protein: 1, sodium: 300 }
                ],
                lunch: [
                    { name: '현미밥', portion: '1공기', calories: 200, protein: 4, sodium: 0 },
                    { name: '미역국', portion: '1그릇', calories: 30, protein: 1, sodium: 350 },
                    { name: '닭가슴살구이', portion: '100g', calories: 165, protein: 31, sodium: 74 },
                    { name: '브로콜리나물', portion: '1접시', calories: 25, protein: 3, sodium: 200 },
                    { name: '깍두기', portion: '적당량', calories: 20, protein: 1, sodium: 250 }
                ],
                dinner: [
                    { name: '현미밥', portion: '2/3공기', calories: 130, protein: 3, sodium: 0 },
                    { name: '콩나물국', portion: '1그릇', calories: 25, protein: 2, sodium: 300 },
                    { name: '고등어구이', portion: '1토막', calories: 180, protein: 25, sodium: 80 },
                    { name: '시금치나물', portion: '1접시', calories: 20, protein: 2, sodium: 180 },
                    { name: '배추김치', portion: '적당량', calories: 15, protein: 1, sodium: 280 }
                ],
                snack: [
                    { name: '사과', portion: '1개', calories: 80, protein: 0, sodium: 0 },
                    { name: '견과류', portion: '1줌', calories: 60, protein: 2, sodium: 1 }
                ]
            };

            let foods = mealTemplates[mealType] || [];

            // 알레르기 식품 제외
            foods = foods.filter(food =>
                !excludedFoods.some(excluded =>
                    food.name.includes(excluded)
                )
            );

            // 질환별 대체 식품 적용
            foods = this.applyDiseaseSpecificFoods(foods, mealType);

            // 각 음식에 설명 추가
            foods = foods.map(food => ({
                ...food,
                description: this.getFoodDescription(food.name)
            }));

            return foods;
        },

        applyDiseaseSpecificFoods(foods, mealType) {
            // 고혈압 환자용 저염 대체
            if (this.healthProfile.chronicDiseases.includes('hypertension')) {
                foods = foods.map(food => {
                    if (food.sodium > 200) {
                        return {
                            ...food,
                            name: food.name.replace('김치', '무염김치').replace('된장국', '저염된장국'),
                            sodium: Math.round(food.sodium * 0.5)
                        };
                    }
                    return food;
                });
            }

            // 당뇨 환자용 저당 대체
            if (this.healthProfile.chronicDiseases.includes('diabetes')) {
                foods = foods.map(food => {
                    if (food.name.includes('밥')) {
                        return {
                            ...food,
                            name: '현미밥',
                            calories: Math.round(food.calories * 0.9)
                        };
                    }
                    return food;
                });
            }

            return foods;
        },

        getFoodDescription(foodName) {
            const descriptions = {
                '현미밥': '식이섬유가 풍부한 현미로 혈당 조절에 도움',
                '된장국': '발효식품으로 장 건강에 좋은 프로바이오틱스 함유',
                '계란찜': '완전단백질 공급원으로 근육 유지에 필수',
                '닭가슴살구이': '고단백 저지방 식품으로 체중 관리에 도움',
                '고등어구이': '오메가-3 풍부한 등푸른생선',
                '브로콜리나물': '비타민C와 칼슘이 풍부한 슈퍼푸드',
                '시금치나물': '철분과 엽산이 풍부한 녹황색 채소'
            };

            return descriptions[foodName] || '균형 잡힌 영양소 제공';
        },

        generateRecommendedFoods() {
            return [
                {
                    category: '곡류',
                    foods: [
                        { name: '현미', reason: '식이섬유와 비타민B 풍부' },
                        { name: '귀리', reason: '베타글루칸으로 콜레스테롤 감소' },
                        { name: '퀴노아', reason: '완전단백질 함유' }
                    ]
                },
                {
                    category: '단백질',
                    foods: [
                        { name: '생선', reason: '오메가-3 지방산 공급' },
                        { name: '두부', reason: '식물성 단백질과 이소플라본' },
                        { name: '계란', reason: '완전단백질과 레시틴' }
                    ]
                },
                {
                    category: '채소류',
                    foods: [
                        { name: '브로콜리', reason: '항산화물질과 비타민K 풍부' },
                        { name: '시금치', reason: '철분과 엽산 공급' },
                        { name: '당근', reason: '베타카로틴으로 눈 건강' }
                    ]
                },
                {
                    category: '과일류',
                    foods: [
                        { name: '블루베리', reason: '안토시아닌으로 뇌 건강' },
                        { name: '사과', reason: '펙틴으로 장 건강' },
                        { name: '아보카도', reason: '불포화지방산과 칼륨' }
                    ]
                }
            ];
        },

        generateRestrictedFoods() {
            const restrictions = [];

            // 기본 제한 식품
            restrictions.push({
                category: '가공식품',
                foods: [
                    { name: '인스턴트 식품', reason: '나트륨과 첨가물 과다' },
                    { name: '가공육류', reason: '질산염과 포화지방 높음' },
                    { name: '탄산음료', reason: '당분 과다와 빈 칼로리' }
                ]
            });

            // 질환별 제한 식품
            if (this.healthProfile.chronicDiseases.includes('hypertension')) {
                restrictions.push({
                    category: '고나트륨 식품',
                    foods: [
                        { name: '젓갈류', reason: '나트륨 함량 매우 높음' },
                        { name: '라면', reason: '1일 나트륨 권장량 초과' },
                        { name: '치킨', reason: '염분과 포화지방 높음' }
                    ]
                });
            }

            if (this.healthProfile.chronicDiseases.includes('diabetes')) {
                restrictions.push({
                    category: '고당분 식품',
                    foods: [
                        { name: '과자류', reason: '혈당 급상승 유발' },
                        { name: '단 음료', reason: '단순당 과다 함유' },
                        { name: '케이크', reason: '당분과 지방 동시 과다' }
                    ]
                });
            }

            return restrictions;
        },

        analyzeNutrition() {
            const targetCalories = this.calculateCalories();
            const currentCalories = this.dietPlans.dailyMeals.reduce((sum, meal) => sum + meal.calories, 0);

            return [
                {
                    name: '칼로리',
                    current: currentCalories,
                    target: targetCalories,
                    unit: 'kcal',
                    percentage: Math.round((currentCalories / targetCalories) * 100),
                    color: '#10b981'
                },
                {
                    name: '단백질',
                    current: Math.round(this.healthProfile.weight * 1.2),
                    target: Math.round(this.healthProfile.weight * 1.2),
                    unit: 'g',
                    percentage: 100,
                    color: '#3b82f6'
                },
                {
                    name: '나트륨',
                    current: 1800,
                    target: this.getDiseaseNutritionConstraints().sodium,
                    unit: 'mg',
                    percentage: Math.round((1800 / this.getDiseaseNutritionConstraints().sodium) * 100),
                    color: '#ef4444'
                },
                {
                    name: '식이섬유',
                    current: 22,
                    target: 25,
                    unit: 'g',
                    percentage: 88,
                    color: '#8b5cf6'
                }
            ];
        },

        getNutrientStatus(percentage) {
            if (percentage < 80) return '부족';
            if (percentage <= 120) return '적정';
            return '과다';
        },

        getNutrientStatusClass(percentage) {
            if (percentage < 80) return 'text-red-600';
            if (percentage <= 120) return 'text-green-600';
            return 'text-orange-600';
        },

        generateWeeklyPreview() {
            const days = ['오늘', '내일', '모레', '목요일', '금요일', '토요일', '일요일'];
            const breakfasts = ['현미밥+된장국', '오트밀+과일', '토스트+계란', '죽+반찬', '샐러드+견과류', '요구르트+그래놀라', '팬케이크+베리'];
            const lunches = ['정식+생선', '비빔밥', '국수+김치', '샐러드+닭가슴살', '덮밥+국', '샌드위치+수프', '파스타+샐러드'];
            const dinners = ['백반+구이', '찜+나물', '전골+밥', '구이+찌개', '조림+국', '볶음+밥', '찜+반찬'];

            return days.map((day, index) => ({
                dayName: day,
                breakfast: breakfasts[index],
                lunch: lunches[index],
                dinner: dinners[index]
            }));
        },

        generateHealthTips() {
            const tips = [
                {
                    icon: '💧',
                    title: '충분한 수분 섭취',
                    content: `하루 ${this.calculateWaterIntake()}mL의 물을 나누어 마시세요. 식사 30분 전후로 물을 마시면 소화에 도움이 됩니다.`
                },
                {
                    icon: '🚶‍♂️',
                    title: '규칙적인 운동',
                    content: '식후 30분 후 가벼운 산책을 하면 혈당 조절과 소화에 도움이 됩니다. 주 3회 이상 꾸준히 실천하세요.'
                },
                {
                    icon: '🍽️',
                    title: '천천히 씹어 먹기',
                    content: '한 입에 30번 이상 씹어 드세요. 포만감을 높이고 소화를 돕습니다.'
                },
                {
                    icon: '⏰',
                    title: '규칙적인 식사 시간',
                    content: '매일 같은 시간에 식사하면 생체리듬이 안정되고 혈당 관리에 도움이 됩니다.'
                }
            ];

            // 질환별 맞춤 팁 추가
            if (this.healthProfile.chronicDiseases.includes('hypertension')) {
                tips.push({
                    icon: '🧂',
                    title: '저염 식단 실천',
                    content: '하루 나트륨 섭취량을 1500mg 이하로 제한하세요. 조리 시 소금 대신 허브나 향신료를 활용하세요.'
                });
            }

            if (this.healthProfile.chronicDiseases.includes('diabetes')) {
                tips.push({
                    icon: '📊',
                    title: '혈당 모니터링',
                    content: '식사 후 2시간 혈당을 체크하세요. 140mg/dL 이하를 목표로 식단을 조절하세요.'
                });
            }

            if (this.healthProfile.chronicDiseases.includes('osteoporosis')) {
                tips.push({
                    icon: '🦴',
                    title: '칼슘 섭취 늘리기',
                    content: '유제품, 멸치, 녹황색 채소 등으로 하루 800mg 이상의 칼슘을 섭취하세요.'
                });
            }

            return tips.slice(0, 6); // 최대 6개까지만 표시
        },

        getHealthWarnings() {
            const warnings = [];

            const bmi = parseFloat(this.calculateBMI());
            if (bmi < 18.5) {
                warnings.push('저체중 상태입니다. 영양가 있는 음식 섭취를 늘려주세요.');
            } else if (bmi >= 25) {
                warnings.push('과체중 상태입니다. 칼로리 섭취를 줄이고 활동량을 늘려주세요.');
            }

            if (this.healthProfile.chronicDiseases.includes('hypertension')) {
                warnings.push('고혈압 관리를 위해 염분 섭취를 제한하고 정기적으로 혈압을 측정하세요.');
            }

            if (this.healthProfile.chronicDiseases.includes('diabetes')) {
                warnings.push('당뇨 관리를 위해 식사 시간을 규칙적으로 지키고 혈당을 모니터링하세요.');
            }

            if (this.healthProfile.chronicDiseases.includes('kidneyDisease')) {
                warnings.push('신장질환이 있으시므로 단백질과 인 섭취량을 조절해주세요.');
            }

            return warnings;
        },

        getMealIcon(mealType) {
            const icons = {
                '아침': '🌅',
                '점심': '☀️',
                '저녁': '🌆',
                '간식': '🍎'
            };
            return icons[mealType] || '🍽️';
        },

        getMealHeaderClass(index) {
            const classes = [
                'bg-orange-500',  // 아침
                'bg-yellow-500',  // 점심
                'bg-indigo-500',  // 저녁
                'bg-green-500'    // 간식
            ];
            return classes[index] || 'bg-accent';
        },

        async generateNewMealPlan() {
            this.loading = true;

            try {
                // 새로운 식단 생성
                await this.generateComprehensiveDietPlan();
                this.$toast?.success('새로운 식단이 생성되었습니다!');
            } catch (error) {
                console.error('식단 생성 실패:', error);
                this.$toast?.error('식단 생성에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },

        saveFavoriteMeal() {
            const favorites = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');
            const currentMeal = {
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                meals: this.dietPlans.dailyMeals,
                totalCalories: this.dietPlans.dailyMeals.reduce((sum, meal) => sum + meal.calories, 0)
            };

            favorites.push(currentMeal);
            localStorage.setItem('favoriteMeals', JSON.stringify(favorites));

            this.$toast?.success('즐겨찾기에 저장되었습니다!');
        },

        // API 호출 관련 메서드들
        async callFoodNutritionAPI(foodName) {
            // 실제 식품영양성분 DB API 호출
            const API_KEY = process.env.VUE_APP_FOOD_SAFETY_API_KEY;

            try {
                const response = await axios.get(`http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/I2790/json/1/10/DESC_KOR=${encodeURIComponent(foodName)}`);

                if (response.data && response.data.I2790 && response.data.I2790.row) {
                    return response.data.I2790.row[0];
                }
                return null;
            } catch (error) {
                console.error('식품영양성분 API 호출 실패:', error);
                return null;
            }
        },

        async getHealthStatistics() {
            // 국민건강영양조사 통계 데이터 활용
            try {
                const ageGroup = this.getAgeGroup();
                const gender = this.healthProfile.gender;

                // 연령대별 권장 영양소 섭취량 조회
                const recommendedNutrition = this.nationalHealthData.recommendedNutrients;

                return {
                    averageCalories: this.nationalHealthData.averageCaloriesByAge[ageGroup][gender],
                    recommendedProtein: recommendedNutrition.protein.optimal * this.healthProfile.weight,
                    recommendedCalcium: recommendedNutrition.calcium,
                    recommendedFiber: recommendedNutrition.fiber
                };
            } catch (error) {
                console.error('건강통계 조회 실패:', error);
                return null;
            }
        },

        getAgeGroup() {
            const age = this.healthProfile.age;
            if (age >= 80) return '80+';
            if (age >= 70) return '70-79';
            if (age >= 60) return '60-69';
            return '60-69'; // 기본값
        },

        // 추가 유틸리티 메서드들
        formatDate(date) {
            return new Date(date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        exportDietPlan() {
            const exportData = {
                date: new Date().toISOString(),
                userProfile: this.healthProfile,
                dietPlan: this.dietPlans,
                nutritionAnalysis: this.nutritionAnalysis,
                healthTips: this.healthTips
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `맞춤식단_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        },

        shareToKakao() {
            // 카카오톡 공유 기능 (실제 구현 시 카카오 SDK 필요)
            if (window.Kakao) {
                window.Kakao.Link.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: '내 맞춤 식단',
                        description: `오늘의 칼로리: ${this.calculateCalories()}kcal`,
                        imageUrl: 'https://example.com/diet-image.jpg',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href
                        }
                    }
                });
            }
        },

        // 접근성 관련 메서드
        announceForScreenReader(message) {
            // 스크린리더를 위한 음성 안내
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;

            document.body.appendChild(announcement);

            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    },

    // 컴포넌트 라이프사이클
    beforeUnmount() {
        // 메모리 정리
        this.foodNutritionData = null;
        this.nationalHealthData = null;
    },

    // 워처
    watch: {
        'healthProfile.chronicDiseases': {
            handler(newDiseases) {
                if (this.healthProfileCompleted) {
                    // 질환 정보 변경 시 식단 재생성
                    this.generateComprehensiveDietPlan();
                }
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.page-header {
    background-image: linear-gradient(135deg, var(--color-accent, #009966), #007755);
}

.input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    transition: all 0.2s ease;
    background-color: white;
}

.input-field:focus {
    border-color: var(--color-accent, #009966);
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 153, 102, 0.1);
}

.input-field:hover {
    border-color: #cbd5e0;
}

.form-section {
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    background-color: #fafafa;
    margin-bottom: 1.5rem;
}

.stat-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.meal-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.meal-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.food-item {
    transition: background-color 0.2s ease;
}

.food-item:hover {
    background-color: #e2e8f0;
}

.nutrition-item {
    transition: transform 0.2s ease;
}

.nutrition-item:hover {
    transform: scale(1.05);
}

.day-preview {
    transition: all 0.2s ease;
    cursor: pointer;
}

.day-preview:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tip-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tip-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
    .health-dashboard {
        grid-template-columns: repeat(2, 1fr);
    }

    .nutrition-analysis .grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .weekly-preview .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 640px) {
    .health-dashboard {
        grid-template-columns: 1fr;
    }

    .nutrition-analysis .grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .weekly-preview .grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .food-recommendations {
        grid-template-columns: 1fr;
    }
}

/* 접근성 개선 */
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

/* 다크모드 지원 (선택사항) */
@media (prefers-color-scheme: dark) {
    .form-section {
        background-color: #1f2937;
        border-color: #374151;
    }

    .input-field {
        background-color: #374151;
        border-color: #4b5563;
        color: white;
    }

    .stat-card,
    .meal-card,
    .tip-card {
        background-color: #1f2937;
        color: white;
    }
}

/* 인쇄 스타일 */
@media print {
    .page-header {
        background: #009966 !important;
        -webkit-print-color-adjust: exact;
    }

    .meal-card,
    .stat-card {
        box-shadow: none;
        border: 1px solid #ccc;
    }

    button {
        display: none;
    }
}

/* 애니메이션 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.diet-recommendations-section>* {
    animation: fadeInUp 0.6s ease forwards;
}

.diet-recommendations-section>*:nth-child(2) {
    animation-delay: 0.1s;
}

.diet-recommendations-section>*:nth-child(3) {
    animation-delay: 0.2s;
}

.diet-recommendations-section>*:nth-child(4) {
    animation-delay: 0.3s;
}

/* 로딩 상태 */
.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* 버튼 호버 효과 개선 */
button {
    transition: all 0.2s ease;
}

button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active:not(:disabled) {
    transform: translateY(0);
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* 폼 요소 스타일 개선 */
input[type="checkbox"],
input[type="radio"] {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: var(--color-accent, #009966);
}

/* 스크롤바 스타일링 */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>