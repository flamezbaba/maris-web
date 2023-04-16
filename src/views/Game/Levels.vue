<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { mdiArrowLeft, mdiGamepad, mdiCheck } from "@mdi/js";
import { apiWrapper } from "@/helpers/apiwrapper";
import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";
import Swal from "sweetalert2";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import Loader from "@/components/Loader.vue";

const router = useRouter();
const authStore = useAuthStore();
const gameStore = useGameStore();
const gameLevels = ref([]);
const loading = ref(false);

const getLevels = async () => {
  try {
    const response = await apiWrapper.get(`user_game_levels`, {});
    if (response.data.status) {
      gameLevels.value = response.data.data;
    }
  } catch (err) {
    console.log("err from levels", err.message);
  }
};

const goBack = () => {
  router.push({ name: "DashboardScreen" });
};

const goToComplete = (level) => {
  gameStore.completedLevel = level;
  router.push({ name: "LevelCompleteScreen" });
};

const playLevel = (level) => {
  if (authStore.user.premium_due == 1) {
    Swal.fire({
      title: "Upgrade to premium",
      text: "Upgrade to premium to continue playing",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Upgrade to Premium",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({ name: "Upgrade" });
      }
    });
  } else {
    gameStore.currentGameLevel = level;
    router.push({ name: "LevelStartScreen" });
  }
};

onMounted(async () => {
  loading.value = true;
  await authStore.getUser();
  gameStore.currentGameLevel = {};
  gameStore.currentGame = {};
  getLevels();
  loading.value = false;
});
</script>

<template>
  <MobileLayout>
    <template #thepage>
      <div class="relative w-full">
        <template v-if="loading">
          <Loader />
        </template>
        <div class="dashboard-wrapper w-full flex flex-col px-[20px] py-[20px]">
          <div class="top-header text-white flex justify-between">
            <svg-icon
              type="mdi"
              size="25"
              :path="mdiArrowLeft"
              @click="goBack"
            ></svg-icon>
            <div class="flex-1">
              <p class="font-bold text-center">Game Levels</p>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap justify-between gap-10">
            <template v-for="(level, index) in gameLevels" :key="index">
              <template
                v-if="level.level_id == authStore.user.current_game_level"
              >
                <div
                  @click="playLevel(level)"
                  class="rounded-lg bg-red-400 w-5/12 h-[120px] flex flex-col justify-between"
                >
                  <div class="flex justify-center items-center flex-1">
                    <svg-icon
                      type="mdi"
                      size="35"
                      :path="mdiGamepad"
                      class="text-white"
                    ></svg-icon>
                  </div>
                  <div
                    class="text-center p-1 bg-blue-600 rounded-bl-lg rounded-br-lg"
                  >
                    <p class="font-semibold text-white">Play Now</p>
                  </div>
                </div></template
              >
              <template v-else-if="level.played">
                <div
                  @click="goToComplete(level)"
                  class="rounded-lg bg-red-400 w-5/12 h-[120px] flex flex-col justify-between"
                >
                  <div class="flex justify-center items-center flex-1">
                    <svg-icon
                      type="mdi"
                      size="35"
                      :path="mdiCheck"
                      class="text-white"
                    ></svg-icon>
                  </div>
                  <div
                    class="text-center p-1 bg-blue-600 rounded-bl-lg rounded-br-lg"
                  >
                    <p class="font-semibold text-white">
                      Level {{ level.level_id }}
                    </p>
                  </div>
                </div>
              </template>
              <template v-else> </template>
            </template>
          </div>
        </div>
      </div>
    </template>
  </MobileLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";
</style>
