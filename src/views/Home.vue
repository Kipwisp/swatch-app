<template>
  <div class="home">
    <div class="upload-box">
      <UploadBox />
    </div>
    <div class="link-bar">
      <LinkBar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UploadBox from "@/components/UploadBox.vue";
import LinkBar from "@/components/LinkBar.vue";

export default defineComponent({
  name: "Home",
  components: {
    UploadBox,
    LinkBar,
  },
});
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
}
.upload-box {
  display: flex;
  margin-top: 100px;
  justify-content: center;
  align-content: center;
}
.link-bar {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-content: center;
}
</style>
