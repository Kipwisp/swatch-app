<template>
  <div class="frame">
    <div ref="chart" class="chart">
      <template v-for="item in colorNames" :key="item">
        <a :href="'https://www.color-hex.com/color/' + item.hex" target="_blank"
          ><div
            @mouseenter="() => onHover(item.pos)"
            class="color"
            :style="{ 'background-color': `#${item.hex}` }"
          >
            {{ `${item.name}` }}
          </div></a
        >
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import namer from "color-namer";

interface Palette {
  hex: string;
  pos: number[];
}

export default defineComponent({
  name: "ColorPalette",
  props: {
    data: {
      type: Object as PropType<Palette[]>,
    },
  },
  computed: {
    colorNames() {
      return this.data?.map((x) => ({
        name: namer(x.hex, { pick: ["ntc"] }).ntc[0].name,
        hex: x.hex,
        pos: x.pos,
      }));
    },
  },
  methods: {
    onHover(pos: number[]) {
      this.$emitter.emit("colorSelect", pos);
    },
  },
});
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  max-width: 350px;
  width: 80vw;
}
.chart {
  width: 100%;
}
.color {
  user-select: none;
  padding: max(3%, 12px) 0;
  width: 100%;
  margin-bottom: 8px;
  font-size: 1em;
  border-radius: 15px;
  text-shadow: 1px 1px 2px #000;
}
a {
  color: white;
  text-decoration: none;
  transition: color 0.2s;
}
a:hover {
  color: rgb(200, 200, 200);
  text-decoration: none;
}
</style>
