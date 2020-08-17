<template>
  <v-container>
    <user :headers="uHeaders" :contents="users" title="Users" :isIcons="true" :icons="['mdi-block','mdi-delete']" :isNew="false" :isOrders="false" @block="blockItem($event,users)" @delete="deleteItem($event,users)"/><br/>
    <user :headers="vHeaders" :contents="vendors" title="Vendors" :isIcons="true" :icons="['mdi-block','mdi-delete']" :isNew="false" :isOrders="false" @block="blockItem($event,vendors)" @delete="deleteItem($event,vendors)"/>
  </v-container>
</template>
<script>
  import table from '../layouts/components/table/table.vue';
  export default {
    data(){
      return{
        users:[
          {
            name: "abc",
            email: "abc@gmail.com",
            tOrders: 10,
            status: 'active'
          },
          {
            name: "hm",
            email: "hm@gmail.com",
            tOrders: 10,
            status: 'deleted'
          },
          {
            name: "new",
            email: "new@gmail.com",
            tOrders: 10,
            status: 'blocked'
          }
        ],uHeaders:[
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Email', value: 'email', sortable: true, },
          { text: 'Total Orders', value: 'tOrders', sortable: true, },
          { text: 'Status', value: 'status', sortable: true, },
          { text: 'Actions', value: 'actions', sortable: true, },
        ],
        vendors:[
          {
            name: "v1",
            email: "v1@gmail.com",
            tOrders: 10,
            status: 'active'
          },
          {
            name: "hm",
            email: "hm@gmail.com",
            tOrders: 10,
            status: 'deleted'
          },
          {
            name: "new",
            email: "new@gmail.com",
            tOrders: 10,
            status: 'blocked'
          }
        ],vHeaders:[
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Email', value: 'email', sortable: true, },
          { text: 'Total Orders', value: 'tOrders', sortable: true, },
          { text: 'Status', value: 'status', sortable: true, },
          { text: 'Actions', value: 'actions', sortable: true, },
        ]
      }
    },
    methods: {
      deleteItem(item,person) {
        var index = person.indexOf(item)
        if (confirm('Are you sure you want to delete this User?')) {
          this.users[index].status = 'deleted'
        }
      },
      blockItem(item,person) {
        var index = person.indexOf(item)
        if (confirm('Are you sure you want to block this User?')) {
          this.users[index].status = 'Blocked'
        }
      },
    },
    components:{user:table},
  }
</script>
<style>

</style>