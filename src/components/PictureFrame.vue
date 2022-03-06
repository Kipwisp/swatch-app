<template>
  <div class="frame">
    <img class="pic" :src="data" />
    <div class="resolution">{{ width }} x {{ height }} px</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PictureFrame",
  props: {
    data: String,
  },
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  mounted() {
    const img = new Image();

    if (this.data) {
      img.src = this.data;
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
      };
    }
  },
});
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 380px;
}
.pic {
  max-width: 100%;
  max-height: 100%;
}
.resolution {
  padding: 2px 5px;
  background-color: var(--accent-1);
  font-size: 0.8em;
  align-self: flex-end;
  border-radius: 0 0 5px 5px;
  user-select: none;
}
</style>
