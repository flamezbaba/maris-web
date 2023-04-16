<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { mdiLockOutline, mdiEmailOutline } from "@mdi/js";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import TextInput from "@/components/Form/TextInput.vue";
import Loader from "@/components/Loader.vue";

const authStore = useAuthStore();
const email = ref(null);
const password = ref(null);
const loginError = ref(null);
const loading = ref(false);

authStore.logout();

const loginSubmit = async () => {
  loading.value = true;
  loginError.value = null;
  loginError.value = await authStore.login(email.value, password.value);
  loading.value = false;
};

onMounted(() => {});
</script>

<template>
  <MobileLayout>
    <template #thepage>
      <div class="w-full">
        <template v-if="loading">
          <Loader />
        </template>

        <div
          class="login-wrapper w-full flex flex-col justify-center items-center px-[40px]"
        >
          <div class="login w-full h-[400px] p-[20px]">
            <div class="title text-white w-full">
              <h3 class="text-lg font-bold">Hi, Welcome Back</h3>
              <p>Login to your account</p>
              <div class="mt-3 mb-2 text-red-500 font-bold" v-if="loginError">
                Error: {{ loginError }}
              </div>
            </div>

            <form
              class="login-form flex w-full flex-col"
              @submit.prevent="loginSubmit"
            >
              <div class="w-full mt-2">
                <TextInput
                  placeholder="Email Address"
                  type="email"
                  :required="true"
                  v-model="email"
                >
                  <template #firsticon>
                    <svg-icon
                      type="mdi"
                      size="24"
                      :path="mdiEmailOutline"
                    ></svg-icon>
                  </template>
                </TextInput>
              </div>

              <div class="w-full mt-4">
                <TextInput
                  placeholder="Password"
                  type="password"
                  :required="true"
                  v-model="password"
                >
                  <template #firsticon>
                    <svg-icon
                      type="mdi"
                      size="24"
                      :path="mdiLockOutline"
                    ></svg-icon>
                  </template>
                </TextInput>
                <p class="text-right text-white text-sm mt-2 cursor-pointer" @click="$router.push({name: 'Forgot'})">
                  Forgot Password?
                </p>
              </div>

              <div class="w-full mt-6">
                <button class="btn-green w-full">Login</button>
              </div>
              <router-link class="text-center text-white text-sm mt-2" :to="{name: 'RegisterScreen'}">
                Don't have an account? Sign Up
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
  height: 100vh;

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
