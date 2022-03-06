<template>
  <button ref="drag" :class="{ over: isOver }" class="no-background upload">
    <form enctype="multipart/form-data">
      <input
        class="input-file"
        type="file"
        accept="image/*"
        title=" "
        @change="uploadImage($event)"
        id="file-input"
      />
      <div class="image">
        <unicon
          name="image-upload"
          fill="white"
          width="128"
          height="128"
        ></unicon>
      </div>
      Click to upload, or drag & drop here!
    </form>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UploadBox",
  data() {
    return {
      file: null,
      isOver: false,
    };
  },
  mounted() {
    (this.$refs.drag as HTMLInputElement).addEventListener("dragenter", () => {
      this.isOver = true;
    });
    (this.$refs.drag as HTMLInputElement).addEventListener("dragleave", () => {
      this.isOver = false;
    });
  },
  methods: {
    uploadImage(event: Event) {
      let file = (event.target as HTMLInputElement).files?.[0];
      this.$emit("submit-image", file);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/css/styles.scss";
input[type="file"] {
  color: transparent;
}
.input-file {
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.image {
  margin-bottom: 40px;
}
.upload {
  position: relative;
  width: 100%;
  flex: 1;
  align-items: center;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%2337425FFF' stroke-width='4' stroke-dasharray='25' stroke-dashoffset='10' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 25px;
  padding: 50px 100px;
  color: white;
  transition: 0.2s;
}
.upload:hover {
  background-color: var(--accent-2);
}
.over {
  background-color: var(--accent-2);
}
</style>
