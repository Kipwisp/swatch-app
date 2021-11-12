<template>
  <button class="no-background upload">
    <div class="image">
      <unicon
        name="image-upload"
        fill="white"
        width="128"
        height="128"
      ></unicon>
    </div>
    Click to upload, or drag & drop here!
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UploadBox",
});
</script>

<style scoped lang="scss">
.image {
  margin-bottom: 40px;
}
.upload {
  flex: 1;
  align-items: center;
  max-width: 50em;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%2337425FFF' stroke-width='4' stroke-dasharray='25' stroke-dashoffset='10' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 25px;
  padding: 50px 100px;
  color: white;
  transition: 0.5s;
}
.upload:hover {
  background-color: #232733;
}
</style>
