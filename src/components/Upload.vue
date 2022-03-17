<template>
  <input
    ref="pasteboard"
    class="paste"
    @paste="getImageFromClipboard($event)"
  />
  <div class="upload-container">
    <div class="container">
      <div v-if="!uploading" class="upload-box">
        <UploadBox v-on:submit-image="uploadFile" />
      </div>
      <div v-if="!uploading" class="link-bar">
        <LinkBar v-on:submit-image="uploadFile" />
      </div>
      <div v-if="uploading" class="loading">
        <Processing />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  notifySuccess,
  notifyError,
  successUpload,
  errorUpload,
} from "@/utils/NotificationHandler";
import UploadBox from "@/components/UploadBox.vue";
import LinkBar from "@/components/LinkBar.vue";
import Processing from "@/components/Processing.vue";

export default defineComponent({
  name: "Upload",
  components: {
    UploadBox,
    LinkBar,
    Processing,
  },
  props: {
    callback: Function,
  },
  data: () => {
    return {
      uploading: false,
    };
  },
  mounted() {
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      (this.$refs.pasteboard as HTMLDivElement).focus();
    }
  },
  methods: {
    async uploadFile(file: File) {
      const apiURL = process.env.VUE_APP_API_URL;

      try {
        this.uploading = true;
        const image = URL.createObjectURL(file);
        const resized = await this.resizeImage(image);

        const res = await fetch(apiURL, {
          method: "POST",
          body: resized,
        });
        const json = await res.json();
        const stringify = await JSON.stringify(json);

        notifySuccess(successUpload);
        this.$router.push({
          name: "Analysis",
          params: { results: stringify, image: image },
        });
      } catch (error) {
        notifyError(errorUpload);
      }

      if (this.callback) {
        this.callback();
      }

      this.uploading = false;
    },
    async resizeImage(url: string) {
      const quality = 0.95;
      const img = new Image();
      img.src = url;

      let data = "";
      await new Promise((resolve) => {
        img.onload = async () => {
          const canvas: HTMLCanvasElement = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const max_size = 150;

          if (ctx) {
            const max = Math.max(img.width, img.height);
            const scale = max > max_size ? max_size / max : 1;

            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            data = canvas.toDataURL("image/jpeg", quality);
          }

          resolve(true);
        };
      });

      const blob = await fetch(data).then((r) => r.blob());
      return new File([blob], "image", { type: "image/jpg" });
    },
    getImageFromClipboard(event: ClipboardEvent) {
      const items = event?.clipboardData?.items;

      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith("image/")) {
            const blob = items[i].getAsFile();
            if (blob) {
              const filetype = blob.type.split("/").pop();
              this.uploadFile(
                new File([blob], `image.${filetype}`, { type: blob.type })
              );
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
.upload-container {
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.link-bar {
  margin-top: min(20px, 5%);
}
.container {
  width: 100%;
}
.paste {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -1;
  cursor: default;
}
@media only screen and (max-width: 760px) {
  .paste {
    user-select: none;
  }
}
</style>
