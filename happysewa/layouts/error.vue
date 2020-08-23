<template>
  <div></div>
</template>

<script>
export default {
  created() {
    if (this.$route.path.includes("dashboard")) {
      location.replace(
        location.protocol +
          "//" +
          location.hostname +
          ":8080/happysewa/dashboard"
      );
    } else {
      location.replace(
        location.protocol + "//" + location.hostname + "/happysewa"
      );
    }
  },
};
</script>

<style>
</style>