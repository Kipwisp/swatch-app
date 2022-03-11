<template>
  <div class="loader">
    <div class="dots">
      <span class="small dot"></span>
      <span class="dot"></span>
      <span class="big dot"></span>
      <span class="dot"></span>
      <span class="small dot"></span>
    </div>
    <div class="loader-text">Processing...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Processing",
});
</script>

<style scoped lang="scss">
$speed: 5s;

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loader-text {
  font-size: 2em;
  animation: fade $speed ease infinite alternate;
  padding-top: 50px;
}
.dots {
  display: flex;
  align-items: center;
}
.dot {
  width: 5vw;
  height: 5vw;
  margin: 20px;
  border-radius: 100px;
  background-color: #df004f;
  &:nth-child(1) {
    animation: loading $speed 0s ease infinite alternate, begin 0s ease-out;
  }
  &:nth-child(2) {
    animation: loading $speed 0.5s ease infinite alternate, begin 0.5s ease-out;
  }
  &:nth-child(3) {
    animation: loading $speed 1s ease infinite alternate, begin 1s ease-out;
  }
  &:nth-child(4) {
    animation: loading $speed 1.5s ease infinite alternate, begin 1.5s ease-out;
  }
  &:nth-child(5) {
    animation: loading $speed 2s ease infinite alternate, begin 2s ease-out;
  }
}
.big {
  width: 6vw;
  height: 6vw;
}
.small {
  width: 4vw;
  height: 4vw;
}
@keyframes fade {
  to {
    opacity: 0.2;
  }
  from {
    opacity: 1;
  }
}
@keyframes begin {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loading {
  0% {
    transform: scale(1);
    background: #ff4848;
  }
  25% {
    background: #fdff89;
  }
  50% {
    transform: scale(0.2) translateY(150px);
    background: #74fca8;
  }
  75% {
    background: #3bb1ff;
  }
  100% {
    transform: translateY(0px);
    background: #d858ff;
  }
}
</style>
