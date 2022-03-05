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
  bin: number;
};

export default defineComponent({
  name: "ValueDistribution",
  props: {
    data: Object,
  },
  mounted() {
    const height = 250;
    const width = 325;
    const padding = 100;

    const svg = d3
      .select(this.$refs.chart)
      .append("svg")
      .attr("width", width + padding)
      .attr("height", height + padding)
      .append("g")
      .attr("transform", "translate(" + padding / 2 + "," + padding / 2 + ")");

    const x = d3.scaleLinear().domain([0, 95]).range([0, width]);

    const tickLabels = ["Shadow", "Midtone", "Light"];
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3
          .axisBottom(x)
          .ticks(2)
          .tickFormat((d: string[], i: number) => tickLabels[i])
          .tickValues([0, 50, 95])
      );

    const data: (number | string)[][] = [];

    let max = 0;
    if (this.data) {
      max = Object.values(this.data).reduce((x, acc) =>
        x.count > acc ? x.count : acc.count
      );
      Object.values(this.data).forEach((value: response) => {
        data.push([value.bin, value.count]);
      });
    }

    const y = d3
      .scaleLinear()
      .domain([0, max + 0.02])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d3.format(".1%")));

    const defs = svg.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "svgGradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%");

    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", "black")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 1);

    svg
      .append("path")
      .attr("class", "mypath")
      .datum(data)
      .attr("opacity", ".8")
      .attr("fill", "url(#svgGradient)")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr(
        "d",
        d3
          .area()
          .curve(d3.curveBasis)
          .x((d: number[]) => {
            return x(d[0]);
          })
          .y1((d: number[]) => {
            return y(d[1]);
          })
          .y0(y(0))
      );
  },
});
</script>

<style scoped lang="scss">
.chart {
  font-size: 1.6em;
}
.title {
  font-size: 1.6em;
}
.chart ::v-deep(text) {
  user-select: none;
  font-size: 1.2em;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
