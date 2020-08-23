<template>
  <v-container>
    <user
      :headers="uHeaders"
      :contents="users"
      title="Users"
      :isIcons="false"
      :isUser="true"
      :icons="['mdi-block','mdi-delete']"
      :isNew="false"
      :isOrders="false"
      @block="blockItem($event,users)"
      @delete="deleteItem($event,users)"
    />
    <br />
    <user
      :headers="vHeaders"
      :contents="vendors"
      title="Vendors"
      :isIcons="false"
      :isUser="true"
      :icons="['mdi-block','mdi-delete']"
      :isNew="false"
      :isOrders="false"
      @block="blockItem($event,vendors)"
      @delete="deleteItem($event,vendors)"
    />
  </v-container>
</template>
<script>
import table from "../layouts/components/table/table.vue";
export default {
  data() {
    return {
      users: [],
      uHeaders: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Email", value: "email", sortable: true },
        { text: "Total Orders", value: "total_orders", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "Actions", value: "actions", sortable: true },
      ],
      vendors: [],
      vHeaders: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Email", value: "email", sortable: true },
        { text: "Total Orders", value: "total_orders", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "Company", value: "isCompany", sortable: true },
        { text: "Actions", value: "actions", sortable: true },
      ],
    };
  },
  methods: {
    blockItem(item) {
      console.log(item);
      this.$store.dispatch("blockUser", { uid: item.uid, status: item.status });
    },
  },
  components: { user: table },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("subscribeToUsers", (res) => {
        this.users = res;
      });
      this.$store.dispatch("subscribeToVendors", (res) => {
        this.vendors = res;
      });
    });
  },
};
</script>
<style>
</style>