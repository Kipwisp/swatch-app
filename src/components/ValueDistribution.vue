<template>
  <div class="frame">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as d3 from "d3";
import type { PropType } from "vue";

interface Bin {
  count: number;
  bin: number;
}

export default defineComponent({
  name: "ValueDistribution",
  props: {
    data: Object as PropType<Bin[]>,
  },
  watch: {
    data: function () {
      if (this.data) {
        d3.select(this.$refs.chart).selectAll("div").remove();
        this.renderChart(this.$refs.chart as HTMLDivElement, this.data);
      }
    },
  },
  mounted() {
    if (this.data) {
      this.renderChart(this.$refs.chart as HTMLDivElement, this.data);
    }
  },
  methods: {
    renderChart: (chart: HTMLDivElement, chartData: Bin[]) => {
      const height = 250;
      const width = 325;
      const padding = 100;

      const svg = d3
        .select(chart)
        .append("div")
        .append("svg")
        .attr("width", width + padding)
        .attr("height", height + padding)
        .append("g")
        .attr(
          "transform",
          "translate(" + padding / 2 + "," + padding / 2 + ")"
        );

      const xScale = d3.scaleLinear().domain([0, 95]).range([0, width]);

      const tickLabels = ["Shadow", "Midtone", "Light"];
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3
            .axisBottom(xScale)
            .ticks(2)
            .tickFormat((d: string[], i: number) => tickLabels[i])
            .tickValues([0, 50, 95])
        );

      const data: (number | string)[][] = [];

      Object.values(chartData).forEach((value: Bin) => {
        data.push([value.bin, value.count]);
      });

      const max = d3.max(data, (d: (number | string)[]) => d[1]);
      const yScale = d3.scaleLinear().domain([0, max]).range([height, 0]);

      svg
        .append("g")
        .call(d3.axisLeft(yScale).ticks(4).tickFormat(d3.format(".1%")));

      const defs = svg.append("defs");

      const startData = data.map((d) => {
        return [d[0], 0];
      });

      const area = d3
        .area()
        .curve(d3.curveBasis)
        .x((d: number[]) => {
          return xScale(d[0]);
        })
        .y1((d: number[]) => {
          return yScale(d[1]);
        })
        .y0(yScale(0));

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
        .datum(startData)
        .attr("d", area)
        .attr("fill", "url(#svgGradient)")
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .transition()
        .duration(1000)
        .attrTween("d", function () {
          const interpolator = d3.interpolateArray(startData, data);
          return (d: number) => {
            return area(interpolator(d));
          };
        });
    },
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
