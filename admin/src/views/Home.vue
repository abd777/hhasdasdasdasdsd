<template>
  <h4>
    Admin Dashboard
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="percentage" type="number" label="Order Percentage"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="ytVideo" label="Home Page Youtube Video Link"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn @click="update()">Update</v-btn>
      </v-col>
    </v-row>
    <pre>
		Will have these abilities
		<br />
		
		GUIDE
		( no flag mean that this is a feeature relevant to this dashboard  )
		(* means that it'lll be done on main website)
		(-- means that it's just for information not a feature)
		(x means that it's irrelevant)
		(+ means that it'll be a functional feature on this page)


Can remove or block any user
Can add packages. Just like how it’s there for housewarming packages right now. Under certain service, we can add packages for that particular services.
Can track all the history for any user
Can have a list of all running orders
Can add services
Can update services
Can delete a service
Can Restrict Client or Vendor if they are suspected of foul play

	</pre>
  </h4>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      percentage: 0,
      ytVideo: "",
    };
  },
  methods: {
    update() {
      firebase.firestore().collection("settings").doc("global").update({
        ytVideo: this.ytVideo,
        percentage: this.percentage,
      });
    },
  },
  created() {
    this.$nextTick(() => {
      var _ = this;
      firebase
        .firestore()
        .collection("settings")
        .doc("global")
        .get()
        .then((res) => {
          var o = res.data();
          _.percentage = o.percentage;
          _.ytVideo = o.ytVideo;
        });
    });
  },
};
</script>