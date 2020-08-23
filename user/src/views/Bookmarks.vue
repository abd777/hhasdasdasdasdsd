<template>
<div>
 <vendors :headers="vHeaders" :contents="vendors" title="Vendors" :isNew="false" :isOrders="false" @open="open($event)" /><br/>
 <services :headers="sHeaders" :contents="services" title="Services" :isNew="false" :isOrders="false" @open="open($event)" /><br/>
 <v-dialog v-model="dialog" max-width="500px">
 <div class="white">vfjhvg</div>
</v-dialog>
</div>
</template>

<script>
import table from '@/layouts/components/table/table.vue';
export default {
  data(){
    return {
      dialog:false,
        services:[
          {
            id: 1,
            serviceTitle: "Plumber",
            addedOn: 'timestamp',
          },
          {
            id: 2,
            serviceTitle: "Car Wash",
            addedOn: 'timestamp',
          },
          {
            id: 3,
            serviceTitle: "Plumber",
            addedOn: 'timestamp',
          },
        ],
        sHeaders:[
          {
            text: 'ID',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          { text: 'Service Title', value: 'serviceTitle', sortable: true, },
          { text: 'Added On', value: 'addedOn', sortable: true, },
          { text: 'Actions', value: 'actions', sortable: false, },
        ],
        vHeaders:[
            {
              text: 'ID',
              align: 'start',
              sortable: true,
              value: 'id',
            },
            { text: 'Service Title', value: 'serviceTitle', sortable: true, },
            { text: 'Added On', value: 'addedOn', sortable: true, },
            { text: 'Actions', value: 'actions', sortable: false, },
          ],
          vendors:[
          {
            id: 1,
            serviceTitle: "Plumber",
            addedOn: 'timestamp',
          },
          {
            id: 2,
            serviceTitle: "Car Wash",
            addedOn: 'timestamp',
          },
          {
            id: 3,
            serviceTitle: "Plumber",
            addedOn: 'timestamp',
          },
        ]
    }
  },
  methods:{
    open(item){
      this.dialog=true;
    }
  },
  components:{
    vendors:table,
    services:table
  }
};
</script>

<style>
</style>