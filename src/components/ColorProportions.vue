<template>
  <div class="frame">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as d3 from "d3";
import type { PropType } from "vue";

interface Cluster {
  polar: number[];
  count: number;
  hsv: number[];
  hex: string;
  rgb: number[];
  pos: number[];
}

export default defineComponent({
  name: "ColorProportions",
  props: {
    data: Object as PropType<Cluster[]>,
  },
  mounted() {
    if (this.data) {
      this.renderChart(this.$refs.chart as HTMLDivElement, this.data);
    }
  },
  watch: {
    data() {
      if (this.data) {
        d3.select(this.$refs.chart).selectAll("div").remove();
        this.renderChart(this.$refs.chart as HTMLDivElement, this.data);
      }
    },
  },
  methods: {
    renderChart(chart: HTMLDivElement, chartData: Cluster[]) {
      const size = 380;
      const padding = 35;
      const dotSize = 12;

      const data: Cluster[] = Object.values(chartData);
      data.sort((a: Cluster, b: Cluster) => a.hsv[2] - b.hsv[2]);
      const max = d3.max(data, (d: Cluster) => d["count"]);

      const radius = size / 2 - padding;
      const radiusScale = d3.scaleLinear().domain([0, 1]).range([0, radius]);
      const angleMarkers = d3.range(0, 360, 45);

      const zScale = d3.scaleSqrt().domain([2, max]).range([5, 20]);

      const colors = [
        "rgb(127,255,0)",
        "rgb(255,191,0)",
        "rgb(255,0,0)",
        "rgb(255,0,191)",
        "rgb(127,0,255)",
        "rgb(0,63,255)",
        "rgb(0,255,255)",
        "rgb(0,255,63)",
      ];

      const tooltip = d3
        .select(chart)
        .append("div")
        .style("opacity", 0)
        .style("visibility", "hidden")
        .attr("class", "tooltip");

      const showTooltip = (event: MouseEvent, d: Cluster) => {
        const point = event.target as SVGElement;
        d3.select(point).style("stroke", "white");
        this.$emitter.emit("colorSelect", { pos: d.pos, color: d.hex });
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("visibility", "visible");
        tooltip.html(
          `<div>Hex: #${d.hex}</div><div>RGB: ${d.rgb}</div><div>HSV: ${d.hsv}</div><div>Size: ${d.count}</div>`
        );
      };
      const moveTooltip = (event: MouseEvent) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      };
      const hideTooltip = (event: MouseEvent) => {
        const point = event.target as SVGElement;
        d3.select(point).style("stroke", "none");
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
          .style("visibility", "hidden");
      };

      const svg = d3
        .select(chart)
        .append("div")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${size + padding} ${size + padding}`)
        .append("g")
        .attr(
          "transform",
          "translate(" + (size + padding) / 2 + "," + (size + padding) / 2 + ")"
        );

      var angleAxis = svg
        .append("g")
        .attr("class", "axis")
        .selectAll("g")
        .data(angleMarkers)
        .enter()
        .append("g")
        .attr("transform", (d: number) => {
          return "rotate(" + -d + ")";
        });

      angleAxis.append("line").attr("class", "angle-tick").attr("x2", radius);
      angleAxis
        .append("circle")
        .attr("class", "color-dot")
        .attr("r", dotSize)
        .attr("fill", (d: number, i: number) => {
          return colors[i];
        })
        .transition()
        .duration(500)
        .attr("transform", "translate(0," + (radius + padding - dotSize) + ")");

      const radiusAxis = svg
        .append("g")
        .attr("class", "axis")
        .selectAll("g")
        .data(radiusScale.ticks(1))
        .enter()
        .append("g");

      radiusAxis
        .append("circle")
        .attr("class", "radius-tick")
        .attr("r", radiusScale);

      svg
        .selectAll("point")
        .data(data)
        .enter()
        .append("circle")
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        .attr("class", "point")
        .attr("transform", (d: Cluster) => {
          const angle = d.polar[0],
            radius = radiusScale(d.polar[1]),
            x = radius * Math.cos(angle),
            y = radius * Math.sin(angle);
          return "translate(" + [x, y] + ")";
        })
        .attr("fill", (d: Cluster) => {
          const color = `#${d.hex}`;
          return color;
        })
        .attr("z-index", (d: Cluster) => d.hsv[-1])
        .attr("r", 0)
        .transition()
        .attr("r", (d: Cluster) => {
          const size = zScale(d.count);
          return size;
        })
        .duration(1000);
    },
  },
});
</script>

<style scoped lang="scss">
.frame {
  fill: none;
  stroke: #000;
  height: 100%;
  max-width: 425px;
  width: 80vw;
}
.title {
  font-size: 1.6em;
}
.chart ::v-deep(.tooltip) {
  position: absolute;
  background-color: var(--tooltip);
  border-radius: 5px;
  padding: 10px;
  color: white;
  user-select: none;
  text-align: left;
  pointer-events: none;
}
.chart ::v-deep(.point) {
  stroke: none;
}
.chart ::v-deep(.radius-tick) {
  fill: none;
  stroke: white;
  stroke-width: 2;
}
.chart ::v-deep(.angle-tick) {
  fill: none;
  stroke: rgb(66, 66, 66);
}
.chart ::v-deep(.color-dot) {
  stroke: none;
}
</style>
