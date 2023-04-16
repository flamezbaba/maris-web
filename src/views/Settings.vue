<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import Loader from "@/components/Loader.vue";

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);

const goBack = () => {
  router.back();
};

onMounted(async () => {});
</script>

<template>
  <MobileLayout>
    <template #thepage>
      <div class="w-full">
        <template v-if="loading">
          <Loader />
        </template>
        <div class="w-full min-h-screen flex flex-col px-[20px] py-[10px]">
          <div class="top-header w-full text-white flex justify-between mt-4">
            <svg-icon
              type="mdi"
              size="25"
              :path="mdiArrowLeft"
              @click="goBack"
            ></svg-icon>
            <div class="flex-1">
              <p class="font-bold text-center">Settings</p>
            </div>
          </div>
          <div class="w-full flex flex-col mt-[60px]">
            <router-link
              class="box-blue justify-between"
              :to="{ name: 'Profile' }"
              ><span class="font-bold">Account</span
              ><svg-icon type="mdi" size="25" :path="mdiArrowRight"></svg-icon
            ></router-link>

            <router-link
              class="box-blue justify-between mt-8"
              :to="{ name: 'Bank' }"
              ><span class="font-bold">PayOut Bank Details</span
              ><svg-icon type="mdi" size="25" :path="mdiArrowRight"></svg-icon
            ></router-link>

            <router-link
              class="box-blue justify-between mt-8"
              :to="{ name: 'Security' }"
              ><span class="font-bold">Privacy & Security</span
              ><svg-icon type="mdi" size="25" :path="mdiArrowRight"></svg-icon
            ></router-link>

            <a class="box-blue justify-between mt-8" href="mailto:support@esthermaris.com"
              ><span class="font-bold">Help & Support</span
              ><svg-icon type="mdi" size="25" :path="mdiArrowRight"></svg-icon
            ></a>
          </div>
        </div>
      </div>
    </template>
  </MobileLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";
.pshow {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
