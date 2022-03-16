<template>
  <span v-if="toolTip" ref="pixelhover" class="pixel-hover" />
  <div class="frame">
    <img
      ref="img"
      :style="grayScale ? { filter: 'grayscale(1)' } : {}"
      class="pic"
      :src="data"
      target="_blank"
    />
    <div v-if="!grayScale" class="resolution">
      {{ width }} x {{ height }} px
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ColorSelectEvent } from "@/utils/EventHandler";

export default defineComponent({
  name: "PictureFrame",
  props: {
    data: String,
    toolTip: Boolean,
    grayScale: Boolean,
  },
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  watch: {
    data: function () {
      if (this.toolTip) {
        const hover = this.$refs.pixelhover as HTMLSpanElement;
        hover.style.opacity = "0";
      }
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

    if (this.toolTip) {
      this.$emitter.on("colorSelect", (event: ColorSelectEvent) => {
        this.moveTooltip(event);
      });
    }
  },
  unmounted() {
    if (this.toolTip) this.$emitter.off("colorSelect");
  },
  methods: {
    async loadImage(imgData: string): Promise<number[]> {
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
    moveTooltip(event: ColorSelectEvent) {
      const [x, y] = event.pos;
      const hover = this.$refs.pixelhover as HTMLSpanElement;
      const rect = (this.$refs.img as HTMLDivElement).getBoundingClientRect();
      const max_size = 150;

      const scale =
        this.height > this.width
          ? rect.height / Math.min(max_size, this.height)
          : rect.width / Math.min(max_size, this.width);

      hover.style.opacity = "1";
      hover.style.top = `${window.scrollY + rect.y + y * scale - 10}px`;
      hover.style.left = `${window.scrollX + rect.x + x * scale - 10}px`;
      hover.style.backgroundColor = `#${event.color}`;
      hover.animate([{ transform: "scale(0)" }, { transform: "scale(1)" }], {
        duration: 100,
      });
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
.pixel-hover {
  position: absolute;
  border-radius: 25px;
  border: 3px white solid;
  pointer-events: none;
  width: 25px;
  height: 25px;
  z-index: 1;
  opacity: 0;
}
</style>
