<template>
    <div class="not-found-page py-16 px-4">
        <div class="container mx-auto max-w-2xl text-center">
            <div class="error-image mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 mx-auto text-primary" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold mb-4">404</h1>
            <h2 class="text-2xl md:text-3xl font-bold mb-6">페이지를 찾을 수 없습니다</h2>

            <p class="text-lg text-gray-600 mb-8">
                요청하신 페이지가 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수 없습니다.
            </p>

            <div class="buttons space-y-4 md:space-y-0 md:space-x-4">
                <router-link to="/" class="py-3 px-6 bg-primary text-white rounded-lg text-lg font-bold inline-block">
                    홈으로 이동
                </router-link>

                <button @click="goBack"
                    class="py-3 px-6 border border-primary text-primary rounded-lg text-lg font-bold inline-block">
                    이전 페이지로
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>