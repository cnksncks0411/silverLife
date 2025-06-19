# silver-life

## Project setup
```
npm install
```

### 개발 환경 빌드
```
npm run build:dev
```

### 프로덕션 환경 빌드
```
npm run build:prod
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 필요한 UI 라이브러리 설치 (Element Plus / Vuetify)
```
npm install element-plus
```

### 반응형 디자인을 위한 라이브러리 설치 (tailwind 3)
```
npm install -D tailwindcss@3
```

### Tailwind CSS 초기화
```
npx tailwindcss init -p
```

### Axios 설치 (API 통신용)
```
npm install axios
```

### 기타 유용한 패키지 설치
```
npm install lodash moment vue-i18n
```

## 소컬 정적 파일 서버 사용
### serve 패키지 설치
```
npm install -g serve
```

### dist 폴더 서빙
```
serve -s dist
```


## Short TODO
- 회원가입 > 비밀번호 입력 시 유효성 검사를 통해 가능 불가능 관련 메시지 표출 및 비밀번호와 비밀번호 확인 간 비교 로직 필요
- 회원가입 > 나이를 생년월일로 등록할 수 있도록 해야 함.
- 회원가입 > 이용약관 = require, 약관 페이지 필요
- 회원가입 > 회원가입 버튼 클릭 시 유효성 검사를 통해 입력하지 않은 항목 안내 alert 필요
- 로그인 > 이메일 대신 아이디로 변경


## Long TODO
- 회원가입 > 아이디 중복확인 필요
- 회원가입 > 소셜 계정 회원가입 (구글, 네이버, 카카오, 페이스북)
- 회원가입 > 본인인증
- 로그인 > '비밀번호 찾기' 클릭 시 비밀번호 찾기로 이동 되어야 함. (찾기 방식 고민 필요. 이메일로 코드 전송이 무료로 사용하기 좋을 것 같음)