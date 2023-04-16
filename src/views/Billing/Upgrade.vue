<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { apiWrapper } from "@/helpers/apiwrapper";
import { mdiArrowLeft, mdiChevronRight, mdiClose } from "@mdi/js";
import Swal from "sweetalert2";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import TextInput from "@/components/Form/TextInput.vue";
import Loader from "@/components/Loader.vue";

const router = useRouter();
const authStore = useAuthStore();

const isPopOpen = ref(false);
const subFee = ref(0);
const loading = ref(false);
const form = ref({
  amount: 0,
  description: "",
});

const makePayment = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`payments/subscribe`, form.value);
  if (response.data.status) {
    router.push({
      name: "PayStatus",
      params: { uuid: response.data.data.uuid },
    });
  } else {
    Swal.fire({
      icon: "error",
      text: response.data.data,
    });
  }

  loading.value = false;
};

const getSubFee = async () => {
  loading.value = true;
  const response = await apiWrapper.get(`payments/get_sub_fee`, {});
  if (response.data.status) {
    subFee.value = response.data.data;
  } else {
    Swal.fire({
      icon: "error",
      text: response.data.data,
    });
  }

  loading.value = false;
};

const goBack = () => {
  router.push({ name: "DashboardScreen" });
};

const openPop = (d, a) => {
  isPopOpen.value = true;
  form.value.amount = a;
  form.value.description = d;
};

const closePop = () => {
  isPopOpen.value = false;
};

onMounted(async () => {
  await getSubFee();
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
          </div>
          <div class="w-full flex flex-col mt-3">
            <div class="mt-4 w-full flex justify-center items-start">
              <div
                class="rounded-full w-[200px] flex flex-col justify-center items-center h-[200px] text-white bg-purple-600"
              >
                <p class="font-semibold capitalize">premium subscription</p>
                <p class="font-bold text-2xl">
                  ₦ {{ Number(subFee).toLocaleString() }}
                </p>
                <p class="font-semibold capitalize">every month</p>
              </div>
            </div>

            <div class="w-full flex flex-col p-2 mt-[30px]">
              <div
                @click="openPop('1 Month Subscription', subFee)"
                class="w-full bg-purple-500 flex items-center justify-between h-[80px] rounded-lg px-[20px] text-white cursor-pointer"
              >
                <div class="">
                  <p>1 Month Subscription</p>
                  <p class="font-bold text-2xl">
                    ₦ {{ Number(subFee).toLocaleString() }}
                  </p>
                </div>
                <div class="">
                  <svg-icon
                    type="mdi"
                    size="35"
                    :path="mdiChevronRight"
                  ></svg-icon>
                </div>
              </div>

              <div
                @click="openPop('3 Months Subscription', subFee * 3)"
                class="mt-[30px] w-full bg-purple-500 flex items-center justify-between h-[80px] rounded-lg px-[20px] text-white cursor-pointer"
              >
                <div class="">
                  <p class="font-semibold">3 Months Subscription</p>
                  <p class="font-bold text-2xl">
                    ₦ {{ Number(subFee * 3).toLocaleString() }}
                  </p>
                </div>
                <div class="">
                  <svg-icon
                    type="mdi"
                    size="35"
                    :path="mdiChevronRight"
                  ></svg-icon>
                </div>
              </div>

              <div
                @click="openPop('6 Month Subscription', subFee * 6)"
                class="mt-[30px] w-full bg-purple-500 flex items-center justify-between h-[80px] rounded-lg px-[20px] text-white cursor-pointer"
              >
                <div class="">
                  <p class="font-semibold">6 Months Subscription</p>
                  <p class="font-bold text-2xl">
                    ₦ {{ Number(subFee * 6).toLocaleString() }}
                  </p>
                </div>
                <div class="">
                  <svg-icon
                    type="mdi"
                    size="35"
                    :path="mdiChevronRight"
                  ></svg-icon>
                </div>
              </div>

              <div
                @click="openPop('12 Months Subscription', subFee * 12)"
                class="mt-[30px] w-full bg-purple-500 flex items-center justify-between h-[80px] rounded-lg px-[20px] text-white cursor-pointer"
              >
                <div class="">
                  <p class="font-semibold">1 Year Subscription</p>
                  <p class="font-bold text-2xl">
                    ₦ {{ Number(subFee * 12).toLocaleString() }}
                  </p>
                </div>
                <div class="">
                  <svg-icon
                    type="mdi"
                    size="35"
                    :path="mdiChevronRight"
                  ></svg-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="popw min-h-[30%] absolute bottom-0 p-[20px]"
          v-if="isPopOpen"
          v-click-outside="closePop"
        >
          <p class="text-center text-black font-bold">{{ form.description }}</p>
          <p class="text-center text-black font-bold text-3xl">
            ₦ {{ Number(form.amount).toLocaleString() }}
          </p>

          <div class="w-full mt-[30px]">
            <div class="w-full mt-3">
              <button class="btn-green w-full" @click="makePayment()">
                Complete Payment
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

.popw {
  background-color: #ffffff;
  width: calc(100%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.9);
}
</style>
