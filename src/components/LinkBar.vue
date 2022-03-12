<template>
  <div class="bar">
    <form
      class="form"
      enctype="multipart/form-data"
      v-on:submit.prevent="uploadImage"
    >
      <input
        class="inputbar"
        v-model="link"
        placeholder="Enter link to image here..."
      />
    </form>
    <ToolTip text="Paste">
      <button v-on:click="paste" class="no-background icon">
        <unicon
          name="clipboard"
          fill="var(--accent-1)"
          hover-fill="white"
        ></unicon>
      </button>
    </ToolTip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToolTip from "./ToolTip.vue";
import { notifyError, errorFetch } from "@/utils/NotificationHandler.ts";

export default defineComponent({
  name: "LinkBar",
  data() {
    return {
      link: "",
    };
  },
  components: {
    ToolTip,
  },
  methods: {
    async paste() {
      this.link = await navigator.clipboard.readText();
      this.uploadImage();
    },
    async uploadImage() {
      try {
        const response = await fetch(this.link);
        if (response && response.ok) {
          const blob = await response.blob();
          if (blob.type.startsWith("image/")) {
            const filetype = blob.type.split("/").pop();
            this.$emit(
              "submit-image",
              new File([blob], `image.${filetype}`, { type: blob.type })
            );
          } else {
            throw "Invalid Response";
          }
        } else {
          throw "Invalid Response";
        }
      } catch (error) {
        notifyError(errorFetch);
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/css/styles.scss";
.inputbar {
  color: white;
  background-color: rgba(0, 0, 0, 0);
  border: None;
  height: 100%;
  width: 100%;
  padding: 15px 0;
}
.form {
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
}
input:focus {
  outline: None;
}
input::placeholder {
  color: var(--accent-1);
}
.bar {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px var(--accent-1) solid;
  border-radius: 25px;
  padding: 0px 1em;
  transition: 0.2s;
}
.bar:hover {
  background-color: var(--button-hover);
}
.icon {
  cursor: pointer;
}
</style>
