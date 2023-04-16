<script setup>
import { onMounted, computed,reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";
import { apiWrapper } from "@/helpers/apiwrapper";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";

const router = useRouter();
const authStore = useAuthStore();
const gameStore = useGameStore();

const level = gameStore.currentGameLevel;

const goBack = () => {
  gameStore.currentGameLevel = {};
  router.push({name: 'ListLevelScreen'});
};

gameStore.currentGame.questions = [];

const startGame = async () => {
  try {
    const response = await apiWrapper.post(`get_question_per_level`, {
      level_id: level.level_id,
    });
    
    if (response.data.status) {
      gameStore.currentGame.questions = response.data.data;
      router.push({ name: "QuestionScreen" });
    }
  } catch (err) {
    console.log("err from start", err.message);
  }
};

const bg = computed(() => {
  return `background: linear-gradient(200deg, rgba(10,0,74,.5), rgba(21,12,38,.3)), url(${level.image_url}); background-position:center;`;
});

onMounted(() => {
  gameStore.resetGameState();
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
  }
});
</script>

<template>
  <MobileLayout>
    <template #thepage>
      <div class="relative w-full">
        <div
          :style="bg"
          class="wrapper w-full h-screen flex justify-between items-center flex-col px-[20px] py-[40px]"
        >
          <div
            class="mt-5 flex flex-col justify-center items-center text-white"
          >
            <p class="text-[30px] uppercase font-bold">{{ level?.name }}</p>
            <p class="text-[20px] uppercase font-bold">{{ level?.title }}</p>
          </div>

          <div class="mt-[30px] w-full flex justify-center">
            <img src="@/assets/img/kingcap.png" class="w-[50%]" />
            <!-- <p class="">Congratulations</p> -->
          </div>

          <div class="mt-[60px] w-full flex flex-col justify-center">
            <button class="btn-green w-full" @click="startGame">Play</button>
            <button class="btn-red w-full mt-5" @click="goBack">Back</button>
          </div>
        </div>
      </div>
    </template>
  </MobileLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";
</style>
