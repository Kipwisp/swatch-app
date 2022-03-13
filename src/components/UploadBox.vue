<template>
  <button ref="drag" :class="{ over: isOver }" class="no-background upload">
    <form enctype="multipart/form-data">
      <input
        class="input-file"
        type="file"
        accept="image/*"
        title=""
        @change="getImageFromFile($event)"
        id="file-input"
      />
      <div class="image">
        <unicon
          name="image-upload"
          fill="white"
          width="14vh"
          height="14vh"
        ></unicon>
      </div>
      Drag and drop, or paste to upload!
    </form>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { notifyError, errorType } from "@/utils/NotificationHandler";

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
    getImageFromFile(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file?.type.startsWith("image/")) {
        this.$emit("submit-image", file);
      } else {
        notifyError(errorType);
      }
    },
    getImageFromClipboard(event: ClipboardEvent) {
      const items = event?.clipboardData?.items;

      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith("image/")) {
            const blob = items[i].getAsFile();
            if (blob) {
              const filetype = blob.type.split("/").pop();
              this.$emit("submit-image", new File([blob], `image.${filetype}`));
              break;
            }
          }
        }
      }
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
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%23636363' stroke-width='4' stroke-dasharray='25' stroke-dashoffset='10' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 25px;
  padding: 2em 3em;
  color: white;
  transition: 0.2s;
}
.upload:hover {
  background-color: var(--button-hover);
}
.over {
  background-color: var(--button-hover);
}
</style>
