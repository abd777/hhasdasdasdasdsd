<template>
  <div>
<orders
      :headers="headers"
      :contents="orders"
      title="Orders"
      @markedAsCompleted="changeStatus($event)"
    />
    <!-- <v-dialog v-model="dialog" min-width="50%" :max-width="$vuetify.breakpoint.smAndUp?'50%':'100%'">
			<v-container class="white">
				<v-row class="text-center">
					<v-col cols="6">
					<strong>Id</strong>
					<h6>{{ fullOrder.id }}</h6>
					</v-col>
					<v-col cols="6">
					<strong>Order By:</strong>
					<h6>{{ fullOrder.orderBy }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Started On:</strong>
					<h6>{{ fullOrder.startedOn }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Expected End Date:</strong>
					<h6>{{ fullOrder.expectedEndDate }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Vendor:</strong>
					<h6>{{ fullOrder.vendor }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Service:</strong>
					<h6>{{ fullOrder.service }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Is Fixed Price:</strong>
					<h6>{{ fullOrder.isFixedPrice }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Price:</strong>
					<h6>{{ fullOrder.price }}</h6>					
					</v-col>
				</v-row>
			</v-container>
    </v-dialog>-->
  </div>
</template>
<script>
import table from "../layouts/components/table/table.vue";
export default {
  data() {
    return {
      //dialog:false,
      fullOrder: {
        id: null,
        orderBy: null,
        startedOn: null,
        expectedEndDate: null,
        vendor: null,
        service: null,
        isFixedPrice: true,
        price: null,
        status: null,
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
    changeStatus(item) {
      this.$vs.loading();
      this.$store
        .dispatch("changeStatus", item)
        .then(() => {
          this.$vs.loading.close();
        })
        .catch((err) => {
          alert("an error occured" + err);
        });
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