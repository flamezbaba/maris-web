<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {

});

</script>

<template>
  <div
    class="maris-wrapper flex justify-start items-center my-[20px] flex-col w-full md:my-[5px]"
  >
    <div class="mobile-wrapper flex flex-col w-[400px] md:w-full">
     <slot name="thepage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.maris-wrapper {
  /* border: 2px solid red; */

  .mobile-wrapper {
    outline: 2px solid #150c26;
    min-height: 100vh;
    border-radius: 8px;
    background: linear-gradient(200deg, rgba(10,0,74,.8), rgba(21,12,38,.9)), url("@/assets/img/nature1.jpg");
    background-size: cover;
    background-position: bottom;
  }

}
</style>
