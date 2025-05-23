<template>
    <div class="education-creator">
        <!-- 헤더 -->
        <header class="bg-white shadow-md px-6 py-4 fixed top-0 left-0 right-0 z-10">
            <div class="container mx-auto">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <router-link to="/education" class="text-gray-700 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </router-link>
                        <h1 class="text-xl font-bold">{{ isEditMode ? '교육 콘텐츠 수정' : '새 교육 콘텐츠 만들기' }}</h1>
                    </div>
                    <div class="flex items-center space-x-3">
                        <button @click="previewEducation"
                            class="px-4 py-2 border border-primary text-primary rounded-lg">
                            미리보기
                        </button>
                        <button @click="publishEducation" class="px-4 py-2 bg-primary text-white rounded-lg">
                            {{ isEditMode ? '수정완료' : '출시하기' }}
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- 메인 콘텐츠 -->
        <main class="pt-20 pb-24 px-6">
            <div class="container mx-auto">
                <!-- 탭 메뉴 -->
                <div class="mb-6 border-b border-gray-200">
                    <div class="flex">
                        <button v-for="(tab, idx) in tabs" :key="idx" @click="activeTab = tab.id" :class="[
                            'px-4 py-3 text-lg font-medium -mb-px',
                            activeTab === tab.id
                                ? 'text-primary border-b-2 border-primary font-bold'
                                : 'text-gray-500 hover:text-gray-700'
                        ]">
                            {{ tab.name }}
                        </button>
                    </div>
                </div>

                <!-- 탭 콘텐츠 -->
                <div class="tab-content">
                    <!-- 기본 정보 탭 -->
                    <div v-show="activeTab === 'basic'" class="space-y-6">
                        <!-- 기본 정보 폼 -->
                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <h2 class="text-xl font-bold mb-6">기본 정보</h2>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div class="form-group">
                                    <label for="title" class="block text-gray-700 font-medium mb-2">교육 제목 <span
                                            class="text-red-500">*</span></label>
                                    <input type="text" id="title" v-model="education.title"
                                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                                        placeholder="예: 스마트폰 기본 사용법">
                                </div>

                                <div class="form-group">
                                    <label for="category" class="block text-gray-700 font-medium mb-2">카테고리 <span
                                            class="text-red-500">*</span></label>
                                    <select id="category" v-model="education.categoryId"
                                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg">
                                        <option value="" disabled>카테고리 선택</option>
                                        <option value="basics">디지털 기초</option>
                                        <option value="smartphone">스마트폰 활용</option>
                                        <option value="messenger">메신저/SNS</option>
                                        <option value="internet">인터넷 활용</option>
                                        <option value="security">보안/개인정보</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="level" class="block text-gray-700 font-medium mb-2">난이도 <span
                                            class="text-red-500">*</span></label>
                                    <div class="flex items-center space-x-4">
                                        <label class="flex items-center cursor-pointer">
                                            <input type="radio" name="level" value="beginner" v-model="education.level"
                                                class="hidden">
                                            <span class="w-6 h-6 inline-block rounded-full border-2 mr-2"
                                                :class="education.level === 'beginner' ? 'border-primary bg-primary' : 'border-gray-300'"></span>
                                            <span>초급</span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="radio" name="level" value="intermediate"
                                                v-model="education.level" class="hidden">
                                            <span class="w-6 h-6 inline-block rounded-full border-2 mr-2"
                                                :class="education.level === 'intermediate' ? 'border-primary bg-primary' : 'border-gray-300'"></span>
                                            <span>중급</span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="radio" name="level" value="advanced" v-model="education.level"
                                                class="hidden">
                                            <span class="w-6 h-6 inline-block rounded-full border-2 mr-2"
                                                :class="education.level === 'advanced' ? 'border-primary bg-primary' : 'border-gray-300'"></span>
                                            <span>고급</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="duration" class="block text-gray-700 font-medium mb-2">예상 학습 시간 <span
                                            class="text-red-500">*</span></label>
                                    <div class="flex">
                                        <input type="number" id="duration-minutes" v-model="durationMinutes" min="1"
                                            max="180"
                                            class="w-24 px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg">
                                        <span
                                            class="flex items-center justify-center px-4 py-3 bg-gray-100 border-t border-r border-b border-gray-300 rounded-r-lg text-gray-700">
                                            분
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group mb-6">
                                <label for="description" class="block text-gray-700 font-medium mb-2">교육 소개 <span
                                        class="text-red-500">*</span></label>
                                <textarea id="description" v-model="education.description" rows="4"
                                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                                    placeholder="학습자가 이 교육을 통해 무엇을 배울 수 있는지 설명해주세요."></textarea>
                            </div>

                            <div class="form-group">
                                <label class="block text-gray-700 font-medium mb-2">썸네일 이미지 <span
                                        class="text-red-500">*</span></label>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="thumbnail-upload">
                                        <div class="thumbnail-preview border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden"
                                            :class="{ 'border-gray-300 bg-gray-50': !thumbnailPreview, 'border-primary': thumbnailPreview }"
                                            style="height: 200px;" @click="openFilePicker">
                                            <img v-if="thumbnailPreview" :src="thumbnailPreview" alt="썸네일 미리보기"
                                                class="w-full h-full object-cover">
                                            <div v-else class="text-center p-6">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="h-14 w-14 mx-auto text-gray-400 mb-2" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p class="text-gray-500">이미지를 업로드 하려면 클릭하세요</p>
                                                <p class="text-gray-400 text-sm mt-2">권장 사이즈: 800x450px</p>
                                            </div>
                                        </div>
                                        <input type="file" ref="thumbnailInput" class="hidden" accept="image/*"
                                            @change="handleThumbnailUpload">
                                    </div>

                                    <div class="thumbnail-tips">
                                        <h4 class="font-medium text-gray-700 mb-2">썸네일 제작 팁</h4>
                                        <ul class="text-gray-600 space-y-2 list-disc pl-5">
                                            <li>눈에 잘 띄고 교육 내용을 잘 표현하는 이미지를 선택하세요.</li>
                                            <li>너무 작은 텍스트는 시니어 사용자가 읽기 어려울 수 있습니다.</li>
                                            <li>밝고 명확한 이미지가 시니어 사용자의 가독성에 도움이 됩니다.</li>
                                            <li>교육 내용과 관련된 실제 디바이스나 인터페이스 이미지를 포함하면 좋습니다.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 교육 목표 -->
                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <h2 class="text-xl font-bold mb-4">교육 목표</h2>
                            <p class="text-gray-600 mb-4">이 교육을 통해 학습자가 달성할 수 있는 목표를 추가해주세요. (최대 4개)</p>

                            <div class="space-y-3 mb-4">
                                <div v-for="(goal, index) in education.learningGoals" :key="index"
                                    class="flex items-center">
                                    <input type="text" v-model="education.learningGoals[index]"
                                        class="flex-grow px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        :placeholder="`목표 ${index + 1}. 예: 스마트폰 전원 켜고 끄는 방법을 익힐 수 있다.`">
                                    <button @click="removeGoal(index)"
                                        class="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        v-if="education.learningGoals.length > 1">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <button @click="addGoal" class="flex items-center text-primary"
                                v-if="education.learningGoals.length < 4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                                목표 추가
                            </button>
                        </div>
                    </div>

                    <!-- 학습 단계 탭 -->
                    <div v-show="activeTab === 'steps'" class="space-y-6">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-bold">학습 단계 구성</h2>
                            <div class="flex items-center space-x-2">
                                <button @click="showTemplateModal = true"
                                    class="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    템플릿 사용
                                </button>
                                <button @click="addStep"
                                    class="flex items-center px-4 py-2 bg-primary text-white rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4" />
                                    </svg>
                                    단계 추가
                                </button>
                            </div>
                        </div>

                        <div v-if="education.steps.length === 0" class="bg-white rounded-xl shadow-sm p-8 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 class="text-lg font-medium text-gray-700 mb-2">아직 학습 단계가 없습니다</h3>
                            <p class="text-gray-500 mb-4">시니어 학습자가 단계별로 쉽게 배울 수 있도록 학습 단계를 만들어 보세요.</p>
                            <button @click="addStep" class="px-4 py-2 bg-primary text-white rounded-lg">
                                첫 번째 단계 추가하기
                            </button>
                        </div>

                        <!-- 드래그 앤 드롭 가능한 단계 목록 -->
                        <div v-else class="space-y-4" ref="stepsContainer">
                            <div v-for="(step, index) in education.steps" :key="step.id || index" :data-index="index"
                                class="bg-white rounded-xl shadow-sm overflow-hidden step-item" draggable="true"
                                @dragstart="onDragStart($event, index)" @dragover.prevent @drop="onDrop($event, index)"
                                @dragenter.prevent>

                                <div class="step-header px-6 py-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                                    @click="toggleStep(index)">
                                    <div class="flex items-center">
                                        <div class="drag-handle cursor-move mr-3 text-gray-400 hover:text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                            </svg>
                                        </div>
                                        <div
                                            class="step-number w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 text-white bg-primary">
                                            {{ index + 1 }}
                                        </div>
                                        <h3 class="font-bold">{{ step.title || `단계 ${index + 1}` }}</h3>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <button @click.stop="previewStep(index)"
                                            class="p-1.5 text-gray-500 hover:text-primary hover:bg-blue-50 rounded"
                                            title="미리보기">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        <button @click.stop="duplicateStep(index)"
                                            class="p-1.5 text-gray-500 hover:text-primary hover:bg-blue-50 rounded"
                                            title="복제">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                        <button @click.stop="removeStep(index)"
                                            class="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded"
                                            title="삭제">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                        <button @click.stop="toggleStep(index)"
                                            class="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                                            <svg v-if="openedSteps[index]" xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 15l7-7 7 7" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div v-if="openedSteps[index]" class="step-content p-6">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div class="form-group">
                                            <label :for="`step-title-${index}`"
                                                class="block text-gray-700 font-medium mb-2">단계 제목 <span
                                                    class="text-red-500">*</span></label>
                                            <input :id="`step-title-${index}`" type="text" v-model="step.title"
                                                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="예: 스마트폰 켜고 끄기">
                                        </div>

                                        <div class="form-group">
                                            <label :for="`step-duration-${index}`"
                                                class="block text-gray-700 font-medium mb-2">예상 소요 시간</label>
                                            <div class="flex">
                                                <input :id="`step-duration-${index}`" type="number"
                                                    v-model="step.durationMinutes" min="1" max="60"
                                                    class="w-24 px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary">
                                                <span
                                                    class="flex items-center justify-center px-4 py-3 bg-gray-100 border-t border-r border-b border-gray-300 rounded-r-lg text-gray-700">
                                                    분
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group mb-6">
                                        <label :for="`step-description-${index}`"
                                            class="block text-gray-700 font-medium mb-2">단계 설명 <span
                                                class="text-red-500">*</span></label>
                                        <textarea :id="`step-description-${index}`" v-model="step.description" rows="2"
                                            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="이 단계에서 학습자가 무엇을 배우게 되는지 간략하게 설명해주세요."></textarea>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div class="form-group">
                                            <label :for="`step-image-${index}`"
                                                class="block text-gray-700 font-medium mb-2">단계 대표 이미지</label>
                                            <div class="image-upload border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
                                                :class="{ 'border-gray-300 bg-gray-50': !step.imageUrl, 'border-primary': step.imageUrl }"
                                                style="height: 150px;" @click="openStepImagePicker(index)">
                                                <img v-if="step.imageUrl" :src="step.imageUrl"
                                                    :alt="`단계 ${index + 1} 이미지`" class="w-full h-full object-cover">
                                                <div v-else class="text-center p-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        class="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p class="text-gray-500 text-sm">이미지 추가하기</p>
                                                </div>
                                            </div>
                                            <input type="file" :ref="`stepImageInput-${index}`" class="hidden"
                                                accept="image/*" @change="handleStepImageUpload($event, index)">
                                        </div>

                                        <div class="form-group">
                                            <label class="block text-gray-700 font-medium mb-2">단계 유형</label>
                                            <div class="space-y-3">
                                                <label class="flex items-center cursor-pointer">
                                                    <input type="checkbox" v-model="step.hasContent"
                                                        class="form-checkbox h-5 w-5 text-primary rounded">
                                                    <span class="ml-2">학습 내용 포함</span>
                                                </label>
                                                <label class="flex items-center cursor-pointer">
                                                    <input type="checkbox" v-model="step.hasQuiz"
                                                        class="form-checkbox h-5 w-5 text-primary rounded">
                                                    <span class="ml-2">이해도 확인 퀴즈 포함</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 학습 내용 섹션 - 시각적 에디터 -->
                                    <div v-if="step.hasContent" class="content-section mb-8">
                                        <h4 class="font-medium text-gray-700 mb-3 pb-2 border-b border-gray-200">학습 내용
                                        </h4>

                                        <!-- 콘텐츠 템플릿 버튼 -->
                                        <div class="content-templates mb-4">
                                            <div class="flex items-center space-x-2 mb-3">
                                                <span class="text-sm font-medium text-gray-700">콘텐츠 템플릿:</span>
                                                <button v-for="(template, tempIndex) in contentTemplates"
                                                    :key="tempIndex" @click="insertContentTemplate(index, template)"
                                                    class="px-3 py-1 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                                                    {{ template.name }}
                                                </button>
                                            </div>
                                        </div>

                                        <!-- 시각적 콘텐츠 에디터 -->
                                        <div class="visual-editor border border-gray-300 rounded-lg">
                                            <!-- 툴바 -->
                                            <div
                                                class="editor-toolbar flex items-center space-x-2 p-3 bg-gray-50 border-b border-gray-300">
                                                <button @click="addContentBlock(step, 'heading')"
                                                    class="toolbar-btn px-3 py-1 text-sm border border-gray-300 rounded hover:bg-white">
                                                    <strong>H</strong> 제목
                                                </button>
                                                <button @click="addContentBlock(step, 'paragraph')"
                                                    class="toolbar-btn px-3 py-1 text-sm border border-gray-300 rounded hover:bg-white">
                                                    P 문단
                                                </button>
                                                <button @click="addContentBlock(step, 'list')"
                                                    class="toolbar-btn px-3 py-1 text-sm border border-gray-300 rounded hover:bg-white">
                                                    • 목록
                                                </button>
                                                <button @click="addContentBlock(step, 'tip')"
                                                    class="toolbar-btn px-3 py-1 text-sm border border-gray-300 rounded hover:bg-white text-blue-600">
                                                    💡 팁
                                                </button>
                                                <button @click="addContentBlock(step, 'warning')"
                                                    class="toolbar-btn px-3 py-1 text-sm border border-gray-300 rounded hover:bg-white text-yellow-600">
                                                    ⚠️ 주의
                                                </button>
                                            </div>

                                            <!-- 콘텐츠 블록 영역 -->
                                            <div class="content-blocks p-4 min-h-48 bg-white">
                                                <div v-if="!step.contentBlocks || step.contentBlocks.length === 0"
                                                    class="text-center py-8 text-gray-500">
                                                    <p>상단 툴바에서 콘텐츠 블록을 추가해보세요.</p>
                                                </div>

                                                <div v-for="(block, blockIndex) in step.contentBlocks"
                                                    :key="block.id || blockIndex"
                                                    class="content-block mb-4 p-3 border border-gray-200 rounded group hover:border-primary">

                                                    <!-- 블록 컨트롤 버튼 -->
                                                    <div
                                                        class="block-controls flex justify-end space-x-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button @click="moveContentBlockUp(step, blockIndex)"
                                                            :disabled="blockIndex === 0"
                                                            class="text-xs text-gray-500 hover:text-primary disabled:opacity-30">
                                                            ↑
                                                        </button>
                                                        <button @click="moveContentBlockDown(step, blockIndex)"
                                                            :disabled="blockIndex === step.contentBlocks.length - 1"
                                                            class="text-xs text-gray-500 hover:text-primary disabled:opacity-30">
                                                            ↓
                                                        </button>
                                                        <button @click="removeContentBlock(step, blockIndex)"
                                                            class="text-xs text-red-500 hover:text-red-700">
                                                            삭제
                                                        </button>
                                                    </div>

                                                    <!-- 제목 블록 -->
                                                    <div v-if="block.type === 'heading'">
                                                        <input v-model="block.content" type="text"
                                                            class="w-full text-xl font-bold border-none outline-none focus:bg-yellow-50 p-2 rounded"
                                                            placeholder="제목을 입력하세요">
                                                    </div>

                                                    <!-- 문단 블록 -->
                                                    <div v-else-if="block.type === 'paragraph'">
                                                        <textarea v-model="block.content" rows="3"
                                                            class="w-full text-lg border-none outline-none focus:bg-yellow-50 p-2 rounded resize-none"
                                                            placeholder="문단 내용을 입력하세요"></textarea>
                                                    </div>

                                                    <!-- 목록 블록 -->
                                                    <div v-else-if="block.type === 'list'">
                                                        <div class="list-items space-y-2">
                                                            <div v-for="(item, itemIndex) in block.items"
                                                                :key="itemIndex" class="flex items-center space-x-2">
                                                                <span class="text-gray-400">•</span>
                                                                <input v-model="block.items[itemIndex]" type="text"
                                                                    class="flex-1 border-none outline-none focus:bg-yellow-50 p-1 rounded"
                                                                    placeholder="목록 항목을 입력하세요">
                                                                <button @click="removeListItem(block, itemIndex)"
                                                                    v-if="block.items.length > 1"
                                                                    class="text-red-500 hover:text-red-700 text-sm">
                                                                    ×
                                                                </button>
                                                            </div>
                                                            <button @click="addListItem(block)"
                                                                class="text-primary hover:text-primary-dark text-sm">
                                                                + 항목 추가
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <!-- 팁 블록 -->
                                                    <div v-else-if="block.type === 'tip'"
                                                        class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                                        <div class="flex items-center mb-2">
                                                            <span class="text-blue-500 mr-2">💡</span>
                                                            <span class="font-bold text-blue-700">유용한 팁</span>
                                                        </div>
                                                        <textarea v-model="block.content" rows="2"
                                                            class="w-full border-none outline-none bg-transparent focus:bg-white p-2 rounded resize-none"
                                                            placeholder="팁 내용을 입력하세요"></textarea>
                                                    </div>

                                                    <!-- 주의사항 블록 -->
                                                    <div v-else-if="block.type === 'warning'"
                                                        class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                                                        <div class="flex items-center mb-2">
                                                            <span class="text-yellow-500 mr-2">⚠️</span>
                                                            <span class="font-bold text-yellow-700">주의하세요!</span>
                                                        </div>
                                                        <textarea v-model="block.content" rows="2"
                                                            class="w-full border-none outline-none bg-transparent focus:bg-white p-2 rounded resize-none"
                                                            placeholder="주의사항을 입력하세요"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 퀴즈 섹션 -->
                                    <div v-if="step.hasQuiz" class="quiz-section mb-8">
                                        <h4 class="font-medium text-gray-700 mb-3 pb-2 border-b border-gray-200">이해도 확인
                                            퀴즈</h4>

                                        <div class="form-group mb-4">
                                            <label :for="`quiz-question-${index}`"
                                                class="block text-gray-700 font-medium mb-2">퀴즈 질문 <span
                                                    class="text-red-500">*</span></label>
                                            <input :id="`quiz-question-${index}`" type="text"
                                                v-model="getOrCreateQuiz(index).question"
                                                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="예: 스마트폰을 켜려면 전원 버튼을 어떻게 눌러야 할까요?">
                                        </div>

                                        <div class="options-section mb-4">
                                            <div class="flex justify-between items-center mb-2">
                                                <label class="block text-gray-700 font-medium">선택지 <span
                                                        class="text-red-500">*</span></label>
                                                <button @click="addQuizOption(index)"
                                                    class="text-primary text-sm hover:underline flex items-center"
                                                    v-if="getOrCreateQuiz(index).options.length < 6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1"
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    선택지 추가
                                                </button>
                                            </div>

                                            <div v-for="(option, optionIndex) in getOrCreateQuiz(index).options"
                                                :key="`option-${index}-${optionIndex}`"
                                                class="option-item flex items-center mb-2">
                                                <label class="flex items-center cursor-pointer mr-2 w-6">
                                                    <input type="radio" :name="`correct-answer-${index}`"
                                                        :value="optionIndex"
                                                        v-model="getOrCreateQuiz(index).correctAnswer"
                                                        class="form-radio h-5 w-5 text-primary">
                                                </label>
                                                <input type="text" v-model="getOrCreateQuiz(index).options[optionIndex]"
                                                    class="flex-grow px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                    :placeholder="`선택지 ${optionIndex + 1}. 예: 2~3초간 길게 누른다.`">
                                                <button @click="removeQuizOption(index, optionIndex)"
                                                    class="ml-2 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                                                    v-if="getOrCreateQuiz(index).options.length > 2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label :for="`quiz-explanation-${index}`"
                                                class="block text-gray-700 font-medium mb-2">정답 설명</label>
                                            <textarea :id="`quiz-explanation-${index}`"
                                                v-model="getOrCreateQuiz(index).explanation" rows="2"
                                                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="정답을 설명해주세요. 학습자가 오답을 선택했을 때 도움이 되는 설명을 작성하면 좋습니다."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 관련 콘텐츠 탭 -->
                    <div v-show="activeTab === 'related'" class="space-y-6">
                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <h2 class="text-xl font-bold mb-6">관련 교육 콘텐츠</h2>

                            <div class="search-section mb-6">
                                <label for="related-search" class="block text-gray-700 font-medium mb-2">교육 검색</label>
                                <div class="flex">
                                    <input type="text" id="related-search" v-model="relatedSearchKeyword"
                                        class="flex-grow px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="제목으로 검색" @keyup.enter="searchRelatedEducation">
                                    <button @click="searchRelatedEducation"
                                        class="px-4 py-3 bg-primary text-white rounded-r-lg">
                                        검색
                                    </button>
                                </div>
                            </div>

                            <div v-if="relatedSearchResults.length > 0" class="search-results mb-6">
                                <h3 class="text-lg font-medium mb-3">검색 결과</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div v-for="item in relatedSearchResults" :key="item.id"
                                        class="result-item flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                        @click="addRelatedEducation(item)">
                                        <div class="item-img w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-3">
                                            <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title"
                                                class="w-full h-full object-cover">
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-800">{{ item.title }}</h4>
                                            <p class="text-sm text-gray-500">{{ getCategoryName(item.categoryId) }} · {{
                                                getLevelName(item.level) }}</p>
                                            <p class="text-xs text-gray-400">{{ item.duration }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="selected-items">
                                <h3 class="text-lg font-medium mb-3">선택된 관련 교육 ({{ education.relatedIds.length }})</h3>
                                <div v-if="education.relatedIds.length === 0"
                                    class="empty-state border border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-3"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                    </svg>
                                    <p class="text-gray-500 mb-2">아직 관련 교육이 없습니다.</p>
                                    <p class="text-gray-400 text-sm">위 검색창에서 관련 교육 콘텐츠를 검색하여 추가해보세요.</p>
                                </div>
                                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div v-for="item in relatedEducationItems" :key="item.id"
                                        class="related-item flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                                        <div class="item-img w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-3">
                                            <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title"
                                                class="w-full h-full object-cover">
                                        </div>
                                        <div class="flex-grow">
                                            <h4 class="font-medium text-gray-800">{{ item.title }}</h4>
                                            <p class="text-sm text-gray-500">{{ getCategoryName(item.categoryId) }} · {{
                                                getLevelName(item.level) }}</p>
                                        </div>
                                        <button @click="removeRelatedEducation(item.id)"
                                            class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 하단 네비게이션 -->
        <footer class="fixed bottom-0 left-0 right-0 bg-white shadow-md-up border-t border-gray-200 p-4 z-10">
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex items-center">
                    <span class="text-gray-500">마지막 저장: {{ lastSavedTime }}</span>
                </div>
                <div class="flex items-center space-x-3">
                    <button @click="cancelEdit" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
                        취소
                    </button>
                    <button @click="publishEducation" class="px-4 py-2 bg-primary text-white rounded-lg">
                        {{ isEditMode ? '수정완료' : '출시하기' }}
                    </button>
                </div>
            </div>
        </footer>

        <!-- 템플릿 선택 모달 -->
        <div v-if="showTemplateModal" class="template-modal fixed inset-0 z-50 flex items-center justify-center">
            <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50" @click="showTemplateModal = false"></div>
            <div
                class="modal-content bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 relative z-10 max-h-96 overflow-y-auto">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-4">단계 템플릿 선택</h3>
                    <div class="templates-grid grid grid-cols-1 gap-4">
                        <div v-for="template in stepTemplates" :key="template.id" @click="applyTemplate(template)"
                            class="template-card p-4 border border-gray-200 rounded-lg hover:border-primary cursor-pointer transition-all">
                            <h4 class="font-bold mb-2">{{ template.title }}</h4>
                            <p class="text-gray-600 text-sm">{{ template.description }}</p>
                        </div>
                    </div>
                    <div class="flex justify-end mt-6">
                        <button @click="showTemplateModal = false" class="btn btn-outline">
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 미리보기 모달 -->
        <div v-if="showPreviewModal" class="preview-modal fixed inset-0 z-50 overflow-auto">
            <div class="modal-overlay absolute inset-0 bg-black opacity-50" @click="closePreview"></div>
            <div class="modal-container relative bg-white w-full max-w-5xl mx-auto my-10 rounded-xl shadow-lg z-50">
                <div class="modal-header p-6 flex justify-between items-center border-b border-gray-200">
                    <h3 class="text-xl font-bold">미리보기: {{ education.title || '새 교육 콘텐츠' }}</h3>
                    <button @click="closePreview" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body p-6 max-h-[70vh] overflow-y-auto">
                    <!-- 미리보기 내용 -->
                    <div class="preview-content">
                        <div v-if="currentPreviewStep">
                            <!-- 단계 미리보기 -->
                            <div class="step-preview">
                                <h4 class="text-xl font-bold mb-4">{{ currentPreviewStep.title }}</h4>
                                <p class="text-gray-600 mb-4">{{ currentPreviewStep.description }}</p>

                                <div v-if="currentPreviewStep.imageUrl" class="mb-6">
                                    <img :src="currentPreviewStep.imageUrl" :alt="currentPreviewStep.title"
                                        class="w-full rounded-lg max-h-64 object-contain">
                                </div>

                                <div v-if="currentPreviewStep.hasContent && currentPreviewStep.contentBlocks"
                                    class="content-preview mb-6">
                                    <h5 class="text-lg font-medium mb-3">학습 내용</h5>
                                    <div class="bg-white p-4 border rounded-lg">
                                        <div v-for="block in currentPreviewStep.contentBlocks" :key="block.id"
                                            class="mb-4">
                                            <h4 v-if="block.type === 'heading'" class="font-bold text-xl mb-2">{{
                                                block.content }}</h4>
                                            <p v-else-if="block.type === 'paragraph'" class="mb-2">{{ block.content }}
                                            </p>
                                            <ul v-else-if="block.type === 'list'" class="list-disc pl-5 mb-2">
                                                <li v-for="item in block.items" :key="item">{{ item }}</li>
                                            </ul>
                                            <div v-else-if="block.type === 'tip'"
                                                class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-2">
                                                <div class="flex items-center mb-2">
                                                    <span class="text-blue-500 mr-2">💡</span>
                                                    <span class="font-bold text-blue-700">유용한 팁</span>
                                                </div>
                                                <p>{{ block.content }}</p>
                                            </div>
                                            <div v-else-if="block.type === 'warning'"
                                                class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-2">
                                                <div class="flex items-center mb-2">
                                                    <span class="text-yellow-500 mr-2">⚠️</span>
                                                    <span class="font-bold text-yellow-700">주의하세요!</span>
                                                </div>
                                                <p>{{ block.content }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="currentPreviewStep.hasQuiz" class="quiz-preview mb-6">
                                    <h5 class="text-lg font-medium mb-3">이해도 확인 퀴즈</h5>
                                    <div class="bg-white p-4 border rounded-lg">
                                        <p class="font-medium mb-3">{{ currentPreviewStep.quiz?.question }}</p>
                                        <div class="space-y-2">
                                            <div v-for="(option, idx) in currentPreviewStep.quiz?.options" :key="idx"
                                                class="flex items-center p-2 border rounded-lg"
                                                :class="{ 'bg-green-50 border-green-300': idx === currentPreviewStep.quiz?.correctAnswer }">
                                                <span
                                                    class="w-6 h-6 flex items-center justify-center rounded-full border mr-2"
                                                    :class="{ 'bg-green-500 text-white border-green-500': idx === currentPreviewStep.quiz?.correctAnswer }">
                                                    {{ String.fromCharCode(65 + idx) }}
                                                </span>
                                                {{ option }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <!-- 전체 교육 미리보기 -->
                            <div class="mb-6">
                                <h4 class="text-xl font-bold mb-2">교육 소개</h4>
                                <p class="text-gray-600">{{ education.description }}</p>
                            </div>

                            <div class="mb-6">
                                <h4 class="text-xl font-bold mb-2">교육 목표</h4>
                                <ul class="list-disc pl-5 space-y-1">
                                    <li v-for="(goal, idx) in education.learningGoals" :key="idx" v-if="goal.trim()">{{
                                        goal }}</li>
                                </ul>
                            </div>

                            <div class="mb-6">
                                <h4 class="text-xl font-bold mb-2">학습 단계</h4>
                                <div class="space-y-4">
                                    <div v-for="(step, idx) in education.steps" :key="idx"
                                        class="p-4 border rounded-lg">
                                        <div class="flex items-center mb-2">
                                            <div
                                                class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                                                {{ idx + 1 }}
                                            </div>
                                            <h5 class="font-medium">{{ step.title || `단계 ${idx + 1}` }}</h5>
                                        </div>
                                        <p class="text-gray-600">{{ step.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-6 border-t border-gray-200 flex justify-end">
                    <button @click="closePreview" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EducationCreator',
    props: {
        id: {
            type: [String, Number],
            default: null
        }
    },
    data() {
        return {
            isEditMode: false,
            activeTab: 'basic',
            draggedIndex: null,
            nextStepId: 1,
            nextBlockId: 1,
            education: {
                title: '',
                description: '',
                categoryId: 'basics',
                level: 'beginner',
                duration: '',
                thumbnail: '',
                learningGoals: [''],
                steps: [],
                relatedIds: []
            },
            durationMinutes: 30,
            thumbnailPreview: null,
            openedSteps: {},
            relatedSearchKeyword: '',
            relatedSearchResults: [],
            relatedEducationItems: [],
            lastSavedTime: '저장되지 않음',
            showPreviewModal: false,
            showTemplateModal: false,
            currentPreviewStep: null,
            tabs: [
                { id: 'basic', name: '기본 정보' },
                { id: 'steps', name: '학습 단계' },
                { id: 'related', name: '관련 콘텐츠' }
            ],
            contentTemplates: [
                {
                    name: '기본 설명',
                    contentBlocks: [
                        { type: 'heading', content: '기능 소개' },
                        { type: 'paragraph', content: '이 기능은 무엇인지, 왜 필요한지에 대해 설명합니다.' }
                    ]
                },
                {
                    name: '단계별 가이드',
                    contentBlocks: [
                        { type: 'heading', content: '단계별 진행 방법' },
                        { type: 'list', items: ['1단계: 준비하기', '2단계: 실행하기', '3단계: 완료하기'] }
                    ]
                },
                {
                    name: '주의사항',
                    contentBlocks: [
                        { type: 'warning', content: '이 기능을 사용할 때 주의해야 할 점들을 확인하세요.' },
                        { type: 'tip', content: '더 쉽게 사용할 수 있는 유용한 팁을 알려드립니다.' }
                    ]
                }
            ],
            stepTemplates: [
                {
                    id: 'basic_intro',
                    title: '기본 소개 템플릿',
                    description: '새로운 기능이나 앱을 처음 소개할 때 사용하는 템플릿',
                    step: {
                        title: '',
                        description: '',
                        durationMinutes: 5,
                        imageUrl: '',
                        hasContent: true,
                        hasQuiz: true,
                        contentBlocks: [
                            { type: 'heading', content: '기능 소개' },
                            { type: 'paragraph', content: '이 기능은 무엇인지, 왜 필요한지에 대해 설명합니다.' },
                            { type: 'heading', content: '사용 방법' },
                            { type: 'list', items: ['1단계: 앱을 실행합니다', '2단계: 원하는 메뉴를 선택합니다', '3단계: 기능을 실행합니다'] }
                        ]
                    }
                },
                {
                    id: 'step_by_step',
                    title: '단계별 가이드 템플릿',
                    description: '복잡한 과정을 순서대로 설명할 때 사용하는 템플릿',
                    step: {
                        title: '',
                        description: '',
                        durationMinutes: 10,
                        imageUrl: '',
                        hasContent: true,
                        hasQuiz: false,
                        contentBlocks: [
                            { type: 'heading', content: '준비하기' },
                            { type: 'paragraph', content: '시작하기 전에 필요한 준비사항을 확인해보세요.' },
                            { type: 'heading', content: '실행하기' },
                            { type: 'list', items: ['첫 번째 단계', '두 번째 단계', '세 번째 단계'] },
                            { type: 'tip', content: '더 쉽게 진행할 수 있는 유용한 팁입니다.' }
                        ]
                    }
                },
                {
                    id: 'safety_guide',
                    title: '안전 가이드 템플릿',
                    description: '보안이나 안전에 관련된 내용을 설명할 때 사용하는 템플릿',
                    step: {
                        title: '',
                        description: '',
                        durationMinutes: 8,
                        imageUrl: '',
                        hasContent: true,
                        hasQuiz: true,
                        contentBlocks: [
                            { type: 'warning', content: '이 기능을 사용할 때 주의해야 할 점들을 알아보세요.' },
                            { type: 'heading', content: '안전한 사용법' },
                            { type: 'list', items: ['개인정보를 입력할 때는 주변을 확인하세요', '의심스러운 메시지는 클릭하지 마세요', '정기적으로 비밀번호를 변경하세요'] },
                            { type: 'tip', content: '문제가 발생했을 때는 즉시 해당 기관에 문의하세요.' }
                        ]
                    }
                }
            ]
        }
    },
    computed: {
        formattedDuration() {
            return `약 ${this.durationMinutes}분`;
        }
    },
    watch: {
        durationMinutes: {
            handler(val) {
                this.education.duration = `약 ${val}분`;
            },
            immediate: true
        }
    },
    created() {
        if (this.id) {
            this.isEditMode = true;
            this.fetchEducationData();
        } else {
            this.addGoal();
        }
    },
    methods: {
        fetchEducationData() {
            // 실제 구현에서는 API 호출
            setTimeout(() => {
                // 더미 데이터 (편집 모드용)
                this.education = {
                    id: parseInt(this.id),
                    title: '스마트폰 기본 사용법',
                    description: '스마트폰의 기본적인 사용법을 초보자도 쉽게 배울 수 있는 교육 내용입니다.',
                    categoryId: 'smartphone',
                    level: 'beginner',
                    duration: '약 30분',
                    thumbnail: '',
                    learningGoals: [
                        '스마트폰 전원 켜고 끄는 방법을 익힐 수 있다',
                        '화면 잠금을 해제하는 방법을 알 수 있다'
                    ],
                    steps: [
                        {
                            id: 1,
                            title: '스마트폰 켜고 끄기',
                            description: '스마트폰의 전원 버튼 위치와 전원을 켜고 끄는 방법을 배웁니다.',
                            durationMinutes: 5,
                            imageUrl: '',
                            hasContent: true,
                            hasQuiz: true,
                            contentBlocks: [
                                { id: 1, type: 'heading', content: '전원 버튼 찾기' },
                                { id: 2, type: 'paragraph', content: '대부분의 스마트폰은 오른쪽 측면이나 상단에 전원 버튼이 있습니다.' },
                                { id: 3, type: 'tip', content: '전원 버튼은 보통 가장 큰 버튼입니다.' }
                            ],
                            quiz: {
                                question: '스마트폰을 켜려면 전원 버튼을 어떻게 눌러야 할까요?',
                                options: ['빠르게 여러 번 누른다', '2~3초간 길게 누른다', '두 번 연속 누른다', '볼륨 버튼과 함께 누른다'],
                                correctAnswer: 1,
                                explanation: '스마트폰을 켜려면 전원 버튼을 2~3초간 길게 눌러야 합니다.'
                            }
                        }
                    ],
                    relatedIds: []
                };

                this.durationMinutes = parseInt(this.education.duration.replace(/[^0-9]/g, '')) || 30;
                this.thumbnailPreview = this.education.thumbnail;

                // 첫 번째 단계만 열어둠
                this.openedSteps = { 0: true };
                this.nextStepId = this.education.steps.length + 1;
                this.nextBlockId = 10; // 임의의 시작값

                this.lastSavedTime = '2023-08-15 14:30:45';
            }, 500);
        },

        // 기본 정보 관련 메서드
        openFilePicker() {
            this.$refs.thumbnailInput.click();
        },

        handleThumbnailUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.thumbnailPreview = e.target.result;
                    this.education.thumbnail = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        addGoal() {
            if (this.education.learningGoals.length < 4) {
                this.education.learningGoals.push('');
            }
        },

        removeGoal(index) {
            if (this.education.learningGoals.length > 1) {
                this.education.learningGoals.splice(index, 1);
            }
        },

        // 학습 단계 관련 메서드
        addStep() {
            const newStep = {
                id: this.nextStepId++,
                title: '',
                description: '',
                durationMinutes: 5,
                imageUrl: '',
                hasContent: true,
                hasQuiz: false,
                contentBlocks: []
            };

            this.education.steps.push(newStep);
            const newIndex = this.education.steps.length - 1;
            this.openedSteps = { ...this.openedSteps, [newIndex]: true };
            this.activeTab = 'steps';
        },

        applyTemplate(template) {
            const newStep = {
                id: this.nextStepId++,
                ...JSON.parse(JSON.stringify(template.step)),
                contentBlocks: template.step.contentBlocks.map(block => ({
                    ...block,
                    id: this.nextBlockId++
                }))
            };

            this.education.steps.push(newStep);
            const newIndex = this.education.steps.length - 1;
            this.openedSteps = { ...this.openedSteps, [newIndex]: true };
            this.showTemplateModal = false;
            this.activeTab = 'steps';
        },

        toggleStep(index) {
            this.openedSteps = {
                ...this.openedSteps,
                [index]: !this.openedSteps[index]
            };
        },

        removeStep(index) {
            if (confirm('이 학습 단계를 삭제하시겠습니까?')) {
                this.education.steps.splice(index, 1);
                const newOpenedSteps = {};
                this.education.steps.forEach((_, i) => {
                    newOpenedSteps[i] = this.openedSteps[i < index ? i : i + 1] || false;
                });
                this.openedSteps = newOpenedSteps;
            }
        },

        duplicateStep(index) {
            const originalStep = this.education.steps[index];
            const duplicatedStep = JSON.parse(JSON.stringify(originalStep));
            duplicatedStep.id = this.nextStepId++;
            duplicatedStep.title = `${duplicatedStep.title} (복사본)`;

            if (duplicatedStep.contentBlocks) {
                duplicatedStep.contentBlocks = duplicatedStep.contentBlocks.map(block => ({
                    ...block,
                    id: this.nextBlockId++
                }));
            }

            this.education.steps.splice(index + 1, 0, duplicatedStep);

            const newOpenedSteps = {};
            this.education.steps.forEach((_, i) => {
                if (i <= index) {
                    newOpenedSteps[i] = this.openedSteps[i];
                } else if (i === index + 1) {
                    newOpenedSteps[i] = true;
                } else {
                    newOpenedSteps[i] = this.openedSteps[i - 1] || false;
                }
            });
            this.openedSteps = newOpenedSteps;
        },

        openStepImagePicker(index) {
            this.$refs[`stepImageInput-${index}`][0].click();
        },

        handleStepImageUpload(event, index) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const updatedSteps = [...this.education.steps];
                    updatedSteps[index] = {
                        ...updatedSteps[index],
                        imageUrl: e.target.result
                    };
                    this.education.steps = updatedSteps;
                };
                reader.readAsDataURL(file);
            }
        },

        // 드래그 앤 드롭 메서드
        onDragStart(event, index) {
            this.draggedIndex = index;
            event.dataTransfer.effectAllowed = 'move';
        },

        onDrop(event, dropIndex) {
            event.preventDefault();

            if (this.draggedIndex !== null && this.draggedIndex !== dropIndex) {
                const draggedStep = this.education.steps[this.draggedIndex];

                this.education.steps.splice(this.draggedIndex, 1);
                const adjustedDropIndex = this.draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
                this.education.steps.splice(adjustedDropIndex, 0, draggedStep);

                // openedSteps 재정렬
                const newOpenedSteps = {};
                this.education.steps.forEach((_, i) => {
                    const originalIndex = i === adjustedDropIndex ? this.draggedIndex :
                        (i < adjustedDropIndex ? i : i + 1);
                    newOpenedSteps[i] = this.openedSteps[originalIndex] || false;
                });
                this.openedSteps = newOpenedSteps;
            }

            this.draggedIndex = null;
        },

        // 콘텐츠 블록 관리
        addContentBlock(step, type) {
            if (!step.contentBlocks) {
                step.contentBlocks = [];
            }

            const newBlock = {
                id: this.nextBlockId++,
                type: type,
                content: '',
                items: type === 'list' ? [''] : undefined
            };

            step.contentBlocks.push(newBlock);
        },

        insertContentTemplate(stepIndex, template) {
            const step = this.education.steps[stepIndex];
            if (!step.contentBlocks) {
                step.contentBlocks = [];
            }

            const newBlocks = template.contentBlocks.map(block => ({
                ...block,
                id: this.nextBlockId++
            }));

            step.contentBlocks.push(...newBlocks);
        },

        removeContentBlock(step, blockIndex) {
            step.contentBlocks.splice(blockIndex, 1);
        },

        moveContentBlockUp(step, blockIndex) {
            if (blockIndex > 0) {
                const block = step.contentBlocks.splice(blockIndex, 1)[0];
                step.contentBlocks.splice(blockIndex - 1, 0, block);
            }
        },

        moveContentBlockDown(step, blockIndex) {
            if (blockIndex < step.contentBlocks.length - 1) {
                const block = step.contentBlocks.splice(blockIndex, 1)[0];
                step.contentBlocks.splice(blockIndex + 1, 0, block);
            }
        },

        addListItem(block) {
            block.items.push('');
        },

        removeListItem(block, itemIndex) {
            if (block.items.length > 1) {
                block.items.splice(itemIndex, 1);
            }
        },

        // 퀴즈 관련 메서드
        getOrCreateQuiz(stepIndex) {
            if (!this.education.steps[stepIndex].quiz) {
                const updatedSteps = [...this.education.steps];
                updatedSteps[stepIndex] = {
                    ...updatedSteps[stepIndex],
                    quiz: {
                        question: '',
                        options: ['', ''],
                        correctAnswer: 0,
                        explanation: ''
                    }
                };
                this.education.steps = updatedSteps;
            }
            return this.education.steps[stepIndex].quiz;
        },

        addQuizOption(stepIndex) {
            const quiz = this.getOrCreateQuiz(stepIndex);
            if (quiz.options.length < 6) {
                quiz.options.push('');
            }
        },

        removeQuizOption(stepIndex, optionIndex) {
            const quiz = this.getOrCreateQuiz(stepIndex);
            if (quiz.options.length > 2) {
                quiz.options.splice(optionIndex, 1);
                if (quiz.correctAnswer === optionIndex) {
                    quiz.correctAnswer = 0;
                } else if (quiz.correctAnswer > optionIndex) {
                    quiz.correctAnswer--;
                }
            }
        },

        // 관련 콘텐츠 관련 메서드
        searchRelatedEducation() {
            if (!this.relatedSearchKeyword.trim()) return;

            setTimeout(() => {
                this.relatedSearchResults = [
                    {
                        id: 2,
                        title: '카카오톡 사용하기',
                        categoryId: 'messenger',
                        level: 'beginner',
                        thumbnail: '',
                        duration: '약 40분'
                    },
                    {
                        id: 3,
                        title: '유튜브로 영상 즐기기',
                        categoryId: 'internet',
                        level: 'beginner',
                        thumbnail: '',
                        duration: '약 25분'
                    }
                ].filter(item =>
                    item.title.toLowerCase().includes(this.relatedSearchKeyword.toLowerCase())
                );
            }, 300);
        },

        addRelatedEducation(item) {
            if (!this.education.relatedIds.includes(item.id)) {
                this.education.relatedIds.push(item.id);
                this.relatedEducationItems.push(item);
            }
        },

        removeRelatedEducation(id) {
            this.education.relatedIds = this.education.relatedIds.filter(itemId => itemId !== id);
            this.relatedEducationItems = this.relatedEducationItems.filter(item => item.id !== id);
        },

        // 미리보기 관련 메서드
        previewEducation() {
            this.showPreviewModal = true;
            this.currentPreviewStep = null;
        },

        previewStep(stepIndex) {
            this.showPreviewModal = true;
            this.currentPreviewStep = this.education.steps[stepIndex];
        },

        closePreview() {
            this.showPreviewModal = false;
            this.currentPreviewStep = null;
        },

        // 유틸리티 메서드
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

        getLevelName(level) {
            const levels = {
                'beginner': '초급',
                'intermediate': '중급',
                'advanced': '고급'
            };
            return levels[level] || '';
        },

        // 저장 관련 메서드
        validateForm() {
            if (!this.education.title.trim()) {
                alert('교육 제목을 입력해주세요.');
                this.activeTab = 'basic';
                return false;
            }

            if (!this.education.description.trim()) {
                alert('교육 소개를 입력해주세요.');
                this.activeTab = 'basic';
                return false;
            }

            if (this.education.learningGoals.some(goal => !goal.trim())) {
                alert('비어있는 교육 목표가 있습니다.');
                this.activeTab = 'basic';
                return false;
            }

            if (this.education.steps.length === 0) {
                alert('최소 한 개 이상의 학습 단계를 추가해주세요.');
                this.activeTab = 'steps';
                return false;
            }

            for (let i = 0; i < this.education.steps.length; i++) {
                const step = this.education.steps[i];

                if (!step.title.trim()) {
                    alert(`${i + 1}번 단계의 제목을 입력해주세요.`);
                    this.activeTab = 'steps';
                    this.openedSteps[i] = true;
                    return false;
                }

                if (!step.description.trim()) {
                    alert(`${i + 1}번 단계의 설명을 입력해주세요.`);
                    this.activeTab = 'steps';
                    this.openedSteps[i] = true;
                    return false;
                }

                if (step.hasQuiz) {
                    const quiz = step.quiz || {};
                    if (!quiz.question || !quiz.question.trim()) {
                        alert(`${i + 1}번 단계의 퀴즈 질문을 입력해주세요.`);
                        this.activeTab = 'steps';
                        this.openedSteps[i] = true;
                        return false;
                    }

                    if (!quiz.options || quiz.options.some(option => !option.trim())) {
                        alert(`${i + 1}번 단계의 퀴즈 선택지를 모두 입력해주세요.`);
                        this.activeTab = 'steps';
                        this.openedSteps[i] = true;
                        return false;
                    }
                }
            }

            return true;
        },

        publishEducation() {
            if (!this.validateForm()) return;

            // 콘텐츠 블록을 HTML로 변환하여 저장
            const processedSteps = this.education.steps.map(step => ({
                ...step,
                content: this.convertBlocksToHTML(step.contentBlocks || [])
            }));

            const educationData = {
                ...this.education,
                steps: processedSteps
            };

            console.log('출시하기:', educationData);
            this.lastSavedTime = new Date().toLocaleString();
            alert(`교육 콘텐츠가 성공적으로 ${this.isEditMode ? '수정' : '출시'}되었습니다.`);
            this.$router.push('/education');
        },

        convertBlocksToHTML(blocks) {
            return blocks.map(block => {
                switch (block.type) {
                    case 'heading':
                        return `<div class="content-block mb-6"><h4 class="font-bold text-xl mb-2">${block.content}</h4></div>`;
                    case 'paragraph':
                        return `<div class="content-block mb-6"><p>${block.content}</p></div>`;
                    case 'list':
                        const listItems = block.items.map(item => `<p>${item}</p>`).join('');
                        return `<div class="content-block mb-6">${listItems}</div>`;
                    case 'tip':
                        return `<div class="content-block mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400"><h4 class="font-bold text-xl mb-2">💡 유용한 팁</h4><p>${block.content}</p></div>`;
                    case 'warning':
                        return `<div class="content-block mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400"><h4 class="font-bold text-xl mb-2">⚠️ 주의하세요!</h4><p>${block.content}</p></div>`;
                    default:
                        return '';
                }
            }).join('');
        },

        cancelEdit() {
            if (confirm('변경 사항이 저장되지 않을 수 있습니다. 정말 취소하시겠습니까?')) {
                this.$router.push('/education');
            }
        }
    }
};
</script>

<style scoped>
.shadow-md-up {
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

.form-checkbox:checked {
    background-color: var(--color-primary, #0066CC);
    border-color: var(--color-primary, #0066CC);
}

.form-radio:checked {
    background-color: var(--color-primary, #0066CC);
    border-color: var(--color-primary, #0066CC);
}

.step-item {
    transition: all 0.2s ease;
    cursor: move;
}

.step-item:hover {
    border-color: var(--color-primary, #0066CC);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.step-item.dragging {
    opacity: 0.5;
    transform: rotate(2deg);
}

.drag-handle {
    cursor: move;
}

.visual-editor {
    border-radius: 0.5rem;
    overflow: hidden;
}

.editor-toolbar {
    border-bottom: 1px solid #e5e7eb;
}

.toolbar-btn {
    transition: all 0.2s ease;
}

.toolbar-btn:hover {
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.content-block {
    transition: all 0.2s ease;
}

.content-block:hover {
    border-color: var(--color-primary, #0066CC);
}

.block-controls {
    transition: opacity 0.2s ease;
}

.template-modal,
.preview-modal {
    animation: fadeIn 0.2s ease-out;
}

.template-card {
    transition: all 0.2s ease;
}

.template-card:hover {
    border-color: var(--color-primary, #0066CC);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

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

/* 반응형 디자인 */
@media (max-width: 768px) {
    .editor-toolbar {
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .toolbar-btn {
        font-size: 0.75rem;
        padding: 0.5rem;
    }
}

/* 접근성 */
.btn:focus,
.form-input:focus,
.form-textarea:focus,
.form-select:focus {
    outline: 2px solid var(--color-primary, #0066CC);
    outline-offset: 2px;
}

/* 폼 유효성 검사 스타일 */
.form-input:invalid,
.form-textarea:invalid,
.form-select:invalid {
    border-color: #ef4444;
}

.form-input:valid,
.form-textarea:valid,
.form-select:valid {
    border-color: #10b981;
}
</style>