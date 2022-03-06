<template>
  <div class="frame">
    <div ref="chart" class="chart">
      <template v-for="item in data" :key="item">
        <a :href="'https://www.color-hex.com/color/' + item.hex" target="_blank"
          ><div class="color" :style="{ 'background-color': item.rgb }">
            {{ `#${item.hex}` }}
          </div></a
        >
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

interface Palette {
  value: number[];
  hex: string;
  rgb: string;
  count: number;
}

export default defineComponent({
  name: "ColorPalette",
  props: {
    data: {
      type: Object as PropType<Palette>,
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
}
.color {
  user-select: none;
  padding: 10px 150px;
  margin-bottom: 10px;
  font-size: 1em;
  border-radius: 15px;
  text-shadow: 2px 2px #000;
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
