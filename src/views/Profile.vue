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
  fullname: null,
  email: null,
  mobile: null,
  age: null,
});

const loading = ref(false);

const updateProfile = async () => {
  loading.value = true;
  const response = await apiWrapper.post(`update_profile`, form.value);
  if (response.data.status) {
    authStore.getUser();
    Swal.fire({
      icon: "success",
      title: "Profile Updated",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: response.data.data,
    });
  }
  loading.value = false;
};

const goBack = () => {
  router.back();
};

onMounted(async () => {
  form.value = {
    fullname: authStore.user.fullname,
    email: authStore.user.email,
    mobile: authStore.user.mobile,
    age: authStore.user.yob,
  };
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
              <p class="font-bold text-center">Update Profile</p>
            </div>
          </div>
          <form
            class="w-full flex flex-col mt-3"
            @submit.prevent="updateProfile"
          >
            <div class="w-full mt-2">
              <label for="" class="text-white text-sm font-semibold"
                >Fullname</label
              >
              <TextInput type="text" :required="true" v-model="form.fullname">
              </TextInput>
            </div>

            <div class="w-full mt-2">
              <label for="" class="text-white text-sm font-semibold"
                >Email</label
              >
              <TextInput type="text" :required="true" v-model="form.email">
              </TextInput>
            </div>

            <div class="w-full mt-2">
              <label for="" class="text-white text-sm font-semibold"
                >Mobile</label
              >
              <TextInput type="text" :required="true" v-model="form.mobile">
              </TextInput>
            </div>

            <div class="w-full mt-2">
              <label for="" class="text-white text-sm font-semibold">Age</label>
              <TextInput type="text" :required="true" v-model="form.age">
              </TextInput>
            </div>
            <div class="w-full mt-3">
              <button class="btn-blue w-full">Update Profile</button>
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
