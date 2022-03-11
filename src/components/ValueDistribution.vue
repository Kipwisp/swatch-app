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
      const height = 325;
      const width = 325;
      const padding = 60;

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
            .tickValues([0, 45, 95])
        );

      const data: Bin[] = Object.values(chartData);

      const max = d3.max(data, (d: Bin) => d.count);
      const yScale = d3.scaleLinear().domain([0, max]).range([height, 0]);

      const defs = svg.append("defs");

      const startData = data.map((d: Bin) => ({ bin: d.bin, count: 0 }));

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

      const focus = svg
        .append("g")
        .attr("class", "focus")
        .style("display", "none");

      // focus.append("line").attr("stroke", "#147F90").attr("fill", "#A6E8F2");
      focus.append("circle").attr("r", 5);

      focus
        .append("rect")
        .attr("class", "tooltip")
        .attr("width", 100)
        .attr("height", 50)
        .attr("x", 10)
        .attr("y", -22)
        .attr("rx", 4)
        .attr("ry", 4);

      focus.append("text").attr("class", "tooltip-value");

      focus.append("text").attr("x", 18).attr("y", 18).text("Density:");

      focus
        .append("text")
        .attr("class", "tooltip-density")
        .attr("x", 60)
        .attr("y", 18);

      const path = d3.select(".chart-curve").node();
      const getPoint = (x: number, path: SVGPathElement) => {
        let from = 0;
        let to = path.getTotalLength();
        let current = (from + to) / 2;
        let point = path.getPointAtLength(current);

        while (Math.abs(point.x - x) > 0.5) {
          if (point.x < x) from = current;
          else to = current;
          current = (from + to) / 2;
          point = path.getPointAtLength(current);
        }

        return point;
      };

      const approx = [...Array(width).keys()].map(
        (x: number) => getPoint(x, path).y
      );

      const moveTooltip = (event: MouseEvent) => {
        const mouse = d3.pointer(event);
        const x0 = xScale.invert(mouse[0]);
        console.log();
        const x = Math.round(mouse[0]);

        if (x < 0 || x >= width) {
          return;
        }

        const bisect = d3.bisector((d: Bin) => d.bin).left;
        const i = bisect(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d: Bin = x0 - d0.bin > d1.bin - x0 ? d1 : d0;
        const t = x0 - d0.bin > d1.bin - x0 ? i : i - 1;

        focus.attr("transform", "translate(" + x + "," + approx[x] + ")");
        // focus
        //   .attr("x1", xScale(d.bin))
        //   .attr("y1", padding / 2)
        //   .attr("x2", xScale(d.bin))
        //   .attr("y2", height - padding / 2);
        focus.select(".tooltip-value").text(yScale.invert(approx[x]));
        focus.select(".tooltip-density").text(xScale.invert(x));
      };

      svg
        .append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function () {
          focus.style("display", null);
        })
        .on("mouseout", function () {
          focus.style("display", "none");
        })
        .on("mousemove", moveTooltip);
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
  font-size: 1.6em;
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
.chart ::v-deep(.focus circle) {
  fill: steelblue;
}

.chart ::v-deep(.focus text) {
  font-size: 14px;
}

.chart ::v-deep(.tooltip) {
  fill: white;
  stroke: #000;
}

.chart ::v-deep(.tooltip-value, .tooltip-density) {
  font-weight: bold;
}
</style>
