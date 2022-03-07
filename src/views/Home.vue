<template>
  <div class="background"></div>
  <div class="main">
    <div class="backdrop">
      <div>
        <div class="name">Color App</div>
        <span class="divider"></span>
        <div>Color Analysis, Palette Generation, Value Distribution</div>
        <div>Get started by uploading an image!</div>
      </div>
      <Button
        text="Upload"
        icon="upload"
        :action="
          () => {
            $refs.modal.openModal();
          }
        "
      />
    </div>
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
  data: () => {
    return {
      uploading: false,
    };
  },
});
</script>

<style scoped lang="scss">
.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  filter: blur(2px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: 0.4;
  background-image: url(~@/assets/backdrop.png);
  animation: fade-in 1s ease;
}
.divider {
  background-color: white;
  height: 2px;
  width: 500px;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.backdrop {
  background-color: var(--glass);
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 150px;
  backdrop-filter: blur(25px);
  animation: enter 1s ease;
  flex-wrap: wrap;
}
.name {
  font-size: 4em;
}
@keyframes enter {
  from {
    filter: blur(8px);
  }
  to {
    filter: blur(0px);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.4;
  }
}
</style>
