<template>
  <v-container>
    <services
      :headers="headers"
      :contents="services"
      title="Services"
      :isNew="true"
      :isIcons="true"
      :icons="['mdi-pencil','mdi-delete']"
      :isOrders="false"
      @editService="editItem($event)"
      @delete="deleteItem($event)"
      @addService=" dialog = true"
    />
    <br />
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.serviceTitle" label="Service Title"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="categories"
                  item-text="title"
                  item-value="id"
                  v-model="editedItem.selectedCategory"
                  label="Select Category"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.serviceDescription" label="Description"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field v-model="editedItem.image" label="Image URL"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" :loading="loading" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import table from "../layouts/components/table/table.vue";
import firebase from "firebase";
export default {
  data() {
    return {
      loading: false,
      editedIndex: -1,
      editedItem: {
        serviceTitle: null,
        serviceDescription: null,
        selectedCategory: null,
        image: null,
      },
      dialog: false,
      services: [
        {
          id: "loading",
          title: "loading",
          description: "loading",
          created_at: "loading",
          total_orders: "laoding",
          total_vendors: "laoding",
          parentCategory: "laoding",
          status: "laoding",
        },
      ],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Service Title", value: "title", sortable: true },
        {
          text: "Service Description",
          value: "description",
          sortable: true,
        },
        {
          text: "Image",
          value: "image",
          sortable: false,
        },
        { text: "Added On", value: "created_at", sortable: true },
        { text: "Orders", value: "orders", sortable: true },
        { text: "Total Vendors", value: "total_vendors", sortable: true },
        { text: "Parent Category", value: "category_ref", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      categories: [],
    };
  },
  methods: {
    reset() {
      this.editedItem.serviceTitle = null;
      this.editedItem.serviceDescription = null;
      this.editedItem.selectedCategory = null;
      this.editedItem.image = null;

      this.loading = false;
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem.serviceTitle = item.title;
      this.editedItem.serviceDescription = item.description;
      this.editedItem.selectedCategory = item.category_ref.id;
      this.editedItem.image = item.image || "";

      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.editedIndex = -1;
    },
    add() {
      this.loading = true;
      this.dialog = true;
      this.$store
        .dispatch("addService", {
          title: this.editedItem.serviceTitle,
          description: this.editedItem.serviceDescription,
          image: this.editedItem.image,

          category_id: this.editedItem.selectedCategory,
        })
        .then((res) => {
          this.reset();
        })
        .catch((err) => {
          alert("an error occured ");
        });
    },
    save() {
      if (this.editedIndex != -1) {
        this.loading = true;
        this.dialog = true;
        this.$store
          .dispatch("editService", {
            id: this.editedIndex,
            title: this.editedItem.serviceTitle,
            description: this.editedItem.serviceDescription,
            image: this.editedItem.image,
            category_id: this.editedItem.selectedCategory,
          })
          .then((res) => {
            this.reset();
          })
          .catch((err) => {
            alert("an error occured ");
          });
      } else {
        this.add();
        //JSON.parse(JSON.stringify(this.editedItem))
      }
      this.close();
    },
    deleteItem(item) {
      if (confirm("Are you sure you want to delete ?")) {
        this.$store
          .dispatch("deleteService", {
            id: item.id,
          })
          .then((res) => {
            this.reset();
          })
          .catch((err) => {
            alert("an error occured ");
          });
      }
    },
    loadCategories() {
      firebase
        .firestore()
        .collection("categories")
        .get()
        .then((res) => {
          var arr = [];
          res.forEach((r) => {
            arr.push(r.data());
          });
          this.categories = arr;
        });
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  components: { services: table },
  watch: {
    dialog(value) {
      if (value == false) this.editedIndex = -1;
      this.loadCategories();
    },
  },
  mounted() {
    this.$store.dispatch("subscribeToServices", (services) => {
      this.services = services;
    });
  },
};
</script>
<style>
</style>