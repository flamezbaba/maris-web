<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { mdiArrowLeft } from "@mdi/js";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import Loader from "@/components/Loader.vue";

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);

const goBack = () => {
  router.push({ name: "Ref" });
};

onMounted(async () => {

});
</script>

<template>
  <MobileLayout>
    <template #thepage>
      <div class="w-full">
        <template v-if="loading">
          <Loader />
        </template>
        <div class="w-full min-h-screen flex flex-col px-[20px] py-[10px]">
          <div class="top-header w-full text-white flex justify-between">
            <svg-icon
              type="mdi"
              size="25"
              :path="mdiArrowLeft"
              @click="goBack"
            ></svg-icon>
            <div class="flex-1">
              <p class="font-bold text-center">My Referrals</p>
            </div>
          </div>
          <div class="w-full flex flex-col mt-3">
            <div class="btn-blue text-left mt-4 uppercase" v-for="ref,index in authStore.user.referrals" :key="index">
              {{ ref.fullname }}
               
            </div>
          </div>
        </div>
      </div>
    </template>
  </MobileLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";
.pshow{
    background-color: rgba(255, 255, 255,.2);
}
</style>
