<template>
  <div>
    <app-hero></app-hero>
    <play-btn></play-btn>
    <testimonials />
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
import testimonials from "../components/Home/testimonials.vue";
export default {
  components: {
    "app-header": header,
    appHero: hero,
    playBtn,
    appFooter: footer,
    popularServices,
    testimonials,
  },
};
</script>

<style scoped>
</style>
