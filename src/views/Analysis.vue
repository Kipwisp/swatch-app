<template>
  <div :style="{ 'background-image': `url(${image})` }" class="background" />
  <div class="main">
    <div class="header">
      <div class="subheader">
        <span class="dot"></span>
        <div class="title">{{ selectedMessage }}</div>
      </div>
      <div class="buttons">
        <Button
          text="Home"
          icon="estate"
          :action="
            () => {
              this.$router.push({ name: 'Home' });
            }
          "
        />
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
    <div>
      <div class="row">
        <Card v-if="image" title="Image">
          <template v-slot:component>
            <PictureFrame :data="image" :toolTip="true" />
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
            <PictureFrame :data="grayscale" :toolTip="false" />
          </template>
        </Card>
        <Card v-if="results" title="Value Distribution">
          <template v-slot:component>
            <ValueDistribution :data="data.value_distribution" />
          </template>
        </Card>
      </div>
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
    PictureFrame,
    Card,
    Button,
    Modal,
    Upload,
    ColorProportions,
    ColorPalette,
    ValueDistribution,
  },
  props: {
    results: String,
    image: String,
    grayscale: String,
  },
  data: function () {
    return {
      title: "Analysis Results - Swatch",
      messages: [
        "Analysis complete...",
        "Paint splattered!",
        "Interesting choice...",
        "Maybe you should try another?",
        "Prismatic!",
      ],
    };
  },
  computed: {
    data() {
      return JSON.parse(this.results as string);
    },
    selectedMessage() {
      return this.messages[Math.floor(Math.random() * this.messages.length)];
    },
  },
  mounted() {
    document.title = this.title;
    if (!this.results || !this.image || !this.grayscale) {
      this.$router.push({ name: "Home" });
    }
  },
});
</script>

<style scoped lang="scss">
.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  filter: blur(8px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: 0.4;
}
.main {
  display: block;
  width: auto;
  height: auto;
  background-color: var(--glass);
  border-radius: 25px;
  margin: 20px 20px 0px 20px;
  padding: 30px 30px 30px 30px;
  animation: enter 1s ease;
}
@media only screen and (max-width: 550px) {
  .main {
    margin: 5px 5px 0px 5px;
    padding: 10px 10px 10px 10px;
  }
}
.header {
  width: 100%;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}
.subheader {
  align-self: flex-start;
  display: flex;
  flex-direction: row;
}
.buttons {
  align-content: center;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: 1vw;
  flex: 1;
  align-self: right;
}
.title {
  user-select: none;
  font-size: 2em;
  text-align: left;
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
  width: 2em;
  height: 2em;
  border-radius: 2em;
  box-shadow: 0px 0px 3px #000;
  background-color: #df004f;
  animation: flash 2s 0s ease infinite alternate;
  margin-right: 0.5em;
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
    background: #d858ff;
  }
}
@keyframes enter {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}
</style>
