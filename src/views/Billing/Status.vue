<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { apiWrapper } from "@/helpers/apiwrapper";
import { mdiArrowLeft, mdiChevronRight, mdiClose } from "@mdi/js";
import Swal from "sweetalert2";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import TextInput from "@/components/Form/TextInput.vue";
import Loader from "@/components/Loader.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isPopOpen = ref(false);
const paymentDetails = ref({});
const loading = ref(false);
const form = ref({
  amount: 0,
  description: "",
});

const checkPayment = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`payments/check_payment_status`, {
    uuid: route.params.uuid,
  });
  if (response.data.status) {
    paymentDetails.value = response.data.data;

    if (paymentDetails.value.is_done == 0) {
      isPopOpen.value = true;
    }
  } else {
    Swal.fire({
      icon: "error",
      text: response.data.data,
    });
  }

  loading.value = false;
};

const checkPaymentWithout = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`payments/check_payment_status`, {
    uuid: route.params.uuid,
  });
  if (response.data.status) {
    paymentDetails.value = response.data.data;
  } else {
    Swal.fire({
      icon: "error",
      text: response.data.data,
    });
  }

  loading.value = false;
};

const cancelPayment = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`payments/delete`, {
    uuid: route.params.uuid,
  });
  if (response.data.status) {
    router.push({name: 'PaymentHistory'});
  } else {
    Swal.fire({
      icon: "error",
      text: response.data.data,
    });
  }

  loading.value = false;
};

const goBack = () => {
  router.push({ name: "PaymentHistory" });
};

const closePop = async () => {
  await checkPaymentWithout();
  isPopOpen.value = false;
};

onMounted(async () => {
    await checkPayment();
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
          <div class="p-2 min-h-screen flex flex-col text-white mt-[40px]">
            <p class="font-semibold text-lg">{{ paymentDetails.description }}</p>

            <div class="w-full flex flex-col mt-4">
                <p class="text-xs">Transaction ID</p>
                <p class="">
                    {{ paymentDetails.uuid }}
                </p>
            </div>

            <div class="w-full flex flex-col mt-4">
                <p class="text-xs">Amount</p>
                <p class="">
                    ₦ {{ Number(paymentDetails.amount).toLocaleString() }}
                </p>
            </div>

            <div class="w-full flex flex-col mt-4">
                <p class="text-xs">Date</p>
                <p class="">
                    {{ paymentDetails.created_at }}
                </p>
            </div>

            <div class="w-full flex flex-col mt-4">
                <p class="text-xs">Status</p>
                <p class="text-red-500" v-if="paymentDetails.is_done == 0">
                    UnPaid
                </p>
                <p class="text-green-500" v-else>
                    Paid
                </p>
            </div>

            <div class="w-full flex flex-col mt-[40px] gap-4" v-if="paymentDetails.is_done == 0">
                <button class="btn btn-green" @click="checkPayment">
                    Complete Payment
                </button>
                <button class="btn btn-red" @click="cancelPayment">
                    Cancel Payment
                </button>
            </div>
          </div>
        </div>
        <div
          class="popw h-screen absolute top-0 left-0 p-[20px] mx-[10px]"
          v-if="isPopOpen"
        >
          <div class="top-header w-full text-black flex justify-between">
            <svg-icon
              type="mdi"
              size="25"
              :path="mdiClose"
              @click="closePop"
            ></svg-icon>
          </div>
          <iframe
            :src="paymentDetails.payment_link"
            width="100%"
            height="100%"
            frameborder="3"
          >
          </iframe>
        </div>
      </div>
    </template>
  </MobileLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.popw {
  background-color: #ffffff;
  width: calc(100% - 20px);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.9);
}
</style>
