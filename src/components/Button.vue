<template>
  <button v-on:click="action" class="button">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    action: Function,
    text: String,
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/css/styles.scss";
.button {
  user-select: none;
  color: white;
  font-size: 1.4em;
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 15px;
  background-color: var(--button-bg);
  transition: background-color 0.2s;
  cursor: pointer;
}
.button:hover {
  background-color: var(--button-hover);
  color: lightgray;
}
</style>
