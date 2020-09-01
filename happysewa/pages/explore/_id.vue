<template>
  <b-overlay :show="loading">
    <div
      :style="{'background-image':'url(services.jpg)'}"
      class="d-flex pt-5 flex-column hero_wrapper justify-content-center align-items-center"
    ></div>
    <b-container class="py-5">
      <b-row>
        <b-col v-for="(item, index) in services" :key="index" cols="12" md="9" lg="9">
          <b-card no-body class="overflow-hidden" v-if="item.available_time.length>0">
            <b-row no-gutters>
              <b-col md="4">
                <b-card-img :src="item.image" alt="Image" class="rounded-0" height="100%"></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body :title="item.name">
                  <b-card-text>{{item.desc}}</b-card-text>
                  <h5>{{parseInt(item.cost)+(parseInt(item.cost)/100*20)}}{{item.currency}}</h5>
                  <br />

                  <!-- in case of restircting to the time slots -->
                  <!-- <b-button
                    v-if="isAvailable(item)"
                    class="rounded-0"
                    variant="primary"
                    :title="'Place Order here'"
                    @click="proceedToCheckout(item)"
                  >Place Order</b-button>
                  <b-button
                    v-else
                    disabled
                    style="cursor:not-allowed"
                    class="rounded-0"
                    variant="secondary"
                    :title="'Time is not available'"
                    @click="proceedToCheckout(item)"
                  >Place Order</b-button>-->
                  <!-- for avaiable time slots -->
                  <b-button
                    class="rounded-0"
                    variant="primary"
                    :title="'Place Order here'"
                    @click="setCurrentItem(item)"
                  >Place Order</b-button>
                </b-card-body>
              </b-col>
              <b-col md="2" class="border-left text-center">
                <h5>Available on</h5>
                <div class="px-2">
                  <b-button
                    class="w-100 my-2 rounded-0"
                    variant="warning"
                    v-if="item.available_time[0]"
                  >{{item.available_time[0] +' - '+ (parseInt(item.available_time[0])+1)}}</b-button>
                  <b-button
                    class="w-100 my-2 rounded-0"
                    variant="warning"
                    v-if="item.available_time[1]"
                  >{{item.available_time[1] +' - '+ (parseInt(item.available_time[1])+1)}}</b-button>
                  <b-button
                    class="w-100 my-2 rounded-0"
                    variant="success"
                    @click="setCurrentItem(item)"
                  >See More</b-button>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal centered hide-footer v-model="available_time_dialog">
      <b-card title="Select From Available Times" v-if="cItem" class="mb-2">
        <b-form-group label class="row justify-center w-100">
          <b-form-radio-group
            id="radio-group-1"
            class="col-6"
            v-model="selectedTime"
            :options="rewampedTime(cItem.available_time)"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>
        <b-button
          href="#"
          variant="primary"
          :disabled="selectedTime==null"
          @click="proceedToCheckout"
        >Place Order</b-button>
      </b-card>
    </b-modal>
  </b-overlay>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { StoreDB } from "@/services/firebase";
export default {
  data() {
    return {
      services: [],
      available_time_dialog: false,
      selectedTime: null,
      cItem: null,
      loading: false,
    };
  },
  computed: {
    ...mapFields(["loginModal"]),
  },
  methods: {
    rewampedTime(i) {
      var arr = [];
      for (var j in i) {
        var k = i[j];
        arr.push({ text: k + " - " + (k + 1), value: k });
      }
      return arr;
    },
    setCurrentItem(item) {
      this.cItem = item;
      this.available_time_dialog = true;
    },
    proceedToCheckout(item) {
      this.loading = true;
      var user = this.$store.getters.getUser;
      var that = this;
      this.available_time_dialog = false;
      if (user == null) {
        this.loginModal = true;
      } else {
        if (this.cItem) {
          that.$store
            .dispatch("placeOrder", {
              item: that.cItem,
              user: user,
              selectedTime:that.selectedTime
            })
            .then((res) => {
              that.loading = false;
              that.$bvToast.toast(
                `You can see the order status in your dashboard`,
                {
                  title: "Order Placed",
                  autoHideDelay: 5000,
                  variant: "success",
                }
              );
            })
            .catch((err) => {
              that.loading = false;
              that.$bvToast.toast(`${err}`, {
                title: "An Error Occured !",
                autoHideDelay: 5000,
                variant: "warning",
              });
            });
        }
      }
    },
    handleSeeMore(item) {
      alert("you will see more soon :)");
    },
    isAvailable(item) {
      var i = JSON.parse(JSON.stringify(item.available_time));
      return i.includes(new Date().getHours());
    },
  },
  async fetch() {
    const id = this.$route.params.id;
    if (id) {
      var d = new Date();
      const Ref = StoreDB.collection("categories").doc(id);
      var services = await StoreDB.collection("services")
        .where("category_ref", "==", Ref)
        .where("available_days", "array-contains", d.getDay())
        .get();
      var arr = [];
      for (const service of services.docs) {
        arr.push(service.data());
      }
      this.services = arr;
    }
  },
};
</script>
<style lang="scss">
.hero_wrapper {
  height: 50vh;
  background-size: 100% 100%;
  background-size: cover;
}
</style>