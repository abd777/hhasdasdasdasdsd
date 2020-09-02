<template>
  <b-overlay :show="loading">
    <div
      :style="{'background-image':'url(services.jpg)'}"
      class="d-flex pt-5 flex-column hero_wrapper justify-content-center align-items-center"
    >
      <b-row class="no-gutters pl-lg-4 pr-lg-1 px-2 py-1 mutliple_search_wrapper">
        <b-col lg="4" class="c_input_wrapper">
          <b-input
            placeholder="What are you searching for?"
            v-model="search"
            class="rounded border-0 c_input"
          ></b-input>
        </b-col>
        <b-col md="12" lg="4" class="d-flex c_input_wrapper">
          <b-input placeholder="Location?" v-model="location" class="border-0 c_input"></b-input>
          <i class="mdi mdi-target text-secondary c_p1 mt-1"></i>
        </b-col>
        <b-col cols="12" lg="3">
          <input
            list="cccc"
            class="form-control border-0 c_input"
            placeholder="Categories"
            v-model="selectedCategory"
          />
          <datalist id="cccc" style="margin:0px;padding:0px;">
            <option :value="v.title" v-for="(v,i) in getCategories" :key="i">{{v.title}}</option>
          </datalist>
        </b-col>
      </b-row>
    </div>
    <b-container class="py-5">
      <b-row v-if="filteredService.length">
        <b-col v-for="(item, index) in filteredService" :key="index" cols="12" md="9" lg="9">
          <b-card no-body class="overflow-hidden" v-if="item.available_time.length>0">
            <b-row no-gutters>
              <b-col md="4">
                <b-card-img :src="item.image" alt="Image" class="rounded-0" height="100%"></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body :title="item.name">
                  <b-card-text>{{item.desc}}</b-card-text>
                  <h5>{{parseInt(item.cost)+(parseInt(item.cost)/100*getSettings.percentage)}}{{item.currency}}</h5>
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
      <b-row v-else>
        <div
          class="col-12 text-center text-muted h4"
        >Sorry Can't find the service you're looking for :(</div>
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
import { mapGetters } from "vuex";
import { StoreDB } from "@/services/firebase";
export default {
  data() {
    return {
      services: [],
      available_time_dialog: false,
      selectedTime: null,
      cItem: null,
      loading: false,
      filteredService: [],
    };
  },
  computed: {
    ...mapFields([
      "loginModal",
      "search.selectedCategory",
      "search.search",
      "search.location",
    ]),
    ...mapGetters(["getCategories", "getSettings"]),
  },
  watch: {
    selectedCategory: {
      handler(val) {
        console.log("running from cat");
        this.filter();
      },
    },
    search: {
      handler(val) {
        console.log("running from serch", val);
        this.filter();
      },
    },
    location: {
      handler(val) {
        console.log("running from loc");
        this.filter();
      },
    },
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
              selectedTime: that.selectedTime,
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
    async filter() {
      var cat = this.selectedCategory;
      var location = this.location;
      var search = this.search;

      var allServices = this.services;
      var ccc = this.getCategories;
      var sc = ccc.filter((cc) => {
        return cc.title == cat;
      });
      var Ref = null;
      if (sc.length) {
        Ref = sc[0].id;
      } else {
        Ref = null;
      }
      var services = null;

      var fs = allServices.filter((s) => {
        console.log(JSON.stringify(Ref));
        if ((Ref == null || Ref == "") && search == "" && location == "") {
          console.log("in hrere");
          this.filteredServices = this.services;
        } else {
          if (Ref) {
            //if category set
            if (s.category_ref.id == Ref) {
              if (location != "") {
                if (s.country.toLowerCase().includes(location.toLowerCase())) {
                  if (search != "") {
                    if (s.name.toLowerCase().includes(search.toLowerCase())) {
                      return s;
                    }
                  } else {
                    return s;
                  }
                }
              } else if (search != "") {
                if (s.name.toLowerCase().includes(search.toLowerCase())) {
                  return s;
                }
              } else {
                return s;
              }
            }
          } else {
            //if category not set
            if (location != "") {
              if (s.country.toLowerCase().includes(location.toLowerCase())) {
                if (search != "") {
                  if (s.name.toLowerCase().includes(search.toLowerCase())) {
                    return s;
                  }
                } else {
                  return s;
                }
              }
            } else if (search != "") {
              if (s.name.toLowerCase().includes(search.toLowerCase())) {
                return s;
              }
            }
          }
        }
      });
      console.log("filtered search", fs);
      var arr = fs;

      console.log(arr);
      this.filteredService = arr;
    },
  },
  async fetch() {
    var services = await StoreDB.collection("services")
      .where("available_days", "array-contains", new Date().getDay())
      .get();
    var arr = [];
    for (const service of services.docs) {
      arr.push(service.data());
    }
    this.services = arr;
    this.filteredService = arr;
    this.filter();
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