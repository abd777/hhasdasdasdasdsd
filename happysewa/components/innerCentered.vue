<template>
  <div class="main">
    <div class="r_width bg-white p-3 mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@media (max-width: 767px) {
  .main {
    padding-top: 10em;
    padding-bottom: 5em;
    background-color: #f5f8fb;
  }
  .r_width {
    width: 90%;
  }
}
@media (min-width: 767.8px) {
  .main {
    padding-top: 12em;
    padding-bottom: 7em;
    background-color: #f5f8fb;
  }
  .r_width {
    width: 60%;
  }
}
</style>