<template>
  <div class="about">
    <Processing />
  </div>
  <ColorProportions />
  <DominantColors />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Processing from "@/components/Processing.vue";
import ColorProportions from "@/components/ColorProportions.vue";
import DominantColors from "@/components/DominantColors.vue";

export default defineComponent({
  name: "About",
  components: {
    Processing,
    ColorProportions,
    DominantColors,
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
