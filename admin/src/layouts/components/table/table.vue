<template>
  <vx-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="primary" class="ml-4" v-if="isNew" @click="add()">New Item</v-btn>
    </v-card-title>
    <v-data-table :headers="headers" :items="contents" :search="search">
      <template v-slot:item.image="{ item }">
        <img :src="item.image" alt="image" height="100px" />
      </template>
      <template v-slot:item.actions="{ item }">
        <div v-if="isIcons">
          <v-btn
            @click="icons[0]=='mdi-pencil' ? editItem(item):blockItem(item)"
          >{{icons[0]=='mdi-pencil' ? 'Edit':'Block'}}</v-btn>&nbsp;
          <v-btn @click="deleteItem(item)">dlt</v-btn>
          <v-icon small class="mr-2">{{ icons[0] }}</v-icon>
          <v-icon small @click="deleteItem(item)">{{ icons[1] }}</v-icon>
        </div>
        <div v-if="isUser">
          <v-btn @click="blockItem(item)">{{item.status=='blocked'?'Active':'Block'}}</v-btn>
        </div>
        <div v-if="isOrders">
          <v-btn color="primary" class="mb-2" @click="completeDetail(item)">View</v-btn>
        </div>
      </template>
    </v-data-table>
  </vx-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      editedIndex: -1,
      editedItem: {
        serviceTitle: "",
        serviceDescription: "",
      },
    };
  },
  methods: {
    blockItem(item) {
      this.$emit("block", item);
    },
    deleteItem(item) {
      this.$emit("delete", item);
    },
    completeDetail(item) {
      this.$emit("view", item);
    },
    editItem(item) {
      console.log(item, "Edit");
      this.$emit("editService", item);
    },
    add() {
      this.$emit("addService");
    },
  },
  props: [
    "headers",
    "contents",
    "title",
    "isIcons",
    "icons",
    "isOrders",
    "isNew",
    "isUser",
  ],
};
</script>
<style>
</style>