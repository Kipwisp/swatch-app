<template>
  <div class="card">
    <div class="title">{{ title }}</div>
    <div class="child">
      <slot name="component"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    title: String,
  },
});
</script>

<style scoped lang="scss">
.card {
  width: 500px;
  height: 500px;
  padding: 20px 20px;
  background-color: rgb(16, 16, 19);
  border-radius: 25px;
}
.title {
  font-size: 1.6em;
  text-align: left;
  margin-left: 20px;
  user-select: none;
}
.child {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
