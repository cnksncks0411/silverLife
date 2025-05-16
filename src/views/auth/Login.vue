<template>
    <div class="login-page">
        <div class="container mx-auto py-12 px-4">
            <div class="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
                <h1 class="text-3xl font-bold mb-6 text-center">로그인</h1>

                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div class="form-group">
                        <label for="email" class="block text-lg mb-2">이메일</label>
                        <input type="email" id="email" v-model="email" class="input-field" placeholder="이메일 주소를 입력하세요"
                            required>
                    </div>

                    <div class="form-group">
                        <label for="password" class="block text-lg mb-2">비밀번호</label>
                        <input type="password" id="password" v-model="password" class="input-field"
                            placeholder="비밀번호를 입력하세요" required>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input type="checkbox" id="remember" v-model="rememberMe" class="h-5 w-5 text-primary">
                            <label for="remember" class="ml-2 text-gray-700">로그인 유지</label>
                        </div>

                        <a href="#" class="text-primary hover:underline">비밀번호 찾기</a>
                    </div>

                    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {{ error }}
                    </div>

                    <button type="submit" class="w-full py-3 bg-primary text-white rounded-lg text-lg font-bold"
                        :disabled="loading">
                        {{ loading ? '로그인 중...' : '로그인' }}
                    </button>
                </form>

                <button type="button" class="mt-6 w-full py-3 bg-primary text-white rounded-lg text-lg font-bold" @click="gotoRegister">
                    회원가입
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false,
            loading: false,
            error: null
        }
    },
    methods: {
        async handleLogin() {
            this.loading = true;
            this.error = null;

            try {
                // 실제 구현에서는 Vuex 액션 호출 또는 API 요청
                // await this.$store.dispatch('auth/login', { email: this.email, password: this.password });

                // 더미 로그인 처리
                await new Promise(resolve => setTimeout(resolve, 1000));

                if (this.email === 'test@example.com' && this.password === 'password') {
                    localStorage.setItem('user-token', 'dummy-token');

                    // 리디렉션 처리
                    const redirectPath = this.$route.query.redirect || '/';
                    this.$router.push(redirectPath);
                } else {
                    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
                }
            } catch (err) {
                this.error = err.message || '로그인 중 오류가 발생했습니다.';
            } finally {
                this.loading = false;
            }
        },
        gotoRegister() {
            this.$router.push('/register');
        }
    }
}
</script>

<style scoped>
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
</style>