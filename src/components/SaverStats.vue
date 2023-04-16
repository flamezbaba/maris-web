<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  mdiCardsHeart,
  mdiPlusCircle,
  mdiScaleUnbalanced,
  mdiTimerOutline,
} from "@mdi/js";

const authStore = useAuthStore();
const router = useRouter();

const goto = () => {
  router.push({ name: "BuySaver" });
};

onMounted(() => {});
</script>

<template>
  <div class="saver-wrapper flex w-full justify-between" @click="goto()">
    <div class="one flex px-[7px] py-[1px] justify-between gap-2 items-center">
      <svg-icon
        type="mdi"
        size="20"
        :path="mdiCardsHeart"
        class="text-red-500"
      ></svg-icon>
      <span class="text-white font-semibold">
        {{ authStore.user?.life_balance ?? 0 }}
      </span>
      <svg-icon
        type="mdi"
        size="20"
        :path="mdiPlusCircle"
        class="text-green-500"
      ></svg-icon>
    </div>

    <div class="one flex px-[7px] py-[1px] justify-between gap-2 items-center">
      <svg-icon
        type="mdi"
        size="20"
        :path="mdiScaleUnbalanced"
        class="text-white"
      ></svg-icon>
      <span class="text-white font-semibold">{{
        authStore.user?.fifty_balance ?? 0
      }}</span>
      <svg-icon
        type="mdi"
        size="20"
        :path="mdiPlusCircle"
        class="text-green-500"
      ></svg-icon>
    </div>

    <div class="one flex px-[7px] py-[1px] justify-between gap-2 items-center">
      <svg-icon
        type="mdi"
        size="20"
        :path="mdiTimerOutline"
        class="text-white"
      ></svg-icon>
      <span class="text-white font-semibold">{{
        authStore.user?.time_balance ?? 0
      }}</span>
      <svg-icon
        type="mdi"
        size="20"
        :path="mdiPlusCircle"
        class="text-green-500"
      ></svg-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.saver-wrapper {
  .one {
    border: 1.3px solid #fff;
    border-radius: 10px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
