<template>
  <div>
    <orders :headers="headers" :contents="orders" title="Orders" @verify="showDialog($event)" />
    <v-dialog
      v-model="dialog"
      min-width="50%"
      :max-width="$vuetify.breakpoint.smAndUp?'50%':'100%'"
    >
      <v-container class="white">
        <v-card class="elevation-16 mx-auto" width="400">
          <v-card-title class="headline">Rate This Service</v-card-title>
          <v-card-text>
            You're going to mark your order as completed , Please share your expeience with service provider
            <div class="text-center mt-12">
              <v-rating
                v-model="rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                hover
              ></v-rating>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn text :disabled="rating==null||rating<=0" @click="changeStatus">Verify Completed</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>
<script>
import table from "@/layouts/components/table/table.vue";
export default {
  data() {
    return {
      dialog: false,
      fullOrder: null,
      headers: [
        {
          text: "Sr#",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Client Name", value: "user_name", sortable: true },
        { text: "Placed On", value: "placed_at", sortable: true },
        { text: "Time Slot", value: "selectedTime", sortable: true },
        { text: "Service name", value: "service_name", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "Actions", value: "actions", sortable: true },
      ],
      orders: [
        {
          user_name: "loading",
          placed_at: "loading",
          selectedTime: "loading",
          service_name: "loading",
          status: "pending",
        },
      ],
      rating: null,
    };
  },
  methods: {
    showDialog(item) {
      this.fullOrder = item;
      this.dialog = true;
    },
    changeStatus() {
      if (this.fullOrder) {
        this.$vs.loading();
        var that = this;
        this.$store
          .dispatch("changeStatus", {
            item: this.fullOrder,
            rating: this.rating,
          })
          .then(() => {
            that.fullOrder = null;
            that.dialog = false;
            that.$vs.loading.close();
          })
          .catch((err) => {
            alert("an error occured" + err);
          });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("subToOrders", (res) => {
        console.log(res);
        this.orders = res;
      });
    });
  },
  components: { orders: table },
};
</script>