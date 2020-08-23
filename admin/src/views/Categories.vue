<template>
  <v-container>
    <categories
      :headers="headers"
      :contents="categories"
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
                <v-text-field v-model="editedItem.title" label="Service Title"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.icon" label="icon"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                You can use mdi icons from
                <a
                  href="https://cdn.materialdesignicons.com/5.3.45/"
                  target="_blank"
                >Here</a>
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
        title: null,
        icon: null,
      },
      dialog: false,
      categories: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: " Title", value: "title", sortable: true },
        {
          text: "Icon",
          value: "icon",
          sortable: true,
        },
        { text: "Added On", value: "created_at", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      categories: [],
    };
  },
  methods: {
    reset() {
      this.editedItem.title = null;
      this.editedItem.icon = null;
      this.loading = false;
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem.title = item.title;
      this.editedItem.icon = item.icon;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.editedIndex = -1;
    },
    add() {
      this.loading = true;
      this.$store
        .dispatch("addCategories", {
          title: this.editedItem.title,
          icon: this.editedItem.icon,
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
          .dispatch("editCategory", {
            id: this.editedIndex,
            title: this.editedItem.title,
            icon: this.editedItem.icon,
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
      if (confirm("Are you sure you want to delete?")) {
        this.$store
          .dispatch("deleteCategory", {
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
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  components: { categories: table },
  mounted() {
    this.$store.dispatch("subscribeToCategories", (categories) => {
      this.categories = categories;
    });
  },
};
</script>
<style>
</style>