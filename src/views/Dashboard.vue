<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { mdiMenu, mdiArrowRight, mdiShareVariant, mdiClose } from "@mdi/js";
import { useAuthStore } from "@/stores/auth";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import SaverStats from "@/components/SaverStats.vue";
import BalanceSlides from "@/components/BalanceSlides.vue";
import NavLink from "@/components/NavLink.vue";

const router = useRouter();
const authStore = useAuthStore();
const navOpen = ref(false);

const dok = async () => {
  router.push({ name: "ListLevelScreen" });
};

onMounted(() => {
  navOpen.value = false;
});
</script>

<template>
  <MobileLayout>
    <template #thepage>
      <div class="relative w-full">
        <div
          class="nav-wrapper w-full min-h-screen absolute z-[600]"
          v-if="navOpen"
        >
          <div class="w-full flex flex-col px-[20px] py-[20px]">
            <div @click="navOpen = false">
              <svg-icon
                type="mdi"
                size="35"
                :path="mdiClose"
                class="text-white"
              ></svg-icon>
            </div>

            <div
              class="mt-4 flex flex-col justify-center items-center text-white"
            >
              <img
                src="@/assets/img/default-avatar.png"
                class="w-[70px] rounded-full ring-1 ring-slate-200"
              />
              <p class="uppercase mt-2 font-bold">
                {{ authStore.user?.fullname }}
              </p>
              <p>{{ authStore.user?.email }}</p>
            </div>

            <div class="w-full flex flex-col mt-5">
              <NavLink title="Dashboard" :link="{ name: 'DashboardScreen' }">
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>

              <NavLink title="Referrals" class="mt-4" :link="{ name: 'Ref' }">
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>

              <NavLink
                title="Game Levels"
                :link="{ name: 'ListLevelScreen' }"
                class="mt-4"
              >
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>

              <NavLink title="Leader Board" :link="{ name: 'LeaderBoard' }" class="mt-4">
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>

              <NavLink
                title="Billing History"
                :link="{ name: 'PaymentHistory' }"
                class="mt-4"
              >
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>

              <NavLink
                title="Withdraw Funds"
                :link="{ name: 'Withdraw' }"
                class="mt-4"
              >
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>

              <NavLink
                title="Withdrawal History"
                :link="{ name: 'WithdrawalHistory' }"
                class="mt-4"
              >
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>

              <NavLink title="Profile" :link="{ name: 'Profile' }" class="mt-4">
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>

              <NavLink
                title="Settings"
                :link="{ name: 'Settings' }"
                class="mt-4"
              >
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>

              <NavLink
                title="Log Out"
                class="mt-4"
                :link="{ name: 'LoginScreen' }"
              >
                <template #icon>
                  <svg-icon
                    type="mdi"
                    size="25"
                    :path="mdiArrowRight"
                    class="text-white"
                  ></svg-icon>
                </template>
              </NavLink>
            </div>
          </div>
        </div>
        <div class="dashboard-wrapper w-full flex flex-col px-[20px] py-[20px]">
          <div class="top-header text-white flex justify-between">
            <svg-icon
              type="mdi"
              size="25"
              :path="mdiMenu"
              @click="navOpen = true"
            ></svg-icon>
            <div class="flex-1">
              <p class="font-bold text-center">Maris KnowlEDGE App</p>
            </div>
          </div>
          <div class="w-full mt-3">
            <p class="capitalize font-bold text-white">Hi, Welcome Back</p>
            <p class="uppercase font-bold text-white">
              {{ authStore.user?.fullname }}
            </p>
          </div>
          <div class="savers-stats w-full mt-3">
            <SaverStats />
          </div>
          <div class="w-full mt-5">
            <BalanceSlides />
          </div>
          <div
            @click="dok"
            class="bg-red-700 text-white flex flex-col justify-between items-center mt-4 rounded-lg py-[10px] gap-2"
          >
            <p class="font-bold text-lg">Level {{ authStore.user?.current_game_level }}</p>
            <img src="@/assets/img/cup.png" class="w-[20%]" alt="" />
            <div class="flex items-center text-lg">
              <svg-icon
                type="mdi"
                size="25"
                :path="mdiArrowRight"
                class="text-white"
              ></svg-icon>
              <span class="font-bold">Continue Game</span>
            </div>
          </div>
          <div class="mt-5">
            <button
              class="btn-green w-full"
              @click="$router.push({ name: 'Ref' })"
            >
              <svg-icon
                type="mdi"
                size="25"
                :path="mdiShareVariant"
                class="text-white"
              ></svg-icon>
              <span class="font-semibold"
                >Invite Your Friends to Maris app and get other advantages</span
              >
            </button>
          </div>
        </div>
      </div>
    </template>
  </MobileLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";
.nav-wrapper {
  background: linear-gradient(
      200deg,
      rgba(10, 0, 74, 0.8),
      rgba(21, 12, 38, 0.9)
    ),
    url("@/assets/img/nature1.jpg");
  background-size: cover;
  background-position: bottom;
}
.dashboard-wrapper {
  height: 100vh;
  .top {
    img {
      width: 60%;
    }
  }

  .bottom {
    .loading {
      .loading-front {
        transition: all 0.5s;
      }
    }
  }
}
</style>
