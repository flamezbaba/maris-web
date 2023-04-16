<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { apiWrapper } from "@/helpers/apiwrapper";
import { mdiSync } from "@mdi/js";
import Swal from "sweetalert2";

const authStore = useAuthStore();
const router = useRouter();
const showNaira = ref(false);

const topUp = () => {
  Swal.fire({
    title: "Enter Amount",
    input: "text",
    text: "You will be redirect to the payment page, after payment come back to this page",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Top Up",
    showLoaderOnConfirm: true,
    preConfirm: async (amount) => {
      const response = await apiWrapper.post(`payments/top_up_balance`, {
        amount: amount,
      });
      if (response.data.status) {
        return response.data.data;
      } else {
        !Swal.isLoading();
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    // window.location = result.value.payment_link;

    if (result.value) {
      router.push({
        name: "PayStatus",
        params: { uuid: result.value.uuid },
      });
      // window.open(result.value.payment_link, "_blank");
    }
  });
};

onMounted(() => {});
</script>

<template>
  <div
    class="w-full flex flex-col h-[160px] gap-5 flex-wrap items-start overflow-scroll"
  >
    <div
      @click="showNaira = !showNaira"
      class="balance w-[90%] h-[160px] p-5 rounded-lg flex flex-col justify-between"
    >
      <div class="w-full flex justify-between text-sm">
        <p class="text-white font-semibold">Plan</p>
        <p class="text-white font-semibold capitalize">
          {{ authStore.user.package_name }}
        </p>
      </div>
      <div class="w-full flex justify-center cursor-pointer">
        <p class="text-white font-semibold text-lg" v-if="showNaira">
          {{ Number(authStore.user.account_balance).toLocaleString() ?? 0 }}
          <span class="text-sm">Naira</span>
        </p>
        <p class="text-white font-semibold text-lg" v-else>
          {{ authStore.user.maris_account_balance ?? 0 }}
          <span class="text-sm">maris</span>
        </p>
      </div>
      <div class="w-full flex justify-between items-center text-sm">
        <div
          class="text-white font-semibold z-[400]"
          @click="authStore.getUser()"
        >
          <svg-icon
            type="mdi"
            size="20"
            :path="mdiSync"
            @click="navOpen = true"
          ></svg-icon>
        </div>
        <div class="" v-if="authStore.user.package_name != 'premium'">
          <p
            class="text-white font-semibold cursor-pointer"
            @click="$router.push({ name: 'Upgrade' })"
          >
            Upgrade to premium
          </p>
        </div>
      </div>
    </div>

    <div
      class="balance w-[90%] h-[160px] p-5 rounded-lg flex flex-col justify-between"
    >
      <div class="w-full flex justify-between text-sm">
        <p class="text-white font-semibold">Buy Savers Balance</p>
        <div class="text-white cursor-pointer" @click="authStore.getUser()">
          <svg-icon
            type="mdi"
            size="20"
            :path="mdiSync"
            @click="navOpen = true"
          ></svg-icon>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <p class="text-white font-semibold text-lg">
          {{
            authStore.user.topup_balance
              ? Number(authStore.user.topup_balance).toLocaleString()
              : 0
          }}<span class="text-sm"> Naira</span>
        </p>
      </div>
      <div class="w-full flex justify-between items-center text-sm">
        <div class="">
          <!-- <p class="text-white font-semibold">Buy Game Savers</p> -->
        </div>
        <div class="" @click="topUp">
          <p class="text-white font-semibold">Top Up Balance</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.balance {
  background: linear-gradient(
    180deg,
    rgba(37, 215, 165, 0.8),
    rgba(12, 205, 176, 0.9)
  );
}
</style>
