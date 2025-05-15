// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 페이지 컴포넌트 불러오기
const Home = () => import("../views/Home.vue");
// 인증 관련 페이지
const Login = () => import("../views/auth/Login.vue");
const Register = () => import("../views/auth/Register.vue");
// 교육 관련 페이지
const Education = () => import("../views/education/EducationList.vue");
const EducationDetail = () => import("../views/education/EducationDetail.vue");
const Learning = () => import ("../views/education/Learning.vue");
const EducationCreator = () => import ("../views/education/EducationCreator.vue");
// 키오스크 관련 페이지
const Kiosk = () => import("../views/kiosk/KioskList.vue");
const KioskSimulator = () => import("../views/kiosk/KioskSimulator.vue");
// 다른 기능 페이지들
const Diet = () => import("../views/diet/DietRecommendation.vue");
const Games = () => import("../views/games/GamesList.vue");
const GamePlay = () => import("../views/games/GamePlay.vue");
const Policy = () => import("../views/policy/PolicyList.vue");
const PolicyDetail = () => import("../views/policy/PolicyDetail.vue");
// 사용자 관련 페이지
const Profile = () => import("../views/user/Profile.vue");
const Settings = () => import("../views/user/Settings.vue");
// 오류 페이지
const NotFound = () => import("../views/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "홈 - 삶은(SilverLife)" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "로그인 - 삶은(SilverLife)" },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "회원가입 - 삶은(SilverLife)" },
  },
  {
    path: "/education",
    name: "Education",
    component: Education,
    meta: { title: "디지털 교육 - 삶은(SilverLife)" },
  },
  {
    path: "/education/:id",
    name: "EducationDetail",
    component: EducationDetail,
    props: true,
    meta: { title: "교육 콘텐츠 - 삶은(SilverLife)" },
  },
  {
    path: '/education/:id/learn',
    name: 'Learning',
    component: Learning,
    props: true,
    meta: { title: "교육 하기 - 삶은(SilverLife)" },
  },
  {
    path: '/creator/education',
    name: 'EducationCreator',
    component: EducationCreator,
    meta: { title: "교육 콘텐츠 생성 - 삶은(SilverLife)" },
  },
  {
    path: '/creator/education/:id/edit',
    name: 'EducationEditor',
    component: EducationCreator,
    props: true,
    meta: { title: "교육 콘텐츠 수정 - 삶은(SilverLife)" },
  },
  {
    path: "/kiosk",
    name: "Kiosk",
    component: Kiosk,
    meta: { title: "키오스크 실습 - 삶은(SilverLife)" },
  },
  {
    path: "/kiosk/:id",
    name: "KioskSimulator",
    component: KioskSimulator,
    props: true,
    meta: { title: "키오스크 시뮬레이터 - 삶은(SilverLife)" },
  },
  {
    path: "/diet",
    name: "Diet",
    component: Diet,
    meta: { title: "맞춤 식단 - 삶은(SilverLife)" },
  },
  {
    path: "/games",
    name: "Games",
    component: Games,
    meta: { title: "인지력 게임 - 삶은(SilverLife)" },
  },
  {
    path: "/games/:id",
    name: "GamePlay",
    component: GamePlay,
    props: true,
    meta: { title: "게임 플레이 - 삶은(SilverLife)" },
  },
  {
    path: "/policy",
    name: "Policy",
    component: Policy,
    meta: { title: "정책 정보 - 삶은(SilverLife)" },
  },
  {
    path: "/policy/:id",
    name: "PolicyDetail",
    component: PolicyDetail,
    props: true,
    meta: { title: "정책 상세 - 삶은(SilverLife)" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "내 정보 - 삶은(SilverLife)",
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      title: "설정 - 삶은(SilverLife)",
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { title: "페이지를 찾을 수 없습니다 - 삶은(SilverLife)" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 전역 네비게이션 가드
router.beforeEach((to, from, next) => {
  // 페이지 타이틀 변경
  document.title = to.meta.title || "삶은(SilverLife)";

  // 인증 필요한 페이지 확인
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 실제 구현에서는 Vuex나 다른 인증 상태 확인 방법 사용
    const isLoggedIn = localStorage.getItem("user-token");

    if (!isLoggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
