<template>
  <div class="mt-5">
    <b-container>
      <h2>Popular Services</h2>
      <b-row>
        <b-col cols="12" md="4" sm="6" lg="3" v-for="(v,i) in 4" :key="i" class="mt-3">
          <b-card
            no-body
            img-height="227px"
            img-src="https://placekitten.com/380/200"
            img-alt="Image"
            img-top
            class="shadow rounded"
          >
            <b-card-body>
              <b-card-title>Service name</b-card-title>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <div
      :style="{'background-image':`url(hero.jpg)`}"
      class="container_wrapper d-flex flex-column justify-content-center align-items-center mt-5"
    >
      <p class="c_h1 text-center">Want Customized Services?</p>
      <div class="c_p1 text-center">
        <b-btn
          size="lg"
          class="px-5"
          variant="primary"
          style="border-radius:100px"
          to="/contact"
        >Contact Us</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
.container_wrapper {
  height: 100vh;
  background-attachment: scroll;
  background-size: 100% 100%;
}
</style>