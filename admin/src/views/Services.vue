<template>
  <v-container>
    <services :headers="headers" :contents="services" title="Services" :isNew="true" :isIcons="true" :icons="['mdi-pencil','mdi-delete']" :isOrders="false" @editService="editItem($event)" @delete="deleteItem($event)" @addService="add()" /><br/>
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
                    <v-text-field v-model="editedItem.serviceDescription" label="Description"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </v-container>
</template>
<script>
  import table from '../layouts/components/table/table.vue';
  export default {
    data(){
      return{
        editedIndex: -1,
        editedItem: {
          serviceTitle: null,
          serviceDescription:null
        },
        dialog: false,
        services:[
          {
            id: 1,
            serviceTitle: "Plumber",
            serviceDescription: "leorem ipsum",
            addedOn: 'timestamp',
            orders:10,
            totalVendors:10,
            parentCategory:'perent',
            status:'active'
          },
          {
            id: 2,
            serviceTitle: "Car Wash",
            serviceDescription: "leorem ipsum",
            addedOn: 'timestamp',
            orders:10,
            totalVendors:10,
            parentCategory:'perent',
            status:'active'
          },
          {
            id: 3,
            serviceTitle: "Plumber",
            serviceDescription: "leorem ipsum",
            addedOn: 'timestamp',
            orders:10,
            totalVendors:10,
            parentCategory:'perent',
            status:'active'
          },
        ],headers:[
          {
            text: 'ID',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          { text: 'Service Title', value: 'serviceTitle', sortable: true, },
          { text: 'Service Description', value: 'serviceDescription', sortable: true, },
          { text: 'Added On', value: 'addedOn', sortable: true, },
          { text: 'Orders', value: 'orders', sortable: true, },
          { text: 'Total Vendors', value: 'totalVendors', sortable: true, },
          { text: 'Parent Category', value: 'parentCategory', sortable: true, },
          { text: 'Status', value: 'status', sortable: true, },
          { text: 'Actions', value: 'actions', sortable: false, },
        ]
      }
    },
    methods:{
      reset(){
        this.editedItem.serviceTitle=null;
        this.editedItem.serviceDescription=null;
      },
      editItem (item) {
        this.editedIndex = this.services.indexOf(item);
        this.editedItem.serviceTitle=item.serviceTitle;
        this.editedItem.serviceDescription=item.serviceDescription;
        this.dialog = true;
      },
      close () {
        this.dialog = false
          this.editedIndex = -1
      },
      add(){
        this.dialog = true;
        this.reset();
      },
      save() {
        if(this.editedIndex > -1) {
          this.services[this.editedIndex].serviceTitle=this.editedItem.serviceTitle;
          this.services[this.editedIndex].serviceDescription=this.editedItem.serviceDescription;
        } else {         
          this.services.push({serviceTitle:this.editedItem.serviceTitle,serviceDescription:this.editedItem.serviceDescription});
          //JSON.parse(JSON.stringify(this.editedItem))
          }
        this.close()
      },
      deleteItem(item) {
        var index = this.services.indexOf(item)
        if (confirm('Are you sure you want to delete this User?')) {
          this.services[index].status = 'deleted'
        }
      },    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    components:{services:table},
    watch:{
      dialog(value){
        if(value==false)
        this.editedIndex=-1;
      }
    }
  }
</script>
<style>

</style>