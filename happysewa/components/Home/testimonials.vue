<template>
  <b-container class="pt-5">
    <b-row class="text-center justify-center">
      <b-col cols="12" md="8" offset-md="2" lg="10" offset-lg="1">
        <h3>A Word From Our Customers</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      </b-col>
      <b-col cols="12" class="py-3">
        <div class="img_card_rounded">
          <img
            src="https://image.cnbcfm.com/api/v1/image/106528417-1588945694643gettyimages-1206290114.jpeg?v=1594392679&w=1400&h=950"
            alt
          />
        </div>
      </b-col>
      <b-col cols="12" md="8" offset-md="2" lg="10" offset-lg="1">
        <span class="h2">"</span>
        <span
          class="h6"
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut quis non dolore est ullam consequatur quaerat nulla sunt assumenda voluptas?</span>
        <span class="h2">"</span>
        <br />
        <div class="py-5">
          <h6>
            <em>
              CEO ,
              <span class="text-muted">spacex</span>
            </em>
          </h6>
          <p>
            <a href>Allan Musk</a>
          </p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style lang="scss">
.img_card_rounded {
}
.img_card_rounded > img {
  width: 200px;
  height: 200px;
  border: 7px solid #ffffff;
  border-radius: 50%;
  /* box-shadow: 1px 19px 40px 0 rgba(0, 0, 0, 0.5); */
  box-shadow: 0 0 30px #0000003d;
}
</style>