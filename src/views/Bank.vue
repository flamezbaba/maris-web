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

const loading = ref(false);
const bankList = ref([]);
const userBank = ref({});

const form = ref({
  bank_code: null,
  bank_name: null,
  account_number: null,
  account_name: null,
});

const updateBank = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`user/bank/update`, form.value);
  if (response.data.status) {
    await authStore.getUser();
  }

  Swal.fire({
    title: response.data.data,
  });
  loading.value = false;
};

const getBankList = async () => {
  const response = await apiWrapper.get(`settings/bank_list`, {});
  if (response.data.status) {
    bankList.value = response.data.data;
  }
};

const getUserBank = async () => {
  const response = await apiWrapper.get(`user/bank`, {});
  if (response.data.status) {
    userBank.value = response.data.data;
    form.value = {
      bank_code: userBank.value.bank_code,
      bank_name: userBank.value.bank_name,
      account_number: userBank.value.account_number,
      account_name: userBank.value.account_name,
    };
  }
};

const updateBankCode = (bank) => {
  form.value.bank_code = bank.bank_code;
};

const goBack = () => {
  router.back();
};

onMounted(async () => {
  loading.value = true;
  await getBankList();
  await getUserBank();
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
              <p class="font-bold text-center">Bank Withdrawal Settings</p>
            </div>
          </div>
          <form class="w-full flex flex-col mt-3" @submit.prevent="updateBank">
            <div class="w-full mt-2">
              <label for="" class="text-white text-sm font-semibold"
                >Bank Name</label
              >
              <select
                v-model="form.bank_name"
                class="w-full p-3 pl-11 text-black rounded-lg bg-gray-100"
              >
                <option
                  :value="bank.bank_name"
                  v-for="bank in bankList"
                  :key="bank.bank_code"
                  @click="updateBankCode(bank)"
                >
                  {{ bank.bank_name }}
                </option>
              </select>
            </div>

            <div class="w-full mt-4">
              <label for="" class="text-white text-sm font-semibold"
                >Account Name</label
              >
              <TextInput
                type="text"
                :required="true"
                v-model="form.account_name"
              >
              </TextInput>
            </div>

            <div class="w-full mt-4">
              <label for="" class="text-white text-sm font-semibold"
                >Account Number</label
              >
              <TextInput
                type="text"
                :required="true"
                v-model="form.account_number"
              >
              </TextInput>
            </div>

            <div class="w-full mt-3">
              <button class="btn-green w-full">Update Bank Details</button>
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
