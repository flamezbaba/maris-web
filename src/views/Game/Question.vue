<script setup>
import { onMounted, computed, reactive, ref, onUnmounted } from "vue";
import _ from "lodash";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";
import { apiWrapper } from "@/helpers/apiwrapper";
import { mdiMenu, mdiTimer } from "@mdi/js";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import SaverStats from "@/components/SaverStats.vue";
import Loader from "@/components/Loader.vue";

const router = useRouter();
const authStore = useAuthStore();
const gameStore = useGameStore();

const level = gameStore.currentGameLevel;
const myTimer = ref();
const keepSec = ref();
const loading = ref(false);
const question = ref(gameStore.currentGame.questions[gameStore.currentIndex]);

const nextQuestion = () => {
  gameStore.serverSettings.seconds_per_question = keepSec.value;
  if (gameStore.currentIndex == gameStore.currentGame.questions.length - 1) {
    submitAns();
  } else {
    if (gameStore.currentIndex + 1 < gameStore.currentGame.questions.length) {
      gameStore.currentIndex++;
      question.value = gameStore.currentGame.questions[gameStore.currentIndex];
    }
  }
};

const nextQuestionDown = () => {
  gameStore.currentSeconds = 0;
  nextQuestion();
  startTimer();
};

const pickAnswer = (option) => {
  gameStore.answers[gameStore.currentIndex] = {
    question_id: option.question_id,
    option_id: option.id,
  };

  gameStore.currentSeconds = 0;
  nextQuestion();
  startTimer();
};

const doFifty = async () => {
  if (authStore.user.fifty_balance > 0) {
    if (question.value.options.length > 3) {
      loading.value = true;
      pauseTimer();
      const debit = await authStore.debitSaver({
        type: "fifty",
        amount: 1,
      });
      if (debit) {
        const correctOptionId = question.value.correct_option_id;
        const oldOptions = [...question.value.options];
        let newOptions = [];

        const remainingArr = [...oldOptions].filter((value, index, arr) => {
          if (value.id == correctOptionId) {
            newOptions.push(value);
            arr.splice(index, 1);
            return false;
          }
          return true;
        });

        const lastOption =
          remainingArr[Math.floor(Math.random() * remainingArr.length)];
        newOptions.push(lastOption);

        newOptions = _.shuffle(newOptions);
        question.value.options = newOptions;
      }
      loading.value = false;
      resumeTimer();
    }
  }
};

const doMoreTime = async () => {
  if (authStore.user.time_balance > 0) {
    loading.value = true;
    pauseTimer();
    const debit = await authStore.debitTime({
      type: "time",
      amount: 1,
    });
    if (debit) {
      // gameStore.currentSeconds = gameStore.currentSeconds + Number(debit);
      gameStore.serverSettings.seconds_per_question =
        Number(gameStore.serverSettings.seconds_per_question) + Number(debit);
    }
    loading.value = false;
    resumeTimer();
  }
};

const startTimer = () => {
  clearInterval(myTimer.value);
  myTimer.value = setInterval(() => {
    gameStore.currentSeconds++;
    if (
      gameStore.currentSeconds > gameStore.serverSettings.seconds_per_question
    ) {
      gameStore.currentSeconds = 0;
      nextQuestion();
      startTimer();
    }
  }, 1000);
};

const pauseTimer = () => {
  clearInterval(myTimer.value);
};

const restartTimer = () => {
  clearInterval(myTimer.value);
};

const resumeTimer = () => {
  startTimer();
};

const populateAns = () => {
  gameStore.answers = [...gameStore.currentGame.questions].map((item) => {
    return {
      option_id: null,
      question_id: item.id,
    };
  });
};

const submitAns = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`questions/submit`, {
    level_id: gameStore.currentGameLevel.level_id,
    answers: gameStore.answers,
  });
  if (response.data.status) {
    await authStore.getUser();
    gameStore.currentGameLevel.score = response.data.data.score;
    gameStore.completedLevel = { ...gameStore.currentGameLevel };

    if (
      gameStore.currentGameLevel.score >=
      gameStore.serverSettings.level_pass_percent
    ) {
      router.push({ name: "LevelCompleteScreen" });
    } else {
      router.push({ name: "FinishedScreen" });
    }

    gameStore.resetGameState();
  }

  loading.value = false;
};

const bg = computed(() => {
  return `background: linear-gradient(200deg, rgba(0,0,0,.9), rgba(21,12,38,.9)), url(${level.image_url})`;
});

const questionNumber = computed(() => {
  return gameStore.currentIndex + 1;
});

const totalQuestionNumber = computed(() => {
  return gameStore.currentGame.questions.length;
});

const showTime = computed(() => {
  return (
    Number(gameStore.serverSettings.seconds_per_question) -
    gameStore.currentSeconds
  );
});
onMounted(async () => {
  loading.value = true;
  await gameStore.getSettings();
  keepSec.value = gameStore.serverSettings.seconds_per_question;
  populateAns();
  startTimer();
  loading.value = false;
});

onUnmounted(async () => {
  clearInterval(myTimer.value);
});
</script>

<template>
  <MobileLayout>
    <template #thepage>
      <div class="w-full">
        <template v-if="loading">
          <Loader />
        </template>
        <div
          :style="bg"
          class="w-full min-h-screen flex flex-col px-[20px] py-[10px]"
        >
          <div class="top-header w-full flex justify-between">
            <p class="text-white font-bold uppercase text-lg">
              {{ level.name }}
            </p>
            <div class="text-white">
              <svg-icon type="mdi" size="25" :path="mdiMenu"></svg-icon>
            </div>
          </div>
          <div class="w-full mt-3">
            <SaverStats />
          </div>
          <div class="w-full flex justify-between mt-3">
            <div class="text-white flex gap-1 items-center">
              <svg-icon
                type="mdi"
                size="20"
                :path="mdiTimer"
                @click="navOpen = true"
              ></svg-icon>
              <span class="font-semibold">{{ showTime }}</span>
            </div>
            <p class="text-white font-bold uppercase text-lg">
              {{ questionNumber }} / {{ totalQuestionNumber }}
            </p>
          </div>
          <div
            class="w-full justify-center items-center flex gap-5 mt-[10px] mb-[10px]"
          >
            <button class="btn-blue" @click="doFifty">50:50</button>

            <button class="btn-green" @click="doMoreTime">
              <svg-icon
                type="mdi"
                size="20"
                :path="mdiTimer"
                @click="navOpen = true"
              ></svg-icon>
            </button>
          </div>
          <template v-if="question">
            <p>Question</p>
            <div class="box-blue w-full flex flex-col mt-3">
              <p
                class="text-lg"
                v-if="question.question"
                v-html="question.question"
              ></p>
              <p class="text-lg" v-if="question.image_url">
                <img :src="question.image_url" alt="" class="" />
              </p>
            </div>

            <div class="w-full flex flex-col gap-5 mt-[30px]">
              <template
                v-for="(option, index) in question.options"
                :key="option"
              >
                <div
                  class="box-blue w-full cursor-pointer"
                  @click="pickAnswer(option)"
                >
                  <p class="text-left font-semibold" v-html="option.option"></p>
                </div>
              </template>
            </div>
          </template>

          <div
            class="w-full justify-center items-center flex gap-5 mt-[60px] mb-[50px]"
          >
            <button class="btn-red w-full" @click="nextQuestionDown">
              Next
            </button>
          </div>
        </div>
      </div>
    </template>
  </MobileLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";
</style>
