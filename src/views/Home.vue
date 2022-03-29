<template>
  <div class="main">
    <div class="backdrop">
      <div class="title-container">
        <img class="logo" src="@/assets/img/logo.png" />
        <div class="subtitle">Image Palette Generation and Color Analysis</div>
      </div>

      <div class="text">
        Captivated by the colors of an image? With Swatch, you can generate
        color palettes, plot color proportions, and visualize value
        distributions for a quick and easy color analysis! Get started by
        uploading an image!
      </div>
      <Button
        text="Upload"
        icon="upload"
        type="Primary"
        :action="
          () => {
            $refs.modal.openModal();
          }
        "
      />
      <div class="social-media">
        <a :href="getGithub">
          <img class="social-icon" src="@/assets/img/github.png" />
        </a>
      </div>
    </div>
    <div
      :style="{ 'background-image': selectedBackground }"
      class="background"
    />
  </div>
  <modal ref="modal" :title="'Image Upload'">
    <template v-slot:body>
      <Upload
        :callback="
          () => {
            $refs.modal.closeModal();
          }
        "
      />
    </template>
  </modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Upload from "@/components/Upload.vue";
import Modal from "@/components/Modal.vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "Home",
  components: {
    Upload,
    Modal,
    Button,
  },
  data: function () {
    return {
      title: "Image Palette Generation and Color Analysis - Swatch",
      backgrounds: [
        "background_1.jpg",
        "background_2.jpg",
        "background_3.jpg",
        "background_4.jpg",
      ],
    };
  },
  computed: {
    selectedBackground(): string {
      const selected =
        this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];

      return `url(${require(`@/assets/img/${selected}`)})`;
    },
    getGithub(): string {
      return process.env.VUE_APP_GITHUB;
    },
  },
  mounted() {
    document.title = this.title;
  },
});
</script>

<style scoped lang="scss">
.background {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
  animation: fade-in 3s ease-out;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: rgb(255, 223, 209);
}
.backdrop {
  width: min(100%, 700px);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  gap: min(20px, 1%);
  background-color: var(--main-bg);
  border-right: 5px var(--modal-bg) solid;
}
@media only screen and (max-width: 600px) {
  .background {
    width: 0%;
  }
  .backdrop {
    border-right: none;
  }
}
@media only screen and (max-height: 350px) {
  .main {
    height: auto;
  }
  .backdrop {
    padding: 20px 0px;
  }
}
.logo {
  width: min(300px, 35vh);
  height: auto;
}
.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.subtitle {
  font-size: 1.2em;
  margin-bottom: 30px;
}
.text {
  font-size: 1em;
  color: var(--text-light);
  width: min(500px, 90%);
  margin-bottom: 20px;
}
.social-media {
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--modal-bg);
  padding: 10px;
  border-radius: 0px 0px 25px 0px;
}
.social-icon {
  width: 32px;
  height: 32px;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
}
</style>
