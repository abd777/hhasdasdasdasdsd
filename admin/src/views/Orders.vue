<template>
  <div>
    <orders
      :headers="headers"
      :contents="orders"
      title="Orders"
      :isNew="false"
      :isIcons="false"
      :icons="['','']"
      :isOrders="true"
      @view="showDialog($event)"
    />
    <v-dialog
      v-model="dialog"
      min-width="50%"
      :max-width="$vuetify.breakpoint.smAndUp?'50%':'100%'"
    >
      <v-container class="white">
        <v-row class="text-center">
          <v-col cols="6">
            <strong>Id</strong>
            <h6>{{ fullOrder.id }}</h6>
          </v-col>
          <v-col cols="6">
            <strong>Order By:</strong>
            <h6>{{ fullOrder.user_name }}</h6>
          </v-col>
          <v-col cols="6">
            <strong>Started On:</strong>
            <h6 v-if="fullOrder.placed_at" >{{ fullOrder.placed_at.toDate() }}</h6>
          </v-col>
          <v-col cols="6">
            <strong>Selected Time :</strong>
            <h6>{{ fullOrder.selectedTime }}</h6>
          </v-col>
          <v-col cols="6">
            <strong>Vendor:</strong>
            <h6>{{ fullOrder.vendor_id }}</h6>
          </v-col>
          <v-col cols="6">
            <strong>Service:</strong>
            <h6>{{ fullOrder.service_name }}</h6>
          </v-col>
          <v-col cols="6">
            <strong>Status:</strong>
            <h6>{{ fullOrder.status  }}</h6>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>
<script>
import table from "../layouts/components/table/table.vue";
export default {
  data() {
    return {
      dialog: false,
      fullOrder: {
        id: null,
        user_name: null,
        placed_at: null,
        selectedTime: null,
        vendor_id: null,
        service_name: null,
        status:null
      },
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
    };
  },
  methods: {
    showDialog(item) {
      this.fullOrder = item;
      console.log(this.fullOrder);
      this.dialog = true;
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