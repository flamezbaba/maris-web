<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { apiWrapper } from "@/helpers/apiwrapper";
import { mdiClose, mdiHeart, mdiScaleUnbalanced, mdiTimer } from "@mdi/js";
import Swal from "sweetalert2";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import SaverStats from "@/components/SaverStats.vue";
import Loader from "@/components/Loader.vue";

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const showShare = ref(false);

const goBack = () => {
  router.push({ name: "DashboardScreen" });
};

const gotoRef = () => {
  router.push({ name: "RefList" });
};

const copyUser = async () => {
  try {
    const url = `https://app.esthermaris.com/register?ref=${authStore.user.username}`;
    await navigator.clipboard.writeText(url);
    Swal.fire({
      icon: "success",
      text: "Referral Link Copied",
    });
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
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
          <div class="top-header w-full text-white flex justify-between">
            <svg-icon
              type="mdi"
              size="25"
              :path="mdiClose"
              @click="goBack"
            ></svg-icon>
            <div class="flex-1"></div>
          </div>
          <div
            class="w-full flex flex-col h-[calc(100vh_-_100px)] justify-between mt-3"
          >
            <div
              class="w-full text-center flex flex-col justify-center items-center mt-[40px]"
            >
              <img src="@/assets/img/3dgift.png" class="w-[40%]" />
              <p class="text-white text-lg">
                Refer Your friends and win other benefits
              </p>
            </div>

            <div class="w-full flex flex-col gap-6">
              <button class="btn-green" @click="gotoRef()">My Referrals</button>
              <button class="btn-red" @click="copyUser()">
                Copy Referral Link
              </button>
            </div>
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

.popw {
  background-color: #22c55e;
  width: calc(100%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.9);
}
</style>
