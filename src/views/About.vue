<template>
  <div class="about">
    <Processing />
  </div>
  <Chart />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Processing from "@/components/Processing.vue";
import Chart from "@/components/Chart.vue";

export default defineComponent({
  name: "About",
  components: {
    Processing,
    Chart,
  },
});
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
}
.about {
  margin-top: 100px;
}
</style>
