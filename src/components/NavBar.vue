<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Color App</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item nav-link">
            <router-link to="/">Home</router-link>
          </li>
          <li class="nav-item nav-link">
            <router-link to="/About">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
});
</script>

<style scoped lang="scss">
@import "@/assets/css/styles.scss";
.navbar {
  background-color: var(--main);
}
.nav-link a {
  color: var(--accent-3);
  text-decoration: None;
  transition: color 0.2s;
}
.nav-link a:hover {
  color: white;
}
.nav-link .router-link-active {
  color: white;
}
.upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  width: 60vw;
  max-width: 50em;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%23333' stroke-width='8' stroke-dasharray='25' stroke-dashoffset='10' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 25px;
  padding: 20px 0;
}
</style>
