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

const formPassword = ref({
  password: null,
});

const pinForm = ref({
  pin: null,
});

const loading = ref(false);

const updatePassword = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`update_password`, formPassword.value);
  if (response.data.status) {
    Swal.fire({
      title: "Password Updated",
    });
  }
  loading.value = false;
};

const updatePin = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`update_withdrawal_pin`, pinForm.value);
  if (response.data.status) {
    Swal.fire({
      title: "Withdrawal Pin Updated",
    });
  }
  loading.value = false;
};

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
          <div class="top-header w-full text-white flex justify-between">
            <svg-icon
              type="mdi"
              size="25"
              :path="mdiArrowLeft"
              @click="goBack"
            ></svg-icon>
            <div class="flex-1">
              <p class="font-bold text-center">Security Settings</p>
            </div>
          </div>
          <form
            class="w-full flex flex-col mt-3"
            @submit.prevent="updatePassword"
          >
            <div class="w-full mt-2">
              <label for="" class="text-white text-sm font-semibold"
                >New Password</label
              >
              <TextInput
                type="password"
                :required="true"
                v-model="formPassword.password"
              >
              </TextInput>
            </div>
            <div class="w-full mt-3">
              <button class="btn-green w-full">Update Password</button>
            </div>
          </form>

          <form class="w-full flex flex-col mt-8" @submit.prevent="updatePin">
            <div class="w-full mt-2">
              <label for="" class="text-white text-sm font-semibold"
                >Withdrawal Pin</label
              >
              <TextInput type="password" :required="true" v-model="pinForm.pin">
              </TextInput>
            </div>
            <div class="w-full mt-3">
              <button class="btn-green w-full">Update Password</button>
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
