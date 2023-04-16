<script setup>
import { ref } from "vue";
import { mdiClose, mdiMagnify } from "@mdi/js";

defineProps({
  modelValue: String,
  placeholder: String,
  type: String,
  required: {
    type: Boolean,
    default: false
  },
});

defineEmits(["update:modelValue", "onCancelSearch", "onRunSearch"]);

const input = ref(null);
</script>

<template>
  <div class="relative w-full">
    <div
      class="absolute inset-y-0 left-0 flex items-center px-3 text-black cursor-pointer z-[100]"
    >
      <slot name="firsticon"></slot>
    </div>
    <input
      :type="type"
      ref="input" :required="required"
      class="block p-3 pl-11 text-black w-full bg-gray-100"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
input{
    outline: none;
    border: none;
    border-radius: 8px;

    &:focus{
        outline: 1px solid #767676;
    }
}
</style>
