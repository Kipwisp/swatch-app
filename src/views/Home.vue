<template>
  <div class="home">
    <div class="upload-box">
      <Upload />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Upload from "@/components/Upload.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Upload,
  },
});
</script>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.upload-box {
  margin-top: 100px;
}
</style>
