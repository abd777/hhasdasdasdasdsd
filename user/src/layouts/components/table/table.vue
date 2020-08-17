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
          <div v-if="isOrders"> 
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="verify(item)"
            >Verify</v-btn>
            </div>
          <div v-else>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="open(item)"
              >open</v-btn>
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
        editedIndex: -1,
        editedItem: {
        serviceTitle: '',
        serviceDescription:''
      },
      }
    }, methods: {
      // blockItem(item){
      //   this.$emit('block',item);
      // },
      // deleteItem(item){
      //   this.$emit('delete',item)
      // },
      verify(item){
        this.$emit('verify',item);
        
      },
      open(item){
        this.$emit('open',item);       
      },
      // editItem(item){
      //   console.log(item,"Edit");
      //   this.$emit('editService',item)
      // },
      // add(){
      //    this.$emit('addService')
      // }
    },
    props:['headers','contents','title','isOrders','isNew'],
  }
</script>
<style>

</style>