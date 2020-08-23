<template>
  <div>
    <div
      :style="{'background-image':'url(services.jpg)'}"
      class="d-flex flex-column hero_wrapper justify-content-center align-items-center"
    >
      <h1 class="font-weight-bold c_h1">OUR SERVICES</h1>
      <h3 class="c_h3 text-white">Multiple Services, One Website</h3>
      <b-button variant="primary" size="lg" class="px-5 font-weight-bold mt-4">GET A QUOTE</b-button>
    </div>
    <div class="services_bg">
      <b-row class="justify-content-center">
        <b-col cols="12" sm="6" md="5">
          <p
            class="py-4"
          >We specialize in a variety of services across all aspects of our lives. From Handyman services to tax professionals, we have it all.</p>
        </b-col>
      </b-row>
      <b-container>
        <b-row>
          <b-col cols="12" md="4" v-for="(v,k) in categories" :key="k">
            <div class="c_card text-center p-5">
              <i class="mdi h1 text-primary" :class="[v.icon]"></i>
              <h3>{{v.title}}</h3>
              <b-button variant="primary" class="mt-3">Explore</b-button>
            </div>
            <b-list-group class="my-5">
              <b-list-group-item href="#" v-for="(val,key) in v.services" :key="key">{{ val }}</b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import header from "../components/Home/header.vue";
import footer from "../components/Home/footer.vue";
import { StoreDB } from "@/services/firebase";
export default {
  data() {
    return {
      categories: [],
    };
  },
  components: { "app-header": header, appFooter: footer },
  async fetch() {
    var cats = await StoreDB.collection("categories").get();
    var arr = [];
    for (const catRef of cats.docs) {
      var o = {};
      var cat = catRef.data();
      o.title = cat.title;
      o.icon = cat.icon;
      var Ref = StoreDB.collection("categories").doc(cat.id);
      var services = await StoreDB.collection("services")
        .where("category_ref", "==", Ref)
        .get();
      var a = [];
      services.forEach((service) => {
        a.push(service.data().title);
      });
      o.services = a;
      console.log(o);
      console.log("asdad", o);
      arr.push(o);
    }
    console.log(arr);
    this.categories = arr;
  },
};
</script>

<style scoped>
.pic {
  background-image: url("../assets/contact.jpg");
  margin-top: 10vh;
  background-size: 100% 100%;
  padding: 10vh 0px;
}
.services_bg {
  background-color: #dcdcdc;
}
.c_card {
  background-color: white;
}
.hero_wrapper {
  height: 100vh;
  background-size: 100% 100%;
  background-size: cover;
}
</style>