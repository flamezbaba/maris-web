<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "@/stores/game";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";

const router = useRouter();
const gameStore = useGameStore();

const level = gameStore.currentGameLevel;

const endGame = () => {
  gameStore.completedLevel = {};
  router.push({name: 'ListLevelScreen'});
};

const retry = () => {
    router.push({name: 'LevelStartScreen'});
};

onMounted(() => {
    gameStore.resetGameState();
});
</script>

<template>
  <MobileLayout>
    <template #thepage>
      <div class="relative w-full">
        <div
          class="dashboard-wrapper w-full flex justify-center flex-col px-[20px] py-[20px]"
        >
          <div
            class="mt-5 flex flex-col justify-center items-center text-white"
          >
            <p class="text-[30px] uppercase font-bold">{{ level?.name }}</p>
            <p class="text-[20px] uppercase font-bold">{{ level?.title }}</p>
          </div>

          <div class="mt-[30px] w-full flex flex-col justify-center items-center">
            <div
              class="bg-red-600 w-[200px] h-[200px] rounded-full mt-[40px] flex justify-center items-center"
            >
              <p class="text-white font-bold text-[30px]">
                {{ level.score ?? 0 }}%
              </p>
            </div>
            <p class="mt-2 text-lg font-bold text-white">You Need {{ gameStore.serverSettings.level_pass_percent }}% to move to the next level</p>
          </div>

          <div class="mt-[60px] w-full flex flex-col justify-center">
            <button class="btn-green" @click="retry">Retry</button>
            <button class="btn-red mt-5" @click="endGame">End Game</button>
          </div>
        </div>
      </div>
    </template>
  </MobileLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";
</style>
