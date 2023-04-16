<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { apiWrapper } from "@/helpers/apiwrapper";
import { mdiDialpad, mdiLockOutline } from "@mdi/js";

import MobileLayout from "@/components/Layouts/MobileLayout.vue";
import TextInput from "@/components/Form/TextInput.vue";
import Loader from "@/components/Loader.vue";
import Swal from "sweetalert2";

const authStore = useAuthStore();
const code = ref(null);
const password = ref(null);
const loginError = ref(null);

const loading = ref(false);

authStore.logout();

const formSubmit = async () => {
  loading.value = true;
  loginError.value = null;
  const response = await apiWrapper.post(`reset_password`, {
    code: code.value,
    password: password.value,
  });
  if (response.data.status) {
    code.value = null;
    password.value = null;
    Swal.fire({
      icon: "success",
      //   text: Password reset code has been sent to your email ${email.value},
      text: response.data.data,
    });
  } else {
    Swal.fire({
      icon: "error",
      text: response.data.data,
    });
  }
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
              <h3 class="text-lg font-bold">Reset Your Password</h3>
              <p>with the reset password code sent to your email</p>
              <div class="mt-3 mb-2 text-red-500 font-bold" v-if="loginError">
                Error: {{ loginError }}
              </div>
            </div>

            <form
              class="login-form flex w-full flex-col"
              @submit.prevent="formSubmit"
            >
              <div class="w-full mt-2">
                <TextInput
                  placeholder="Reset Code"
                  type="text"
                  :required="true"
                  v-model="code"
                >
                  <template #firsticon>
                    <svg-icon
                      type="mdi"
                      size="24"
                      :path="mdiDialpad"
                    ></svg-icon>
                  </template>
                </TextInput>
              </div>

              <div class="w-full mt-2">
                <TextInput
                  placeholder="New Password"
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
              </div>

              <div class="w-full mt-6">
                <button class="btn-green w-full">Submit</button>
              </div>
              
              <router-link
                class="text-center text-white text-sm mt-4"
                :to="{ name: 'LoginScreen' }"
              >
               Back to Login
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
