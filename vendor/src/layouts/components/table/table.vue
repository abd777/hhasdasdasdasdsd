<template>
    <vx-card>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            <v-btn
              color="primary"
              class="ml-4"
              v-if="isNew"
              @click="add()" >New Item</v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="contents" :search="search">
        <template  v-slot:item.actions="{ item }"  >
        <div v-if="isIcons">
          <span @click="icons[0]=='mdi-pencil' ? editItem(item):blockItem(item)">{{icons[0]=='mdi-pencil' ? 'Edit':'Block'}}</span>&nbsp;
          <span @click="deleteItem(item)">dlt</span>
          <v-icon small class="mr-2">
            {{ icons[0] }}
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            {{ icons[1] }}
          </v-icon>
          </div>
          <div v-if="isOrders"> 
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="changeStatus(item)"
            :disabled="item.status=='completed'" >Change Status</v-btn>
            </div>          
        </template>
      </v-data-table>
    </vx-card>
</template>
<script>
  export default {
    data() {
      return {
        search: '',
        dialog: false,
        editedIndex: -1,
        editedItem: {
        serviceTitle: '',
        serviceDescription:''
      },
      }
    }, methods: {
      blockItem(item){
        this.$emit('block',item);
      },
      deleteItem(item){
        this.$emit('delete',item)
      },
      changeStatus(item){
        this.$emit('changeStatus',item);
        
      },
      editItem(item){
        console.log(item,"Edit");
        this.$emit('editService',item)
      },
      add(){
         this.$emit('addService')
      }
    },
    props:['headers','contents','title','isIcons','icons','isOrders','isNew'],
  }
</script>
<style>

</style>