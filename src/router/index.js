import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import SplashScreen from "@/views/Splash.vue";
import DashboardScreen from "@/views/Dashboard.vue";
import LoginScreen from "@/views/Login.vue";
import RegisterScreen from "@/views/Register.vue";
import Forgot from "@/views/Forgot.vue";
import Reset from "@/views/Reset.vue";
import BuySaver from "@/views/BuySaver.vue";
import ListLevelScreen from "@/views/Game/Levels.vue";
import LevelCompleteScreen from "@/views/Game/Complete.vue";
import LevelStartScreen from "@/views/Game/Start.vue";
import QuestionScreen from "@/views/Game/Question.vue";
import FinishedScreen from "@/views/Game/Finished.vue";
import WithdrawalHistory from "@/views/Billing/WithdrawalHistory.vue";
import PaymentHistory from "@/views/Billing/PaymentHistory.vue";
import Ref from "@/views/Ref.vue";
import RefList from "@/views/RefList.vue";
import Bank from "@/views/Bank.vue";
import Security from "@/views/Security.vue";
import Profile from "@/views/Profile.vue";
import Settings from "@/views/Settings.vue";
import LeaderBoard from "@/views/LeaderBoard.vue";
import Withdraw from "@/views/Billing/Withdraw.vue";
import Upgrade from "@/views/Billing/Upgrade.vue";
import PayStatus from "@/views/Billing/Status.vue";




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: SplashScreen,
    },
    {
      path: "/login",
      name: "LoginScreen",
      component: LoginScreen,
    },
    {
      path: "/register",
      name: "RegisterScreen",
      component: RegisterScreen,
    },
    {
      path: "/forgot-password",
      name: "Forgot",
      component: Forgot,
    },
    {
      path: "/reset-password",
      name: "Reset",
      component: Reset,
    },
    {
      path: "/dashboard",
      name: "DashboardScreen",
      component: DashboardScreen,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/game/levels",
      name: "ListLevelScreen",
      component: ListLevelScreen,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/game/start",
      name: "LevelStartScreen",
      component: LevelStartScreen,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/game/level/complete",
      name: "LevelCompleteScreen",
      component: LevelCompleteScreen,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/game/active",
      name: "QuestionScreen",
      component: QuestionScreen,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/game/finished",
      name: "FinishedScreen",
      component: FinishedScreen,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/history/payments",
      name: "PaymentHistory",
      component: PaymentHistory,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/history/withdrawal",
      name: "WithdrawalHistory",
      component: WithdrawalHistory,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/buy/savers",
      name: "BuySaver",
      component: BuySaver,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/ref",
      name: "Ref",
      component: Ref,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/history/referrals",
      name: "RefList",
      component: RefList,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/withdraw",
      name: "Withdraw",
      component: Withdraw,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/settings/bank",
      name: "Bank",
      component: Bank,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/settings/security",
      name: "Security",
      component: Security,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/settings/profile",
      name: "Profile",
      component: Profile,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/leaderboard",
      name: "LeaderBoard",
      component: LeaderBoard,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/upgrade",
      name: "Upgrade",
      component: Upgrade,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/billing/status/:uuid",
      name: "PayStatus",
      component: PayStatus,
      meta: {
        requiredAuth: true,
      },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  // if (to.meta.requiredAuth && !auth.userToken) {
  if (to.meta.requiredAuth && !auth.user) {
    return { name: "LoginScreen" };
  }
});

export default router;
