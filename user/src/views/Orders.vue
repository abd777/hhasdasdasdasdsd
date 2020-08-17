<template>
<div>
<orders :headers="headers" :contents="orders" title="Orders" :isNew="false" :isOrders="true" @verify="showDialog($event)" />		
		<v-dialog v-model="dialog" min-width="50%" :max-width="$vuetify.breakpoint.smAndUp?'50%':'100%'">
			<v-container class="white">
			</v-container>
        </v-dialog>
</div>
</template>
<script>
import table from '@/layouts/components/table/table.vue';
export default {
	data(){
		return{
			dialog:false,
			fullOrder:{
				id:null,
				orderBy:null,
				startedOn:null,
				expectedEndDate:null,
				vendor:null,
				service:null,
				isFixedPrice:true,
				price:null,
			},
			headers:[
          {
            text: 'ID',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          { text: 'Started On', value: 'startedOn', sortable: true, },
          { text: 'Expected End Date', value: 'expectedEndDate', sortable: true, },
          { text: 'Service', value: 'service', sortable: true, },
		  { text: 'Price', value: 'price', sortable: true, },
		  { text: 'Actions', value: 'actions', sortable: true, },
        ],orders:[
			{
				id:1,
				orderBy:'email@gmail.com',
				startedOn:'timestamp',
				expectedEndDate:'timestamp',
				vendor:'email@gmail.com',
				service:'leorem ipsum',
				isFixedPrice:true,
				price:128,
			},
			{
				id:2,
				orderBy:'email@gmail.com',
				startedOn:'timestamp',
				expectedEndDate:'timestamp',
				vendor:'email@gmail.com',
				service:'leorem ipsum',
				isFixedPrice:true,
				price:128,
			},
			{
				id:3,
				orderBy:'email@gmail.com',
				startedOn:'timestamp',
				expectedEndDate:'timestamp',
				vendor:'email@gmail.com',
				service:'leorem ipsum',
				isFixedPrice:false,
				price:128,
			},
		]
		}
	},
	methods:{
		showDialog(item){
			this.fullOrder=item;
			console.log(this.fullOrder)
			this.dialog=true;
		},		
	},
	    components:{orders:table},
}
</script>