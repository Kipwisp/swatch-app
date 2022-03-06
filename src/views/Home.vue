<template>
  <div class="main">
    <div class="container centered">
      <div v-if="!uploading" class="upload-box">
        <UploadBox v-on:submit-image="uploadFile" />
      </div>
      <div v-if="!uploading" class="link-bar">
        <LinkBar v-on:submit-image="uploadFile" />
      </div>
      <div class="loading" v-if="uploading">
        <Processing />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import notify, { errorUpload } from "@/utils/NotificationHandler.ts";
import UploadBox from "@/components/UploadBox.vue";
import LinkBar from "@/components/LinkBar.vue";
import Processing from "@/components/Processing.vue";

export default defineComponent({
  name: "Home",
  components: {
    UploadBox,
    LinkBar,
    Processing,
  },
  data: () => {
    return {
      uploading: false,
    };
  },
  methods: {
    async uploadFile(file: File) {
      try {
        this.uploading = true;
        const image = URL.createObjectURL(file);
        const resized = await this.resizeImage(image);
        const grayscale = await this.preprocess(image);

        const res = await fetch("http://127.0.0.1:5000/analyze", {
          method: "POST",
          body: resized,
        });
        const json = await res.json();
        const stringify = await JSON.stringify(json);

        this.$router.push({
          name: "Analysis",
          params: { results: stringify, image: image, grayscale: grayscale },
        });
      } catch (error) {
        notify(errorUpload);
      }

      this.uploading = false;
    },
    async resizeImage(url: string) {
      const quality = 1;
      const img = new Image();
      img.src = url;

      let data = "";
      await new Promise((resolve) => {
        img.onload = async () => {
          const canvas: HTMLCanvasElement = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (ctx) {
            const max = Math.max(img.width, img.height);
            const scale = max > 128 ? 128 / max : 1;

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
    async preprocess(url: string) {
      const img = new Image();
      img.src = url;

      let data = "";
      await new Promise((resolve) => {
        img.onload = async () => {
          const canvas: HTMLCanvasElement = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = "grayscale(1)";

            ctx.drawImage(img, 0, 0, img.width, img.height);
            data = canvas.toDataURL("image/png");
          }

          resolve(true);
        };
      });

      return data;
    },
  },
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.link-bar {
  margin-top: 20px;
}
.container {
  width: 100%;
  max-width: 50em;
}
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
