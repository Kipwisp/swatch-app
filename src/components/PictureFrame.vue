<template>
  <div class="frame">
    <img class="pic" :src="data" target="_blank" />
    <div class="resolution">{{ width }} x {{ height }} px</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PictureFrame",
  props: {
    data: String,
  },
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  watch: {
    data: function () {
      if (this.data) {
        this.loadImage(this.data).then((dimensions: number[]) => {
          this.width = dimensions[0];
          this.height = dimensions[1];
        });
      }
    },
  },
  mounted() {
    if (this.data) {
      this.loadImage(this.data).then((dimensions: number[]) => {
        this.width = dimensions[0];
        this.height = dimensions[1];
      });
    }
  },
  methods: {
    loadImage: async (imgData: string): Promise<number[]> => {
      const img = new Image();
      img.src = imgData;
      let dimensions = [] as number[];
      await new Promise((resolve) => {
        img.onload = async () => {
          dimensions = [img.width, img.height];
          resolve(true);
        };
      });

      return dimensions;
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/css/styles.scss";
.frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 85%;
}
.pic {
  max-width: 100%;
  max-height: 425px;
}
.resolution {
  padding: 2px 5px;
  background-color: var(--pic-res);
  font-size: 0.8em;
  align-self: flex-end;
  border-radius: 0 0 5px 5px;
  user-select: none;
}
</style>
