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
    getPoint(x: number, path: SVGPathElement) {
      let from = 0;
      let to = path.getTotalLength();
      let current = (from + to) / 2;
      let point = path.getPointAtLength(current);
      const max_iterations = 25;

      let i = 0;
      while (Math.abs(point.x - x) > 0.5 && i < max_iterations) {
        if (point.x < x) from = current;
        else to = current;
        current = (from + to) / 2;
        point = path.getPointAtLength(current);
        i++;
      }

      return point;
    },
    renderChart(chart: HTMLDivElement, chartData: Bin[]) {
      const height = 325;
      const width = 325;
      const padding = 60;

      const data: Bin[] = Object.values(chartData);
      const startData = data.map((d: Bin) => ({ bin: d.bin, count: 0 }));
      const max = d3.max(data, (d: Bin) => d.count);

      const tickLabels = ["Shadow", "Midtone", "Light"];
      const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
      const yScale = d3.scaleLinear().domain([0, max]).range([height, 0]);

      const svg = d3
        .select(chart)
        .append("div")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width + padding} ${height + padding}`)
        .append("g")
        .attr(
          "transform",
          "translate(" + padding / 2 + "," + padding / 2 + ")"
        );

      const tooltip = d3
        .select(chart)
        .append("div")
        .style("opacity", 0)
        .style("visibility", "hidden")
        .attr("class", "tooltip");

      const line = d3
        .line()
        .curve(d3.curveBasis)
        .x((d: Bin) => {
          return xScale(d.bin);
        })
        .y((d: Bin) => {
          return yScale(d.count);
        });

      svg
        .append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "transparent")
        .attr("class", "chart-curve");

      const path = d3.select(".chart-curve").node();
      const curveValues = [...Array(101).keys()].map(
        (x: number) => this.getPoint(Math.round(xScale(x)), path).y
      );

      const showTooltip = () => {
        focus.style("display", null);
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("visibility", "visible");
      };

      const moveTooltip = (event: MouseEvent) => {
        const mouse = d3.pointer(event);
        const x = mouse[0];

        const value = Math.round(xScale.invert(x));
        const prob =
          Math.round(yScale.invert(curveValues[value]) * 10000) / 100;

        svg
          .select(".hover-dot")
          .attr("transform", "translate(" + x + "," + curveValues[value] + ")");
        svg
          .select(".hover-line")
          .attr("x1", x)
          .attr("y1", 0)
          .attr("x2", x)
          .attr("y2", height);

        const pos = (
          svg.select(".hover-dot").node() as HTMLDivElement
        ).getBoundingClientRect();

        tooltip
          .html(`<div>Value: ${value}</div><div>Probability: ${prob}%</div>`)
          .style("left", event.pageX + 10 + "px")
          .style("top", window.scrollY + pos.y - 22 + "px");
      };

      const hideTooltip = () => {
        focus.style("display", "none");
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
          .style("visibility", "hidden");
      };

      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3
            .axisBottom(xScale)
            .ticks(2)
            .tickFormat((d: string[], i: number) => tickLabels[i])
            .tickValues([0, 50, 100])
        );

      const gradient = svg
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

      const area = d3
        .area()
        .curve(d3.curveBasis)
        .x((d: Bin) => {
          return xScale(d.bin);
        })
        .y1((d: Bin) => {
          return yScale(d.count);
        })
        .y0(yScale(0));

      svg
        .append("path")
        .datum(startData)
        .attr("d", area)
        .attr("fill", "url(#svgGradient)")
        .attr("stroke", "rgba(255, 255, 255, 0.2")
        .attr("stroke-width", 2)
        .transition()
        .duration(1000)
        .attrTween("d", function () {
          const interpolator = d3.interpolateArray(startData, data);
          return (d: number) => {
            return area(interpolator(d));
          };
        });

      const focus = svg
        .append("g")
        .attr("class", "focus")
        .style("display", "none");

      focus.append("line").attr("class", "hover-line");
      focus.append("circle").attr("class", "hover-dot").attr("r", 5);

      svg
        .append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip);
    },
  },
});
</script>

<style scoped lang="scss">
.frame {
  width: 100%;
  height: 100%;
  max-width: 425px;
  width: 80vw;
}
.chart {
  width: 100%;
  height: 100%;
}
.title {
  font-size: 1.6em;
}
.chart ::v-deep(text) {
  user-select: none;
  font-size: 1.4em;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.chart ::v-deep(.overlay) {
  fill: none;
  pointer-events: all;
}
.chart ::v-deep(.focus .hover-dot) {
  fill: rgb(255, 86, 74);
}
.chart ::v-deep(.focus .hover-line) {
  stroke: rgb(255, 86, 74);
}

.chart ::v-deep(.focus text) {
  font-size: 14px;
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
</style>
