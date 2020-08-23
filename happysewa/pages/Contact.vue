<template>
  <div>
    <app-header></app-header>
    <div
      :style="{'background-image':'url(hero.jpg)'}"
      class="d-flex flex-column container_wrapper justify-content-center align-items-center"
    >
      <h1 class="font-weight-bold c_h1">How Can We Help You ?</h1>
    </div>
    <div class="container py-5">
      <b-row class="justify-content-between">
        <b-col cols="12" md="3" v-for="(v,k) in dt" :key="k" class="mt-2">
          <span class="p-3 rounded-circle" style="background-color:#eaedfe;">
            <i class="h4 text-primary mdi" :class="[v.icon]"></i>
          </span>
          <h3 class="mt-3">{{ v.title }}</h3>
          <p class="text-muted">{{ v.desc }}</p>
          <p v-if="v.phone" class="text-muted">
            <strong>{{ v.phone }}</strong>
          </p>
          <p v-if="v.info" class="text-muted">{{ v.info }}</p>
        </b-col>
      </b-row>
    </div>
    <contact-form></contact-form>

    <app-footer></app-footer>
  </div>
</template>

<script>
import header from "../components/Home/header.vue";
import form from "../components/contact/form.vue";
import footer from "../components/Home/footer.vue";
export default {
  data() {
    return {
      dt: [
        {
          icon: "mdi-map-marker-radius",
          title: "Address",
          desc: "13/25 New Avenue New Heaven, 45Y 73J England, Great Britain",
        },
        {
          icon: "mdi-email-outline",
          title: "Call center",
          desc: "13/25 New Avenue New Heaven, 45Y 73J England, Great Britain",
          phone: "+33 555 444 333",
        },
        {
          icon: "mdi-map-marker-radius",
          title: "Electronic support",
          desc: "13/25 New Avenue New Heaven, 45Y 73J England, Great Britain",
          info: "info@sell.com",
        },
      ],
    };
  },
  components: { "app-header": header, appFooter: footer, contactForm: form },
};
</script>

<style scoped>
.pic {
  background-image: url("../assets/contact.jpg");
  margin-top: 10vh;
  background-size: 100% 100%;
  color: white;
  padding: 18vh 0px;
}
</style>