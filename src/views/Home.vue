<template>
  <div class="home">
    <div v-if="!uploading && !results" class="upload-box">
      <UploadBox v-on:submit-image="uploadFile" />
    </div>
    <div v-if="!uploading && !results" class="link-bar">
      <LinkBar v-on:submit-image="uploadFile" />
    </div>
    <div class="loading" v-if="uploading">
      <Processing />
    </div>
    <div class="row">
      <Card v-if="results" title="Color Proportions">
        <template v-slot:component>
          <ColorProportions v-bind:data="results.color_proportion" />
        </template>
      </Card>
      <Card v-if="results" title="Color Palette">
        <template v-slot:component>
          <ColorPalette v-bind:data="results.color_palette" />
        </template>
      </Card>
      <Card v-if="results" title="Value Distribution">
        <template v-slot:component>
          <ValueDistribution v-bind:data="results.value_distribution" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UploadBox from "@/components/UploadBox.vue";
import LinkBar from "@/components/LinkBar.vue";
import Processing from "@/components/Processing.vue";
import ColorProportions from "@/components/ColorProportions.vue";
import ColorPalette from "@/components/ColorPalette.vue";
import ValueDistribution from "@/components/ValueDistribution.vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "Home",
  components: {
    UploadBox,
    LinkBar,
    Processing,
    ColorProportions,
    ColorPalette,
    ValueDistribution,
    Card,
  },
  data: () => {
    return {
      uploading: false,
      results: null,
    };
  },
  methods: {
    uploadFile(file: File) {
      this.uploading = true;
      fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: file,
      }).then((res) => {
        this.uploading = false;
        res.json().then((r) => (this.results = r));
      });
    },
  },
});
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
}
.upload-box {
  display: flex;
  margin-top: 100px;
  justify-content: center;
  align-content: center;
}
.link-bar {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-content: center;
}
.loading {
  margin-top: 100px;
}
.row {
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
</style>
