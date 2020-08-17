<template>
<div>
<orders :headers="headers" :contents="orders" title="Orders" :isNew="false" :isIcons="false" :icons="['','']" :isOrders="true" @view="showDialog($event)" />		
		<v-dialog v-model="dialog" min-width="50%" :max-width="$vuetify.breakpoint.smAndUp?'50%':'100%'">
			<v-container class="white">
				<v-row class="text-center">
					<v-col cols="6">
					<strong>Id</strong>
					<h6>{{ fullOrder.id }}</h6>
					</v-col>
					<v-col cols="6">
					<strong>Order By:</strong>
					<h6>{{ fullOrder.orderBy }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Started On:</strong>
					<h6>{{ fullOrder.startedOn }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Expected End Date:</strong>
					<h6>{{ fullOrder.expectedEndDate }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Vendor:</strong>
					<h6>{{ fullOrder.vendor }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Service:</strong>
					<h6>{{ fullOrder.service }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Is Fixed Price:</strong>
					<h6>{{ fullOrder.isFixedPrice }}</h6>					
					</v-col>
					<v-col cols="6">
					<strong>Price:</strong>
					<h6>{{ fullOrder.price }}</h6>					
					</v-col>
				</v-row>
			</v-container>
        </v-dialog>
</div>
</template>
<script>
import table from '../layouts/components/table/table.vue';
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