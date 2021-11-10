<template>
  <div class="upload">
    <h2>Drag & Drop Files<br />to Upload</h2>
    <v-icon name="beer" />
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%23333' stroke-width='8' stroke-dasharray='20' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
  border-radius: 25px;
  padding: 20px 0;
}
</style>
