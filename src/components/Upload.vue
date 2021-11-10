<template>
  <div class="upload">
    <h1>Upload Image</h1>
    <unicon name="image-upload" fill="white" width="128" height="128"></unicon>
    <h4>Click to Upload, or Drag & Drop here!</h4>
  </div>
  <div id="file-name" class="file-name"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UploadImage",
  props: {
    msg: String,
  },
});
</script>

<style scoped lang="scss">
.upload {
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 50em;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%23333' stroke-width='8' stroke-dasharray='25' stroke-dashoffset='10' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 25px;
  padding: 50px 100px;
}
</style>
