<template>
  <div>
    <CoolLightBox :items="items" :index="index" @close="index = null"></CoolLightBox>
    <div
      class="playbtn-div py-5 my-5 bg-light w-100 text-center container-fluid"
      style="background-color:#e3e6f0"
    >
      <h1>Guide</h1>
      <p>explains how to use it explains how to use it explains how to use it explains how to use it explains how to use it</p>
      <div
        class="icon-div h3 text-success row align-items-center justify-content-center mx-auto"
        @click="index=0"
      >
        <i class="mdi mdi-play my-auto"></i>
      </div>
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      items: ["https://www.youtube.com/embed/HKMGxvJCivU"],
      index: null,
    };
  },
  computed: {
    ...mapGetters(["getSettings"]),
  },
  watch: {
    getSettings: {
      handler(val) {
        this.items = [val.ytVideo];
      },
      immediate: true,
    },
  },
  components: {
    CoolLightBox,
  },
};
</script>

<style scoped>
.icon-div {
  height: 90px;
  width: 90px;
  cursor: pointer;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2.5rem #e3e6f0;
}
</style>