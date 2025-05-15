<template>
    <div class="education-creator">
        <!-- 헤더 -->
        <header class="bg-white shadow-md px-6 py-4 fixed top-0 left-0 right-0 z-10">
            <div class="container mx-auto">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <router-link to="/creator/dashboard" class="text-gray-700 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </router-link>
                        <h1 class="text-xl font-bold">{{ isEditMode ? '교육 콘텐츠 수정' : '새 교육 콘텐츠 만들기' }}</h1>
                    </div>
                    <div class="flex items-center space-x-3">
                        <button @click="saveAsDraft" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
                            임시저장
                        </button>
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
        <main class="pt-20 pb-6 px-6">
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

                        <draggable v-else v-model="education.steps" group="steps" handle=".drag-handle"
                            class="space-y-4">
                            <div v-for="(step, index) in education.steps" :key="index"
                                class="bg-white rounded-xl shadow-sm overflow-hidden">
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
                                                <label class="flex items-center cursor-pointer">
                                                    <input type="checkbox" v-model="step.hasSimulation"
                                                        class="form-checkbox h-5 w-5 text-primary rounded">
                                                    <span class="ml-2">실습 시뮬레이션 포함</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 학습 내용 섹션 -->
                                    <div v-if="step.hasContent" class="content-section mb-8">
                                        <h4 class="font-medium text-gray-700 mb-3 pb-2 border-b border-gray-200">학습 내용
                                        </h4>

                                        <div class="content-editor">
                                            <div class="mb-4">
                                                <div class="flex justify-between items-center mb-2">
                                                    <label class="text-gray-700">에디터</label>
                                                    <div class="editor-toolbar flex space-x-1">
                                                        <button v-for="(tool, toolIndex) in editorTools"
                                                            :key="toolIndex"
                                                            @click="applyEditorTool(index, tool.action)"
                                                            class="p-1.5 border rounded hover:bg-gray-100 text-gray-700"
                                                            :title="tool.title">
                                                            <span v-html="tool.icon"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <textarea :id="`step-content-${index}`" v-model="step.content" rows="10"
                                                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                                                    placeholder="HTML 형식으로 학습 내용을 작성할 수 있습니다. 시니어 학습자가 이해하기 쉽도록 명확하고 간결하게 작성해주세요."></textarea>
                                            </div>

                                            <div class="content-templates mb-3">
                                                <h5 class="text-sm font-medium text-gray-700 mb-2">콘텐츠 템플릿</h5>
                                                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <button v-for="(template, tempIndex) in contentTemplates"
                                                        :key="tempIndex"
                                                        @click="insertContentTemplate(index, template.code)"
                                                        class="px-3 py-2 border border-gray-300 rounded text-sm text-left hover:bg-gray-50">
                                                        {{ template.name }}
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="content-preview bg-gray-50 p-4 rounded-lg">
                                                <div class="flex justify-between items-center mb-2">
                                                    <h5 class="text-sm font-medium text-gray-700">미리보기</h5>
                                                    <button @click="refreshContentPreview(index)"
                                                        class="text-primary text-sm hover:underline flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                        </svg>
                                                        새로고침
                                                    </button>
                                                </div>
                                                <div class="preview-content p-3 bg-white border rounded-lg min-h-[100px]"
                                                    v-html="getContentPreview(index)"></div>
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

                                    <!-- 실습 시뮬레이션 섹션 -->
                                    <div v-if="step.hasSimulation" class="simulation-section">
                                        <h4 class="font-medium text-gray-700 mb-3 pb-2 border-b border-gray-200">실습
                                            시뮬레이션</h4>

                                        <div class="simulation-selector mb-4">
                                            <label class="block text-gray-700 font-medium mb-2">시뮬레이션 유형</label>
                                            <select v-model="step.simulationType"
                                                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                                                <option value="" disabled>시뮬레이션 유형 선택</option>
                                                <option value="smartphone">스마트폰 기본 조작</option>
                                                <option value="kiosk_food">음식점 키오스크</option>
                                                <option value="kiosk_hospital">병원 접수 키오스크</option>
                                                <option value="kiosk_transport">교통 키오스크</option>
                                                <option value="app_messenger">메신저 앱</option>
                                                <option value="app_banking">모바일 뱅킹</option>
                                                <option value="app_map">지도 앱</option>
                                            </select>
                                        </div>

                                        <div class="simulation-note bg-yellow-50 p-4 rounded-lg text-sm">
                                            <p class="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>실습 시뮬레이션을 추가하려면 개발팀과 협의가 필요합니다. 시뮬레이션 유형을 선택하고 저장하면 개발팀에서 검토 후
                                                    시뮬레이션을 구현합니다.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </draggable>
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
                    <button @click="saveAsDraft" class="px-4 py-2 border border-primary text-primary rounded-lg">
                        임시저장
                    </button>
                    <button @click="publishEducation" class="px-4 py-2 bg-primary text-white rounded-lg">
                        {{ isEditMode ? '수정완료' : '출시하기' }}
                    </button>
                </div>
            </div>
        </footer>

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
                        <!-- 여기에 미리보기 내용 표시 -->
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
            currentPreviewStep: null,
            tabs: [
                { id: 'basic', name: '기본 정보' },
                { id: 'steps', name: '학습 단계' },
                { id: 'related', name: '관련 콘텐츠' }
            ],
            editorTools: [
                {
                    title: '제목 추가',
                    icon: '<span class="font-bold">H</span>',
                    action: 'heading'
                },
                {
                    title: '강조 텍스트',
                    icon: '<span class="font-bold">B</span>',
                    action: 'bold'
                },
                {
                    title: '목록 추가',
                    icon: '<span class="font-bold">•</span>',
                    action: 'list'
                },
                {
                    title: '이미지 추가',
                    icon: '<span class="font-bold">🖼️</span>',
                    action: 'image'
                }
            ],
            contentTemplates: [
                {
                    name: '기본 학습 콘텐츠',
                    code: `<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">제목을 입력하세요</h4>
  <p>내용을 입력하세요.</p>
</div>`
                },
                {
                    name: '단계별 설명',
                    code: `<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">순서대로 따라해보세요</h4>
  <p>1. 첫 번째 단계</p>
  <p>2. 두 번째 단계</p>
  <p>3. 세 번째 단계</p>
</div>`
                },
                {
                    name: '주의사항 박스',
                    code: `<div class="content-block mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
  <h4 class="font-bold text-xl mb-2">주의하세요!</h4>
  <p>주의사항 내용을 입력하세요.</p>
</div>`
                },
                {
                    name: '팁 박스',
                    code: `<div class="content-block mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
  <h4 class="font-bold text-xl mb-2">유용한 팁</h4>
  <p>팁 내용을 입력하세요.</p>
</div>`
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
            // 새 교육 콘텐츠 생성 시 기본 목표와 빈 학습 단계 초기화
            this.addGoal();
        }
    },
    methods: {
        fetchEducationData() {
            // 실제 구현에서는 API 호출
            setTimeout(() => {
                // 더미 데이터
                this.education = {
                    id: parseInt(this.id),
                    title: '스마트폰 기본 사용법',
                    description: '스마트폰의 기본적인 사용법을 초보자도 쉽게 배울 수 있는 교육 내용입니다. 전원 켜고 끄기, 화면 잠금 해제, 앱 실행 방법 등을 다룹니다.',
                    categoryId: 'smartphone',
                    level: 'beginner',
                    duration: '약 30분',
                    thumbnail: '',
                    learningGoals: [
                        '스마트폰 전원 켜고 끄는 방법을 익힐 수 있다',
                        '화면 잠금을 해제하는 방법을 알 수 있다',
                        '앱을 실행하고 종료하는 방법을 배울 수 있다'
                    ],
                    steps: [
                        {
                            title: '스마트폰 켜고 끄기',
                            description: '스마트폰의 전원 버튼 위치와 전원을 켜고 끄는 방법을 배웁니다.',
                            durationMinutes: 5,
                            imageUrl: '',
                            hasContent: true,
                            hasQuiz: true,
                            hasSimulation: false,
                            content: `<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">전원 버튼 찾기</h4>
  <p>대부분의 스마트폰은 오른쪽 측면이나 상단에 전원 버튼이 있습니다. 길쭉한 직사각형 모양의 버튼입니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">전원 켜기</h4>
  <p>전원 버튼을 2~3초간 길게 누르면 화면에 로고가 나타나며 전원이 켜집니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">전원 끄기</h4>
  <p>1. 전원 버튼을 2~3초간 길게 누릅니다.</p>
  <p>2. 화면에 '전원 끄기' 옵션이 나타납니다.</p>
  <p>3. '전원 끄기'를 터치하면 스마트폰이 꺼집니다.</p>
</div>`,
                            quiz: {
                                question: '스마트폰을 켜려면 전원 버튼을 어떻게 눌러야 할까요?',
                                options: [
                                    '빠르게 여러 번 누른다',
                                    '2~3초간 길게 누른다',
                                    '두 번 연속 누른다',
                                    '볼륨 버튼과 함께 누른다'
                                ],
                                correctAnswer: 1,
                                explanation: '스마트폰을 켜려면 전원 버튼을 2~3초간 길게 눌러야 합니다.'
                            }
                        },
                        {
                            title: '화면 잠금 해제하기',
                            description: '스마트폰 화면 잠금을 해제하는 다양한 방법을 배웁니다.',
                            durationMinutes: 8,
                            imageUrl: '',
                            hasContent: true,
                            hasQuiz: true,
                            hasSimulation: true,
                            simulationType: 'smartphone',
                            content: `<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">화면 깨우기</h4>
  <p>전원 버튼을 짧게 누르면 화면이 켜집니다. 일부 스마트폰은 화면을 두 번 탭하면 켜지기도 합니다.</p>
</div>
<div class="content-block mb-6">
  <h4 class="font-bold text-xl mb-2">잠금 해제 방법</h4>
  <p><strong>패턴:</strong> 미리 설정한 패턴대로 점들을 연결합니다.</p>
  <p><strong>PIN:</strong> 숫자 비밀번호를 입력합니다.</p>
  <p><strong>지문:</strong> 지문 인식 센서에 등록된 손가락을 올립니다.</p>
  <p><strong>얼굴 인식:</strong> 전면 카메라가 얼굴을 인식할 수 있도록 합니다.</p>
</div>`,
                            quiz: {
                                question: '화면 잠금을 해제하는 방법이 아닌 것은?',
                                options: [
                                    '패턴 그리기',
                                    'PIN 번호 입력',
                                    '지문 인식',
                                    '음성 명령'
                                ],
                                correctAnswer: 3,
                                explanation: '일반적으로 화면 잠금 해제는 패턴, PIN, 지문, 얼굴 인식 등을 사용합니다. 음성 명령은 일반적인 잠금 해제 방법이 아닙니다.'
                            }
                        }
                    ],
                    relatedIds: [2, 3]
                };

                // durationMinutes 초기화
                this.durationMinutes = parseInt(this.education.duration.replace(/[^0-9]/g, '')) || 30;

                // 썸네일 미리보기 설정
                this.thumbnailPreview = this.education.thumbnail;

                // 단계별 접힘 상태 초기화 (첫 번째 단계는 열고 나머지는 닫음)
                this.education.steps.forEach((_, index) => {
                    this.$set(this.openedSteps, index, index === 0);
                });

                // 더미 관련 교육 데이터
                this.relatedEducationItems = [
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
                ];

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
                // 실제 구현에서는 파일 업로드 API 호출
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.thumbnailPreview = e.target.result;
                    this.education.thumbnail = e.target.result; // 실제 구현에서는 업로드된 URL로 변경
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
                title: '',
                description: '',
                durationMinutes: 5,
                imageUrl: '',
                hasContent: true,
                hasQuiz: false,
                hasSimulation: false,
                content: '',
                simulationType: ''
            };

            this.education.steps.push(newStep);
            const newIndex = this.education.steps.length - 1;
            this.$set(this.openedSteps, newIndex, true);

            // 새 단계가 추가되면 자동으로 학습 단계 탭으로 전환
            this.activeTab = 'steps';
        },
        toggleStep(index) {
            this.$set(this.openedSteps, index, !this.openedSteps[index]);
        },
        removeStep(index) {
            if (confirm('이 학습 단계를 삭제하시겠습니까?')) {
                this.education.steps.splice(index, 1);

                // 단계 삭제 후 openedSteps 객체 정리
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
            duplicatedStep.title = `${duplicatedStep.title} (복사본)`;

            // 복제된 단계를 원본 바로 다음에 삽입
            this.education.steps.splice(index + 1, 0, duplicatedStep);

            // openedSteps 업데이트
            const newOpenedSteps = {};
            this.education.steps.forEach((_, i) => {
                if (i <= index) {
                    newOpenedSteps[i] = this.openedSteps[i];
                } else if (i === index + 1) {
                    newOpenedSteps[i] = true; // 복제된 단계는 열어둠
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
                // 실제 구현에서는 파일 업로드 API 호출
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.$set(this.education.steps[index], 'imageUrl', e.target.result); // 실제 구현에서는 업로드된 URL로 변경
                };
                reader.readAsDataURL(file);
            }
        },

        // 콘텐츠 에디터 관련 메서드
        applyEditorTool(stepIndex, action) {
            const textArea = document.getElementById(`step-content-${stepIndex}`);
            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            const text = this.education.steps[stepIndex].content;
            let newText = '';

            switch (action) {
                case 'heading':
                    newText = text.substring(0, start) +
                        '<h4 class="font-bold text-xl mb-2">제목을 입력하세요</h4>' +
                        text.substring(end);
                    break;
                case 'bold':
                    if (start !== end) {
                        // 선택된 텍스트가 있으면 그것을 강조
                        newText = text.substring(0, start) +
                            `<strong>${text.substring(start, end)}</strong>` +
                            text.substring(end);
                    } else {
                        // 선택된 텍스트가 없으면 플레이스홀더 추가
                        newText = text.substring(0, start) +
                            '<strong>강조할 텍스트</strong>' +
                            text.substring(end);
                    }
                    break;
                case 'list':
                    newText = text.substring(0, start) +
                        '<ul class="list-disc pl-5 mb-4">\n  <li>항목 1</li>\n  <li>항목 2</li>\n  <li>항목 3</li>\n</ul>' +
                        text.substring(end);
                    break;
                case 'image':
                    newText = text.substring(0, start) +
                        '<div class="image-container mb-4">\n  <img src="" alt="이미지 설명" class="w-full rounded-lg">\n</div>' +
                        text.substring(end);
                    break;
                default:
                    newText = text;
            }

            this.$set(this.education.steps[stepIndex], 'content', newText);

            // 에디터 포커스 유지
            this.$nextTick(() => {
                textArea.focus();
            });
        },
        insertContentTemplate(stepIndex, templateCode) {
            const currentContent = this.education.steps[stepIndex].content;
            const newContent = currentContent ? `${currentContent}\n${templateCode}` : templateCode;
            this.$set(this.education.steps[stepIndex], 'content', newContent);
        },
        getContentPreview(stepIndex) {
            return this.education.steps[stepIndex].content || '<p class="text-gray-400">내용이 없습니다. 왼쪽 에디터에 내용을 입력해주세요.</p>';
        },
        refreshContentPreview(stepIndex) {
            // 미리보기 새로고침 (실제로는 Vue 반응성으로 자동 갱신되므로 여기서는 시각적 피드백만 제공)
            const previewElement = document.querySelector(`.preview-content`);
            if (previewElement) {
                previewElement.classList.add('bg-blue-50');
                setTimeout(() => {
                    previewElement.classList.remove('bg-blue-50');
                }, 300);
            }
        },

        // 퀴즈 관련 메서드
        getOrCreateQuiz(stepIndex) {
            if (!this.education.steps[stepIndex].quiz) {
                this.$set(this.education.steps[stepIndex], 'quiz', {
                    question: '',
                    options: ['', ''],
                    correctAnswer: 0,
                    explanation: ''
                });
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

                // 만약 삭제된 옵션이 정답이었다면 정답을 첫 번째 옵션으로 변경
                if (quiz.correctAnswer === optionIndex) {
                    quiz.correctAnswer = 0;
                } else if (quiz.correctAnswer > optionIndex) {
                    // 삭제된 옵션 이후의 정답 인덱스를 조정
                    quiz.correctAnswer--;
                }
            }
        },

        // 관련 콘텐츠 관련 메서드
        searchRelatedEducation() {
            if (!this.relatedSearchKeyword.trim()) return;

            // 실제 구현에서는 API 호출
            setTimeout(() => {
                // 더미 검색 결과
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
                    },
                    {
                        id: 4,
                        title: '인터넷 브라우저 사용하기',
                        categoryId: 'internet',
                        level: 'beginner',
                        thumbnail: '',
                        duration: '약 35분'
                    },
                    {
                        id: 5,
                        title: '사진 촬영과 관리',
                        categoryId: 'smartphone',
                        level: 'intermediate',
                        thumbnail: '',
                        duration: '약 45분'
                    }
                ].filter(item =>
                    item.title.toLowerCase().includes(this.relatedSearchKeyword.toLowerCase())
                );
            }, 300);
        },
        addRelatedEducation(item) {
            // 이미 추가된 항목인지 확인
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
            // 기본 정보 검증
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
                alert('비어있는 교육 목표가 있습니다. 내용을 입력하거나 삭제해주세요.');
                this.activeTab = 'basic';
                return false;
            }

            if (this.education.steps.length === 0) {
                alert('최소 한 개 이상의 학습 단계를 추가해주세요.');
                this.activeTab = 'steps';
                return false;
            }

            // 단계별 검증
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

                if (step.hasContent && !step.content.trim()) {
                    alert(`${i + 1}번 단계의 학습 내용을 입력해주세요.`);
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

                if (step.hasSimulation && !step.simulationType) {
                    alert(`${i + 1}번 단계의 시뮬레이션 유형을 선택해주세요.`);
                    this.activeTab = 'steps';
                    this.openedSteps[i] = true;
                    return false;
                }
            }

            return true;
        },
        saveAsDraft() {
            // 기본 검증 (제목만 필수)
            if (!this.education.title.trim()) {
                alert('최소한 교육 제목은 입력해주세요.');
                this.activeTab = 'basic';
                return;
            }

            // 실제 구현에서는 API 호출
            console.log('임시저장:', this.education);

            // 저장 시간 업데이트
            this.lastSavedTime = new Date().toLocaleString();

            alert('임시저장되었습니다.');
        },
        publishEducation() {
            if (!this.validateForm()) return;

            // 실제 구현에서는 API 호출
            console.log('출시하기:', this.education);

            // 저장 시간 업데이트
            this.lastSavedTime = new Date().toLocaleString();

            alert(`교육 콘텐츠가 성공적으로 ${this.isEditMode ? '수정' : '출시'}되었습니다.`);
            this.$router.push('/creator/dashboard');
        },
        cancelEdit() {
            if (confirm('변경 사항이 저장되지 않을 수 있습니다. 정말 취소하시겠습니까?')) {
                this.$router.push('/creator/dashboard');
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

/* 드래그 핸들 스타일 */
.drag-handle {
    cursor: move;
}

/* 모달 애니메이션 */
.preview-modal {
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>