<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3>Available Days</h3>
        </v-col>
        <v-col v-for="(v,index) in days" :key="index+'c'">
          <v-btn
            color="success"
            :outlined="!v.selected"
            @click="handleDaySelect(v,index)"
          >{{v.label}}</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3>Available Times</h3>
        </v-col>
        <v-col v-for="(v,index) in dateRange" :key="index+'a'">
          <v-btn
            color="success"
            :outlined="!v.selected"
            @click="handleTimeSelect(v,index,'am')"
          >{{v.label}}</v-btn>
        </v-col>
        <v-col cols="12"></v-col>
      </v-row>
      {{avt}}
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["avd", "avt"],
  watch: {
    avd: {
      handler(val) {
        if (val) {
          var a = this.days;
          var b = [];
          a.forEach((d) => {
            if (val.includes(d.val)) {
             // console.log("ads");
              d.selected = true;
            }
            b.push(d);
          });
          this.days = b;
        }
      },
      immediate: true,
    },
    avt: {
      handler(val) {
       // console.log(val);
        if (val) {
          setTimeout(() => {
            var a = this.dateRange;
            var b = [];
            a.forEach((d) => {
              if (val.includes(d.start_time)) {
               // console.log("asdads");
                d.selected = true;
              }
              b.push(d);
            });
            this.dateRange = b;
          }, 0);
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      days: [
        {
          label: "Sunday",
          val: 0,
          selected: false,
        },
        {
          label: "Monday",
          val: 1,
          selected: false,
        },
        {
          label: "Tuesday",
          val: 2,
          selected: false,
        },
        {
          label: "Wednesday",
          val: 3,
          selected: false,
        },
        {
          label: "Thursday",
          val: 4,
          selected: false,
        },
        {
          label: "Friday",
          val: 5,
          selected: false,
        },
        {
          label: "Saturday",
          val: 6,
          selected: false,
        },
      ],
      dateRange: [
        {
          label: "0 - 1",
          start_time: "0",
          selected: false,
        },
      ],
    };
  },
  mounted() {
    var a = [];
    for (var i = 1; i <= 24; i++) {
      var o = {
        label: "",
        start_time: "",
        selected: false,
      };
      o.label = `${i - 1} - ${i}`;
      o.start_time = i - 1;
      a.push(o);
      // console.log(i);
    }
    //console.log(a);
    this.dateRange = a;
  },
  methods: {
    handleDaySelect(v, i) {
      this.days[i]["selected"] = !v.selected;
      this.raiseEvent();
    },
    handleTimeSelect(v, i, t) {
      this.dateRange[i]["selected"] = !v.selected;

      this.raiseEvent();
    },
    raiseEvent() {
      var days = this.days;
      var times = this.dateRange;
      var avDays = [];
      var avTimes = [];
      days.forEach((day) => {
        if (day.selected) {
          avDays.push(day.val);
        }
      });
      times.forEach((t) => {
        if (t.selected) {
          avTimes.push(parseInt(t.start_time));
        }
      });
      this.$emit("changeDetected", { times: avTimes, days: avDays });
    },
  },
};
</script>

<style lang="css">
</style>