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
  display: flex;
  flex-direction: column;
  padding: min(40px, 8%);
  background-color: var(--card-bg);
  border-radius: 25px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.6);
  max-width: 650px;
  max-height: 450px;
}
@media only screen and (max-width: 550px) {
  .card {
    height: 100%;
  }
}
.title {
  font-size: 1.4em;
  text-align: left;
  user-select: none;
  margin-bottom: 5px;
}
.child {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
