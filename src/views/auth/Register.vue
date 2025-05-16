<template>
    <div class="register-page">
        <div class="container mx-auto py-12 px-4">
            <div class="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8">
                <h1 class="text-3xl font-bold mb-6 text-center">회원가입</h1>

                <form @submit.prevent="handleRegister" class="space-y-6">
                    <div class="form-group">
                        <label for="name" class="block text-lg mb-2">이름</label>
                        <input type="text" id="name" v-model="name" class="input-field" placeholder="이름을 입력하세요" required
                            maxlength="20">
                    </div>

                    <div class="form-group">
                        <label for="userId" class="block text-lg mb-2">아이디</label>
                        <div class="flex space-x-2">
                            <input type="text" id="userId" v-model="userId" class="input-field"
                                placeholder="사용할 아이디를 입력하세요" required maxlength="20">
                            <button type="button" @click="checkUserId"
                                class="bg-primary text-white px-4 py-2 rounded whitespace-nowrap">
                                중복확인
                            </button>
                        </div>
                        <p v-if="idChecked && isIdAvailable" class="text-sm text-green-600 mt-1">
                            사용 가능한 아이디입니다.
                        </p>
                        <p v-if="idChecked && !isIdAvailable" class="text-sm text-red-600 mt-1">
                            이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.
                        </p>
                    </div>

                    <div class="form-group">
                        <label for="email" class="block text-lg mb-2">이메일</label>
                        <input type="email" id="email" v-model="email" class="input-field" placeholder="이메일 주소를 입력하세요"
                            required maxlength="50">
                    </div>

                    <div class="form-group">
                        <label for="password" class="block text-lg mb-2">비밀번호</label>
                        <input type="password" id="password" v-model="password" class="input-field"
                            placeholder="비밀번호를 입력하세요" @input="validatePassword" required maxlength="20">
                        <div class="mt-2">
                            <p class="text-sm" :class="passwordLength ? 'text-green-600' : 'text-gray-600'">
                                ✓ 8자 이상
                            </p>
                            <p class="text-sm" :class="passwordNumber ? 'text-green-600' : 'text-gray-600'">
                                ✓ 숫자 포함
                            </p>
                            <p class="text-sm" :class="passwordSpecial ? 'text-green-600' : 'text-gray-600'">
                                ✓ 특수문자 포함
                            </p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword" class="block text-lg mb-2">비밀번호 확인</label>
                        <input type="password" id="confirmPassword" v-model="confirmPassword" class="input-field"
                            placeholder="비밀번호를 다시 입력하세요" @input="checkPasswordMatch" required maxlength="20">
                        <p v-if="confirmPassword && !passwordsMatch" class="text-sm text-red-600 mt-1">
                            비밀번호가 일치하지 않습니다.
                        </p>
                        <p v-if="confirmPassword && passwordsMatch" class="text-sm text-green-600 mt-1">
                            비밀번호가 일치합니다.
                        </p>
                    </div>

                    <div class="form-group">
                        <label class="block text-lg mb-2">생년월일</label>
                        <div class="grid grid-cols-3 gap-2">
                            <div>
                                <select v-model="birthYear" class="input-field" required>
                                    <option value="" disabled selected>년도</option>
                                    <option v-for="year in birthYearOptions" :key="year" :value="year">{{ year }}년
                                    </option>
                                </select>
                            </div>
                            <div>
                                <select v-model="birthMonth" class="input-field" required>
                                    <option value="" disabled selected>월</option>
                                    <option v-for="month in 12" :key="month" :value="month">{{ month }}월</option>
                                </select>
                            </div>
                            <div>
                                <select v-model="birthDay" class="input-field" required>
                                    <option value="" disabled selected>일</option>
                                    <option v-for="day in daysInMonth" :key="day" :value="day">{{ day }}일</option>
                                </select>
                            </div>
                        </div>
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
                                <span class="text-gray-700">(필수) 이용약관과 개인정보 처리방침에 동의합니다.</span>
                                <a href="#" @click.prevent="showTerms" class="text-primary hover:underline ml-1">약관
                                    보기</a>
                            </span>
                        </label>
                    </div>

                    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {{ error }}
                    </div>

                    <button type="submit" class="w-full py-3 bg-primary text-white rounded-lg text-lg font-bold"
                        :disabled="loading">
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

        <!-- 이용약관 모달 -->
        <div v-if="showTermsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold">이용약관 및 개인정보 처리방침</h2>
                    <button @click="showTermsModal = false" class="text-gray-500 hover:text-gray-700">
                        <span class="text-2xl">&times;</span>
                    </button>
                </div>
                <div class="terms-content mb-6">
                    <h3 class="text-lg font-semibold mb-2">이용약관</h3>
                    <p class="mb-4">
                        본 이용약관은 '삶은(SilverLife)' 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
                        합니다.
                    </p>
                    <h4 class="font-medium mb-1">제1조 (목적)</h4>
                    <p class="mb-3">
                        본 약관은 삶은(SilverLife) 애플리케이션 서비스 이용에 관한 조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임 등 기타 필요한 사항을 규정하는 것을 목적으로
                        합니다.
                    </p>

                    <h4 class="font-medium mb-1">제2조 (용어의 정의)</h4>
                    <p class="mb-3">
                        본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                        <br>1. "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.
                        <br>2. "회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.
                        <br>3. "계정정보"란 회원의 이메일, 비밀번호, 성명 등 회원이 회사에 제공한 정보를 의미합니다.
                    </p>

                    <h3 class="text-lg font-semibold mb-2 mt-6">개인정보 처리방침</h3>
                    <p class="mb-4">
                        삶은(SilverLife) 서비스는 회원의 개인정보를 중요시하며, '정보통신망 이용촉진 및 정보보호 등에 관한 법률', '개인정보 보호법' 등 개인정보 보호 법령을 준수하고
                        있습니다.
                    </p>
                    <h4 class="font-medium mb-1">제1조 (수집하는 개인정보 항목)</h4>
                    <p class="mb-3">
                        회사는 회원가입, 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
                        <br>1. 필수 항목: 이름, 이메일, 비밀번호, 생년월일, 성별
                        <br>2. 서비스 이용 과정에서 생성되는 정보: 접속 로그, 쿠키, 서비스 이용 기록
                    </p>

                    <h4 class="font-medium mb-1">제2조 (개인정보의 수집 및 이용목적)</h4>
                    <p class="mb-3">
                        회사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.
                        <br>1. 회원 관리: 회원제 서비스 제공, 개인식별, 불량회원 차단
                        <br>2. 서비스 제공: 맞춤형 콘텐츠 제공, 건강관리 서비스
                        <br>3. 마케팅 및 광고: 이벤트 정보 및 참여기회 제공(마케팅 정보 수신 동의 시)
                    </p>
                </div>
                <div class="flex justify-end">
                    <button @click="showTermsModal = false" class="bg-primary text-white px-4 py-2 rounded">
                        닫기
                    </button>
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
            userId: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthYear: '',
            birthMonth: '',
            birthDay: '',
            gender: '',
            agreeTerms: false,
            loading: false,
            error: null,

            // 비밀번호 유효성 검사
            passwordLength: false,
            passwordNumber: false,
            passwordSpecial: false,
            passwordsMatch: false,

            // 아이디 중복 확인
            idChecked: false,
            isIdAvailable: false,

            // 이용약관 모달
            showTermsModal: false
        }
    },
    computed: {
        birthYearOptions() {
            const currentYear = new Date().getFullYear();
            const years = [];
            // 최신 년도부터 과거 순으로 정렬
            for (let i = currentYear; i >= currentYear - 100; i--) {
                years.push(i);
            }
            return years;
        },
        daysInMonth() {
            if (!this.birthYear || !this.birthMonth) return 31;

            const daysMap = {
                1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
                7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
            };

            // 윤년 계산
            if (this.birthMonth === 2) {
                if ((this.birthYear % 4 === 0 && this.birthYear % 100 !== 0) || this.birthYear % 400 === 0) {
                    return 29;
                }
            }

            return daysMap[this.birthMonth];
        },
        formIsValid() {
            const passwordValid = this.passwordLength && this.passwordNumber && this.passwordSpecial;
            const birthDateValid = this.birthYear && this.birthMonth && this.birthDay;

            return (
                this.name.trim() !== '' &&
                this.userId.trim() !== '' &&
                this.idChecked &&
                this.isIdAvailable &&
                this.email.trim() !== '' &&
                passwordValid &&
                this.passwordsMatch &&
                birthDateValid &&
                this.gender !== '' &&
                this.agreeTerms
            );
        }
    },
    watch: {
        birthMonth() {
            // 일자가 해당 월의 최대 일자보다 크면 최대 일자로 조정
            if (this.birthDay > this.daysInMonth) {
                this.birthDay = this.daysInMonth;
            }
        }
    },
    methods: {
        checkUserId() {
            if (!this.userId) {
                alert('아이디를 입력해주세요.');
                return;
            }

            // 아이디 유효성 검사 (영문, 숫자만 허용)
            if (!/^[a-zA-Z0-9]+$/.test(this.userId)) {
                alert('아이디는 영문자와 숫자만 사용 가능합니다.');
                return;
            }

            // 실제 구현에서는 API 요청을 통해 중복 확인
            // axios.get(`/api/users/check-id?userId=${this.userId}`)
            // .then(response => {
            // this.idChecked = true;
            // this.isIdAvailable = response.data.available;
            // })
            // .catch(error => {
            // console.error('아이디 중복 확인 중 오류 발생:', error);
            // alert('아이디 중복 확인 중 오류가 발생했습니다.');
            // });

            // 더미 구현: 테스트를 위해 랜덤하게 결과 반환
            setTimeout(() => {
                this.idChecked = true;
                // "admin", "test", "user"는 이미 사용 중인 아이디로 처리
                this.isIdAvailable = !['admin', 'test', 'user'].includes(this.userId.toLowerCase());

                if (this.isIdAvailable) {
                    // 사용 가능한 경우 아이디 입력란을 비활성화하여 변경 방지
                    // 실제 구현에서는 추가 로직을 통해 아이디 변경 시 중복 확인 상태 초기화 필요
                } else {
                    // 사용 불가능한 경우 포커스 이동
                    this.$nextTick(() => {
                        document.getElementById('userId').focus();
                    });
                }
            }, 500);
        },
        validatePassword() {
            // 8자 이상
            this.passwordLength = this.password.length >= 8;

            // 숫자 포함
            this.passwordNumber = /[0-9]/.test(this.password);

            // 특수문자 포함
            this.passwordSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);

            // 비밀번호가 변경되면 확인도 다시 체크
            if (this.confirmPassword) {
                this.checkPasswordMatch();
            }
        },
        checkPasswordMatch() {
            this.passwordsMatch = this.password === this.confirmPassword;
        },
        showTerms() {
            this.showTermsModal = true;
        },
        validateForm() {
            const errors = [];

            if (!this.name.trim()) {
                errors.push('이름을 입력해주세요.');
            }

            if (!this.userId.trim()) {
                errors.push('아이디를 입력해주세요.');
            } else if (!this.idChecked) {
                errors.push('아이디 중복 확인을 해주세요.');
            } else if (!this.isIdAvailable) {
                errors.push('사용 가능한 아이디로 변경해주세요.');
            }

            if (!this.email.trim()) {
                errors.push('이메일을 입력해주세요.');
            }

            if (!this.password) {
                errors.push('비밀번호를 입력해주세요.');
            } else if (!this.passwordLength || !this.passwordNumber || !this.passwordSpecial) {
                errors.push('비밀번호는 8자 이상이며, 숫자와 특수문자를 포함해야 합니다.');
            }

            if (!this.confirmPassword) {
                errors.push('비밀번호 확인을 입력해주세요.');
            } else if (!this.passwordsMatch) {
                errors.push('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            }

            if (!this.birthYear || !this.birthMonth || !this.birthDay) {
                errors.push('생년월일을 모두 선택해주세요.');
            }

            if (!this.gender) {
                errors.push('성별을 선택해주세요.');
            }

            if (!this.agreeTerms) {
                errors.push('이용약관에 동의해주세요.');
            }

            return errors;
        },
        async handleRegister() {
            const errors = this.validateForm();

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                // 생년월일을 Date 객체로 변환하여 나이 계산
                const birthDate = new Date(this.birthYear, this.birthMonth - 1, this.birthDay);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                // 실제 구현에서는 Vuex 액션 호출 또는 API 요청
                // await this.$store.dispatch('auth/register', { 
                //   name: this.name,
                //   userId: this.userId,
                //   email: this.email, 
                //   password: this.password,
                //   birthDate: `${this.birthYear}-${this.birthMonth.toString().padStart(2, '0')}-${this.birthDay.toString().padStart(2, '0')}`,
                //   age: age,
                //   gender: this.gender
                // });

                // 더미 회원가입 처리
                await new Promise(resolve => setTimeout(resolve, 1500));

                // 성공 시 로그인 페이지로 이동
                alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
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

.terms-content {
    max-height: 50vh;
    overflow-y: auto;
}
</style>