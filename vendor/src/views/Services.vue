<template>
  <v-container>
    <v-row justify="end">
      <v-btn color="primary" class="mr-20" @click="dialog=true">Add New</v-btn>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="4" v-for="(v, i) in services" :key="i">
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{v.name}}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">{{v.currency}} {{v.cost}}</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{v.desc}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green" text @click="editItem(v)">Edit</v-btn>
            <v-btn color="red" text @click="deleteItem(v)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false"></v-btn>
        <v-toolbar-title>{{formTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false;reset()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card>
        <!-- v-model="valid" -->
        <v-form>
          <v-container>
            <v-row>
              <!-- 
                  :rules="nameRules"
              :counter="20"-->
              <v-col cols="12" md="3" sm="4">
                <v-text-field v-model="edit.name" label="Name of service" required></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="4">
                <v-select
                  :items="categories"
                  :loading="categories.length==0"
                  item-text="title"
                  item-value="id"
                  v-model="edit.category_ref"
                  label="Select Category"
                ></v-select>
              </v-col>
              <!-- 
                  :rules="nameRules"
              :counter="20"-->
              <v-col cols="12" md="3" sm="4">
                <v-text-field v-model="edit.desc" label="Description" required></v-text-field>
              </v-col>
              <!-- 
                  :rules="nameRules"
              :counter="20"-->
              <v-col cols="12" md="3" sm="4">
                <v-select :items="['$','EURO','']" v-model="edit.currency" label="Currency"></v-select>
              </v-col>

              <v-col cols="12" md="3" sm="4">
                <v-text-field v-model="edit.cost" label="Cost" required></v-text-field>
              </v-col>

              <v-col cols="12" md="3" sm="4">
                <v-text-field v-model="edit.country" label="Country" required></v-text-field>
              </v-col>

              <v-col cols="12" md="3" sm="4">
                <v-text-field v-model="edit.state" label="State" required></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="4">
                <v-text-field v-model="edit.service_area" label="Service Area" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <time-slot
                  :avd="edit.available_days"
                  :avt="edit.available_time"
                  @changeDetected="timeChanged"
                ></time-slot>
              </v-col>
              <v-col>
                <VCardActions>
                  <v-btn class="green" @click="save">Save</v-btn>
                  <v-btn class="red" @click="dialog=false;reset()">Cancel</v-btn>
                </VCardActions>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import TimeSlot from "../components/hap/timeslot";

import { mapGetters } from "vuex";
export default {
  components: {
    TimeSlot,
  },
  data() {
    return {
      dialog: false,
      edit: {
        name: null,
        desc: null,
        currency: null,
        category_ref: null,
        cost: null,
        custom: "",
        country: null,
        state: null,
        service_area: null,
        available_time: null,
        available_days: null,
      },
      categories: [],
      services: [],
      editIndex: null,
    };
  },
  watch: {
    dialog(value) {
      if (value == false) this.editedIndex = -1;
      this.loadCategories();
    },
    getCategories(val) {
      if (val) {
        this.categories = val;
      }
    },
  },
  computed: {
    ...mapGetters(["getCategories"]),
    formTitle() {
      return this.editIndex == null ? "Add New Service" : "Edit Service";
    },
  },
  methods: {
    timeChanged(val) {
      console.log(val);
      this.edit.available_time = val.times;
      this.edit.available_days = val.days;
    },
    reset() {
      this.edit.name = null;
      this.edit.desc = null;
      this.edit.currency = null;
      this.edit.category_ref = null;
      this.edit.cost = null;
      this.edit.custom = "";
      this.edit.country = null;
      this.edit.state = null;
      this.edit.service_area = null;
      this.editIndex = null;
      this.edit.available_time = null;
      this.edit.available_days = null;
    },
    loadCategories() {
      if (!this.getCategories) {
        this.$store.dispatch("loadCategories");
      }
    },
    editItem(item) {
      this.editIndex = item.id;
      Object.assign(this.edit, item);
      console.log(this.edit);
      this.dialog = true;
    },
    add() {
      this.$store
        .dispatch("addService", this.edit)
        .then((res) => {
          this.reset();
          this.dialog = false;
        })
        .catch((err) => {
          alert("er  asdr/" + err);
          this.reset();
        });
    },
    save() {
      if (this.editIndex == null) {
        alert("in add");
        this.add();
      } else {
        alert("in uo");
        console.log("tasd ", this.edit);
        this.$store
          .dispatch("editService", this.edit)
          .then((res) => {
            this.reset();
            this.dialog = false;
          })
          .catch((err) => {
            alert("err in udpate /" + err);
            this.reset();
          });
      }
    },
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this User?")) {
        this.$store
          .dispatch("deleteService",item)
          .then((res) => {})
          .catch((err) => {
            alert("err in delete /" + err);
          });
      }
    },
  },

  // data(){
  //   return{
  //     editedIndex: -1,
  //     editedItem: {
  //       serviceTitle: null,
  //       serviceDescription:null
  //     },
  // },
  // methods:{
  //   reset(){
  //     this.editedItem.serviceTitle=null;
  //     this.editedItem.serviceDescription=null;
  //   },
  //   editItem (item) {
  //     this.editedIndex = this.services.indexOf(item);
  //     this.editedItem.serviceTitle=item.serviceTitle;
  //     this.editedItem.serviceDescription=item.serviceDescription;
  //     this.dialog = true;
  //   },
  //   close () {
  //     this.dialog = false
  //       this.editedIndex = -1
  //   },
  //   add(){
  //     this.dialog = true;
  //     this.reset();
  //   },
  //   save() {
  //     if(this.editedIndex > -1) {
  //       this.services[this.editedIndex].serviceTitle=this.editedItem.serviceTitle;
  //       this.services[this.editedIndex].serviceDescription=this.editedItem.serviceDescription;
  //     } else {
  //       this.services.push({serviceTitle:this.editedItem.serviceTitle,serviceDescription:this.editedItem.serviceDescription});
  //       //JSON.parse(JSON.stringify(this.editedItem))
  //       }
  //     this.close()
  //   },
  //   deleteItem(item) {
  //     var index = this.services.indexOf(item)
  //     if (confirm('Are you sure you want to delete this User?')) {
  //       this.services[index].status = 'deleted'
  //     }
  //   },    },
  // computed: {
  //   formTitle () {
  //     return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
  //   },
  // },
  // components:{services:table},
  // watch:{
  //   dialog(value){
  //     if(value==false)
  //     this.editedIndex=-1;
  //   }
  // }
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("subscribeToServices", (services) => {
        this.services = services;

        console.log(services);
      });
    });
  },
};
</script>
<style>
</style>