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
    </v-card-title>
    <v-data-table :headers="headers" :items="contents" :search="search">
      <template v-slot:item.id="{ item }">{{ }}</template>
      <template v-slot:item.placed_at="{ item }">{{ item.placed_at.toDate()}}</template>
      <template
        v-slot:item.selectedTime="{ item }"
      >{{ item.selectedTime+' - '+ (item.selectedTime+1)}}</template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          color="success"
          @click="markAsCompleted(item)"
          v-if="item.status=='pending'"
          text
          flat
        >Mark As Completed</v-btn>
        <span v-else>No Actions</span>
      </template>
      <template v-slot:item.status="{ item }">
        <span v-if="item.status=='pending'" class="text-warning">Pending</span>
        <span v-if="item.status=='delivered'" class="blue--text">Delivered</span>
        <span v-if="item.status=='completed'" class="text-success">Completed</span>
      </template>
    </v-data-table>
  </vx-card>
</template>
<script>
export default {
  data() {
    return {
      counter: 1,
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
    markAsCompleted(item) {
      this.$emit("markedAsCompleted", item);
    },
  },
  props: ["headers", "contents", "title"],
};
</script>
<style>
</style>