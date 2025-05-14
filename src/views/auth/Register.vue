<template>
    <div class="register-page">
        <div class="container mx-auto py-12 px-4">
            <div class="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8">
                <h1 class="text-3xl font-bold mb-6 text-center">회원가입</h1>

                <form @submit.prevent="handleRegister" class="space-y-6">
                    <div class="form-group">
                        <label for="name" class="block text-lg mb-2">이름</label>
                        <input type="text" id="name" v-model="name" class="input-field" placeholder="이름을 입력하세요"
                            required>
                    </div>

                    <div class="form-group">
                        <label for="email" class="block text-lg mb-2">이메일</label>
                        <input type="email" id="email" v-model="email" class="input-field" placeholder="이메일 주소를 입력하세요"
                            required>
                    </div>

                    <div class="form-group">
                        <label for="password" class="block text-lg mb-2">비밀번호</label>
                        <input type="password" id="password" v-model="password" class="input-field"
                            placeholder="비밀번호를 입력하세요" required>
                        <p class="text-sm text-gray-600 mt-1">비밀번호는 8자 이상이어야 하며, 숫자와 특수문자를 포함해야 합니다.</p>
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword" class="block text-lg mb-2">비밀번호 확인</label>
                        <input type="password" id="confirmPassword" v-model="confirmPassword" class="input-field"
                            placeholder="비밀번호를 다시 입력하세요" required>
                    </div>

                    <div class="form-group">
                        <label for="age" class="block text-lg mb-2">나이</label>
                        <input type="number" id="age" v-model="age" class="input-field" placeholder="나이를 입력하세요" min="1"
                            max="120">
                    </div>

                    <div class="form-group">
                        <label class="block text-lg mb-2">성별</label>
                        <div class="flex space-x-4">
                            <label class="flex items-center">
                                <input type="radio" v-model="gender" value="male" class="h-5 w-5 text-primary">
                                <span class="ml-2">남성</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" v-model="gender" value="female" class="h-5 w-5 text-primary">
                                <span class="ml-2">여성</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="flex items-start">
                            <input type="checkbox" v-model="agreeTerms" class="h-5 w-5 mt-1 text-primary" required>
                            <span class="ml-2">
                                <span class="text-gray-700">이용약관과 개인정보 처리방침에 동의합니다.</span>
                                <a href="#" class="text-primary hover:underline ml-1">약관 보기</a>
                            </span>
                        </label>
                    </div>

                    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {{ error }}
                    </div>

                    <button type="submit" class="w-full py-3 bg-primary text-white rounded-lg text-lg font-bold"
                        :disabled="loading || !isFormValid">
                        {{ loading ? '가입 중...' : '회원가입' }}
                    </button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-gray-600">
                        이미 계정이 있으신가요?
                        <router-link to="/login" class="text-primary hover:underline">로그인</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            age: null,
            gender: '',
            agreeTerms: false,
            loading: false,
            error: null
        }
    },
    computed: {
        isFormValid() {
            return (
                this.name.trim() !== '' &&
                this.email.trim() !== '' &&
                this.password.length >= 8 &&
                this.password === this.confirmPassword &&
                this.agreeTerms
            );
        }
    },
    methods: {
        async handleRegister() {
            if (!this.isFormValid) {
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                // 실제 구현에서는 Vuex 액션 호출 또는 API 요청
                // await this.$store.dispatch('auth/register', { 
                //   name: this.name,
                //   email: this.email, 
                //   password: this.password,
                //   age: this.age,
                //   gender: this.gender
                // });

                // 더미 회원가입 처리
                await new Promise(resolve => setTimeout(resolve, 1500));

                // 성공 시 로그인 페이지로 이동
                this.$router.push('/login');
            } catch (err) {
                this.error = err.message || '회원가입 중 오류가 발생했습니다.';
            } finally {
                this.loading = false;
            }
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