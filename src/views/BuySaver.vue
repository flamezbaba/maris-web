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

const prices = ref({});
const loading = ref(false);
const showBuy = ref(false);
const currentBuy = ref(null);
const buyInfo = ref({
  perOne: 0,
  totalAmount: 0,
  title: "",
});

const getRecords = async () => {
  const response = await apiWrapper.get(`savers/get_prices`, {});
  if (response.data.status) {
    await authStore.getUser();
    prices.value = response.data.data;
  }
};

const clickBuy = (type, perOne, title) => {
  buyInfo.value = {
    perOne: perOne,
    totalAmount: perOne,
    title: title,
  };

  currentBuy.value = {
    type: type,
    how_many: 1,
    description: "buying",
  };

  showBuy.value = true;
};

const calcTotal = () => {
  if (currentBuy.value.how_many < 1) {
    buyInfo.value.totalAmount = buyInfo.value.perOne;
    currentBuy.value.how_many = 1;
  } else {
    buyInfo.value.totalAmount =
      buyInfo.value.perOne * currentBuy.value.how_many;
  }
};

const makePayment = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`savers/buy`, currentBuy.value);
  if (response.data.status) {
    await authStore.getUser();
    Swal.fire({
      icon: "success",
      title: "Purchase Done",
    });
  } else {
    Swal.fire({
      icon: "error",
      //   title: "Purchase Failed ",
      title: response.data.data,
    });
  }
  loading.value = false;
  showBuy.value = false;
};

const goBack = () => {
  router.back();
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
              :path="mdiClose"
              @click="goBack"
            ></svg-icon>
            <div class="flex-1"></div>
          </div>
          <div class="w-full flex flex-col mt-3" v-if="prices.fifty">
            <SaverStats />

            <div class="w-full mt-5">
              <div class="rounded-lg w-full bg-pink-500 p-1">
                <p class="text-white font-bold">SUPER BUNDLE</p>
                <div
                  class="w-full mt-1 bg-pink-50 rounded-lg flex flex-col"
                >
                  <div class="w-full flex justify-between items-start p-[20px]">
                    <div class="flex flex-col text-red-500 text-center">
                      <svg-icon
                        type="mdi"
                        size="35"
                        :path="mdiHeart"
                      ></svg-icon>
                      <p class="font-bold">x50</p>
                    </div>

                    <div class="flex flex-col text-green-500 text-center">
                      <svg-icon
                        type="mdi"
                        size="35"
                        :path="mdiScaleUnbalanced"
                      ></svg-icon>
                      <p class="font-bold">x30</p>
                    </div>

                    <div class="flex flex-col text-blue-500 text-center">
                      <svg-icon
                        type="mdi"
                        size="35"
                        :path="mdiTimer"
                      ></svg-icon>
                      <p class="font-bold">x20</p>
                    </div>
                  </div>

                  <div class="w-full flex justify-center">
                    <button class="btn-red mb-5">₦ 12,000</button>
                  </div>
                </div>
              </div>
            </div>
            <div
              @click="clickBuy('life', prices.life, 'Buy Game Life')"
              class="w-full mt-[20px] bg-white rounded-lg p-[20px] flex justify-between items-center cursor-pointer"
            >
              <div class="text-red-500">
                <svg-icon type="mdi" size="35" :path="mdiHeart"></svg-icon>
              </div>
              <div class="flex justify-between">
                <p class="text-black text-xl">₦ {{ prices.life }} Per One</p>
              </div>
            </div>

            <div
              @click="clickBuy('fifty', prices.fifty, 'Buy 50:50 Saver')"
              class="w-full mt-[20px] bg-white rounded-lg p-[20px] flex justify-between items-center cursor-pointer"
            >
              <div class="text-red-500">
                <svg-icon
                  type="mdi"
                  size="35"
                  :path="mdiScaleUnbalanced"
                ></svg-icon>
              </div>
              <div class="flex justify-between">
                <p class="text-black text-xl">₦ {{ prices.fifty }} Per One</p>
              </div>
            </div>

            <div
              @click="clickBuy('time', prices.time, 'Buy Time Saver')"
              class="w-full mt-[20px] bg-white rounded-lg p-[20px] flex justify-between items-center cursor-pointer"
            >
              <div class="text-red-500">
                <svg-icon type="mdi" size="35" :path="mdiTimer"></svg-icon>
              </div>
              <div class="flex justify-between">
                <p class="text-black text-xl">₦ {{ prices.time }} Per One</p>
              </div>
            </div>
          </div>
        </div>
        <div class="popw min-h-[20%] absolute bottom-0 p-[20px]" v-if="showBuy">
          <p class="text-center text-white font-bold">{{ buyInfo.title }}</p>
          <p class="text-center text-white font-bold">
            ₦ {{ buyInfo.perOne }} Per One
          </p>

          <div class="w-full mt-[30px]">
            <div class="">
              <div class="relative w-full">
                <input
                  type="number"
                  class="block p-3 pl-11 text-black w-full bg-gray-100 rounded-lg"
                  v-model="currentBuy.how_many"
                  @input="calcTotal()"
                />
              </div>
            </div>
            <div class="w-full mt-3">
              <button class="btn-red w-full" @click="makePayment()">
                Pay ₦ {{ buyInfo.totalAmount }}
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
