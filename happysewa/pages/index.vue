<template>
  <div>
    <app-hero></app-hero>
    <play-btn></play-btn>
    <popular-services></popular-services>
    <app-footer></app-footer>
  </div>
</template>

<script>
import header from "../components/Home/header.vue";
import hero from "../components/Home/hero.vue";
import playBtn from "../components/Home/playBtn.vue";
import footer from "../components/Home/footer.vue";
import popularServices from "../components/Home/popularServices.vue";
export default {
  components: {
    "app-header": header,
    appHero: hero,
    playBtn,
    appFooter: footer,
    popularServices,
  },
};
</script>

<style scoped>
</style>
