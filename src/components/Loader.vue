<script setup></script>

<template>
  <div
    class="loader w-full h-screen flex justify-center items-center absolute z-[900]"
  >
    <div class="theloader"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  background-color: rgba(0, 0, 0, 0.8);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.theloader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #1d61dd; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}
</style>
