<!-- src/views/kiosk/KioskSimulator.vue -->
<template>
    <div class="kiosk-simulator">
        <!-- 상단 정보 영역 -->
        <div class="simulator-header bg-secondary bg-opacity-10 py-4 px-4 border-b border-secondary border-opacity-30">
            <div class="container mx-auto">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div class="simulator-info mb-4 md:mb-0">
                        <h1 class="text-2xl font-bold mb-1">{{ kioskData.name }}</h1>
                        <p class="text-gray-600">{{ getCategoryName(kioskData.categoryId) }} | {{
                            getDifficultyLabel(kioskData.difficulty) }}</p>
                    </div>

                    <div class="simulator-controls flex items-center">
                        <button @click="showHelp = true"
                            class="btn-help flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg mr-4 text-gray-600 hover:bg-light">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            도움말
                        </button>

                        <button @click="resetSimulator"
                            class="btn-reset flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-light">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            처음부터
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 키오스크 화면 영역 -->
        <div class="simulator-content py-8 px-4">
            <div class="container mx-auto">
                <div class="simulator-wrapper">
                    <!-- 로딩 표시 -->
                    <div v-if="loading" class="simulator-loading text-center py-16">
                        <div
                            class="spinner-border inline-block w-12 h-12 border-4 border-t-secondary rounded-full animate-spin">
                        </div>
                        <p class="text-xl mt-4">키오스크 시뮬레이터를 불러오는 중입니다...</p>
                    </div>

                    <!-- 키오스크 화면 -->
                    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- 키오스크 화면 (좌측 2/3) -->
                        <div class="kiosk-screen md:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
                            <!-- 키오스크 화면 헤더 -->
                            <div class="kiosk-header bg-secondary text-white p-4">
                                <h2 class="text-xl font-bold text-center">{{ kioskData.name }}</h2>
                            </div>

                            <!-- 키오스크 화면 콘텐츠 -->
                            <div class="kiosk-content p-6">
                                <!-- 시작 화면 -->
                                <div v-if="currentStep === 0" class="kiosk-start text-center">
                                    <img :src="kioskData.thumbnail" :alt="kioskData.name"
                                        class="mx-auto mb-8 rounded-lg max-w-full h-64 object-cover">
                                    <h3 class="text-2xl font-bold mb-4">{{ kioskData.name }} 실습을 시작합니다</h3>
                                    <p class="text-lg text-gray-600 mb-8">화면을 터치하여 주문을 시작해주세요.</p>
                                    <button @click="startSimulation"
                                        class="btn-start px-8 py-4 bg-secondary text-white text-xl rounded-lg shadow-md hover:bg-opacity-90">
                                        화면 터치하기
                                    </button>
                                </div>

                                <!-- 패스트푸드 키오스크 단계별 화면 -->
                                <div v-else-if="kioskData.id === 1" class="fastfood-kiosk">
                                    <!-- 메뉴 선택 화면 -->
                                    <div v-if="currentStep === 1" class="step-menu-selection">
                                        <h3 class="text-xl font-bold mb-6">메뉴를 선택해주세요</h3>

                                        <!-- 카테고리 탭 -->
                                        <div class="category-tabs flex border-b border-gray-300 mb-6">
                                            <button v-for="(category, index) in ['버거', '사이드', '음료', '세트']" :key="index"
                                                @click="selectedCategory = index" class="tab-item px-6 py-3 text-lg"
                                                :class="selectedCategory === index ? 'border-b-2 border-secondary text-secondary font-bold' : 'text-gray-600'">
                                                {{ category }}
                                            </button>
                                        </div>

                                        <!-- 메뉴 그리드 -->
                                        <div class="menu-grid grid grid-cols-2 gap-4">
                                            <div v-for="(menu, index) in getMenuByCategory(selectedCategory)"
                                                :key="index" @click="selectMenu(menu)"
                                                class="menu-item p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-secondary hover:bg-secondary hover:bg-opacity-5">
                                                <img :src="menu.image" :alt="menu.name"
                                                    class="w-full h-32 object-cover rounded-md mb-2">
                                                <h4 class="text-lg font-bold">{{ menu.name }}</h4>
                                                <p class="text-secondary font-bold">{{ menu.price.toLocaleString() }}원
                                                </p>
                                            </div>
                                        </div>

                                        <!-- 하단 장바구니 -->
                                        <div class="cart-summary mt-6 p-4 bg-gray-100 rounded-lg">
                                            <div class="flex justify-between items-center">
                                                <span class="text-lg">선택한 메뉴: {{ cartItems.length }}개</span>
                                                <span class="text-lg font-bold">총 {{ calculateTotal().toLocaleString()
                                                }}원</span>
                                            </div>
                                            <button @click="goToNextStep"
                                                class="w-full mt-4 py-3 bg-secondary text-white rounded-lg text-lg font-bold"
                                                :disabled="cartItems.length === 0"
                                                :class="{ 'bg-gray-400 cursor-not-allowed': cartItems.length === 0 }">
                                                주문 계속하기
                                            </button>
                                        </div>
                                    </div>

                                    <!-- 장바구니 확인 화면 -->
                                    <div v-else-if="currentStep === 2" class="step-cart-confirmation">
                                        <h3 class="text-xl font-bold mb-6">주문 내역 확인</h3>

                                        <div class="cart-items mb-6">
                                            <div v-for="(item, index) in cartItems" :key="index"
                                                class="cart-item flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
                                                <div class="flex items-center">
                                                    <img :src="item.image" :alt="item.name"
                                                        class="w-16 h-16 object-cover rounded-md mr-4">
                                                    <div>
                                                        <h4 class="text-lg font-bold">{{ item.name }}</h4>
                                                        <p class="text-gray-600">{{ item.price.toLocaleString() }}원</p>
                                                    </div>
                                                </div>
                                                <button @click="removeItem(index)"
                                                    class="text-gray-500 hover:text-red-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div class="total-amount p-4 bg-gray-100 rounded-lg mb-6">
                                            <div class="flex justify-between items-center">
                                                <span class="text-lg">총 주문금액</span>
                                                <span class="text-xl font-bold text-secondary">{{
                                                    calculateTotal().toLocaleString() }}원</span>
                                            </div>
                                        </div>

                                        <div class="button-group flex flex-col md:flex-row gap-4">
                                            <button @click="currentStep = 1"
                                                class="py-3 px-6 border border-secondary text-secondary rounded-lg text-lg font-bold md:flex-1">
                                                메뉴 추가하기
                                            </button>
                                            <button @click="goToNextStep"
                                                class="py-3 px-6 bg-secondary text-white rounded-lg text-lg font-bold md:flex-1">
                                                결제하기
                                            </button>
                                        </div>
                                    </div>

                                    <!-- 결제 방법 선택 화면 -->
                                    <div v-else-if="currentStep === 3" class="step-payment-method">
                                        <h3 class="text-xl font-bold mb-6">결제 방법을 선택해주세요</h3>

                                        <div class="payment-methods grid grid-cols-2 gap-4 mb-8">
                                            <div v-for="(method, index) in paymentMethods" :key="index"
                                                @click="selectPaymentMethod(method)"
                                                class="payment-method p-4 border rounded-lg text-center cursor-pointer"
                                                :class="selectedPaymentMethod === method ? 'border-secondary bg-secondary bg-opacity-5' : 'border-gray-200'">
                                                <div class="icon mb-3">
                                                    <img :src="method.icon" :alt="method.name" class="h-16 mx-auto">
                                                </div>
                                                <h4 class="text-lg font-bold">{{ method.name }}</h4>
                                            </div>
                                        </div>

                                        <div class="button-group flex flex-col md:flex-row gap-4">
                                            <button @click="currentStep = 2"
                                                class="py-3 px-6 border border-secondary text-secondary rounded-lg text-lg font-bold md:flex-1">
                                                이전으로
                                            </button>
                                            <button @click="goToNextStep"
                                                class="py-3 px-6 bg-secondary text-white rounded-lg text-lg font-bold md:flex-1"
                                                :disabled="!selectedPaymentMethod"
                                                :class="{ 'bg-gray-400 cursor-not-allowed': !selectedPaymentMethod }">
                                                {{ selectedPaymentMethod ? selectedPaymentMethod.name + '로 결제하기' : '결제 방법을 선택하세요' }}
                                            </button>
                                        </div>
                                    </div>

                                    <!-- 결제 완료 화면 -->
                                    <div v-else-if="currentStep === 4" class="step-payment-complete text-center">
                                        <div class="success-icon mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="h-24 w-24 mx-auto text-success" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>

                                        <h3 class="text-2xl font-bold mb-4">결제가 완료되었습니다</h3>
                                        <p class="text-lg text-gray-600 mb-6">
                                            주문번호: <span class="font-bold">{{ generateOrderNumber() }}</span>
                                        </p>
                                        <p class="text-lg text-gray-600 mb-8">
                                            주문하신 메뉴가 준비되면 호출벨이 울립니다.
                                        </p>

                                        <button @click="finishSimulation"
                                            class="py-3 px-8 bg-success text-white rounded-lg text-lg font-bold">
                                            완료
                                        </button>
                                    </div>
                                </div>

                                <!-- 다른 키오스크 타입에 대한 구현은 여기에 추가 -->
                                <div v-else class="text-center py-8">
                                    <p class="text-xl text-gray-600">
                                        현재 이 키오스크 유형은 아직 개발 중입니다.
                                    </p>
                                    <button @click="$router.push('/kiosk')"
                                        class="mt-6 py-3 px-6 bg-secondary text-white rounded-lg">
                                        목록으로 돌아가기
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 가이드 영역 (우측 1/3) -->
                        <div class="guide-panel">
                            <div class="guide-wrapper bg-white rounded-xl shadow-lg p-6 sticky top-6">
                                <h3 class="text-xl font-bold border-b border-gray-200 pb-4 mb-4">단계별 가이드</h3>

                                <div v-if="currentStep === 0" class="guide-content">
                                    <p class="text-lg mb-4">
                                        키오스크 실습을 시작하기 전에 아래 내용을 참고하세요.
                                    </p>
                                    <ul class="list-disc pl-6 space-y-3 text-gray-600">
                                        <li>실제 키오스크와 유사한 환경에서 실습할 수 있습니다.</li>
                                        <li>화면을 터치(클릭)하여 다음 단계로 진행하세요.</li>
                                        <li>언제든지 '도움말' 버튼을 눌러 도움을 받을 수 있습니다.</li>
                                        <li>'처음부터' 버튼을 누르면 처음 단계로 돌아갈 수 있습니다.</li>
                                    </ul>
                                    <div class="tip mt-6 p-4 bg-secondary bg-opacity-10 rounded-lg">
                                        <p class="text-secondary font-bold">시작 팁</p>
                                        <p>키오스크 화면의 '화면 터치하기' 버튼을 클릭하여 시작하세요.</p>
                                    </div>
                                </div>

                                <div v-else-if="kioskData.id === 1 && currentStep === 1" class="guide-content">
                                    <p class="text-lg mb-4">
                                        메뉴 선택 화면입니다.
                                    </p>
                                    <ul class="list-disc pl-6 space-y-3 text-gray-600">
                                        <li>상단의 탭에서 메뉴 카테고리를 선택할 수 있습니다.</li>
                                        <li>원하는 메뉴를 클릭하여 장바구니에 담으세요.</li>
                                        <li>여러 개의 메뉴를 선택할 수 있습니다.</li>
                                        <li>선택을 완료한 후 하단의 '주문 계속하기' 버튼을 누르세요.</li>
                                    </ul>
                                    <div class="tip mt-6 p-4 bg-secondary bg-opacity-10 rounded-lg">
                                        <p class="text-secondary font-bold">선택 팁</p>
                                        <p>메뉴를 최소 한 개 이상 선택해야 다음 단계로 진행할 수 있습니다.</p>
                                    </div>
                                </div>

                                <div v-else-if="kioskData.id === 1 && currentStep === 2" class="guide-content">
                                    <p class="text-lg mb-4">
                                        주문 내역 확인 화면입니다.
                                    </p>
                                    <ul class="list-disc pl-6 space-y-3 text-gray-600">
                                        <li>선택한 메뉴 목록과 총 금액을 확인하세요.</li>
                                        <li>삭제 버튼(휴지통 아이콘)을 눌러 메뉴를 삭제할 수 있습니다.</li>
                                        <li>메뉴를 추가하려면 '메뉴 추가하기' 버튼을 누르세요.</li>
                                        <li>주문을 완료하려면 '결제하기' 버튼을 누르세요.</li>
                                    </ul>
                                    <div class="tip mt-6 p-4 bg-secondary bg-opacity-10 rounded-lg">
                                        <p class="text-secondary font-bold">확인 팁</p>
                                        <p>결제하기 전에 주문 내역과 총 금액을 꼼꼼히 확인하세요.</p>
                                    </div>
                                </div>

                                <div v-else-if="kioskData.id === 1 && currentStep === 3" class="guide-content">
                                    <p class="text-lg mb-4">
                                        결제 방법 선택 화면입니다.
                                    </p>
                                    <ul class="list-disc pl-6 space-y-3 text-gray-600">
                                        <li>원하는 결제 방법을 선택하세요.</li>
                                        <li>카드, 모바일 결제 등 다양한 옵션이 있습니다.</li>
                                        <li>이전 단계로 돌아가려면 '이전으로' 버튼을 누르세요.</li>
                                        <li>결제 방법을 선택한 후 해당 결제 방법으로 결제하기 버튼을 누르세요.</li>
                                    </ul>
                                    <div class="tip mt-6 p-4 bg-secondary bg-opacity-10 rounded-lg">
                                        <p class="text-secondary font-bold">결제 팁</p>
                                        <p>결제 방법을 선택해야 다음 단계로 진행할 수 있습니다.</p>
                                    </div>
                                </div>

                                <div v-else-if="kioskData.id === 1 && currentStep === 4" class="guide-content">
                                    <p class="text-lg mb-4">
                                        결제 완료 화면입니다.
                                    </p>
                                    <ul class="list-disc pl-6 space-y-3 text-gray-600">
                                        <li>결제가 성공적으로 완료되었습니다.</li>
                                        <li>주문번호를 확인하세요.</li>
                                        <li>실제 키오스크에서는 영수증이 출력될 수 있습니다.</li>
                                        <li>'완료' 버튼을 눌러 실습을 종료하세요.</li>
                                    </ul>
                                    <div class="tip mt-6 p-4 bg-success bg-opacity-10 rounded-lg">
                                        <p class="text-success font-bold">축하합니다!</p>
                                        <p>패스트푸드점 키오스크 실습을 성공적으로 완료했습니다.</p>
                                    </div>
                                </div>

                                <!-- 다른 키오스크 타입 및 단계에 대한 가이드는 여기에 추가 -->
                                <div v-else class="guide-content">
                                    <p class="text-lg text-gray-600">
                                        이 단계에 대한 가이드는 아직 준비 중입니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 도움말 모달 -->
        <div v-if="showHelp" class="help-modal fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50" @click="showHelp = false"></div>
            <div class="modal-content bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="modal-header bg-secondary text-white p-4 flex justify-between items-center">
                    <h3 class="text-xl font-bold">키오스크 이용 도움말</h3>
                    <button @click="showHelp = false" class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body p-6">
                    <h4 class="text-lg font-bold mb-4">{{ kioskData.name }} 사용법</h4>

                    <div class="help-content">
                        <div v-if="kioskData.id === 1" class="fastfood-help">
                            <p class="mb-4">패스트푸드점 키오스크는 다음과 같은 단계로 이용합니다:</p>

                            <div class="steps space-y-6 mb-6">
                                <div class="step p-4 border border-gray-200 rounded-lg">
                                    <div class="step-header flex items-center mb-2">
                                        <div
                                            class="step-number bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                                            1</div>
                                        <h5 class="font-bold">메뉴 선택</h5>
                                    </div>
                                    <p>카테고리 탭에서 원하는 메뉴 유형을 선택하고, 원하는 메뉴를 터치하여 선택합니다.</p>
                                </div>

                                <div class="step p-4 border border-gray-200 rounded-lg">
                                    <div class="step-header flex items-center mb-2">
                                        <div
                                            class="step-number bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                                            2</div>
                                        <h5 class="font-bold">주문 내역 확인</h5>
                                    </div>
                                    <p>선택한 메뉴와 총 금액을 확인합니다. 필요하다면 메뉴를 추가하거나 삭제할 수 있습니다.</p>
                                </div>

                                <div class="step p-4 border border-gray-200 rounded-lg">
                                    <div class="step-header flex items-center mb-2">
                                        <div
                                            class="step-number bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                                            3</div>
                                        <h5 class="font-bold">결제 방법 선택</h5>
                                    </div>
                                    <p>신용카드, 모바일 결제 등 원하는 결제 방법을 선택합니다.</p>
                                </div>

                                <div class="step p-4 border border-gray-200 rounded-lg">
                                    <div class="step-header flex items-center mb-2">
                                        <div
                                            class="step-number bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                                            4</div>
                                        <h5 class="font-bold">결제 완료</h5>
                                    </div>
                                    <p>결제가 완료되면 주문번호를 확인하고, 음식이 준비될 때까지 기다립니다.</p>
                                </div>
                            </div>

                            <div class="tips p-4 bg-secondary bg-opacity-10 rounded-lg">
                                <h5 class="font-bold mb-2">도움말 팁</h5>
                                <ul class="list-disc pl-6 space-y-2">
                                    <li>실수했다면 언제든지 '처음부터' 버튼을 눌러 다시 시작할 수 있습니다.</li>
                                    <li>메뉴를 여러 개 선택할 수 있습니다.</li>
                                    <li>화면 우측의 가이드 패널에서 현재 단계에 대한 안내를 확인하세요.</li>
                                    <li>실제 키오스크에서는 주문 완료 후 영수증이 출력될 수 있습니다.</li>
                                </ul>
                            </div>
                        </div>

                        <!-- 다른 키오스크 타입에 대한 도움말은 여기에 추가 -->
                        <div v-else class="general-help">
                            <p class="mb-4">
                                이 키오스크 시뮬레이터는 단계별로 진행됩니다. 각 단계에서 화면의 안내에 따라 진행하세요.
                            </p>
                            <p class="mb-4">
                                화면 우측의 가이드 패널에서 현재 단계에 대한 상세 안내를 확인할 수 있습니다.
                            </p>
                            <p>
                                실수한 경우 '처음부터' 버튼을 눌러 다시 시작할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-4 border-t border-gray-200 flex justify-end">
                    <button @click="showHelp = false" class="py-2 px-6 bg-secondary text-white rounded-lg">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KioskSimulator',
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            loading: true,
            kioskData: {},
            currentStep: 0, // 0: 시작 화면, 1: 메뉴 선택, 2: 장바구니 확인, 3: 결제 방법 선택, 4: 결제 완료
            showHelp: false,

            // 패스트푸드 키오스크 관련 데이터
            selectedCategory: 0, // 0: 버거, 1: 사이드, 2: 음료, 3: 세트
            cartItems: [],
            selectedPaymentMethod: null,

            kioskCategories: [
                { id: 'all', name: '전체' },
                { id: 'restaurant', name: '음식점' },
                { id: 'hospital', name: '병원/의료' },
                { id: 'public', name: '공공기관' },
                { id: 'transportation', name: '교통' },
                { id: 'shopping', name: '쇼핑' }
            ],

            // 더미 데이터: 패스트푸드 메뉴
            menuData: {
                burgers: [
                    // { id: 1, name: '치즈버거', price: 4500, image: require('@/assets/images/menu-cheeseburger.jpg') },
                    // { id: 2, name: '더블 불고기버거', price: 6500, image: require('@/assets/images/menu-bulgogi.jpg') },
                    // { id: 3, name: '치킨 버거', price: 5500, image: require('@/assets/images/menu-chicken.jpg') },
                    // { id: 4, name: '새우 버거', price: 5800, image: require('@/assets/images/menu-shrimp.jpg') }
                ],
                sides: [
                    // { id: 5, name: '감자튀김 (M)', price: 2500, image: require('@/assets/images/menu-fries.jpg') },
                    // { id: 6, name: '감자튀김 (L)', price: 3000, image: require('@/assets/images/menu-fries-large.jpg') },
                    // { id: 7, name: '치킨 너겟 (4조각)', price: 3500, image: require('@/assets/images/menu-nuggets.jpg') },
                    // { id: 8, name: '치즈스틱 (2조각)', price: 2800, image: require('@/assets/images/menu-cheesesticks.jpg') }
                ],
                drinks: [
                    // { id: 9, name: '콜라 (M)', price: 2000, image: require('@/assets/images/menu-cola.jpg') },
                    // { id: 10, name: '콜라 (L)', price: 2500, image: require('@/assets/images/menu-cola-large.jpg') },
                    // { id: 11, name: '사이다 (M)', price: 2000, image: require('@/assets/images/menu-sprite.jpg') },
                    // { id: 12, name: '오렌지 주스', price: 2800, image: require('@/assets/images/menu-orange.jpg') }
                ],
                sets: [
                    // { id: 13, name: '치즈버거 세트', price: 7900, image: require('@/assets/images/menu-cheeseburger-set.jpg') },
                    // { id: 14, name: '더블 불고기버거 세트', price: 9900, image: require('@/assets/images/menu-bulgogi-set.jpg') },
                    // { id: 15, name: '치킨 버거 세트', price: 8900, image: require('@/assets/images/menu-chicken-set.jpg') },
                    // { id: 16, name: '새우 버거 세트', price: 9200, image: require('@/assets/images/menu-shrimp-set.jpg') }
                ]
            },

            // 결제 방법
            paymentMethods: [
                // { id: 1, name: '신용카드', icon: require('@/assets/images/payment-card.png') },
                // { id: 2, name: '체크카드', icon: require('@/assets/images/payment-check.png') },
                // { id: 3, name: '삼성페이', icon: require('@/assets/images/payment-samsung.png') },
                // { id: 4, name: '카카오페이', icon: require('@/assets/images/payment-kakao.png') }
            ]
        }
    },
    methods: {
        // 키오스크 데이터 로드 (실제 프로젝트에서는 API 호출로 대체)
        loadKioskData() {
            this.loading = true;

            // 실제 프로젝트에서는 API 호출
            setTimeout(() => {
                // 더미 데이터 - 실제로는 API 응답으로 대체
                const kioskList = [
                    {
                        id: 1,
                        name: '패스트푸드점 키오스크',
                        description: '햄버거, 사이드 메뉴, 음료를 주문하는 패스트푸드점 키오스크입니다.',
                        categoryId: 'restaurant',
                        difficulty: 'easy',
                        // thumbnail: require('@/assets/images/kiosk-fastfood.jpg')
                    },
                    {
                        id: 2,
                        name: '병원 접수 키오스크',
                        description: '병원 방문 접수와 진료과 선택, 증상 입력 등을 실습할 수 있습니다.',
                        categoryId: 'hospital',
                        difficulty: 'medium',
                        // thumbnail: require('@/assets/images/kiosk-hospital.jpg')
                    },
                    // 다른 키오스크 데이터는 생략
                ];

                // ID로 키오스크 찾기
                const kiosk = kioskList.find(k => k.id === parseInt(this.id));

                if (kiosk) {
                    this.kioskData = kiosk;
                } else {
                    // 해당 ID의 키오스크가 없는 경우
                    this.$router.push('/kiosk');
                }

                this.loading = false;
            }, 1000); // 1초 지연 (로딩 효과 시뮬레이션)
        },

        getCategoryName(categoryId) {
            const category = this.kioskCategories.find(cat => cat.id === categoryId);
            return category ? category.name : '';
        },

        getDifficultyLabel(difficulty) {
            switch (difficulty) {
                case 'easy':
                    return '쉬움';
                case 'medium':
                    return '보통';
                case 'hard':
                    return '어려움';
                default:
                    return '';
            }
        },

        // 키오스크 시뮬레이션 시작
        startSimulation() {
            this.currentStep = 1;
        },

        // 키오스크 시뮬레이션 초기화
        resetSimulator() {
            this.currentStep = 0;
            this.selectedCategory = 0;
            this.cartItems = [];
            this.selectedPaymentMethod = null;
        },

        // 시뮬레이션 완료
        finishSimulation() {
            // 실습 완료 후 목록으로 돌아가거나, 필요한 작업 수행
            this.$router.push('/kiosk');
        },

        // 다음 단계로 이동
        goToNextStep() {
            this.currentStep++;
        },

        // 카테고리별 메뉴 가져오기
        getMenuByCategory(category) {
            switch (category) {
                case 0: return this.menuData.burgers;
                case 1: return this.menuData.sides;
                case 2: return this.menuData.drinks;
                case 3: return this.menuData.sets;
                default: return [];
            }
        },

        // 메뉴 선택
        selectMenu(menu) {
            this.cartItems.push(menu);
        },

        // 장바구니 아이템 제거
        removeItem(index) {
            this.cartItems.splice(index, 1);
        },

        // 총 금액 계산
        calculateTotal() {
            return this.cartItems.reduce((total, item) => total + item.price, 0);
        },

        // 결제 방법 선택
        selectPaymentMethod(method) {
            this.selectedPaymentMethod = method;
        },

        // 주문번호 생성
        generateOrderNumber() {
            const date = new Date();
            const timestamp = date.getTime().toString().slice(-6);
            return `A${timestamp}`;
        }
    },
    created() {
        this.loadKioskData();
    }
}
</script>

<style lang="scss" scoped>
.simulator-wrapper {
    min-height: 600px;
}

.kiosk-screen {
    min-height: 500px;
}

.guide-wrapper {
    height: 100%;
}

.spinner-border {
    border-color: rgba(0, 0, 0, 0.1);
    border-top-color: var(--color-secondary);
    animation: spinner 1s linear infinite;
}

@keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}

// 에셋 이미지가 없는 경우를 대비한 플레이스홀더 스타일
[src*='kiosk-fastfood.jpg'],
[src*='kiosk-hospital.jpg'],
[src*='menu-'],
[src*='payment-'] {
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