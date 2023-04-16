<script setup>
import { ref, onMounted } from "vue";
import {
  mdiCardsHeart,
  mdiPlusCircle,
  mdiScaleUnbalanced,
  mdiTimerOutline,
} from "@mdi/js";

defineProps({
  title: String,
  link: {
    type: Object,
    default: {name: 'DashboardScreen'},
  },
});

onMounted(() => {});
</script>

<template>
  <router-link
    class="rounded-[40px] bg-[rgba(0,0,0,.8)] h-[50px] flex items-center justify-between px-[20px] gap-5"
    :to="link"
  >
    <div class="">
      <slot name="icon" />
    </div>
    <div class="flex-1">
      <p class="text-white font-semibold">{{ title }}</p>
    </div>
  </router-link>
</template>

<style lang="scss" scoped></style>
