<template>
  <div class="form-bg py-5">
    <div class="container">
      <b-row>
        <b-col cols="12">
          <span class="c_h5">Full Name *</span>
          <b-row>
            <b-col cols="12" md="4" class="mt-3">
              <b-input-group size="sm" prepend="First">
                <b-form-input class="rounded-0"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col cols="12" md="4" class="mt-3">
              <b-input-group size="sm" prepend="Middle">
                <b-form-input class="rounded-0"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col cols="12" md="4" class="mt-3">
              <b-input-group size="sm" prepend="Last">
                <b-form-input class="rounded-0"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" md="4" class="mt-3">
          <span class="c_h5">Email*</span>
          <b-form-input type="email"></b-form-input>
        </b-col>
        <b-col cols="12" md="4" class="mt-3">
          <span class="c_h5">Phone*</span>
          <vue-phone-number-input v-model="phoneNum" />
        </b-col>
        <b-col cols="12" md="4" class="mt-3">
          <span class="c_h5">Address</span>
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col cols="12" md="6" class="mt-3">
          <span class="c_h5">Street Address</span>
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col cols="12" md="6" class="mt-3">
          <span class="c_h5">Address Line 2</span>
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col cols="12" md="3" class="mt-3">
          <span class="c_h5">City</span>
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col cols="12" md="3" class="mt-3">
          <span class="c_h5">State</span>
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col cols="12" md="3" class="mt-3">
          <span class="c_h5">ZipCode</span>
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col cols="12" md="3" class="mt-3">
          <span class="c_h5">Country</span>
          <b-form-select></b-form-select>
        </b-col>
        <b-col cols="12" md="4" class="mt-3">
          <strong>Which service are you acquiring for?</strong>
          <b-form-select :options="options" v-model="selectedService"></b-form-select>
        </b-col>
        <b-col cols="12" class="mt-5">
          <span class="c_h5">Please state the problem you are facing*</span>
          <b-form-textarea></b-form-textarea>
          <p>Please use the box to clearly state the issue you are having so that we can provide better service to you. We will try to get back to you as soon as possible.</p>
        </b-col>
        <b-col cols="12">
          <a href="/terms">Click here to read Happy Sewa's terms and conditions.</a>
          <b-form-checkbox v-model="accepted">I accept the Terms and Conditions</b-form-checkbox>
        </b-col>
        <b-col cols="12">
          <codeInput></codeInput>
        </b-col>
        <b-col cols="12" class="mt-4">
          <b-button variant="outline-primary" class="px-5" size="lg">Submit</b-button>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col cols="12 mt-5">
        <div style="width: 100%">
          <iframe
            width="100%"
            style="height:90vh"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import codeInput from "../codeinput.vue";
export default {
  data() {
    return {
      phoneNum: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "household services", text: "household services" },
        { value: "Professional services", text: "Professional services" },
        { value: "Everyday services", text: "Everyday services" },
        { value: "other", text: "other" },
      ],
      selectedService: null,
      accepted: null,
    };
  },
  components: { "vue-phone-number-input": VuePhoneNumberInput, codeInput },
};
</script>

<style scoped>
.form-bg {
  background-color: #f8f9fa;
}
</style>