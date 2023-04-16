<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  mdiLock,
  mdiEmailOutline,
  mdiAccount,
  mdiPhone,
  mdiAccountPlus,
} from "@mdi/js";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import TextInput from "@/components/Form/TextInput.vue";
import Loader from "@/components/Loader.vue";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const form = ref({
  fullname: null,
  username: null,
  email: null,
  mobile: null,
  password: null,
  ref: null,
});
const loginError = ref(null);
const loading = ref(false);

authStore.logout();

const formSubmit = async () => {
  loading.value = true;
  loginError.value = null;
  loginError.value = await authStore.register(form.value);
  loading.value = false;
};

onMounted(() => {
  form.value.ref = route.query.ref ?? null;
});
</script>

<template>
  <MobileLayout>
    <template #thepage>
      <div class="w-full">
        <template v-if="loading">
          <Loader />
        </template>

        <div
          class="login-wrapper w-full flex flex-col justify-center items-center px-[40px] py-[40px]"
        >
          <div class="login w-full p-[20px]">
            <div class="title text-white w-full">
              <h3 class="text-lg font-bold">Join Us</h3>
              <p>Create an account</p>
              <div class="mt-3 mb-2 text-red-500 font-bold" v-if="loginError">
                Error: {{ loginError }}
              </div>
            </div>

            <form
              class="login-form flex w-full flex-col"
              @submit.prevent="formSubmit"
            >
              <div class="w-full mt-2">
                <label for="" class="text-white text-sm font-semibold"
                  >Fullname</label
                >
                <TextInput type="text" :required="true" v-model="form.fullname">
                  <template #firsticon>
                    <svg-icon
                      type="mdi"
                      size="15"
                      :path="mdiAccount"
                    ></svg-icon>
                  </template>
                </TextInput>
              </div>

              <div class="w-full mt-2">
                <label for="" class="text-white text-sm font-semibold"
                  >Username</label
                >
                <TextInput type="text" :required="true" v-model="form.username">
                  <template #firsticon>
                    <svg-icon
                      type="mdi"
                      size="15"
                      :path="mdiAccount"
                    ></svg-icon>
                  </template>
                </TextInput>
              </div>

              <div class="w-full mt-2">
                <label for="" class="text-white text-sm font-semibold"
                  >Email Address</label
                >
                <TextInput type="email" :required="true" v-model="form.email">
                  <template #firsticon>
                    <svg-icon
                      type="mdi"
                      size="15"
                      :path="mdiEmailOutline"
                    ></svg-icon>
                  </template>
                </TextInput>
              </div>

              <div class="w-full mt-2">
                <label for="" class="text-white text-sm font-semibold"
                  >Phone Number</label
                >
                <TextInput type="text" :required="true" v-model="form.mobile">
                  <template #firsticon>
                    <svg-icon type="mdi" size="15" :path="mdiPhone"></svg-icon>
                  </template>
                </TextInput>
              </div>

              <div class="w-full mt-2">
                <label for="" class="text-white text-sm font-semibold"
                  >Referral Username</label
                >
                <TextInput type="text" v-model="form.ref">
                  <template #firsticon>
                    <svg-icon
                      type="mdi"
                      size="15"
                      :path="mdiAccountPlus"
                    ></svg-icon>
                  </template>
                </TextInput>
              </div>

              <div class="w-full mt-2">
                <label for="" class="text-white text-sm font-semibold"
                  >Password</label
                >
                <TextInput
                  placeholder="Password"
                  type="password"
                  v-model="form.password"
                >
                  <template #firsticon>
                    <svg-icon type="mdi" size="15" :path="mdiLock"></svg-icon>
                  </template>
                </TextInput>
              </div>

              <div class="w-full mt-6">
                <button class="btn-green w-full">Register</button>
              </div>
              <router-link
                class="text-center text-white text-sm mt-2"
                :to="{ name: 'LoginScreen' }"
              >
                Already have an account? Login
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </template>
  </MobileLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";
.login-wrapper {
  min-height: 100vh;

  .login {
    border: 2px solid #fff;
    border-radius: 8px;
    background: linear-gradient(
      200deg,
      rgba(10, 0, 74, 0.8),
      rgba(21, 12, 38, 0.9)
    );
  }
}
</style>
