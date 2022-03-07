<template>
  <button v-on:click="action" class="button">
    <unicon :name="icon" fill="white" width="1.2em" height="1.2em"></unicon
    >{{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    action: Function,
    text: String,
    icon: String,
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/css/styles.scss";
.button {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 5px;
  user-select: none;
  color: white;
  font-size: 1em;
  max-width: 200px;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 15px;
  background-color: var(--button-bg);
  transition: background-color 0.2s;
  box-shadow: 0px 0px 3px #000;
  cursor: pointer;
}
.button:hover {
  background-color: var(--button-hover);
}
.button:focus {
  background-color: var(--button-clicked);
}
</style>
