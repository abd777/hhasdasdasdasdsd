<template>
  <div>
    <appHeader></appHeader>
    <Nuxt class="pb-5" />
    <appFooter></appFooter>
  </div>
</template>
<script>
import header from "@/components/home/header";
import footer from "@/components/Home/footer.vue";
export default {
  components: {
    appHeader: header,
    appFooter: footer,
  },
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.5.55/css/materialdesignicons.min.css');
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.c_card {
  border: 2px solid #f5f5f5;
  border-radius: 18px;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.05);
}
.c_card > img {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}
</style>
