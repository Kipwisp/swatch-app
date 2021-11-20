<template>
  <div class="tooltip-box">
    <slot />
    <div class="tooltip">
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/styles.scss";
.tooltip-box {
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip {
  opacity: 1;
  transition-delay: 0.5s;
}

.tooltip {
  user-select: none;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;

  bottom: 100%;
  margin-bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  opacity: 0;
  transition: opacity 0.2s;

  position: absolute;
  z-index: 1;

  background: var(--tooltip);
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  margin-bottom: 10px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--tooltip) transparent transparent transparent;
}
</style>
