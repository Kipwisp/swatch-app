<template>
  <div class="main">
    <div class="header">
      <span class="dot"></span>
      <div class="title">Analysis Complete!</div>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColorProportions from "@/components/ColorProportions.vue";
import ColorPalette from "@/components/ColorPalette.vue";
import ValueDistribution from "@/components/ValueDistribution.vue";
import PictureFrame from "@/components/PictureFrame.vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "Home",
  components: {
    ColorProportions,
    ColorPalette,
    ValueDistribution,
    PictureFrame,
    Card,
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
.main {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  padding: 0 10%;
}
.header {
  align-self: flex-start;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 50px 0 20px 0;
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
  width: 100%;
  flex-wrap: wrap;
}
.dot {
  width: 2.4em;
  height: 2.4em;
  border-radius: 2.4em;
  box-shadow: 0px 0px 3px #000;
  background-color: #df004f;
  animation: loading 5s 0s ease infinite alternate;
  margin-right: 10px;
}
@keyframes loading {
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
</style>
