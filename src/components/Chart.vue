<template>
  <div ref="chart"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as d3 from "d3";

export default defineComponent({
  name: "Chart",
  mounted() {
    const spiral = [
      [2, 23],
      [1, 43],
      [4, 39],
    ];

    var svg = d3
      .select(this.$refs.chart)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    var path = svg.append("path");

    svg
      .select("path")
      .attr("d", d3.lineRadial()(spiral))
      .attr("stroke", "white")
      .attr("fill", "none")
      .attr("transform", function () {
        return "translate(" + [150, 150] + ")";
      });
  },
});
</script>

<style scoped lang="scss">
.frame {
  fill: none;
  stroke: #000;
}

.axis text {
  font: 10px sans-serif;
}

.axis line,
.axis circle {
  fill: none;
  stroke: steelblue;
  stroke-dasharray: 4;
}

.axis:last-of-type circle {
  stroke: steelblue;
  stroke-dasharray: none;
}

.line {
  fill: none;
  stroke: orange;
  stroke-width: 3px;
}
</style>
