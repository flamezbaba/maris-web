<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { apiWrapper } from "@/helpers/apiwrapper";
import { mdiArrowLeft } from "@mdi/js";
import Swal from "sweetalert2";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import TextInput from "@/components/Form/TextInput.vue";
import Loader from "@/components/Loader.vue";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  pin: null,
  amount: null,
});
const loading = ref(false);

const withdraw = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`user/withdraw`, form.value);
  if (response.data.status) {
    await authStore.getUser();
  }

  Swal.fire({
    title: response.data.data,
  });
  loading.value = false;
};

const goBack = () => {
  router.push({ name: "DashboardScreen" });
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
              :path="mdiArrowLeft"
              @click="goBack"
            ></svg-icon>
            <div class="flex-1">
              <p class="font-bold text-center">Withdraw Funds</p>
            </div>
          </div>
          <form class="w-full flex flex-col mt-3" @submit.prevent="withdraw">
            <div class="w-full mt-2">
              <label for="" class="text-white text-sm font-semibold"
                >Amount</label
              >
              <TextInput type="text" :required="true" v-model="form.amount">
              </TextInput>
              <p class="text-right text-white">
                Available Balance: ₦
                {{ Number(authStore.user.account_balance).toLocaleString() }}
              </p>
            </div>

            <div class="w-full mt-4">
              <label for="" class="text-white text-sm font-semibold"
                >Withdrawal Pin</label
              >
              <TextInput type="password" :required="true" v-model="form.pin">
              </TextInput>
            </div>

            <div class="w-full mt-3">
              <button class="btn-green w-full">Withdraw</button>
            </div>

            <div class="w-full mt-5 flex justify-between">
              <router-link
                class="text-white font-semibold"
                :to="{ name: 'Security' }"
                >Set withdrawal pin</router-link
              >
              <router-link
                class="text-white font-semibold"
                :to="{ name: 'Bank' }"
                >Set Bank pin details</router-link
              >
            </div>
          </form>
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
