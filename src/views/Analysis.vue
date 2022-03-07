<template>
  <div :style="{ 'background-image': `url(${image})` }" class="background" />
  <div class="pad">
    <div class="main">
      <div class="fix">
        <div class="header">
          <div class="subheader">
            <span class="dot"></span>
            <div class="title">{{ selectedTitle }}</div>
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
      titles: [
        "Analysis complete...",
        "Colors unified...",
        "Paint splattered...",
        "Interesting choice...",
        "Maybe you should try another?",
      ],
    };
  },
  computed: {
    data() {
      return JSON.parse(this.results as string);
    },
    selectedTitle() {
      if (this.results) {
        return this.titles[Math.floor(Math.random() * this.titles.length)];
      }
      return undefined;
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
  position: fixed;
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
  position: relative;
  display: block;
  width: auto;
  height: auto;
  background-color: var(--glass);
  border-radius: 25px;
  margin: 20px 20px 0px 20px;
  padding: 30px 30px 0px 30px;
  animation: enter 1s ease;
  backdrop-filter: blur(25px);
}
.pad {
  padding-bottom: 10px;
}
.fix {
  position: relative;
  width: 100%;
  height: auto;
  top: -50px;
  left: -50px;
  padding: 50px 50px 0px 50px;
  filter: blur(0px);
}
@media only screen and (max-width: 550px) {
  .main {
    padding: 10px 10px 0px 10px;
    margin: 5px 5px 0px 5px;
  }
  .pad {
    padding-bottom: 0px;
  }
  .fix {
    top: -15px;
    left: -15px;
    padding: 15px 15px 0px 15px;
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
    filter: blur(8px);
    transform: scale(0.8);
  }
  to {
    filter: blur(0px);
    transform: scale(1);
  }
}
</style>
