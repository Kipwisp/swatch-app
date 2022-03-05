<template>
  <div class="about">
    <Processing />
  </div>
  <ColorProportions />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Processing from "@/components/Processing.vue";
import ColorProportions from "@/components/ColorProportions.vue";

export default defineComponent({
  name: "About",
  components: {
    Processing,
    ColorProportions,
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
