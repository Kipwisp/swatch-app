<template>
  <div class="frame">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as d3 from "d3";

type response = {
  count: number;
  polar: number[];
  rgb: string;
  css: string;
  hex: string;
};

export default defineComponent({
  name: "ColorProportions",
  props: {
    data: Object,
  },
  mounted() {
    const size = 350;
    const padding = 40;
    const dotSize = 12;

    const radius = size / 2 - padding;
    const radiusScale = d3.scaleLinear().domain([0, 1]).range([0, radius]);
    const angleMarkers = d3.range(0, 360, 45);

    const colors = [
      "yellow",
      "orange",
      "red",
      "magenta",
      "purple",
      "blue",
      "teal",
      "green",
    ];

    const tooltip = d3
      .select(this.$refs.chart)
      .append("div")
      .style("opacity", 0)
      .style("visibility", "hidden")
      .attr("class", "tooltip");

    const showTooltip = (event: MouseEvent, d: number[]) => {
      const point = event.target as HTMLInputElement;
      d3.select(point).style("stroke", "white");
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("visibility", "visible");
      tooltip
        .html(d[3])
        .style("left", event.x + 10 + "px")
        .style("top", event.y + 10 + "px");
    };
    const moveTooltip = (event: MouseEvent) => {
      tooltip
        .style("left", event.x + 10 + "px")
        .style("top", event.y + 10 + "px");
    };
    const hideTooltip = (event: MouseEvent) => {
      const point = event.target as HTMLInputElement;
      d3.select(point).style("stroke", "none");
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
        .style("visibility", "hidden");
    };

    const svg = d3
      .select(this.$refs.chart)
      .append("svg")
      .attr("width", size + padding)
      .attr("height", size + padding)
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

    let data: (number | string)[][] = [];

    if (this.data) {
      Object.values(this.data).forEach((value: response) => {
        data.push([...value.polar, value.count, value.css]);
      });
    }

    const zScale = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d: (number | string)[]) => d[2])])
      .range([0, 20]);

    svg
      .selectAll("point")
      .data(data)
      .enter()
      .append("circle")
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip)
      .attr("class", "point")
      .attr("transform", (d: number[]) => {
        const angle = d[0],
          radius = radiusScale(d[1]),
          x = radius * Math.cos(angle),
          y = radius * Math.sin(angle);
        return "translate(" + [x, y] + ")";
      })
      .attr("fill", (d: number[]) => {
        const color = d[3];
        return color;
      })
      .attr("r", 0)
      .transition()
      .attr("r", (d: number[]) => {
        const size = zScale(d[2]);
        return size;
      })
      .duration(1000);
  },
});
</script>

<style scoped lang="scss">
.frame {
  fill: none;
  stroke: #000;
}
.title {
  font-size: 1.6em;
}
.chart ::v-deep(.tooltip) {
  position: fixed;
  background-color: var(--tooltip);
  border-radius: 5px;
  padding: 10px;
  color: white;
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
