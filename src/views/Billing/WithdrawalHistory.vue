<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { apiWrapper } from "@/helpers/apiwrapper";
import { mdiArrowLeft } from "@mdi/js";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import SaverStats from "@/components/SaverStats.vue";
import Loader from "@/components/Loader.vue";

const router = useRouter();
const authStore = useAuthStore();

const payments = ref([]);
const loading = ref(false);

const getRecords = async () => {
  const response = await apiWrapper.get(`user/history/withdraw`, {});
  if (response.data.status) {
    await authStore.getUser();
    payments.value = response.data.data;
  }
};

const goBack = () => {
  router.push({ name: "DashboardScreen" });
};

onMounted(async () => {
  loading.value = true;
  await getRecords();
  loading.value = false;
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
              <p class="font-bold text-center">Payout History</p>
            </div>
          </div>
          <div class="w-full flex flex-col mt-3">
            <div class="pshow w-full rounded-lg p-4 text-white font-semibold mt-4" v-for="payment in payments" :key="payment.id">
               
                <div class="w-full flex justify-between mt-2 items-start">
                    <p class="text-sm capitalize font-semibold text-green-400" v-if="payment.is_done == 1">Status: Paid</p>
                    <p class="text-sm capitalize font-semibold text-red-400" v-else>Status: unpaid</p>
                    <p class="text-sm capitalize font-semibold">{{ payment.created_at }}</p>
                </div>
                <div class="w-full flex justify-between mt-2 items-start">
                    <p class="text-xl capitalize font-semibold">₦ {{ payment.naira }}</p>
                    <p class="text-sm capitalize font-semibold">ID: {{ payment.uuid }}</p>
                </div>
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
