<template>
  <div>
    <appHeader />
    <div
      :style="{'background-image':`url(hero.jpg)`}"
      class="container_wrapper d-flex flex-column justify-content-center align-items-center"
    >
      <p class="c_h1 text-center">Happy Sewa</p>
      <p class="c_p1 text-center">One Stop Shop For Everyday Services.</p>
      <b-row class="no-gutters pl-lg-4 pr-lg-1 px-2 py-1 mutliple_search_wrapper">
        <b-col lg="4" class="c_input_wrapper">
          <b-input placeholder="What are you searching for?" class="rounded border-0 c_input"></b-input>
        </b-col>
        <b-col md="12" lg="3" class="d-flex c_input_wrapper">
          <b-input placeholder="Location?" class="border-0 c_input"></b-input>
          <i class="mdi mdi-target text-secondary c_p1 mt-1"></i>
        </b-col>
        <b-col cols="12" lg="3">
          <input list="categories" class="form-control border-0 c_input" placeholder="Categories" />
          <datalist id="categories" style="margin:0px;padding:0px;">
            <option :value="i" v-for="(v,i) in 3" :key="i">{{ i }}</option>
          </datalist>
        </b-col>
        <b-col cols="12" lg="2" class="text-right">
          <b-button variant="primary" class="h-100 w-100" style="border-radius:10rem">Search</b-button>
        </b-col>
      </b-row>
    </div>
    <!-- <b-carousel
      id="carousel-1"
      v-model="slide"
      fade
      :interval="4000"
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;position: relative;"
    >
      <div class="container">
        <div class="inner_srch col-12 col-md-8">
          <b-row class="py-2 no-gutters">
            <b-col cols="12" md="4">
              <b-input
                placeholder="What are you searching for?"
                size="sm"
                class="border-top-0 border-left-0 border-bottom-0"
              ></b-input>
            </b-col>
            <b-col cols="12" md="3" class="d-flex">
              <b-input
                placeholder="Location?"
                size="sm"
                class="border-top-0 border-left-0 border-bottom-0 col-10"
              ></b-input>
              <i class="mdi mdi-target text-secondary mt-1" style="margin-left:-20px;z-index:2"></i>
            </b-col>
            <b-col cols="12" md="3">
              <input
                list="categories"
                class="form-control border-top-0 border-left-0 border-bottom-0"
                placeholder="Categories"
              />
              <datalist id="categories" style="margin:0px;padding:0px;">
                <option :value="i" v-for="(v,i) in 3" :key="i">{{ i }}</option>
              </datalist>
            </b-col>
            <b-col cols="12" md="2" class="text-right">
              <b-button variant="primary" class="w-md-100" style="border-radius:10rem">Search</b-button>
            </b-col>
          </b-row>
        </div>
      </div>
      <b-carousel-slide
        caption="HAPPY SEWA"
        text="Welcome!"
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
      </b-carousel-slide>

      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
    </b-carousel>-->
  </div>
</template>

<script>
import header from "./header";
export default {
  data() {
    return {
      slide: 0,
    };
  },
  components: {
    appHeader: header,
  },
};
</script>

<style scoped>
.container_wrapper {
  height: 100vh;
  background-size: 100% 100%;
}
.mutliple_search_wrapper {
  background-color: white;
  border-radius: 100px;
}

.c_input_wrapper {
  border-right: 1px #cccccc solid;
  outline: none;
}
@media (max-width: 992px) {
  .c_input_wrapper {
    border-right: none;
    border-bottom: 1px #ccc solid;
  }
  .mutliple_search_wrapper {
    width: 50%;
    border-radius: 20px;
  }
}
@media (max-width: 600px) {
  .mutliple_search_wrapper {
    width: 80%;
    border-radius: 20px;
  }
}

.c_input {
  box-shadow: none;
}
</style>