<template>
  <div class="bar">
    <input v-model="link" placeholder="Enter link to image here..." />
    <ToolTip text="Paste from Clipboard">
      <button class="no-background icon">
        <unicon name="clipboard" fill="#37425f" hover-fill="white"></unicon>
      </button>
    </ToolTip>
  </div>
  {{ link }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToolTip from "./ToolTip.vue";

export default defineComponent({
  name: "LinkBar",
  components: {
    ToolTip,
  },
});
</script>

<style scoped lang="scss">
input {
  color: white;
  background-color: rgba(0, 0, 0, 0);
  border: None;
  width: 100%;
}
input:focus {
  outline: None;
}
input::placeholder {
  color: #37425f;
}
.bar {
  flex: 1;
  display: flex;
  justify-content: space-between;
  max-width: 50em;
  border: 2px #37425f solid;
  border-radius: 25px;
  padding: 10px 40px;
  transition: 0.5s;
}
.bar:hover {
  background-color: #232733;
}
</style>
