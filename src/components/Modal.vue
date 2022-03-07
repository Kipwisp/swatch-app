<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal_backdrop" @click="closeModal()" />

      <div class="modal_dialog">
        <div class="modal_header">
          {{ title }}
          <button
            type="button"
            class="modal_close no-background"
            @click="closeModal()"
          >
            <unicon name="times" fill="white" width="50" height="50"></unicon>
          </button>
        </div>

        <div class="modal_body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    title: String,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    closeModal() {
      this.show = false;
    },
    openModal() {
      this.show = true;
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/css/styles.scss";
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  &_backdrop {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &_dialog {
    background-color: var(--modal-bg);
    position: relative;
    margin: 50px auto;
    width: 900px;
    height: 440px;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    z-index: 2;
    padding: 20px 40px 40px 40px;
    @media screen and (max-width: 900px) {
      width: 90%;
    }
  }
  &_close {
    padding: 0;
    border: none;
    cursor: pointer;
    border-radius: 25px;
    transition: background-color 0.2s;
    pointer-events: auto;
  }
  &_close:hover {
    background-color: var(--button-hover);
  }
  &_close:focus {
    background-color: var(--button-clicked);
  }
  &_header {
    user-select: none;
    pointer-events: none;
    font-size: 1.6em;
    display: flex;
    align-items: flex-start;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
