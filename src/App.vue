<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
@import "@/assets/css/styles.scss";
body {
  position: absolute;
  background-color: var(--main-bg);
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
.no-background {
  background-color: rgba(0, 0, 0, 0);
  border: None;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
