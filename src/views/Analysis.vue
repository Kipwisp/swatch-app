<template>
  <div
    :style="{ 'background-image': `url(${image})` }"
    class="background"
  ></div>
  <div class="main">
    <div class="header">
      <div class="subheader">
        <span class="dot"></span>
        <div class="title">Analysis Complete!</div>
      </div>
      <Button
        :text="'Upload'"
        :action="
          () => {
            $refs.modal.openModal();
          }
        "
      />
    </div>
    <div class="row">
      <Card v-if="image" title="Image">
        <template v-slot:component>
          <PictureFrame :data="image" />
        </template>
      </Card>
      <Card v-if="results" title="Color Proportions">
        <template v-slot:component>
          <ColorProportions :data="data.color_proportion" />
        </template>
      </Card>
      <Card v-if="results" title="Color Palette">
        <template v-slot:component>
          <ColorPalette :data="data.color_palette" />
        </template>
      </Card>
    </div>
    <div class="row">
      <Card v-if="grayscale" title="Values">
        <template v-slot:component>
          <PictureFrame :data="grayscale" />
        </template>
      </Card>
      <Card v-if="results" title="Value Distribution">
        <template v-slot:component>
          <ValueDistribution :data="data.value_distribution" />
        </template>
      </Card>
    </div>
  </div>
  <modal ref="modal" :title="'Upload an Image'">
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
import ColorProportions from "@/components/ColorProportions.vue";
import ColorPalette from "@/components/ColorPalette.vue";
import ValueDistribution from "@/components/ValueDistribution.vue";
import PictureFrame from "@/components/PictureFrame.vue";
import Card from "@/components/Card.vue";
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";
import Upload from "@/components/Upload.vue";

export default defineComponent({
  name: "Home",
  components: {
    ColorProportions,
    ColorPalette,
    ValueDistribution,
    PictureFrame,
    Card,
    Button,
    Modal,
    Upload,
  },
  props: {
    results: String,
    image: String,
    grayscale: String,
  },
  computed: {
    data() {
      return JSON.parse(this.results as string);
    },
  },
  mounted() {
    if (!this.results || !this.image || !this.grayscale) {
      this.$router.push({ name: "Home" });
    }
  },
});
</script>

<style scoped lang="scss">
.background {
  position: absolute;
  width: 100vw;
  height: 100vh;
  filter: blur(2px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: 0.4;
}
.main {
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  background-color: var(--glass);
  border-radius: 50px;
  margin: 25px 100px;
  padding: 30px;
  min-width: 600px;
  animation: enter 1s ease;
  backdrop-filter: blur(5px);
}
.header {
  width: 100%;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
}
.subheader {
  align-self: flex-start;
  display: flex;
  flex-direction: row;
}
.title {
  user-select: none;
  font-size: 2.4em;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  width: auto;
  flex-wrap: wrap;
}
.dot {
  width: 2.4em;
  height: 2.4em;
  border-radius: 2.4em;
  box-shadow: 0px 0px 3px #000;
  background-color: #df004f;
  animation: flash 2s 0s ease infinite alternate;
  margin-right: 10px;
}
@keyframes flash {
  0% {
    background: #ff4848;
  }
  25% {
    background: #fdff89;
  }
  50% {
    background: #74fca8;
  }
  75% {
    background: #3bb1ff;
  }
  100% {
    transform: translateY(0px);
    background: #d858ff;
  }
}
@keyframes enter {
  from {
    filter: blur(8px);
    transform: scale(0.8);
  }
  to {
    filter: blur(0px);
    transform: scale(1);
  }
}
</style>
