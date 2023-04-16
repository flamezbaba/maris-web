<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const loadingRef = ref(null);
const interval = ref(null);
const widthPercent = ref(null);
const router = useRouter();

onMounted(() => {
  widthPercent.value = 0;

  interval.value = setInterval(() => {
    // console.log("count", loadingRef.value.style.width);
    if (widthPercent.value < 100) {
      widthPercent.value = widthPercent.value + 10;
      loadingRef.value.style.width = `${widthPercent.value}%`;
    } else {
      clearInterval();
      router.push({ name: "DashboardScreen" });
    }
  }, 200);
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <div
    class="maris-wrapper flex justify-start items-center my-[20px] flex-col w-full md:my-[5px]"
  >
    <div class="mobile-wrapper flex flex-col w-[400px] md:w-[96%]">
      <div
        class="splash-wrapper w-full flex flex-col items-start justify-between"
      >
        <div class="top w-full mt-[60px] flex items-center justify-center">
          <img src="@/assets/img/3dmaris.png" alt="" />
        </div>

        <div class="bottom w-full mb-[60px] flex items-center justify-center">
          <div class="loading w-[60%] relative h-[6px]">
            <div class="loading-back w-full bg-[#ccc] h-[6px] rounded-md"></div>
            <div
              class="loading-front absolute top-0 bg-[#fff] w-[10%] h-[6px] rounded-md"
              ref="loadingRef"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.maris-wrapper {
  /* border: 2px solid red; */
  min-height: 100vh;

  .mobile-wrapper {
    outline: 2px solid #150c26;
    min-height: 100vh;
    border-radius: 8px;
    background: linear-gradient(200deg, #0a004a, #150c26);
  }

  .splash-wrapper {
    height: 100vh;
    .top {
      img {
        width: 60%;
      }
    }

    .bottom {
      .loading {
        .loading-front {
          transition: all 0.5s;
        }
      }
    }
  }
}
</style>
